"use client";

import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Check, FileText, Mail, Pause, Play, RotateCcw } from "lucide-react";
import { getDemoCopy } from "@/content/product-demo";
import { BrandIcon } from "@/components/ui/BrandIcon";
import "@/styles/product-demo.css";

export function ProductDemo({ locale }: { locale: string }) {
  const copy = getDemoCopy(locale);
  const [playback, setPlayback] = useState({ position: 0, playing: false });
  const { position, playing } = playback;
  const duration = copy.scenes.length * 8000;
  const finished = position >= duration;
  const sceneIndex = Math.min(Math.floor(position / 8000), copy.scenes.length - 1);
  const elapsed = position - sceneIndex * 8000;
  const scene = copy.scenes[sceneIndex]!;

  useEffect(() => {
    if (!playing) return;
    let previous = performance.now();
    const timer = window.setInterval(() => {
      const now = performance.now();
      const delta = document.hidden ? 0 : now - previous;
      previous = now;
      setPlayback(current => {
        const next = Math.min(current.position + delta, duration);
        return { position: next, playing: next < duration };
      });
    }, 100);
    return () => window.clearInterval(timer);
  }, [playing, duration]);

  function selectScene(index: number) {
    setPlayback({ position: index * 8000, playing: false });
  }
  function togglePlay() {
    setPlayback(current => ({
      position: current.position >= duration ? 0 : current.position,
      playing: !current.playing,
    }));
  }

  return (
    <figure className="assistant-film" aria-label={copy.title}>
      <div className="film-topbar">
        <span><BrandIcon size={20} /> JARVIS</span>
        <span>{copy.label}</span>
      </div>
      <div className="film-stage">
        <div className="film-project"><span><span className="project-dot" />{copy.workspace}</span><span>{copy.assistant}</span></div>
        <div className="film-scene" key={sceneIndex}>
          {scene.kind === "context" && <div className="film-context">
            <p className="film-question">{scene.prompt}</p>
            {copy.emails.map(email => <article className="film-email" key={email.person}>
              <span className="film-avatar">{email.initial}</span>
              <div><div className="film-email-from"><strong>{email.person}</strong><span>{email.inbox}</span></div><h3>{email.subject}</h3><p>{email.text}</p></div>
              <Check size={16} aria-hidden="true" />
            </article>)}
          </div>}
          {scene.kind === "prompt" && <div className="film-prompt-scene">
            <div className="film-context-count"><Mail size={17} />{copy.emails.map(email => email.subject).join(" / ")}</div>
            <div className="film-instruction"><span>{copy.instructionLabel}</span><p>{scene.prompt}</p></div>
            <div className="film-memory"><Check size={16} /><div><strong>{copy.memoryLabel}</strong><p>{copy.memory}</p></div></div>
          </div>}
          {scene.kind === "answer" && <div className="film-answer-scene">
            <div className="film-user-prompt">{scene.prompt}</div>
            <div className="film-answer"><BrandIcon size={25} /><div><h3>{copy.answerTitle}</h3><ol>{copy.actions.map((action, i) => <li key={action}><p>{action}</p><span>{copy.source} {i + 1} · {copy.emails[i]!.subject}</span></li>)}</ol></div></div>
          </div>}
          {scene.kind === "draft" && <div className="film-draft-scene">
            <div className="film-user-prompt">{scene.prompt}</div>
            <div className="film-draft"><div><FileText size={16} /><span>{copy.draft}</span></div><h3>{copy.draftSubject}</h3><p>{copy.draftBody}</p></div>
            <p className="film-draft-note"><Check size={14} />{copy.draftNote}</p>
          </div>}
        </div>
      </div>
      <div className="film-controls">
        <button type="button" onClick={togglePlay} className="film-play" aria-label={playing ? copy.pause : finished ? copy.replay : copy.play}>
          {playing ? <Pause size={16} /> : finished ? <RotateCcw size={16} /> : <Play size={16} />}<span>{playing ? copy.pause : finished ? copy.replay : copy.play}</span>
        </button>
        <div className="film-track" role="progressbar" aria-label={copy.status} aria-valuemin={0} aria-valuemax={32} aria-valuenow={Math.floor(sceneIndex * 8 + elapsed / 1000)}>
          {copy.scenes.map((item, i) => <span key={item.title}><i style={{ width: i < sceneIndex ? "100%" : i === sceneIndex ? `${elapsed / 80}%` : "0%" }} /></span>)}
        </div>
        <span className="film-time">{String(Math.floor(sceneIndex * 8 + elapsed / 1000)).padStart(2,"0")} / 32s</span>
        <button type="button" aria-label={copy.previous} disabled={sceneIndex === 0} onClick={() => selectScene(sceneIndex - 1)}><ChevronLeft size={19} /></button>
        <button type="button" aria-label={copy.next} disabled={sceneIndex === 3} onClick={() => selectScene(sceneIndex + 1)}><ChevronRight size={19} /></button>
      </div>
      <nav className="film-chapters" aria-label={copy.chapters}>
        {copy.scenes.map((item, i) => <button type="button" key={item.title} aria-current={i === sceneIndex ? "step" : undefined} onClick={() => selectScene(i)}><span>{i + 1}</span>{item.title}</button>)}
      </nav>
      <figcaption aria-live="polite" aria-atomic="true"><strong>{scene.title}.</strong> {scene.caption}</figcaption>
    </figure>
  );
}
