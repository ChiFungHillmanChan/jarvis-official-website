"use client";

import { useEffect, useId, useRef, useState } from "react";
import { ArrowLeft, Check, Folder, Mail } from "lucide-react";
import { getWorkspacePreviewCopy } from "@/content/workspace-preview";
import { BrandIcon } from "@/components/ui/BrandIcon";
import "@/styles/workspace-preview.css";

export function WorkflowPreview({ locale }: { locale: string }) {
  const copy = getWorkspacePreviewCopy(locale);
  const [sourceId, setSourceId] = useState<number | null>(null);
  const readerRef = useRef<HTMLElement>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const id = useId();
  const source = copy.sources.find((email) => email.id === sourceId);

  useEffect(() => {
    if (sourceId !== null) readerRef.current?.focus();
    else triggerRef.current?.focus();
  }, [sourceId]);

  return (
    <figure className="product-demo" id="preview" aria-label={copy.title}>
      <div className="product-demo-window">
        <div className="product-demo-toolbar">
          <span className="product-demo-brand">JARVIS</span>
          <span className="product-demo-toolbar-title">{copy.workspace}</span>
          <span className="product-demo-sample">{copy.sampleLabel}</span>
        </div>
        <div className="product-demo-body">
          <aside className="product-demo-sidebar" aria-label={copy.accountsLabel}>
            <p className="product-demo-sidebar-label">{copy.accountsLabel}</p>
            <ul className="product-demo-accounts">
              {copy.accounts.map((account) => (
                <li key={account}>
                  <Mail size={16} aria-hidden="true" />
                  <span>{account}</span>
                </li>
              ))}
            </ul>
            <div className="product-demo-group-list">
              <p className="product-demo-sidebar-label">{copy.groupsLabel}</p>
              <div className="product-demo-selected-group">
                <Folder size={16} aria-hidden="true" />
                <span>{copy.group}</span>
                <span className="product-demo-count">2</span>
              </div>
            </div>
            <p className="product-demo-local">{copy.localLabel}</p>
          </aside>
          <div className="product-demo-main">
            <header className="product-demo-group-heading">
              <h2>{copy.group}</h2>
              <span>{copy.groupDetail}</span>
            </header>
            <div className="product-demo-analysis" hidden={source !== undefined}>
              <div className="product-demo-instructions">
                <span>{copy.instructionsLabel}</span>
                <p>{copy.instructions}</p>
              </div>
              <div className="product-demo-answer">
                <div className="product-demo-answer-heading">
                  <BrandIcon size={24} />
                  <h3>{copy.analysisLabel}</h3>
                  <span className="product-demo-model">{copy.modelLabel}</span>
                </div>
                <ul className="product-demo-actions">
                  {copy.actions.map((action) => (
                    <li key={action.sourceId}>
                      <p>{action.text}</p>
                      <button
                        type="button"
                        className="product-demo-source-button"
                        aria-expanded={sourceId === action.sourceId}
                        aria-controls={`${id}-reader`}
                        onClick={(event) => {
                          triggerRef.current = event.currentTarget;
                          setSourceId(action.sourceId);
                        }}
                      >
                        {copy.sourceLabel} #{action.sourceId}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="product-demo-memory">
                <Check size={16} aria-hidden="true" />
                <div>
                  <span>{copy.memoryLabel}</span>
                  <p>{copy.memory}</p>
                </div>
              </div>
            </div>
            {source && (
              <section
                ref={readerRef}
                id={`${id}-reader`}
                className="product-demo-reader"
                aria-label={copy.sourceHeading}
                tabIndex={-1}
                onKeyDown={(event) => {
                  if (event.key === "Escape") {
                    event.preventDefault();
                    setSourceId(null);
                  }
                }}
              >
                <button
                  type="button"
                  className="product-demo-back"
                  onClick={() => setSourceId(null)}
                >
                  <ArrowLeft size={15} aria-hidden="true" />
                  {copy.backLabel}
                </button>
                <p className="product-demo-reader-label">
                  {copy.sourceLabel} #{source.id}
                </p>
                <h3>{source.subject}</h3>
                <dl className="product-demo-email-meta">
                  <div>
                    <dt>{copy.fromLabel}</dt>
                    <dd>{source.from}</dd>
                  </div>
                  <div>
                    <dt>{copy.inboxLabel}</dt>
                    <dd>{source.account}</dd>
                  </div>
                </dl>
                <p className="product-demo-email-body">{source.body}</p>
              </section>
            )}
          </div>
        </div>
      </div>
      <figcaption>{copy.hint}</figcaption>
    </figure>
  );
}
