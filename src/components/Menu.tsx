"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Reveal from "@/components/Reveal";
import { menuCategories } from "@/lib/menu-data";

function formatPrice(price: number) {
  return `$${price.toFixed(2)}`;
}

export default function Menu() {
  const [activeId, setActiveId] = useState(menuCategories[0].id);
  const active = menuCategories.find((c) => c.id === activeId) ?? menuCategories[0];

  return (
    <section id="menu" className="relative bg-cream py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="mb-5 inline-block rounded-full bg-sage/15 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-sage-dark">
            The Full Menu
          </span>
          <h2 className="text-balance font-serif text-4xl leading-tight text-charcoal sm:text-5xl">
            Crafted to be shared, savored, and lingered over
          </h2>
        </Reveal>

        <Reveal delay={0.1} className="mt-10">
          {/* py keeps the pills (and their ring) clear of the scroll container's
              clip edges so they never render cropped on mobile */}
          <div className="scrollbar-none -mx-4 flex snap-x gap-2 overflow-x-auto px-4 py-2 sm:mx-0 sm:flex-wrap sm:justify-center sm:px-0">
            {menuCategories.map((category) => (
              <button
                key={category.id}
                type="button"
                onClick={() => setActiveId(category.id)}
                className={`inline-flex shrink-0 snap-start items-center justify-center rounded-full px-4 py-2.5 text-sm font-medium leading-none whitespace-nowrap transition-colors duration-200 ${
                  category.id === activeId
                    ? "bg-olive text-ivory shadow-sm"
                    : "bg-ivory text-charcoal-soft ring-1 ring-beige hover:bg-cream-dark/60"
                }`}
              >
                {category.title}
              </button>
            ))}
          </div>
        </Reveal>

        <div className="relative mt-10 min-h-[320px]">
          {/* initial={false} keeps the first render visible in the server
              HTML — the fade only runs when switching categories */}
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={active.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="glass-panel premium-shadow rounded-[2rem] bg-ivory/80 p-6 sm:p-10"
            >
              <div className="mb-8 border-b border-beige/70 pb-5">
                <div className="flex items-baseline justify-between">
                  <h3 className="font-serif text-2xl text-charcoal sm:text-3xl">
                    {active.title}
                  </h3>
                  <span className="text-xs uppercase tracking-[0.2em] text-sage-dark">
                    {active.items.length} items
                  </span>
                </div>
                {active.note && (
                  <p className="mt-2.5 text-sm italic leading-relaxed text-charcoal-soft/90">
                    {active.note}
                  </p>
                )}
              </div>

              <ul className="grid grid-cols-1 gap-x-10 gap-y-6 md:grid-cols-2">
                {active.items.map((item) => (
                  <li key={item.name} className="group">
                    <div className="flex items-baseline gap-3">
                      <span className="font-medium text-charcoal">
                        {item.name}
                      </span>
                      <span
                        aria-hidden
                        className="h-px flex-1 translate-y-[-3px] border-b border-dotted border-beige"
                      />
                      <span className="whitespace-nowrap font-serif text-lg text-olive-dark">
                        {formatPrice(item.price)}
                      </span>
                    </div>
                    {item.description && (
                      <p className="mt-1.5 text-sm leading-relaxed text-charcoal-soft/90">
                        {item.description}
                      </p>
                    )}
                  </li>
                ))}
              </ul>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
