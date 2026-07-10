import type { SVGProps } from "react";
import Reveal from "@/components/Reveal";
import { siteConfig } from "@/lib/site-config";

function IconPin(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" strokeWidth={1.4} {...props}>
      <path
        d="M12 21s-7-6.1-7-11.5A7 7 0 0 1 19 9.5C19 14.9 12 21 12 21Z"
        stroke="currentColor"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="9.5" r="2.5" stroke="currentColor" />
    </svg>
  );
}

function IconClock(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" strokeWidth={1.4} {...props}>
      <circle cx="12" cy="12" r="8.5" stroke="currentColor" />
      <path
        d="M12 7.5V12l3 2"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconPhone(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" strokeWidth={1.4} {...props}>
      <path
        d="M6 4h3l1.5 4L8 9.5a11 11 0 0 0 6.5 6.5L16 14l4 1.5V18a2 2 0 0 1-2 2C10.5 20 4 13.5 4 6a2 2 0 0 1 2-2Z"
        stroke="currentColor"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconInstagram(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" strokeWidth={1.4} {...props}>
      <rect x="4" y="4" width="16" height="16" rx="5" stroke="currentColor" />
      <circle cx="12" cy="12" r="3.5" stroke="currentColor" />
      <circle cx="16.2" cy="7.8" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  );
}

const details = [
  {
    icon: IconPin,
    label: "Location",
    value: siteConfig.mapCode,
  },
  {
    icon: IconClock,
    label: "Hours",
    value: siteConfig.hoursLong,
  },
  {
    icon: IconPhone,
    label: "Phone",
    value: siteConfig.phoneDisplay,
  },
  {
    icon: IconInstagram,
    label: "Instagram",
    value: siteConfig.instagramHandle,
  },
];

export default function Visit() {
  return (
    <section id="visit" className="relative bg-sage-mist py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="mb-5 inline-block rounded-full bg-moss/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-moss">
            Visit Us
          </span>
          <h2 className="text-balance font-serif text-4xl leading-tight text-forest sm:text-5xl">
            Find your table in Bsatine
          </h2>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-8 lg:grid-cols-5 lg:gap-10">
          <Reveal direction="left" className="lg:col-span-2">
            <div className="premium-shadow h-full rounded-[2rem] bg-white p-8 ring-1 ring-moss/10">
              <ul className="space-y-6">
                {details.map(({ icon: Icon, label, value }) => (
                  <li key={label} className="flex items-start gap-4">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-moss/10 text-moss">
                      <Icon className="h-5 w-5" />
                    </span>
                    <span>
                      <span className="block text-xs font-semibold uppercase tracking-[0.2em] text-gold-soft">
                        {label}
                      </span>
                      <span className="mt-1 block font-serif text-lg text-forest">
                        {value}
                      </span>
                    </span>
                  </li>
                ))}
              </ul>

              <div className="mt-8 grid grid-cols-2 gap-3">
                <a
                  href={siteConfig.phoneHref}
                  className="rounded-full bg-moss px-4 py-3 text-center text-sm font-semibold text-ivory transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
                >
                  Call Now
                </a>
                <a
                  href={siteConfig.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full bg-moss px-4 py-3 text-center text-sm font-semibold text-ivory transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
                >
                  WhatsApp
                </a>
                <a
                  href={siteConfig.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-moss/25 bg-mint-card px-4 py-3 text-center text-sm font-semibold text-forest transition-colors duration-300 hover:bg-sage-mist"
                >
                  Get Directions
                </a>
                <a
                  href={siteConfig.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-moss/25 bg-mint-card px-4 py-3 text-center text-sm font-semibold text-forest transition-colors duration-300 hover:bg-sage-mist"
                >
                  Instagram
                </a>
              </div>
            </div>
          </Reveal>

          <Reveal direction="right" delay={0.1} className="lg:col-span-3">
            <div className="premium-shadow h-full min-h-[360px] overflow-hidden rounded-[2rem] bg-white ring-1 ring-moss/10">
              <iframe
                title="The Lawn Cafe location map"
                src={`https://www.google.com/maps?q=${encodeURIComponent(
                  siteConfig.mapCode
                )}&output=embed`}
                className="h-full min-h-[360px] w-full grayscale-[15%]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
