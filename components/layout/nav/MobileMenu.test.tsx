import type { ComponentProps } from "react";
import { describe, it, expect, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { MobileMenu } from "./MobileMenu";

vi.mock("next/navigation", () => ({ usePathname: () => "/en" }));
vi.mock("next/link", () => ({
  default: ({ href, children, onClick, "aria-label": ariaLabel }: ComponentProps<"a">) => (
    <a
      href={href}
      onClick={(event) => {
        event.preventDefault();
        onClick?.(event);
      }}
      aria-label={ariaLabel}
    >
      {children}
    </a>
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

  it("closes with Escape and returns focus to the menu button", () => {
    const { container } = renderMenu();
    const toggle = screen.getByRole("button", { name: "Open menu" });
    fireEvent.click(toggle);
    screen.getByRole("link", { name: "Company" }).focus();

    fireEvent.keyDown(document, { key: "Escape" });

    expect(container.querySelector("#mobile-menu-panel")).toHaveAttribute("inert");
    expect(toggle).toHaveFocus();
    expect(toggle).toHaveAttribute("aria-expanded", "false");
  });

  it("keeps Tab and Shift+Tab inside the open menu", () => {
    renderMenu();
    const toggle = screen.getByRole("button", { name: "Open menu" });
    fireEvent.click(toggle);
    const lastLink = screen.getByRole("link", { name: "Request access" });
    lastLink.focus();
    fireEvent.keyDown(document, { key: "Tab" });
    expect(toggle).toHaveFocus();
    fireEvent.keyDown(document, { key: "Tab", shiftKey: true });
    expect(lastLink).toHaveFocus();
  });

  it.each(["Company", "Switch to 繁體中文", "Request access"])(
    "closes and restores scrolling when %s is selected",
    (label) => {
      const { container } = renderMenu();
      fireEvent.click(screen.getByRole("button", { name: "Open menu" }));
      expect(document.body.style.overflow).toBe("hidden");

      fireEvent.click(screen.getByRole("link", { name: label }));

      expect(container.querySelector("#mobile-menu-panel")).toHaveAttribute("inert");
      expect(document.body.style.overflow).toBe("");
    },
  );
});
