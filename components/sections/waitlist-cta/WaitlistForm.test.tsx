import type { ReactNode } from "react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { WaitlistForm } from "./WaitlistForm";

vi.mock("next/link", () => ({
  default: ({ href, children }: { href: string; children: ReactNode }) => (
    <a href={href}>{children}</a>
  ),
}));

const fetchMock = vi.fn();

function renderForm() {
  return render(
    <WaitlistForm
      placeholder="you@company.com"
      submitLabel="Request access"
      submittingLabel="Sending..."
      successMessage="You are on the list."
      errorInvalid="Enter a valid email."
      errorGeneric="Something went wrong."
      emailLabel="Email address"
    />,
  );
}

function honeypotFrom(container: HTMLElement): HTMLInputElement {
  const input = container.querySelector<HTMLInputElement>('input[name="company"]');
  if (!input) throw new Error("honeypot input is missing");
  return input;
}

describe("WaitlistForm honeypot", () => {
  beforeEach(() => {
    fetchMock.mockReset();
    fetchMock.mockResolvedValue({ ok: true });
    vi.stubGlobal("fetch", fetchMock);
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("keeps the decoy field out of the tab order and the accessibility tree", () => {
    const { container } = renderForm();
    const honeypot = honeypotFrom(container);
    expect(honeypot).toHaveAttribute("tabindex", "-1");
    expect(honeypot).toHaveAttribute("aria-hidden", "true");
    expect(honeypot).toHaveAttribute("autocomplete", "off");
    // Only the email field is offered to someone filling the form normally.
    expect(screen.getAllByRole("textbox")).toHaveLength(1);
  });

  it("sends the decoy field under the key the API route reads", async () => {
    const { container } = renderForm();
    fireEvent.change(screen.getByLabelText("Email address"), {
      target: { value: "human@example.com" },
    });
    fireEvent.change(honeypotFrom(container), { target: { value: "Acme Corp" } });
    fireEvent.submit(container.querySelector("form")!);

    await vi.waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(1));
    const [url, init] = fetchMock.mock.calls[0] as [string, RequestInit];
    expect(url).toBe("/api/waitlist");
    expect(JSON.parse(init.body as string)).toEqual({
      email: "human@example.com",
      company: "Acme Corp",
    });
  });

  it("sends an empty decoy field for a real signup", async () => {
    const { container } = renderForm();
    fireEvent.change(screen.getByLabelText("Email address"), {
      target: { value: "human@example.com" },
    });
    fireEvent.submit(container.querySelector("form")!);

    await vi.waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(1));
    const [, init] = fetchMock.mock.calls[0] as [string, RequestInit];
    expect(JSON.parse(init.body as string).company).toBe("");
  });
});
