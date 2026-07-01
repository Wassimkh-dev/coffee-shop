"use client";

import { useState } from "react";
import Image from "next/image";
import AnimateOnScroll from "@/components/AnimateOnScroll";

type MenuItem = {
  name: string;
  description: string;
  price: string;
  tag: string;
  img: string;
};

const drinks: MenuItem[] = [
  {
    name: "Espresso",
    description: "Rich and bold single shot",
    price: "$3.50",
    tag: "Classic",
    img: "https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?w=400&q=80",
  },
  {
    name: "Cappuccino",
    description: "Velvety foam with steamed milk",
    price: "$4.50",
    tag: "Popular",
    img: "https://images.unsplash.com/photo-1534040385115-33dcb3acba5b?w=400&q=80",
  },
  {
    name: "Cold Brew",
    description: "Slow-steeped 18 hours, silky smooth",
    price: "$5.00",
    tag: "Summer",
    img: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400&q=80",
  },
  {
    name: "Flat White",
    description: "Double ristretto with velvety microfoam",
    price: "$4.00",
    tag: "Bestseller",
    img: "https://images.unsplash.com/photo-1577968897966-3d4325b36b61?w=400&q=80",
  },
  {
    name: "Matcha Latte",
    description: "Ceremonial-grade matcha with oat milk",
    price: "$5.50",
    tag: "New",
    img: "https://images.unsplash.com/photo-1515823662972-da6a2e4d3002?w=400&q=80",
  },
  {
    name: "Chai Latte",
    description: "Spiced chai blend with steamed milk",
    price: "$4.00",
    tag: "Warming",
    img: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=400&q=80",
  },
];

const food: MenuItem[] = [
  {
    name: "Butter Croissant",
    description: "Flaky, golden, baked fresh daily",
    price: "$3.50",
    tag: "Fresh",
    img: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=400&q=80",
  },
  {
    name: "Avocado Toast",
    description: "Sourdough, avocado, chili flakes",
    price: "$8.00",
    tag: "Popular",
    img: "https://images.unsplash.com/photo-1541519227354-08fa5d50c820?w=400&q=80",
  },
  {
    name: "Blueberry Muffin",
    description: "Bursting with fresh blueberries",
    price: "$3.00",
    tag: "Vegan",
    img: "https://images.unsplash.com/photo-1486427944299-d1955d23e34d?w=400&q=80",
  },
  {
    name: "Banana Bread",
    description: "Moist, nutty comfort in a slice",
    price: "$3.50",
    tag: "Classic",
    img: "https://images.unsplash.com/photo-1600703169601-d4abc32f1d52?w=400&q=80",
  },
  {
    name: "Granola Bowl",
    description: "House granola, yogurt, seasonal fruit",
    price: "$7.00",
    tag: "Healthy",
    img: "https://images.unsplash.com/photo-1505253716362-afaea1d3d1af?w=400&q=80",
  },
  {
    name: "Egg Sandwich",
    description: "Brioche, scrambled egg, aged cheddar",
    price: "$8.50",
    tag: "Hearty",
    img: "https://images.unsplash.com/photo-1528736235302-52922df5c122?w=400&q=80",
  },
];

const tagColors: Record<string, string> = {
  Classic: "bg-stone-100 text-stone-600",
  Popular: "bg-amber-100 text-amber-700",
  Summer: "bg-sky-100 text-sky-700",
  Bestseller: "bg-orange-100 text-orange-700",
  New: "bg-green-100 text-green-700",
  Warming: "bg-red-100 text-red-700",
  Fresh: "bg-lime-100 text-lime-700",
  Vegan: "bg-emerald-100 text-emerald-700",
  Healthy: "bg-teal-100 text-teal-700",
  Hearty: "bg-amber-100 text-amber-700",
};

export default function Menu() {
  const [activeTab, setActiveTab] = useState<"drinks" | "food">("drinks");
  const items = activeTab === "drinks" ? drinks : food;

  return (
    <section id="menu" className="py-24 bg-amber-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <AnimateOnScroll direction="up">
        <div className="text-center mb-16">
          <span className="inline-block bg-amber-800/50 text-amber-400 text-sm font-semibold px-4 py-1.5 rounded-full mb-6 tracking-wide uppercase">
            Our Menu
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl font-bold text-amber-50 mb-4">
            Crafted with Passion
          </h2>
          <p className="text-amber-200/60 text-lg max-w-xl mx-auto">
            From single-origin espresso to artisan pastries — everything made with care.
          </p>

          {/* Tabs */}
          <div className="inline-flex bg-amber-900/50 rounded-full p-1 mt-10">
            {(["drinks", "food"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-8 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 capitalize ${
                  activeTab === tab
                    ? "bg-amber-500 text-amber-950 shadow-lg"
                    : "text-amber-300/70 hover:text-amber-300"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        </AnimateOnScroll>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item, i) => (
            <AnimateOnScroll key={item.name} direction="up" delay={i * 80}>
            <div
              className="bg-amber-900/30 border border-amber-800/30 rounded-2xl overflow-hidden group hover:border-amber-600/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-amber-900/50"
            >
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={item.img}
                  alt={item.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3">
                  <span
                    className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                      tagColors[item.tag] ?? "bg-amber-100 text-amber-700"
                    }`}
                  >
                    {item.tag}
                  </span>
                </div>
              </div>
              <div className="p-5">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-serif text-lg font-semibold text-amber-50">
                    {item.name}
                  </h3>
                  <span className="text-amber-400 font-bold text-lg">{item.price}</span>
                </div>
                <p className="text-amber-200/50 text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
            </AnimateOnScroll>
          ))}
        </div>

        <p className="text-center text-amber-200/40 text-sm mt-12">
          View our full seasonal menu — ask our baristas about today&apos;s specials
        </p>
      </div>
    </section>
  );
}
