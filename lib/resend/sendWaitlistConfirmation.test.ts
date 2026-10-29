import { beforeEach, describe, expect, it, vi } from "vitest";

const send = vi.fn();
vi.mock("resend", () => ({
  Resend: vi.fn(function Resend() {
    return { emails: { send } };
  }),
}));

import { sendWaitlistConfirmation } from "./sendWaitlistConfirmation";

describe("sendWaitlistConfirmation", () => {
  beforeEach(() => {
    send.mockReset().mockResolvedValue({ data: { id: "conf-id" }, error: null });
    vi.stubEnv("RESEND_API_KEY", "re_test");
    vi.stubEnv("WAITLIST_FROM", "JARVIS AI <hello@example.com>");
  });

  it("sends the English confirmation by default", async () => {
    await expect(sendWaitlistConfirmation({ to: "a@example.com" })).resolves.toBe("conf-id");
    expect(send).toHaveBeenCalledWith(
      expect.objectContaining({
        to: "a@example.com",
        subject: "Welcome to the JARVIS beta waitlist",
        text: expect.stringContaining("Thanks for joining"),
      }),
    );
  });

  it("sends the Traditional Chinese confirmation to zh-HK signups", async () => {
    await sendWaitlistConfirmation({ to: "a@example.com", locale: "zh-HK" });
    expect(send).toHaveBeenCalledWith(
      expect.objectContaining({
        subject: "歡迎加入 JARVIS Beta 候補名單",
        text: expect.stringContaining("感謝你加入 JARVIS Beta 候補名單"),
      }),
    );
  });
});
