"use client";

import { useEffect, useRef } from "react";

export function HeroVideo() {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) void el.play().catch(() => {});
          else el.pause();
        }
      },
      { threshold: 0.1 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <video
      ref={ref}
      className="absolute inset-0 -z-10 h-full w-full object-cover opacity-30 mix-blend-screen"
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      poster="/jarvis-demo-poster.jpg"
      aria-hidden="true"
    >
      <source src="/jarvis-demo-loop.webm" type="video/webm" />
      <source src="/jarvis-demo-loop.mp4" type="video/mp4" />
    </video>
  );
}
