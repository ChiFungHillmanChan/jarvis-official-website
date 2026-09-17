import type { ReactNode } from "react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { act, fireEvent, render, screen } from "@testing-library/react";
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
      roleLabel="What do you do"
      rolePlaceholder="What do you do?"
      painLabel="What should JARVIS take over first"
      painPlaceholder="What should JARVIS take over first?"
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
    // Email plus the two optional qualification fields are offered to someone
    // filling the form normally; the honeypot stays out of the tree.
    expect(screen.getAllByRole("textbox")).toHaveLength(3);
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
      role: "",
      painPoint: "",
    });
  });

  it("sends the qualification answers when the visitor gives them", async () => {
    const { container } = renderForm();
    fireEvent.change(screen.getByLabelText("Email address"), {
      target: { value: "human@example.com" },
    });
    fireEvent.change(screen.getByLabelText("What do you do"), {
      target: { value: "Agency owner" },
    });
    fireEvent.change(screen.getByLabelText("What should JARVIS take over first"), {
      target: { value: "Chasing client replies" },
    });
    fireEvent.submit(container.querySelector("form")!);

    await vi.waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(1));
    const [, init] = fetchMock.mock.calls[0] as [string, RequestInit];
    const body = JSON.parse(init.body as string);
    expect(body.role).toBe("Agency owner");
    expect(body.painPoint).toBe("Chasing client replies");
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

  it("sends only one request when the form is submitted again before the first request finishes", async () => {
    let completeRequest!: (response: Response) => void;
    fetchMock.mockReturnValue(
      new Promise<Response>((resolve) => {
        completeRequest = resolve;
      }),
    );
    const { container } = renderForm();
    fireEvent.change(screen.getByLabelText("Email address"), {
      target: { value: "human@example.com" },
    });

    act(() => {
      fireEvent.submit(container.querySelector("form")!);
      fireEvent.submit(container.querySelector("form")!);
    });

    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(screen.getByRole("button", { name: "Sending..." })).toBeDisabled();
    expect(container.querySelector("form")).toHaveAttribute("aria-busy", "true");

    await act(async () => completeRequest(new Response(null, { status: 200 })));
    expect(screen.getByRole("status")).toHaveTextContent("You are on the list.");
  });

  it("focuses an invalid email and associates its explanation without sending a request", async () => {
    const { container } = renderForm();
    fireEvent.submit(container.querySelector("form")!);

    const email = screen.getByLabelText("Email address");
    await vi.waitFor(() => expect(email).toHaveFocus());
    expect(email).toHaveAttribute("aria-invalid", "true");
    expect(email).toHaveAccessibleDescription("Enter a valid email.");
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("lets the visitor retry after a server error without marking the email invalid", async () => {
    fetchMock
      .mockResolvedValueOnce(new Response(null, { status: 503 }))
      .mockResolvedValueOnce(new Response(null, { status: 200 }));
    const { container } = renderForm();
    const email = screen.getByLabelText("Email address");
    fireEvent.change(email, { target: { value: "human@example.com" } });
    fireEvent.submit(container.querySelector("form")!);

    const error = await screen.findByText("Something went wrong.");
    await vi.waitFor(() => expect(error).toHaveFocus());
    expect(email).not.toHaveAttribute("aria-invalid", "true");
    expect(screen.getByRole("button", { name: "Request access" })).toBeEnabled();

    fireEvent.submit(container.querySelector("form")!);
    await screen.findByText("You are on the list.");
    expect(fetchMock).toHaveBeenCalledTimes(2);
  });
});
