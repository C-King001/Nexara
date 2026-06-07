import React, { useEffect, useRef, useState } from "react";

interface MotionProps extends React.HTMLAttributes<HTMLElement> {
  initial?: Record<string, unknown> | string;
  animate?: Record<string, unknown> | string;
  exit?: Record<string, unknown> | string;
  whileInView?: Record<string, unknown> | string;
  viewport?: { once?: boolean; margin?: string };
  variants?: Record<string, unknown>;
  custom?: number;
  transition?: Record<string, unknown>;
  [key: string]: unknown;
}

function makeMotionEl(Tag: keyof React.JSX.IntrinsicElements) {
  return function MotionEl({
    initial,
    animate,
    whileInView,
    exit,
    variants,
    custom,
    transition,
    viewport,
    children,
    style,
    ...rest
  }: MotionProps) {
    const ref = useRef<HTMLElement>(null);
    const [visible, setVisible] = useState(!whileInView);

    useEffect(() => {
      if (!whileInView) return;
      const el = ref.current;
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
        { threshold: 0.08, rootMargin: viewport?.margin ?? "-40px" }
      );
      obs.observe(el);
      return () => obs.disconnect();
    }, []);

    const hidden = initial === "hidden" || (initial as Record<string, unknown>)?.opacity === 0;
    const delayS = typeof custom === "number" ? custom : 0;

    const animStyle: React.CSSProperties =
      hidden
        ? visible
          ? {
              animation: `fade-up 0.55s cubic-bezier(0.4,0,0.2,1) ${delayS}s both`,
            }
          : { opacity: 0 }
        : {};

    return React.createElement(
      Tag,
      { ref, style: { ...animStyle, ...style }, ...rest } as React.HTMLAttributes<HTMLElement>,
      children
    );
  };
}

type TagNames =
  | "div" | "section" | "h1" | "h2" | "h3" | "h4"
  | "p" | "span" | "a" | "ul" | "li" | "aside" | "nav";

export const motion = Object.fromEntries(
  (["div","section","h1","h2","h3","h4","p","span","a","ul","li","aside","nav"] as TagNames[]).map(
    (t) => [t, makeMotionEl(t)]
  )
) as Record<TagNames, ReturnType<typeof makeMotionEl>>;

export function AnimatePresence({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
