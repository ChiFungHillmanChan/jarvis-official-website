"use client";

import { useEffect, useState } from "react";

interface ReducedMotionGateProps {
  children: React.ReactNode;
  fallback: React.ReactNode;
}

export function ReducedMotionGate({ children, fallback }: ReducedMotionGateProps) {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return <>{reduced ? fallback : children}</>;
}
