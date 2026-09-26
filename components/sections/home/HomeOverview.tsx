import Link from "next/link";
import { getLocale } from "next-intl/server";
import { Mail, CalendarDays, MessageCircle } from "lucide-react";

export async function HomeOverview() {
  const locale = await getLocale();
  const zh = locale === "zh-HK";
  const items = zh ? [
    { icon: Mail, title: "掌握來龍去脈", text: "集中多個 Gmail，為相關內容分組，再取得附來源引用的分析。", detail: "跨信箱工作區" },
    { icon: CalendarDays, title: "為下一步做好準備", text: "透過一般助理查看行事曆、管理待辦，並準備供你檢閱的電郵草稿。", detail: "行事曆、待辦與草稿" },
    { icon: MessageCircle, title: "用你的方式工作", text: "以文字或語音提出要求，加入個人指示，並自行管理值得保留的記憶。", detail: "個人指示與來源記憶" },
  ] : [
    { icon: Mail, title: "Find the whole story", text: "Bring multiple Gmail accounts together, group related messages and get an analysis with source references.", detail: "A workspace across inboxes" },
    { icon: CalendarDays, title: "Prepare what comes next", text: "Use the general assistant to check your calendar, manage tasks and prepare email drafts for your review.", detail: "Calendar, tasks and drafts" },
    { icon: MessageCircle, title: "Work in your own way", text: "Ask by text or voice, add your own instructions and choose which useful details to keep as memories.", detail: "Personal instructions and memory" },
  ];
  return <section className="home-section overview-section"><div className="site-container">
    <div className="section-intro"><h2>{zh ? "讓日常工作，\n更有條理。" : "A clearer day,\none task at a time."}</h2><p>{zh ? "從散落各處的資訊，到你可以採取的下一步。" : "From scattered information to a next step you can act on."}</p></div>
    <div className="overview-list">{items.map(({icon: Icon,...item}) => <article key={item.title}><Icon size={24} strokeWidth={1.4} aria-hidden="true" /><h3>{item.title}</h3><p>{item.text}</p><span>{item.detail}</span></article>)}</div>
    <Link className="text-link" href={`/${locale}/product`}>{zh ? "探索 JARVIS 的功能" : "Explore what JARVIS can do"}</Link>
  </div></section>;
}
