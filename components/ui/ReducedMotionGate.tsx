"use client";

import { useSyncExternalStore } from "react";

interface ReducedMotionGateProps {
  children: React.ReactNode;
  fallback: React.ReactNode;
}

const QUERY = "(prefers-reduced-motion: reduce)";

function subscribe(onChange: () => void) {
  if (typeof window === "undefined") return () => {};
  const mq = window.matchMedia(QUERY);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}

function getSnapshot() {
  return window.matchMedia(QUERY).matches;
}

function getServerSnapshot() {
  return false;
}

export function ReducedMotionGate({ children, fallback }: ReducedMotionGateProps) {
  const reduced = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  return <>{reduced ? fallback : children}</>;
}
