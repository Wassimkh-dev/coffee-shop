import Image from "next/image";
import Reveal from "@/components/Reveal";
import LazyVideo from "@/components/LazyVideo";
import gardenNight from "../../public/images/startup-09.jpeg";
import neonSign from "../../public/images/startup-06.jpeg";
import posterFoodPlate from "../../public/images/posters/food-06.jpg";
import posterFoodMacro from "../../public/images/posters/food-07.jpg";
import posterEspresso from "../../public/images/posters/coffee-06.jpg";
import posterGarden from "../../public/images/posters/hero-02.jpg";

type GalleryItem =
  | {
      type: "image";
      src: typeof gardenNight;
      alt: string;
      span: string;
      position?: string;
    }
  | {
      type: "video";
      src: string;
      poster: typeof gardenNight;
      alt: string;
      span: string;
      /** Extra classes for the <video> — zoom/reframe clips with baked-in text. */
      videoClass?: string;
      /** Always-on gradient that softens any remaining on-video text. */
      maskClass?: string;
    };

const items: GalleryItem[] = [
  {
    type: "image",
    src: gardenNight,
    alt: "Evenings under the garden lights at The Lawn Cafe",
    span: "md:col-span-2 md:row-span-2",
    position: "50% 60%",
  },
  {
    type: "video",
    src: "/videos/video-06.mp4",
    poster: posterFoodPlate,
    alt: "A freshly grilled plate served at The Lawn Cafe",
    span: "md:row-span-2",
    // Right-anchored zoom crops out the watermark along the left edge.
    videoClass: "origin-right scale-[1.45] group-hover:scale-[1.55]",
    maskClass:
      "absolute inset-y-0 left-0 w-1/5 bg-gradient-to-r from-charcoal/30 to-transparent",
  },
  {
    type: "video",
    src: "/videos/gallery-video.mp4",
    poster: posterEspresso,
    alt: "Fresh espresso pouring at the coffee bar",
    span: "",
  },
  {
    type: "video",
    src: "/videos/video-07.mp4",
    poster: posterFoodMacro,
    alt: "A close-up, softly lit food detail shot",
    span: "",
  },
  {
    type: "video",
    src: "/videos/video-09.mp4",
    poster: posterGarden,
    alt: "A sunlit stroll down the garden path",
    span: "",
  },
  {
    type: "image",
    src: neonSign,
    alt: "Golden evenings at The Lawn",
    span: "",
    // Keep the neon script centered in the crop
    position: "50% 38%",
  },
];

export default function Gallery() {
  return (
    <section id="gallery" className="bg-cream py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="mb-5 inline-block rounded-full bg-sage/15 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-sage-dark">
            Gallery
          </span>
          <h2 className="text-balance font-serif text-4xl leading-tight text-charcoal sm:text-5xl">
            Moments from The Lawn
          </h2>
        </Reveal>

        <div className="mt-14 grid grid-cols-2 gap-4 md:auto-rows-[220px] md:grid-cols-4 md:grid-flow-dense">
          {items.map((item, i) => (
            <Reveal
              key={item.alt}
              direction="scale"
              delay={i * 0.06}
              amount={0.2}
              className={`group relative aspect-[4/5] overflow-hidden rounded-[1.5rem] premium-shadow md:aspect-auto ${item.span}`}
            >
              {item.type === "image" ? (
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  sizes="(min-width: 768px) 40vw, 90vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  style={
                    item.position ? { objectPosition: item.position } : undefined
                  }
                />
              ) : (
                <>
                  <LazyVideo
                    className={`absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out ${
                      item.videoClass ?? "group-hover:scale-110"
                    }`}
                    src={item.src}
                    poster={item.poster.src}
                    ariaLabel={item.alt}
                  />
                  {item.maskClass && (
                    <div
                      aria-hidden
                      className={`pointer-events-none ${item.maskClass}`}
                    />
                  )}
                </>
              )}
              {/* Tailwind v4 gates hover: behind (hover: hover), so touch
                  devices never fire group-hover — show the caption statically
                  there via pointer-coarse instead */}
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 via-charcoal/0 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 pointer-coarse:opacity-100" />
              <p className="absolute inset-x-3 bottom-3 translate-y-1 text-sm font-medium text-ivory opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 pointer-coarse:translate-y-0 pointer-coarse:opacity-100">
                {item.alt}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
