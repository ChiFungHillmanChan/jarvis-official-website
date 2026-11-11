"use client";

import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/Button";

/** Brings the JARVIS app forward. It carries no payment result: the app confirms the plan with the server. */
export const APP_RETURN_LINK = "jarvis://billing/return";

export function OpenAppOnReturn({
  label,
  open = (url: string) => window.location.assign(url),
}: {
  label: string;
  open?: (url: string) => void;
}) {
  const opened = useRef(false);
  useEffect(() => {
    if (opened.current) return;
    opened.current = true;
    open(APP_RETURN_LINK);
  }, [open]);
  return <Button href={APP_RETURN_LINK}>{label}</Button>;
}
