import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * Endless horizontal loop of cards.
 * - Auto-drifts continuously, seamlessly wrapping.
 * - Pauses on hover and while dragging.
 * - Drag / swipe in either direction, with a velocity handoff on release.
 * - Under prefers-reduced-motion it degrades to a plain snap-scroll strip.
 */
export function ServiceMarquee({
  items,
  speed = 40,
}: {
  /** Rendered card nodes, keyed by the caller. */
  items: ReactNode[];
  /** Auto-drift speed in px per second. */
  speed?: number;
}) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [reduced, setReduced] = useState(true);

  useEffect(() => {
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  useEffect(() => {
    if (reduced) return;
    const viewport = viewportRef.current;
    const track = trackRef.current;
    if (!viewport || !track) return;

    let cancelled = false;
    let cleanup: (() => void) | undefined;

    import("gsap").then(({ default: gsap }) => {
      if (cancelled) return;

      // The track renders 3 copies; wrap over one copy's width.
      let loopWidth = track.scrollWidth / 3;
      let x = 0;
      let direction = -1; // -1 = drifting left
      let dragging = false;
      let paused = false;
      let pointerId: number | null = null;
      let startX = 0;
      let lastX = 0;
      let lastTime = 0;
      let velocity = 0; // px / sec while dragging
      let inertia = 0;

      const apply = () => {
        if (loopWidth > 0) {
          x = ((x % loopWidth) + loopWidth) % loopWidth;
        }
        gsap.set(track, { x: -x });
      };

      const tick = () => {
        const dt = gsap.ticker.deltaRatio(60) / 60; // seconds since last frame
        if (!dragging) {
          if (Math.abs(inertia) > 1) {
            x -= inertia * dt;
            inertia *= 0.94;
            if (Math.abs(inertia) <= 1) inertia = 0;
          } else if (!paused) {
            x -= direction * speed * dt;
          }
          apply();
        }
      };

      const measure = () => {
        loopWidth = track.scrollWidth / 3;
        apply();
      };

      const onEnter = () => {
        paused = true;
      };
      const onLeave = () => {
        paused = false;
      };

      const onPointerDown = (e: PointerEvent) => {
        if (e.button !== undefined && e.button !== 0) return;
        dragging = true;
        pointerId = e.pointerId;
        startX = lastX = e.clientX;
        lastTime = performance.now();
        velocity = 0;
        inertia = 0;
        viewport.setPointerCapture(e.pointerId);
        viewport.style.cursor = "grabbing";
      };

      const onPointerMove = (e: PointerEvent) => {
        if (!dragging || e.pointerId !== pointerId) return;
        const now = performance.now();
        const dx = e.clientX - lastX;
        const dt = Math.max(now - lastTime, 1) / 1000;
        velocity = dx / dt;
        lastX = e.clientX;
        lastTime = now;
        x -= dx;
        apply();
      };

      const endDrag = (e: PointerEvent) => {
        if (!dragging || e.pointerId !== pointerId) return;
        dragging = false;
        pointerId = null;
        viewport.style.cursor = "";
        inertia = velocity;
        // Resume drifting in the direction of the flick.
        if (Math.abs(velocity) > 40) direction = velocity > 0 ? -1 : 1;
        // Suppress the click that follows a real drag.
        if (Math.abs(e.clientX - startX) > 8) {
          const swallow = (ev: Event) => {
            ev.preventDefault();
            ev.stopPropagation();
          };
          viewport.addEventListener("click", swallow, { capture: true, once: true });
          window.setTimeout(
            () => viewport.removeEventListener("click", swallow, true),
            50,
          );
        }
      };

      const onDragStart = (e: Event) => e.preventDefault();

      measure();
      gsap.ticker.add(tick);
      const ro = new ResizeObserver(measure);
      ro.observe(track);
      viewport.addEventListener("pointerenter", onEnter);
      viewport.addEventListener("pointerleave", onLeave);
      viewport.addEventListener("pointerdown", onPointerDown);
      viewport.addEventListener("pointermove", onPointerMove);
      viewport.addEventListener("pointerup", endDrag);
      viewport.addEventListener("pointercancel", endDrag);
      viewport.addEventListener("dragstart", onDragStart);

      cleanup = () => {
        gsap.ticker.remove(tick);
        ro.disconnect();
        viewport.removeEventListener("pointerenter", onEnter);
        viewport.removeEventListener("pointerleave", onLeave);
        viewport.removeEventListener("pointerdown", onPointerDown);
        viewport.removeEventListener("pointermove", onPointerMove);
        viewport.removeEventListener("pointerup", endDrag);
        viewport.removeEventListener("pointercancel", endDrag);
        viewport.removeEventListener("dragstart", onDragStart);
        gsap.set(track, { x: 0 });
      };
    });

    return () => {
      cancelled = true;
      cleanup?.();
    };
  }, [reduced, speed]);

  if (reduced) {
    return (
      <div className="mt-10 -mx-4 overflow-x-auto px-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <div className="flex snap-x snap-mandatory gap-4 pb-2">
          {items.map((node, i) => (
            <div key={i} className="w-[280px] shrink-0 snap-start sm:w-[320px]">
              {node}
            </div>
          ))}
        </div>
      </div>
    );
  }

  const doubled = [...items, ...items, ...items];

  return (
    <div
      ref={viewportRef}
      className="mt-10 -mx-4 cursor-grab touch-pan-y overflow-hidden px-4 select-none [mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)]"
    >
      <div ref={trackRef} className="flex w-max gap-4 will-change-transform">
        {doubled.map((node, i) => (
          <div key={i} className="w-[280px] shrink-0 sm:w-[320px]" aria-hidden={i >= items.length}>
            {node}
          </div>
        ))}
      </div>
    </div>
  );
}
