"use client";

import { useState } from "react";
import Image from "next/image";
import Reveal from "@/components/Reveal";
import EventRequestModal from "@/components/EventRequestModal";
import { siteConfig } from "@/lib/site-config";
import archPhoto from "../../public/images/startup-01.jpeg";

const occasions = [
  { label: "Proposals", type: "Proposal" },
  { label: "Birthdays", type: "Birthday" },
  { label: "Private gatherings", type: "Private gathering" },
  { label: "Special occasions", type: "Special occasion" },
  { label: "Calm outdoor setting", type: "Calm outdoor setting" },
];

export default function Events() {
  const [modalOpen, setModalOpen] = useState(false);
  const [eventType, setEventType] = useState(occasions[0].type);

  function openRequest(type: string) {
    setEventType(type);
    setModalOpen(true);
  }

  return (
    <section id="events" className="relative overflow-hidden bg-ivory py-24 sm:py-32">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-stretch gap-10 px-4 sm:px-6 lg:grid-cols-5 lg:gap-14 lg:px-8">
        <Reveal direction="left" className="lg:col-span-2">
          <span className="mb-5 inline-block rounded-full bg-gold/15 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-gold">
            Events &amp; Reservations
          </span>
          <h2 className="text-balance font-serif text-4xl leading-tight text-charcoal sm:text-5xl">
            Made for the moments worth marking
          </h2>
          <p className="mt-5 text-balance text-base leading-relaxed text-charcoal-soft sm:text-lg">
            From a quiet proposal at golden hour to a table full of friends
            celebrating something new, our garden setting adapts to the
            occasion — calm, private, and always outdoors.
          </p>
          <p className="mt-4 text-sm text-charcoal-soft/80">
            Tap an occasion to start your reservation.
          </p>

          <ul className="mt-6 flex flex-wrap gap-2.5">
            {occasions.map((occasion) => (
              <li key={occasion.type}>
                <button
                  type="button"
                  onClick={() => openRequest(occasion.type)}
                  className="rounded-full bg-cream px-4 py-2 text-sm font-medium text-charcoal ring-1 ring-beige transition-all duration-300 hover:-translate-y-0.5 hover:bg-cream-dark/70 hover:shadow-md"
                >
                  {occasion.label}
                </button>
              </li>
            ))}
          </ul>

          <div className="mt-10 flex flex-wrap gap-3">
            <a
              href={siteConfig.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-olive px-7 py-3.5 text-sm font-semibold text-ivory transition-all duration-300 hover:-translate-y-0.5 hover:bg-olive-dark hover:shadow-lg"
            >
              Reserve on WhatsApp
            </a>
            <a
              href={siteConfig.phoneHref}
              className="rounded-full border border-charcoal/15 px-7 py-3.5 text-sm font-semibold text-charcoal transition-all duration-300 hover:-translate-y-0.5 hover:border-charcoal/30 hover:bg-cream"
            >
              Call Now
            </a>
          </div>
        </Reveal>

        <Reveal direction="right" delay={0.1} className="lg:col-span-3">
          <div className="premium-shadow relative isolate min-h-[360px] overflow-hidden rounded-[2rem] sm:min-h-[440px]">
            <Image
              src={archPhoto}
              alt="The floral archway welcoming guests at The Lawn Cafe"
              fill
              sizes="(min-width: 1024px) 60vw, 90vw"
              className="object-cover"
              style={{ objectPosition: "50% 62%" }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-olive-dark/80 via-charcoal/20 to-transparent" />

            <div className="relative flex h-full min-h-[360px] flex-col justify-end p-8 sm:min-h-[440px] sm:p-10">
              <p className="font-serif text-2xl text-ivory sm:text-3xl">
                &ldquo;A calm, beautiful setting for the moments you&apos;ll
                remember.&rdquo;
              </p>
              <p className="mt-3 text-sm uppercase tracking-[0.2em] text-cream/80">
                Reservations recommended for events
              </p>
            </div>
          </div>
        </Reveal>
      </div>

      <EventRequestModal
        open={modalOpen}
        initialEventType={eventType}
        onClose={() => setModalOpen(false)}
      />
    </section>
  );
}
