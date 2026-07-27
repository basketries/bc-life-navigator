import { useRef, type ReactNode } from "react";
import { useScrollRevealGroup, type RevealDirection } from "@/hooks/useScrollReveal";

/**
 * Wraps page content and applies the shared scroll-reveal entrance
 * (slide + scale + fade, alternating direction, reverses on scroll up).
 * Respects prefers-reduced-motion.
 */
export function RevealGroup({
  children,
  startDirection = "left",
  className,
}: {
  children: ReactNode;
  startDirection?: RevealDirection;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useScrollRevealGroup(ref, startDirection);
  return (
    <div ref={ref} className={className ?? "overflow-x-hidden"}>
      {children}
    </div>
  );
}
