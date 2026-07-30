"use client";

import { useEffect, useRef, type MouseEvent } from "react";
import Image, { type StaticImageData } from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotionSafe } from "@/lib/use-reduced-motion";
import { siteConfig } from "@/lib/site-config";
import startup01 from "../../public/images/startup-01.jpeg";
import startup02 from "../../public/images/startup-02.jpeg";
import startup03 from "../../public/images/startup-03.jpeg";
import startup04 from "../../public/images/startup-04.jpeg";
import startup07 from "../../public/images/startup-07.jpeg";
import startup06 from "../../public/images/startup-06.jpeg";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type Frame =
  | {
      type: "image";
      src: StaticImageData;
      alt: string;
      objectPosition: string;
      scaleFrom: number;
      scaleTo: number;
      caption?: string;
    }
  | {
      type: "video";
      src: string;
      scaleFrom: number;
      scaleTo: number;
      caption?: string;
    };

/**
 * The scroll story, in order. Day drifts into night: arrival, the room,
 * the garden in daylight, dusk, the transition video bridge, night lights,
 * and finally the neon sign.
 */
const sequence: Frame[] = [
  {
    type: "image",
    src: startup01,
    alt: "The floral archway at the entrance of The Lawn Cafe",
    objectPosition: "50% 58%",
    scaleFrom: 1,
    scaleTo: 1.08,
  },
  {
    type: "image",
    src: startup02,
    alt: "Open-air seating under circular hanging lights at The Lawn Cafe",
    // Kept intentionally wide: minimal zoom + a slightly raised crop so the
    // ceiling lights, tables, and chairs all stay in frame.
    objectPosition: "50% 38%",
    scaleFrom: 1,
    scaleTo: 1.035,
  },
  {
    type: "image",
    src: startup03,
    alt: "A bright garden pathway between the trees in daylight",
    objectPosition: "50% 65%",
    scaleFrom: 1.02,
    scaleTo: 1.09,
    caption: "From morning coffee",
  },
  {
    type: "image",
    src: startup04,
    alt: "The garden pathway settling into evening light",
    objectPosition: "50% 50%",
    scaleFrom: 1.02,
    scaleTo: 1.09,
    caption: "to golden evenings",
  },
  {
    type: "video",
    src: "/videos/startup-transition.mp4",
    scaleFrom: 1.03,
    scaleTo: 1.07,
  },
  {
    type: "image",
    src: startup07,
    alt: "The garden at night, tables glowing under the lit trees",
    objectPosition: "50% 62%",
    scaleFrom: 1.02,
    scaleTo: 1.09,
    caption: "Moments made memorable",
  },
  {
    type: "image",
    src: startup06,
    alt: "The Lawn neon sign glowing after dark",
    objectPosition: "50% 42%",
    scaleFrom: 1,
    scaleTo: 1.06,
  },
];

const VIDEO_INDEX = sequence.findIndex((f) => f.type === "video");

/**
 * Run `cb` once the page has settled enough for layout measurements to be
 * trustworthy. If `load` has already fired the layout is settled (images
 * reserve their space and next/font uses zero-shift fallback metrics), so we
 * run immediately — the tap must feel instant. Only an early tap, before
 * `load`, waits; a hard timeout is the safety net so a slow in-app browser
 * can never leave that tap unanswered.
 */
function whenReady(cb: () => void) {
  if (document.readyState === "complete") {
    cb();
    return;
  }

  let done = false;
  const run = () => {
    if (done) return;
    done = true;
    cb();
  };

  window.addEventListener("load", run, { once: true });
  // Never wait more than ~1.2s, even if load stalls on a weak connection.
  window.setTimeout(run, 1200);
}

// Handle for the in-flight scroll tween, so a second click — or a genuine
// user scroll — can cancel it cleanly instead of two animations fighting.
let cancelActiveScroll: (() => void) | null = null;

/**
 * A controlled requestAnimationFrame scroll tween. We drive it ourselves
 * rather than using native `scroll-behavior: smooth` because animating across
 * the ~520vh pinned hero inside Instagram's in-app webview stutters and gets
 * cut short by the URL-bar resize; a hand-rolled tween lands on the exact
 * target every time and stops the moment the visitor takes over.
 */
