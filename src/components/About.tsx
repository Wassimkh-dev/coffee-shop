import Image from "next/image";
import Reveal from "@/components/Reveal";
import { siteConfig } from "@/lib/site-config";
import gardenPath from "../../public/images/startup-10.jpeg";

const pillars = [
  "Specialty coffee, brewed slow",
  "Fresh food from a full kitchen",
  "Shisha in the open air",
  "A place made for gathering",
];

export default function About() {
  return (
    <section id="about" className="relative overflow-hidden bg-cream py-24 sm:py-32">
      <div className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-sage/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-16 bottom-0 h-80 w-80 rounded-full bg-gold/10 blur-3xl" />

      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-16 px-4 sm:px-6 lg:grid-cols-2 lg:gap-20 lg:px-8">
        <Reveal direction="left">
          <span className="mb-6 inline-block rounded-full bg-sage/15 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-sage-dark">
            Our Story
          </span>
          <h2 className="text-balance font-serif text-4xl leading-tight text-charcoal sm:text-5xl">
            A quiet retreat, grown into a gathering place
          </h2>
          <div className="mt-6 space-y-5 text-base leading-relaxed text-charcoal-soft sm:text-lg">
            <p>
              Tucked into the greenery of Bsatine, The Lawn Cafe was shaped
              around a simple idea: that the best moments happen slowly,
              outdoors, surrounded by people you enjoy. Stone pathways, soft
              lighting, and open-air seating set the pace long before the
              first cup arrives.
            </p>
            <p>
              Our kitchen and bar work in step with that calm — specialty
              coffee, fresh food made to order, and shisha served in the
              open air, all in a setting built for long conversations and
              slow mornings alike.
            </p>
            <p>
              We&apos;re open every day, from{" "}
              <span className="font-medium text-olive-dark">
                8:00 AM to 12:00 AM
              </span>
              , for the regulars who start their day with us and the guests
              who come to celebrate something special.
            </p>
          </div>

          <ul className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {pillars.map((pillar) => (
              <li
                key={pillar}
                className="flex items-center gap-3 rounded-2xl bg-ivory/70 px-4 py-3 text-sm font-medium text-charcoal ring-1 ring-beige/60"
              >
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                {pillar}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal direction="right" delay={0.1}>
          <div className="relative mx-auto max-w-md lg:max-w-none">
            <div className="premium-shadow relative aspect-[4/5] overflow-hidden rounded-[2rem]">
              <Image
                src={gardenPath}
                alt="The stone pathway through The Lawn Cafe's garden"
                fill
                sizes="(min-width: 1024px) 480px, 90vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/30 via-transparent to-transparent" />
            </div>

            <div className="glass-panel premium-shadow absolute -bottom-6 -left-4 flex items-center gap-3 rounded-2xl bg-ivory/90 px-5 py-4 sm:-left-8">
              <span className="font-serif text-3xl text-olive-dark">
                {siteConfig.rating}
              </span>
              <span className="flex flex-col leading-tight">
                <span className="flex gap-0.5 text-gold">
                  {"★★★★★"}
                </span>
                <span className="text-xs text-charcoal-soft">
                  Guest rating
                </span>
              </span>
            </div>

            <div className="glass-panel premium-shadow absolute -right-3 -top-5 rounded-2xl bg-ivory/90 px-4 py-3 sm:-right-6">
              <p className="text-xs font-semibold uppercase tracking-[0.15em] text-sage-dark">
                Open Daily
              </p>
              <p className="mt-0.5 font-serif text-sm text-charcoal">
                8:00 AM – 12:00 AM
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
