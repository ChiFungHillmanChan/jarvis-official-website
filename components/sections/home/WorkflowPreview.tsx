"use client";

import { useRef, useState } from "react";
import {
  CalendarDays,
  Check,
  ChevronDown,
  CircleCheck,
  Command,
  Inbox,
  Mail,
  MessageSquare,
  Mic,
  Plus,
  Send,
  ShieldCheck,
} from "lucide-react";
import type { DeepWiden } from "@/content/copy.types";
import type { enHome } from "@/content/home";

type PreviewCopy = DeepWiden<typeof enHome.preview>;

export function WorkflowPreview({ copy }: { copy: PreviewCopy }) {
  const [selected, setSelected] = useState(0);
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);
  const current = copy.tabs[selected]!;
  const icons = [MessageSquare, Inbox, CalendarDays, CircleCheck];

  return (
    <div className="workflow-showcase" id="preview">
      <h2 className="sr-only">{copy.label}</h2>
      <div className="workflow-tabs" role="tablist" aria-label={copy.tabsLabel}>
        {copy.tabs.map((tab, index) => (
          <button
            key={tab.label}
            ref={(element) => {
              buttons.current[index] = element;
            }}
            type="button"
            role="tab"
            id={`workflow-tab-${index}`}
            aria-controls="workflow-panel"
            aria-selected={selected === index}
            tabIndex={selected === index ? 0 : -1}
            onClick={() => setSelected(index)}
            onKeyDown={(event) => {
              let next = index;
              if (event.key === "ArrowRight") next = (index + 1) % copy.tabs.length;
              else if (event.key === "ArrowLeft")
                next = (index - 1 + copy.tabs.length) % copy.tabs.length;
              else if (event.key === "Home") next = 0;
              else if (event.key === "End") next = copy.tabs.length - 1;
              else return;
              event.preventDefault();
              setSelected(next);
              buttons.current[next]?.focus();
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="workspace-mat">
        <div className="workspace-window">
          <div className="workspace-toolbar">
            <div className="window-controls" aria-hidden="true">
              <i />
              <i />
              <i />
            </div>
            <span>JARVIS</span>
            <span className="toolbar-caption">{copy.sample}</span>
          </div>
          <div className="workspace-body">
            <aside className="workspace-sidebar" aria-hidden="true">
              <div className="workspace-brand">
                <Command size={19} />
                <span>JARVIS</span>
                <ChevronDown size={13} />
              </div>
              <p>{copy.sidebarTitle}</p>
              {copy.sidebarItems.map((item, index) => {
                const Icon = icons[index]!;
                return (
                  <div
                    className={`workspace-nav-item ${index === 0 ? "is-active" : ""}`}
                    key={item}
                  >
                    <Icon size={16} />
                    <span>{item}</span>
                    {index === 0 && <Plus size={14} />}
                  </div>
                );
              })}
              <div className="workspace-local">
                <ShieldCheck size={14} />
                {copy.footer}
              </div>
            </aside>
            <div
              className="workspace-conversation"
              id="workflow-panel"
              role="tabpanel"
              aria-labelledby={`workflow-tab-${selected}`}
              tabIndex={0}
            >
              <div className="conversation-top">
                <span>{current.title}</span>
                <span className="model-label">JARVIS</span>
              </div>
              <div className="conversation-messages">
                <div className="user-message">{current.prompt}</div>
                <div className="assistant-message">
                  <span className="assistant-symbol" aria-hidden="true">
                    <Command size={17} />
                  </span>
                  <p>{current.response}</p>
                </div>
                <div className="draft-card">
                  <div className="draft-label">
                    {selected === 0 ? (
                      <Mail size={15} />
                    ) : selected === 1 ? (
                      <CalendarDays size={15} />
                    ) : (
                      <CircleCheck size={15} />
                    )}
                    <span>{current.cardLabel}</span>
                    <span className="draft-status-dot" />
                  </div>
                  <h3>{current.cardTitle}</h3>
                  <p className="draft-recipient">{current.recipient}</p>
                  <p className="draft-body">{current.body}</p>
                  <div className="draft-status">
                    <Check size={13} />
                    <span>{current.status}</span>
                  </div>
                </div>
              </div>
              <div className="mock-composer" aria-hidden="true">
                <Plus size={16} />
                <span>{copy.input}</span>
                <Mic size={16} />
                <span className="mock-send">
                  <Send size={14} />
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <p className="workflow-caption">{copy.caption}</p>
    </div>
  );
}
