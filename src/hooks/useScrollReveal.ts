import { useEffect, type RefObject } from "react";

export type RevealDirection = "left" | "right";

export type ScrollRevealOptions = {
  /** Slide direction for the entrance animation. */
  direction?: RevealDirection;
  /**
   * Animate image and text blocks as two offset layers for a depth effect.
   * Used on sections that pair an image with text side-by-side.
   */
  layered?: boolean;
  /**
   * Section contains forms / buttons / clickable grids. The wrapper still
   * animates, but pointer events are disabled until the animation settles so
   * nothing is clickable mid-animation.
   */
  interactive?: boolean;
};

type Ctx = { revert: () => void };

function prefersReducedMotion() {
  return (
    typeof window === "undefined" ||
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

function resolveLayers(section: HTMLElement): HTMLElement[] {
  const tagged = Array.from(
    section.querySelectorAll<HTMLElement>("[data-parallax]"),
  );
  if (tagged.length) return tagged;

  // Auto-detect an image/text pair inside a two-column grid.
  const grids = Array.from(section.querySelectorAll<HTMLElement>("[class*='grid']"));
  for (const grid of grids) {
    const children = Array.from(grid.children) as HTMLElement[];
    if (children.length !== 2) continue;
    const withImage = children.filter((c) => c.querySelector("img"));
    if (withImage.length !== 1) continue;
    children.forEach((c) => {
      c.dataset.parallax = withImage.includes(c) ? "image" : "text";
    });
    return children;
  }
  return [];
}

async function animateSection(
  section: HTMLElement,
  { direction = "left", layered = false, interactive = false }: ScrollRevealOptions,
): Promise<Ctx | undefined> {
  const [{ default: gsap }, { ScrollTrigger }] = await Promise.all([
    import("gsap"),
    import("gsap/ScrollTrigger"),
  ]);
  gsap.registerPlugin(ScrollTrigger);

  const dir = direction === "right" ? 1 : -1;
  const trigger = {
    trigger: section,
    start: "top 85%",
    toggleActions: "play reverse play reverse",
  } as const;

  const ctx = gsap.context(() => {
    const layers = layered ? resolveLayers(section) : [];

    if (layers.length) {
      const tl = gsap.timeline({ scrollTrigger: trigger });
      layers.forEach((layer) => {
        const isImage = layer.dataset.parallax === "image";
        tl.from(
          layer,
          {
            opacity: 0,
            x: (isImage ? 60 : 32) * dir,
            scale: 0.92,
            duration: 0.9,
            ease: "power2.out",
          },
          isImage ? 0 : 0.15,
        );
      });
    } else {
      const lock = () => {
        if (interactive) section.style.pointerEvents = "none";
      };
      const unlock = () => {
        if (interactive) section.style.pointerEvents = "";
      };
      lock();
      gsap.from(section, {
        opacity: 0,
        x: 48 * dir,
        scale: 0.92,
        duration: 0.9,
        ease: "power2.out",
        scrollTrigger: trigger,
        onStart: lock,
        onComplete: unlock,
        onReverseComplete: lock,
      });
    }

    // Staggered reveal for any explicit step lists inside the section.
    const steps = gsap.utils.toArray<HTMLElement>("[data-journey-step]", section);
    if (steps.length) {
      gsap.from(steps, {
        opacity: 0,
        y: 24,
        duration: 0.6,
        ease: "power2.out",
        stagger: 0.12,
        scrollTrigger: {
          trigger: steps[0],
          start: "top 85%",
          toggleActions: "play reverse play reverse",
        },
      });
    }
  }, section);

  ScrollTrigger.refresh();
  return ctx;
}

/** Reveal a single section referenced by `ref`. */
export function useScrollReveal(
  ref: RefObject<HTMLElement | null>,
  options: ScrollRevealOptions = {},
) {
  const { direction = "left", layered = false, interactive = false } = options;

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;

    let ctx: Ctx | undefined;
    let cancelled = false;

    animateSection(el, { direction, layered, interactive }).then((c) => {
      if (cancelled) c?.revert();
      else ctx = c;
    });

    return () => {
      cancelled = true;
      ctx?.revert();
    };
  }, [ref, direction, layered, interactive]);
}

/**
 * Reveal every section inside `rootRef`, alternating the slide direction
 * section by section. Sections may opt in explicitly with `data-reveal`
 * ("left" | "right"); otherwise direct children are used.
 */
export function useScrollRevealGroup(
  rootRef: RefObject<HTMLElement | null>,
  startDirection: RevealDirection = "left",
) {
  useEffect(() => {
    const root = rootRef.current;
    if (!root || prefersReducedMotion()) return;

    const explicit = Array.from(
      root.querySelectorAll<HTMLElement>("[data-reveal]"),
    );
    const targets = explicit.length
      ? explicit
      : (Array.from(root.children) as HTMLElement[]);

    const contexts: Ctx[] = [];
    let cancelled = false;

    targets.forEach((el, i) => {
      const attr = el.dataset.reveal as RevealDirection | undefined;
      const alt: RevealDirection =
        (i % 2 === 0) === (startDirection === "left") ? "left" : "right";
      const direction = attr ?? alt;
      const layered =
        el.hasAttribute("data-parallax-section") ||
        !!el.querySelector("[data-parallax]") ||
        (!el.hasAttribute("data-interactive") && !!el.querySelector("img"));
      const interactive =
        el.hasAttribute("data-interactive") ||
        !!el.querySelector("form, input, textarea, select");

      animateSection(el, { direction, layered, interactive }).then((c) => {
        if (!c) return;
        if (cancelled) c.revert();
        else contexts.push(c);
      });
    });

    return () => {
      cancelled = true;
      contexts.forEach((c) => c.revert());
    };
  }, [rootRef, startDirection]);
}
