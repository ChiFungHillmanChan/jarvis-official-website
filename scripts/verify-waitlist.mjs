import assert from "node:assert/strict";
import { randomUUID } from "node:crypto";
import { DynamoDBClient, GetItemCommand, DeleteItemCommand } from "@aws-sdk/client-dynamodb";

// Run only against a deployment with WAITLIST_EMAILS_ENABLED=false.
const baseUrl = process.env.WAITLIST_SMOKE_BASE_URL;
const table = process.env.WAITLIST_TABLE_NAME;
const region = process.env.AWS_REGION;
if (!baseUrl || !table || !region || process.env.WAITLIST_SMOKE_EMAILS_DISABLED !== "true") {
  throw new Error(
    "Set WAITLIST_SMOKE_BASE_URL, WAITLIST_TABLE_NAME, AWS_REGION and confirm WAITLIST_SMOKE_EMAILS_DISABLED=true before running.",
  );
}
const url = new URL("/api/waitlist", baseUrl);
assert(["https:", "http:"].includes(url.protocol), "Expected an HTTP deployment URL");
const client = new DynamoDBClient({ region, maxAttempts: 2 });
const email = `jarvis-db-probe-${randomUUID()}@example.invalid`;
const key = { email: { S: email } };
const payload = {
  email,
  role: "Synthetic database verification",
  painPoint: "Temporary test record, removed by the verification script",
  locale: "en",
  privacyAccepted: true,
  termsAccepted: true,
  privacyVersion: "2026-09-26",
  termsVersion: "2026-09-24",
};
const post = (body) =>
  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(process.env.VERCEL_AUTOMATION_BYPASS_SECRET
        ? { "x-vercel-protection-bypass": process.env.VERCEL_AUTOMATION_BYPASS_SECRET }
        : {}),
    },
    body: JSON.stringify(body),
    signal: AbortSignal.timeout(30_000),
  });
let submitted = false;
try {
  const invalid = await post({ ...payload, privacyAccepted: false });
  assert.equal(invalid.status, 400, "The live endpoint must reject missing consent");
  submitted = true;
  // A failed request must not start cleanup while its sibling can still write.
  const responses = await Promise.allSettled([post(payload), post(payload)]);
  for (const result of responses) {
    assert.equal(result.status, "fulfilled", "A live capture request did not complete");
    const response = result.value;
    assert.equal(response.status, 200, "The live capture request failed");
    assert.deepEqual(await response.json(), { ok: true });
  }
  const saved = await client.send(
    new GetItemCommand({ TableName: table, Key: key, ConsistentRead: true }),
  );
  const item = saved.Item;
  assert(item, "No durable row exists after the endpoint reported success");
  assert.equal(item.email.S, email);
  assert.equal(item.role.S, payload.role);
  assert.equal(item.status.S, "pending");
  assert.equal(item.privacyVersion.S, payload.privacyVersion);
  assert.equal(item.termsVersion.S, payload.termsVersion);
  assert.equal(item.locale.S, "en");
  assert.equal(item.privacyAcceptedAt.S, item.createdAt.S);
  assert.equal(item.termsAcceptedAt.S, item.createdAt.S);
  assert.equal(item.ip, undefined);
  assert.equal(item.userAgent, undefined);
  console.log("Live API consent, concurrent capture and consistent DynamoDB read: passed.");
} finally {
  if (submitted) {
    // The unique key and source guard limit cleanup to this script's own record.
    await client.send(
      new DeleteItemCommand({
        TableName: table,
        Key: key,
        ConditionExpression: "attribute_not_exists(#email) OR #source = :source",
        ExpressionAttributeNames: { "#email": "email", "#source": "source" },
        ExpressionAttributeValues: { ":source": { S: "website-beta" } },
      }),
    );
    const removed = await client.send(
      new GetItemCommand({ TableName: table, Key: key, ConsistentRead: true }),
    );
    assert.equal(removed.Item, undefined, "Synthetic record cleanup failed");
    console.log("Synthetic record cleanup: passed. No applicant data was listed or changed.");
  }
  client.destroy();
}
