import { fireEvent, render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { WorkflowPreview } from "./WorkflowPreview";

describe("email workspace example", () => {
  it.each([
    {
      locale: "en",
      firstSource: "Mail #12",
      secondSource: "Mail #18",
      reader: "Original email",
      firstSubject: "Launch proposal — next revision",
      secondSubject: "A time to review the proposal",
      firstInbox: "Work Gmail",
      secondInbox: "Personal Gmail",
      firstFact: /send the revised version by 24 September/,
      secondFact: /25 September at either 10 am or 3 pm/,
      back: "Back to analysis",
    },
    {
      locale: "zh-HK",
      firstSource: "郵件 #12",
      secondSource: "郵件 #18",
      reader: "原始郵件",
      firstSubject: "發佈提案：下一輪修訂",
      secondSubject: "安排提案審閱時間",
      firstInbox: "工作 Gmail",
      secondInbox: "個人 Gmail",
      firstFact: /9 月 24 日前交回修訂版本/,
      secondFact: /9 月 25 日上午 10 時或者下午 3 時/,
      back: "返回分析",
    },
  ])("opens the email that each $locale citation actually refers to", (example) => {
    render(<WorkflowPreview locale={example.locale} />);

    fireEvent.click(screen.getByRole("button", { name: example.firstSource }));
    let reader = screen.getByRole("region", { name: example.reader });
    expect(within(reader).getByRole("heading", { name: example.firstSubject })).toBeVisible();
    expect(within(reader).getByText(example.firstInbox)).toBeVisible();
    expect(within(reader).getByText(example.firstFact)).toBeVisible();
    expect(within(reader).queryByText(example.secondFact)).not.toBeInTheDocument();

    fireEvent.click(within(reader).getByRole("button", { name: example.back }));
    fireEvent.click(screen.getByRole("button", { name: example.secondSource }));
    reader = screen.getByRole("region", { name: example.reader });
    expect(within(reader).getByRole("heading", { name: example.secondSubject })).toBeVisible();
    expect(within(reader).getByText(example.secondInbox)).toBeVisible();
    expect(within(reader).getByText(example.secondFact)).toBeVisible();
    expect(within(reader).queryByText(example.firstFact)).not.toBeInTheDocument();
  });

  it("returns keyboard focus to the citation when the reader is closed with Escape", () => {
    render(<WorkflowPreview locale="en" />);
    const citation = screen.getByRole("button", { name: "Mail #18" });
    fireEvent.click(citation);

    const reader = screen.getByRole("region", { name: "Original email" });
    expect(reader).toHaveFocus();
    fireEvent.keyDown(reader, { key: "Escape" });

    expect(screen.queryByRole("region", { name: "Original email" })).not.toBeInTheDocument();
    expect(citation).toHaveFocus();
    expect(citation).toHaveAttribute("aria-expanded", "false");
  });
});
