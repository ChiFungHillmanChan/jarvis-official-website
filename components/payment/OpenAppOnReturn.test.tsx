import { describe, expect, it, vi } from "vitest";
import { render } from "@testing-library/react";
import { StrictMode } from "react";
import { OpenAppOnReturn } from "./OpenAppOnReturn";

describe("OpenAppOnReturn", () => {
  it("asks the browser to open JARVIS once, even under StrictMode's double effects", () => {
    const open = vi.fn();
    render(<StrictMode><OpenAppOnReturn label="Open JARVIS" open={open} /></StrictMode>);
    expect(open).toHaveBeenCalledTimes(1);
    expect(open).toHaveBeenCalledWith("jarvis://billing/return");
  });

  it("keeps a button for when the browser blocks or the user dismisses the prompt", () => {
    const { getByRole } = render(<OpenAppOnReturn label="打開 JARVIS" open={vi.fn()} />);
    expect(getByRole("link", { name: "打開 JARVIS" }).getAttribute("href")).toBe("jarvis://billing/return");
  });
});
