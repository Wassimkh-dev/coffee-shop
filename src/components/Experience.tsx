import type { SVGProps } from "react";
import Reveal from "@/components/Reveal";
import TiltCard from "@/components/TiltCard";

function IconCoffee(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" strokeWidth={1.4} {...props}>
      <path
        d="M4 8h13v5a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5V8Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M17 9.5h1.5a2.25 2.25 0 0 1 0 4.5H17"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7.5 3.5c-.5.8-.5 1.4 0 2.2M11 3.5c-.5.8-.5 1.4 0 2.2"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconFood(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" strokeWidth={1.4} {...props}>
      <circle cx="12" cy="12" r="8.5" stroke="currentColor" />
      <circle cx="12" cy="12" r="4" stroke="currentColor" />
    </svg>
  );
}

function IconShisha(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" strokeWidth={1.4} {...props}>
      <path
        d="M8 21h5M10.5 21v-4"
        stroke="currentColor"
        strokeLinecap="round"
      />
      <path
        d="M6 17h9a2 2 0 0 0 2-2v-1H6v3Z"
        stroke="currentColor"
        strokeLinejoin="round"
      />
      <ellipse cx="10.5" cy="9" rx="4.5" ry="3.5" stroke="currentColor" />
      <path
        d="M10.5 5.5V4M8 4.2c0-1 .8-1.2 1-2M13 4.2c0-1-.8-1.2-1-2"
        stroke="currentColor"
        strokeLinecap="round"
      />
    </svg>
  );
}

function IconLeaf(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" strokeWidth={1.4} {...props}>
      <path
        d="M5 19c8 1 13-4 14-14-9 1-14 5-14 14Z"
        stroke="currentColor"
        strokeLinejoin="round"
      />
      <path d="M6 18c3-4 6-7 12-11" stroke="currentColor" strokeLinecap="round" />
    </svg>
  );
}

function IconRings(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" strokeWidth={1.4} {...props}>
      <circle cx="9" cy="14" r="4.2" stroke="currentColor" />
      <circle cx="15" cy="14" r="4.2" stroke="currentColor" />
      <path d="M11 6.5 12 4l1 2.5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconChat(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" strokeWidth={1.4} {...props}>
      <path
        d="M4 12.5C4 8 7.8 5 12 5s8 3 8 7.5-3.8 7.5-8 7.5a9 9 0 0 1-2.7-.4L5 21l1.1-3.3A6.9 6.9 0 0 1 4 12.5Z"
        stroke="currentColor"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const experiences = [
  {
    icon: IconCoffee,
    title: "Specialty Coffee",
    description:
      "Espresso, latte, and cold brew crafted with care — the everyday ritual done properly.",
  },
  {
    icon: IconFood,
    title: "Fresh Food",
    description:
      "A full kitchen menu made to order, from light bites to hearty plates for any time of day.",
  },
  {
    icon: IconShisha,
    title: "Shisha",
    description:
      "Classic and signature blends, served slow in the open air the way it's meant to be enjoyed.",
  },
  {
    icon: IconLeaf,
    title: "Outdoor Atmosphere",
    description:
      "Garden pathways, natural greenery, and open-air seating designed for calm, unhurried time.",
  },
  {
    icon: IconRings,
    title: "Events & Proposals",
    description:
      "From quiet proposals to celebrations, our setting is built for the moments worth remembering.",
  },
  {
    icon: IconChat,
    title: "Relaxed Social Vibe",
    description:
      "A welcoming space for long conversations, catch-ups, and slow evenings with people you love.",
  },
];

export default function Experience() {
  return (
    <section
      id="experience"
      className="relative bg-ivory py-24 sm:py-32"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="mb-5 inline-block rounded-full bg-sage/15 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-sage-dark">
            The Experience
          </span>
          <h2 className="text-balance font-serif text-4xl leading-tight text-charcoal sm:text-5xl">
            Everything that makes The Lawn what it is
          </h2>
          <p className="mt-4 text-balance text-base leading-relaxed text-charcoal-soft sm:text-lg">
            Six reasons our guests linger a little longer.
          </p>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {experiences.map(({ icon: Icon, title, description }, i) => (
            <Reveal key={title} delay={i * 0.08} amount={0.3}>
              <TiltCard className="group h-full rounded-[1.75rem] bg-gradient-to-b from-cream to-cream-dark/60 p-8 ring-1 ring-beige/70 transition-shadow duration-300 hover:shadow-xl [transform-style:preserve-3d]">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-olive text-ivory transition-transform duration-300 group-hover:scale-105">
                  <Icon className="h-7 w-7" />
                </div>
                <h3 className="mt-6 font-serif text-2xl text-charcoal">
                  {title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-charcoal-soft">
                  {description}
                </p>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