function smoothScrollTo(targetY: number) {
  cancelActiveScroll?.();

  const maxY = Math.max(
    0,
    document.documentElement.scrollHeight - window.innerHeight
  );
  const destY = Math.max(0, Math.min(targetY, maxY));
  const startY = window.scrollY;
  const distance = destY - startY;

  if (Math.abs(distance) < 2) {
    window.scrollTo({ top: destY, left: 0, behavior: "instant" });
    return;
  }

  // Distance-aware but bounded, so both short and full-page hops feel snappy.
  const duration = Math.min(800, Math.max(450, Math.abs(distance) * 0.35));
  const startTime = performance.now();
  const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
  const scrollEvents = ["wheel", "touchmove"] as const;

  let cancelled = false;
  const cleanup = () => {
    scrollEvents.forEach((e) => window.removeEventListener(e, cancel));
    if (cancelActiveScroll === cancel) cancelActiveScroll = null;
  };
  function cancel() {
    if (cancelled) return;
    cancelled = true;
    cleanup();
  }

  // touchmove (not touchstart) so the tap that launched this doesn't cancel it.
  scrollEvents.forEach((e) =>
    window.addEventListener(e, cancel, { passive: true })
  );
  cancelActiveScroll = cancel;

  const frame = (now: number) => {
    if (cancelled) return;
    const t = Math.min(1, (now - startTime) / duration);
    // behavior:"instant" overrides the page's scroll-behavior:smooth (kept on
    // <html> by both the Next.js router and GSAP) for this call — without it
    // each per-frame scrollTo starts its own native smooth scroll, so they
    // thrash and the page lags ~800ms behind our easing.
    window.scrollTo({
      top: Math.round(startY + distance * easeOutCubic(t)),
      left: 0,
      behavior: "instant",
    });
    if (t < 1) {
      requestAnimationFrame(frame);
    } else {
      cleanup();
    }
  };
  requestAnimationFrame(frame);
}

/**
 * Controlled "Explore Menu" scroll. Takes over from the raw `#menu` hash jump
 * (kept on the anchor only as a no-JS fallback) so the browser can't animate
 * through the pinned hero, land under the navbar, or re-apply the hash later.
 */
function handleExploreMenu(e: MouseEvent<HTMLAnchorElement>) {
  e.preventDefault();
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  whenReady(() => {
    // Re-measure the pinned hero so the offsets below it are correct before we
    // compute where the Menu section actually starts.
    if (!reduce) ScrollTrigger.refresh();

    const menu = document.getElementById("menu");
    if (!menu) return;

    // Clear the fixed navbar: measure its rendered bottom (works across
    // breakpoints); fall back to the site's scroll-mt-24 (96px) convention.
    const header = document.querySelector("header");
    const navbarOffset = header
      ? header.getBoundingClientRect().bottom + 12
      : 96;

    const targetY = Math.max(
      0,
      menu.getBoundingClientRect().top + window.scrollY - navbarOffset
    );

    if (reduce) {
      window.scrollTo({ top: targetY, left: 0, behavior: "instant" });
    } else {
      smoothScrollTo(targetY);
    }
  });
}

function CtaButtons() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      <a
        href="#menu"
        onClick={handleExploreMenu}
        className="rounded-full bg-ivory px-7 py-3.5 text-sm font-semibold text-charcoal transition-all duration-300 hover:-translate-y-0.5 hover:bg-cream hover:shadow-lg"
      >
        Explore Menu
      </a>
      <a
        href={siteConfig.whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="rounded-full bg-olive px-7 py-3.5 text-sm font-semibold text-ivory transition-all duration-300 hover:-translate-y-0.5 hover:bg-olive-dark hover:shadow-lg"
      >
        Reserve on WhatsApp
      </a>
      <a
        href={siteConfig.mapsUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="rounded-full border border-ivory/40 px-7 py-3.5 text-sm font-semibold text-ivory backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-ivory hover:bg-ivory/10"
      >
        Get Directions
      </a>
    </div>
  );
}

