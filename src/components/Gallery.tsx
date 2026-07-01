import Image from "next/image";
import AnimateOnScroll from "@/components/AnimateOnScroll";

const images = [
  {
    src: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=800&q=80",
    alt: "Cozy coffee shop interior",
    tall: true,
  },
  {
    src: "https://images.unsplash.com/photo-1511920170033-f8396924c348?w=800&q=80",
    alt: "Beautiful latte art",
    tall: false,
  },
  {
    src: "https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=800&q=80",
    alt: "Barista at work",
    tall: false,
  },
  {
    src: "https://images.unsplash.com/photo-1570968915860-54d5c301fa9f?w=800&q=80",
    alt: "Coffee cup on table",
    tall: false,
  },
  {
    src: "https://images.unsplash.com/photo-1559496417-e7f25cb247f3?w=800&q=80",
    alt: "Coffee shop exterior",
    tall: false,
  },
];

export default function Gallery() {
  return (
    <section id="gallery" className="py-24 bg-stone-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <AnimateOnScroll direction="up">
          <div className="text-center mb-16">
            <span className="inline-block bg-amber-100 text-amber-700 text-sm font-semibold px-4 py-1.5 rounded-full mb-6 tracking-wide uppercase">
              Gallery
            </span>
            <h2 className="font-serif text-4xl sm:text-5xl font-bold text-amber-950 mb-4">
              A Peek Inside
            </h2>
            <p className="text-stone-500 text-lg max-w-xl mx-auto">
              From the first pour to the last sip — moments worth savoring.
            </p>
          </div>
        </AnimateOnScroll>

        {/* Asymmetric grid */}
        <div className="grid grid-cols-2 lg:grid-cols-3 grid-rows-2 gap-4 h-[580px]">
          {images.map((image, i) => (
            <AnimateOnScroll
              key={i}
              direction="fade"
              delay={i * 90}
              className={i === 0 ? "row-span-2 h-full" : "h-full"}
            >
            <div
              className="relative h-full overflow-hidden rounded-2xl group"
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-amber-950/0 group-hover:bg-amber-950/40 transition-colors duration-300 flex items-center justify-center">
                <span className="text-white text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/40 backdrop-blur-sm px-4 py-2 rounded-full">
                  {image.alt}
                </span>
              </div>
            </div>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
