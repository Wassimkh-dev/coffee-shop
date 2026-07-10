"use client";

import { useEffect, useRef, type ReactNode } from "react";

type Direction = "up" | "down" | "left" | "right" | "fade" | "scale";

// Horizontal slides must stay inside the section's edge padding (16px under
// sm, 24px under lg) or hidden elements poke past the right edge of the
// screen and widen the page on phones.
function hiddenTransform(direction: Direction, viewportWidth: number) {
  const slide = viewportWidth < 640 ? 16 : viewportWidth < 1024 ? 24 : 44;
  switch (direction) {
    case "up":
      return "translate3d(0, 44px, 0)";
    case "down":
      return "translate3d(0, -44px, 0)";
    case "left":
      return `translate3d(${slide}px, 0, 0)`;
    case "right":
      return `translate3d(${-slide}px, 0, 0)`;
    case "scale":
      return "scale(0.94)";
    case "fade":
      return "none";
  }
}

const EASE = "cubic-bezier(0.16, 1, 0.3, 1)";

type RevealProps = {
  children: ReactNode;
  direction?: Direction;
  delay?: number;
  duration?: number;
  className?: string;
  once?: boolean;
  amount?: number;
};

/**
 * Scroll reveal built to be safe on phones and slow connections: the server
 * HTML ships fully visible, elements are hidden only on the client once we
 * know they sit outside the viewport, and the reveal itself is a plain CSS
 * transition driven by an IntersectionObserver. If JS never loads or fails,
 * nothing is ever invisible. Styles are applied straight to the DOM node so
 * reveals don't cause React re-renders while scrolling.
 */
export default function Reveal({
  children,
  direction = "up",
  delay = 0,
  duration = 0.9,
  className,
  once = true,
  amount = 0.2,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // Anything already on screen stays visible — hiding it would flash
    // content the visitor may already be reading.
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) return;

    const transition = `opacity ${duration}s ${EASE} ${delay}s, transform ${duration}s ${EASE} ${delay}s`;
    const hide = () => {
      el.style.transition = "";
      el.style.opacity = "0";
      el.style.transform = hiddenTransform(direction, window.innerWidth);
    };
    const show = () => {
      el.style.transition = transition;
      el.style.opacity = "1";
      el.style.transform = "none";
    };

    // Tall blocks on small screens can never reach a high visible ratio, so
    // cap the threshold at half of what actually fits in the viewport.
    const ratioInView = window.innerHeight / Math.max(rect.height, 1);
    const threshold = Math.min(amount, ratioInView * 0.5);

    hide();
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          show();
          if (once) observer.disconnect();
        } else if (!once) {
          hide();
        }
      },
      { threshold }
    );
    observer.observe(el);

    return () => {
      observer.disconnect();
      el.style.transition = "";
      el.style.opacity = "";
      el.style.transform = "";
    };
  }, [amount, once, direction, delay, duration]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