function HeroHeading() {
  return (
    <>
      <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-ivory/25 bg-ivory/10 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.25em] text-cream backdrop-blur-sm">
        <span className="text-gold-light">★ {siteConfig.rating}</span>
        <span className="h-1 w-1 rounded-full bg-cream/50" />
        {siteConfig.location}
      </span>

      <h1 className="text-balance font-serif text-4xl leading-[1.1] text-ivory drop-shadow-sm sm:text-6xl lg:text-7xl">
        A Calm Escape in the
        <br className="hidden sm:block" /> Heart of Bsatine
      </h1>

      <p className="mt-6 max-w-xl text-balance text-base leading-relaxed text-cream/90 sm:text-lg">
        Premium coffee, fresh food, shisha, and outdoor moments crafted for
        everyday comfort and special occasions.
      </p>

      <div className="mt-10">
        <CtaButtons />
      </div>
    </>
  );
}

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const frameRefs = useRef<(HTMLDivElement | null)[]>([]);
  const scaleRefs = useRef<(HTMLDivElement | null)[]>([]);
  const captionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const videoRef = useRef<HTMLVideoElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const finaleRef = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotionSafe();

  // Turn on smooth anchor scrolling only once the app is interactive, so the
  // browser's initial jump to a #hash lands instantly instead of animating
  // through the tall hero (see globals.css).
  useEffect(() => {
    document.documentElement.classList.add("js-smooth");
    // Own the scroll position ourselves: stop the browser (and Instagram's
    // in-app webview) from restoring a saved position or re-applying a #hash
    // after our controlled scroll has already landed.
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
  }, []);

  useEffect(() => {
    if (reduceMotion) return;

    const section = sectionRef.current;
    if (!section) return;
    const count = sequence.length;

    // Mobile URL bars show/hide constantly while scrolling; refreshing on
    // those height-only resizes makes the pinned hero jump mid-scrub.
    ScrollTrigger.config({ ignoreMobileResize: true });

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.6,
          onUpdate: (self) => {
            // Play the transition video only while its frame is on screen.
            const video = videoRef.current;
            if (!video || VIDEO_INDEX < 0) return;
            const active =
              self.progress > (VIDEO_INDEX - 0.45) / count &&
              self.progress < (VIDEO_INDEX + 1.2) / count;
            if (active && video.paused) {
              video.play().catch(() => {});
            } else if (!active && !video.paused) {
              video.pause();
            }
          },
        },
      });

      // 1 timeline unit per frame. Later frames stack above earlier ones,
      // so each transition is a single fade-in of the incoming frame.
      sequence.forEach((frame, i) => {
        if (i > 0) {
          tl.to(
            frameRefs.current[i],
            { autoAlpha: 1, duration: 0.55 },
            i - 0.35
          );
        }
        const start = Math.max(0, i - 0.35);
        tl.fromTo(
          scaleRefs.current[i],
          { scale: frame.scaleFrom },
          {
            scale: frame.scaleTo,
            duration: Math.min(count, i + 1.2) - start,
          },
          start
        );
        if (frame.caption) {
          tl.fromTo(
            captionRefs.current[i],
            { autoAlpha: 0, y: 26 },
            { autoAlpha: 1, y: 0, duration: 0.4 },
            i + 0.08
          ).to(
            captionRefs.current[i],
            { autoAlpha: 0, y: -18, duration: 0.35 },
            i + 0.62
          );
        }
      });

      tl.to(indicatorRef.current, { autoAlpha: 0, duration: 0.25 }, 0.1);
      tl.to(headingRef.current, { autoAlpha: 0, y: -48, duration: 0.5 }, 0.3);
      tl.fromTo(
        finaleRef.current,
        { autoAlpha: 0, y: 28 },
        { autoAlpha: 1, y: 0, duration: 0.55 },
        count - 0.85
      );
    }, section);

    // Trigger positions are measured before images/fonts settle; re-measure
    // once everything has loaded so start/end points are correct on phones.
    const refresh = () => ScrollTrigger.refresh();
    if (document.readyState === "complete") {
      refresh();
    } else {
      window.addEventListener("load", refresh, { once: true });
    }
    document.fonts?.ready.then(refresh).catch(() => {});

    return () => {
      window.removeEventListener("load", refresh);
      ctx.revert();
    };
  }, [reduceMotion]);

  if (reduceMotion) {
    return (
      <section id="home" className="relative scroll-mt-24">
        <div className="relative h-svh w-full overflow-hidden bg-charcoal">
          <Image
            src={startup01}
            alt={sequence[0].type === "image" ? sequence[0].alt : ""}
            fill
            sizes="100vw"
            priority
            className="object-cover"
            style={{ objectPosition: "50% 58%" }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-charcoal/55 via-charcoal/20 to-charcoal/70" />
          <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center">
            <div className="relative mx-auto flex max-w-3xl flex-col items-center">
              <div className="pointer-events-none absolute -inset-x-16 -inset-y-10 -z-10 rounded-[4rem] bg-charcoal/35 blur-3xl" />
              <HeroHeading />
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative h-[520vh] scroll-mt-24"
    >
      <div className="sticky top-0 h-svh w-full overflow-hidden bg-charcoal">
        {sequence.map((frame, i) => (
          <div
            key={i}
            ref={(el) => {
              frameRefs.current[i] = el;
            }}
            className={`absolute inset-0 ${i === 0 ? "" : "opacity-0"}`}
            aria-hidden={i !== 0}
            style={i === 0 ? undefined : { visibility: "hidden" }}
          >
            <div
              ref={(el) => {
                scaleRefs.current[i] = el;
              }}
              className="absolute inset-0"
            >
              {frame.type === "image" ? (
                <Image
                  src={frame.src}
                  alt={frame.alt}
                  fill
                  sizes="100vw"
                  priority={i === 0}
                  className="object-cover"
                  style={{ objectPosition: frame.objectPosition }}
                />
              ) : (
                <>
                  <video
                    ref={videoRef}
                    className="h-full w-full object-cover"
                    src={frame.src}
                    muted
                    loop
                    playsInline
                    preload="metadata"
                  />
                  {/* Soft veil keeps the bridge clip moody rather than raw */}
                  <div className="absolute inset-0 bg-charcoal/25" />
                </>
              )}
            </div>
          </div>
        ))}

        {/* Luxury overlay for readability — soft dark at top for nav contrast */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-charcoal/55 via-charcoal/20 to-charcoal/70" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-olive-dark/50 via-transparent to-transparent" />

        <div className="relative z-10 h-full">
          <div className="flex h-full flex-col items-center justify-center px-4 text-center">
            <div
              ref={headingRef}
              className="relative mx-auto flex max-w-3xl flex-col items-center"
            >
              <div className="pointer-events-none absolute -inset-x-16 -inset-y-10 -z-10 rounded-[4rem] bg-charcoal/35 blur-3xl" />
              <HeroHeading />
            </div>
          </div>

          {/* Minimal per-frame captions */}
          {sequence.map((frame, i) =>
            frame.caption ? (
              <div
                key={`caption-${i}`}
                ref={(el) => {
                  captionRefs.current[i] = el;
                }}
                className="pointer-events-none absolute inset-x-0 bottom-[22vh] flex justify-center px-6 opacity-0"
                style={{ visibility: "hidden" }}
              >
                <p className="font-serif text-2xl text-ivory/95 drop-shadow-sm sm:text-3xl">
                  {frame.caption}
                </p>
              </div>
            ) : null
          )}

          {/* Finale — the neon sign frame, with the actions back in reach */}
          <div
            ref={finaleRef}
            className="absolute inset-x-0 bottom-[14vh] flex flex-col items-center gap-7 px-6 text-center opacity-0"
            style={{ visibility: "hidden" }}
          >
            <p className="font-serif text-2xl text-ivory/95 drop-shadow-sm sm:text-3xl">
              Golden evenings at The Lawn
            </p>
            <CtaButtons />
          </div>

          <div
            ref={indicatorRef}
            className="absolute inset-x-0 bottom-8 flex flex-col items-center gap-2"
          >
            <span className="text-[11px] uppercase tracking-[0.3em] text-cream/70">
              Scroll
            </span>
            <svg
              className="h-5 w-5 animate-bounce text-cream/70"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
