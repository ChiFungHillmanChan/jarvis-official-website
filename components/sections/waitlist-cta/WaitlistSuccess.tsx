"use client";

import { useEffect, useRef } from "react";

export function WaitlistSuccess({ message }: { message: string }) {
  const messageRef = useRef<HTMLParagraphElement>(null);
  useEffect(() => {
    messageRef.current?.focus();
  }, []);

  return (
    <p
      ref={messageRef}
      role="status"
      tabIndex={-1}
      className="text-sm leading-7 text-[color:var(--accent-cyan)]"
    >
      {message}
    </p>
  );
}
