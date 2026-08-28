"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function useGsapReveal(
  animation: "up" | "left" | "right" | "scale" | "fade" = "up",
  options?: {
    duration?: number;
    delay?: number;
    stagger?: number;
    y?: number;
    x?: number;
    start?: string;
  }
) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const el = ref.current;
    const children = el.children;
    const duration = options?.duration ?? 1;
    const delay = options?.delay ?? 0;
    const stagger = options?.stagger ?? 0.15;
    const start = options?.start ?? "top 85%";

    const fromVars: gsap.TweenVars = { opacity: 0 };
    const toVars: gsap.TweenVars = {
      opacity: 1,
      duration,
      delay,
      stagger,
      ease: "power3.out",
      scrollTrigger: {
        trigger: el,
        start,
        toggleActions: "play none none none",
      },
    };

    switch (animation) {
      case "up":
        fromVars.y = options?.y ?? 50;
        toVars.y = 0;
        break;
      case "left":
        fromVars.x = options?.x ?? -60;
        toVars.x = 0;
        break;
      case "right":
        fromVars.x = options?.x ?? 60;
        toVars.x = 0;
        break;
      case "scale":
        fromVars.scale = 0.85;
        toVars.scale = 1;
        break;
      case "fade":
        break;
    }

    const targets = children.length > 1 ? children : el;
    gsap.fromTo(targets, fromVars, toVars);

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [animation, options]);

  return ref;
}

export function useGsapParallax(speed: number = 0.5) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const el = ref.current;
    gsap.to(el, {
      yPercent: speed * 30,
      ease: "none",
      scrollTrigger: {
        trigger: el,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [speed]);

  return ref;
}

export function useGsapCounter(
  endValue: number,
  duration: number = 2
) {
  const ref = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!ref.current || hasAnimated.current) return;
    if (endValue === 0) return;

    const el = ref.current;

    ScrollTrigger.create({
      trigger: el,
      start: "top 90%",
      onEnter: () => {
        if (hasAnimated.current) return;
        hasAnimated.current = true;

        const isDecimal = endValue % 1 !== 0;
        const obj = { value: 0 };

        gsap.to(obj, {
          value: endValue,
          duration,
          ease: "power2.out",
          onUpdate: () => {
            if (el) {
              el.textContent = isDecimal
                ? obj.value.toFixed(1)
                : Math.round(obj.value).toString();
            }
          },
        });
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [endValue, duration]);

  return ref;
}

export { gsap, ScrollTrigger };
