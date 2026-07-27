## Goal

Replace the static 5-card grid under "Guidance for every step of your life in BC." with an endless, seamlessly looping horizontal row of service cards that drifts on its own and can also be dragged or swiped in either direction. Applied everywhere `ServiceGrid` renders (homepage and `/services`).

## Behaviour

- Cards scroll continuously right-to-left in a seamless loop with no visible start or end.
- Auto-drift pauses on hover (desktop) and while dragging/touching.
- Drag or swipe moves the row; releasing resumes the drift in the direction the user flicked.
- Cards stay fully clickable — a drag past a small threshold suppresses the click so a swipe never navigates by accident.
- Soft fade masks on the left and right edges so cards fade out rather than being cut off.
- Under `prefers-reduced-motion`, no auto-drift: the row becomes a plain horizontal scroll strip with snap, still swipeable.

## Implementation

- Update `src/components/site/ServiceGrid.tsx`: keep the heading block and the `SERVICES` data unchanged; swap the grid `div` for a new looping track component.
- Add `src/components/site/ServiceMarquee.tsx` — renders the card list duplicated enough times to fill the viewport, and uses GSAP's `horizontalLoop`-style approach (already available since gsap is a dependency) with `Draggable` + `InertiaPlugin`-free inertia via a simple velocity handoff, so no new packages are needed.
- Card markup and styling are reused as-is, extracted into a small `ServiceCard` in the same file, with a fixed card width (approx. 300px, responsive) so the loop measures correctly.
- The section already sits inside a `data-interactive` reveal wrapper on the homepage, so the existing scroll-reveal entrance still runs and the pointer lock still applies until it settles; the marquee starts only after mount.
- Cleanup on unmount (kill tween, Draggable instance, resize listener); recalculate loop width on resize.

## Not changing

Content, copy, routes, form/CRM logic, or any other section's animations.
