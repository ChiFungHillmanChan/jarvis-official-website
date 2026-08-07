import type { ReactNode } from "react";
import { describe, it, expect, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { MobileMenu } from "./MobileMenu";

vi.mock("next/navigation", () => ({ usePathname: () => "/en" }));
vi.mock("next/link", () => ({
  default: ({ href, children }: { href: string; children: ReactNode }) => (
    <a href={href}>{children}</a>
  ),
}));

function renderMenu() {
  return render(
    <MobileMenu
      links={[{ label: "Company", href: "/en/company" }]}
      requestAccessLabel="Request access"
      openLabel="Open menu"
      closeLabel="Close menu"
      locale="en"
    />,
  );
}

describe("MobileMenu", () => {
  it("keeps the closed panel out of the tab order and the accessibility tree", () => {
    const { container } = renderMenu();
    const panel = container.querySelector("#mobile-menu-panel");
    expect(panel).not.toBeNull();
    expect(panel).toHaveAttribute("inert");
  });

  it("makes the panel reachable once it is opened", () => {
    const { container } = renderMenu();
    fireEvent.click(screen.getByRole("button", { name: "Open menu" }));
    expect(container.querySelector("#mobile-menu-panel")).not.toHaveAttribute("inert");
  });

  it("keeps the panel mounted with its transition classes", () => {
    const { container } = renderMenu();
    const panel = container.querySelector("#mobile-menu-panel");
    expect(panel?.className).toContain("transition-all");
    expect(panel?.className).toContain("opacity-0");
  });
});
