import {
  ConditionalCheckFailedException,
  DynamoDBClient,
  PutItemCommand,
  type AttributeValue,
} from "@aws-sdk/client-dynamodb";
import { awsCredentialsProvider } from "@vercel/oidc-aws-credentials-provider";
import type { WaitlistInput } from "@/lib/validation/waitlistSchema";

let cachedClient: { key: string; client: DynamoDBClient } | undefined;

function database() {
  const table = process.env.WAITLIST_TABLE_NAME?.trim();
  const region = process.env.AWS_REGION?.trim();
  const roleArn = process.env.AWS_ROLE_ARN?.trim();
  if (!table || !region || (process.env.VERCEL === "1" && !roleArn)) {
    throw new Error("waitlist_storage_not_configured");
  }

  const key = `${region}:${roleArn ?? "local"}`;
  if (!cachedClient || cachedClient.key !== key) {
    const transport = { connectionTimeout: 2_000, requestTimeout: 5_000 };
    cachedClient = {
      key,
      client: new DynamoDBClient({
        region,
        maxAttempts: 2,
        requestHandler: transport,
        ...(roleArn
          ? {
              credentials: awsCredentialsProvider({
                roleArn,
                clientConfig: { region, maxAttempts: 2, requestHandler: transport },
              }),
            }
          : {}),
      }),
    };
  }
  return { table, client: cachedClient.client };
}

/** A successful return always means the application exists in durable storage. */
export async function captureWaitlistSignup(signup: WaitlistInput): Promise<{ created: boolean }> {
  const { table, client } = database();
  const acceptedAt = new Date().toISOString();
  const item: Record<string, AttributeValue> = {
    email: { S: signup.email },
    createdAt: { S: acceptedAt },
    privacyAcceptedAt: { S: acceptedAt },
    termsAcceptedAt: { S: acceptedAt },
    privacyVersion: { S: signup.privacyVersion },
    termsVersion: { S: signup.termsVersion },
    status: { S: "pending" },
    source: { S: "website-beta" },
    schemaVersion: { N: "1" },
  };
  if (signup.role) item.role = { S: signup.role };
  if (signup.painPoint) item.painPoint = { S: signup.painPoint };
  if (signup.locale) item.locale = { S: signup.locale };

  try {
    await client.send(
      new PutItemCommand({
        TableName: table,
        Item: item,
        // The database decides uniqueness atomically across concurrent Vercel instances.
        // Never overwrite another person's answers on an unauthenticated resubmission.
        ConditionExpression: "attribute_not_exists(#email)",
        ExpressionAttributeNames: { "#email": "email" },
      }),
      { abortSignal: AbortSignal.timeout(8_000) },
    );
    return { created: true };
  } catch (error) {
    if (error instanceof ConditionalCheckFailedException) return { created: false };
    throw error;
  }
}
