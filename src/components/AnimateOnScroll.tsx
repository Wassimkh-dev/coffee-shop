"use client";

import { useEffect, useRef, useState } from "react";

type Direction = "up" | "left" | "right" | "fade";

type Props = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: Direction;
};

const variants: Record<Direction, { hidden: string; visible: string }> = {
  up: {
    hidden: "opacity-0 translate-y-10",
    visible: "opacity-100 translate-y-0",
  },
  left: {
    hidden: "opacity-0 -translate-x-10",
    visible: "opacity-100 translate-x-0",
  },
  right: {
    hidden: "opacity-0 translate-x-10",
    visible: "opacity-100 translate-x-0",
  },
  fade: {
    hidden: "opacity-0",
    visible: "opacity-100",
  },
};

export default function AnimateOnScroll({
  children,
  className = "",
  delay = 0,
  direction = "up",
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(true);
      return;
    }

    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const { hidden, visible: visibleClass } = variants[direction];

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${
        visible ? visibleClass : hidden
      } ${className}`}
      style={{ transitionDelay: visible ? `${delay}ms` : "0ms" }}
    >
      {children}
    </div>
  );
}
