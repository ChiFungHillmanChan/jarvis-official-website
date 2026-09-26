import { act, cleanup, fireEvent, render, screen, within } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { getDemoCopy } from "@/content/product-demo";
import { ProductDemo } from "./ProductDemo";

const copy = getDemoCopy("en");

function advance(milliseconds: number) {
  act(() => vi.advanceTimersByTime(milliseconds));
}

function chapters(locale = "en") {
  return within(screen.getByRole("navigation", { name: getDemoCopy(locale).chapters }))
    .getAllByRole("button");
}

function expectChapter(index: number, locale = "en") {
  chapters(locale).forEach((chapter, i) => {
    if (i === index) expect(chapter).toHaveAttribute("aria-current", "step");
    else expect(chapter).not.toHaveAttribute("aria-current");
  });
}

function expectPosition(seconds: number, locale = "en") {
  expect(screen.getByRole("progressbar", { name: getDemoCopy(locale).status }))
    .toHaveAttribute("aria-valuenow", String(seconds));
}

describe("ProductDemo playback", () => {
  beforeEach(() => {
    vi.useFakeTimers({ toFake: ["setInterval", "clearInterval", "performance"] });
    vi.spyOn(document, "hidden", "get").mockReturnValue(false);
  });

  afterEach(() => {
    cleanup();
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  it.each(["en", "zh-HK"])("starts idle with named controls and an announced scene in %s", (locale) => {
    const localized = getDemoCopy(locale);
    const { container } = render(<ProductDemo locale={locale} />);

    expect(screen.getByRole("figure", { name: localized.title })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: localized.play })).toBeEnabled();
    expect(screen.getByRole("button", { name: localized.previous })).toBeDisabled();
    expect(screen.getByRole("button", { name: localized.next })).toBeEnabled();
    expect(chapters(locale)).toHaveLength(localized.scenes.length);
    expect(container.querySelector("figcaption")).toHaveAttribute("aria-live", "polite");
    expect(container.querySelector("figcaption")).toHaveAttribute("aria-atomic", "true");

    advance(60_000);

    expectPosition(0, locale);
    expectChapter(0, locale);
    expect(screen.getByRole("button", { name: localized.play })).toBeEnabled();
  });

  it("advances into the next scene only after an explicit play action", () => {
    render(<ProductDemo locale="en" />);
    fireEvent.click(screen.getByRole("button", { name: copy.play }));

    advance(7_900);
    expectChapter(0);
    expectPosition(7);
    expect(screen.getByRole("button", { name: copy.pause })).toBeEnabled();

    advance(100);
    expectChapter(1);
    expectPosition(8);
    expect(screen.getByRole("button", { name: copy.previous })).toBeEnabled();
    expect(screen.getByText(copy.memory)).toBeInTheDocument();
  });

  it("freezes on pause and resumes from the same playback position", () => {
    render(<ProductDemo locale="en" />);
    fireEvent.click(screen.getByRole("button", { name: copy.play }));
    advance(2_500);
    fireEvent.click(screen.getByRole("button", { name: copy.pause }));

    advance(20_000);
    expectPosition(2);
    expectChapter(0);
    expect(screen.getByRole("button", { name: copy.play })).toBeEnabled();

    fireEvent.click(screen.getByRole("button", { name: copy.play }));
    advance(5_500);
    expectPosition(8);
    expectChapter(1);
  });

  it("selecting a chapter pauses and resets playback to that chapter's start", () => {
    render(<ProductDemo locale="en" />);
    fireEvent.click(screen.getByRole("button", { name: copy.play }));
    advance(9_000);
    fireEvent.click(chapters()[2]!);

    expectChapter(2);
    expectPosition(16);
    expect(screen.getByRole("button", { name: copy.play })).toBeEnabled();
    expect(screen.getByRole("heading", { name: copy.answerTitle })).toBeInTheDocument();
    advance(12_000);
    expectPosition(16);

    fireEvent.click(screen.getByRole("button", { name: copy.play }));
    advance(8_000);
    expectChapter(3);
    expectPosition(24);
  });

  it("previous and next controls move by chapter and respect the first and last boundaries", () => {
    render(<ProductDemo locale="en" />);
    fireEvent.click(screen.getByRole("button", { name: copy.play }));
    advance(1_000);
    fireEvent.click(screen.getByRole("button", { name: copy.next }));

    expectChapter(1);
    expectPosition(8);
    expect(screen.getByRole("button", { name: copy.play })).toBeEnabled();
    advance(10_000);
    expectPosition(8);

    fireEvent.click(screen.getByRole("button", { name: copy.previous }));
    expectChapter(0);
    expectPosition(0);
    expect(screen.getByRole("button", { name: copy.previous })).toBeDisabled();

    fireEvent.click(chapters()[3]!);
    expect(screen.getByRole("button", { name: copy.next })).toBeDisabled();
    expect(screen.getByRole("button", { name: copy.previous })).toBeEnabled();
  });

  it("stops at the end and replay starts the first scene from zero", () => {
    render(<ProductDemo locale="en" />);
    fireEvent.click(screen.getByRole("button", { name: copy.play }));
    advance(32_000);

    expectPosition(32);
    expectChapter(3);
    expect(screen.getByRole("button", { name: copy.replay })).toBeEnabled();
    expect(screen.queryByRole("button", { name: copy.pause })).not.toBeInTheDocument();
    expect(screen.getByRole("heading", { name: copy.draftSubject })).toBeInTheDocument();
    advance(20_000);
    expectPosition(32);

    fireEvent.click(screen.getByRole("button", { name: copy.replay }));
    expectPosition(0);
    expectChapter(0);
    expect(screen.getByRole("button", { name: copy.pause })).toBeEnabled();
    advance(8_000);
    expectChapter(1);
    expectPosition(8);
  });

  it("does not consume playback time while the document is hidden", () => {
    render(<ProductDemo locale="en" />);
    fireEvent.click(screen.getByRole("button", { name: copy.play }));
    advance(2_000);

    vi.spyOn(document, "hidden", "get").mockReturnValue(true);
    advance(20_000);
    expectPosition(2);
    expectChapter(0);

    vi.spyOn(document, "hidden", "get").mockReturnValue(false);
    advance(6_000);
    expectPosition(8);
    expectChapter(1);
  });
});
