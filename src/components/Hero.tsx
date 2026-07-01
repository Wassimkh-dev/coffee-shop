import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden"
    >
      {/* Background */}
      <Image
        src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1920&q=80"
        alt="Coffee shop interior"
        fill
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-b from-amber-950/75 via-amber-950/60 to-amber-950/85" />

      {/* Content */}
      <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
        <div
          className="hero-enter inline-flex items-center gap-2 bg-amber-500/20 border border-amber-400/30 backdrop-blur-sm rounded-full px-4 py-1.5 mb-8"
          style={{ animationDelay: "0ms" }}
        >
          <span className="w-2 h-2 bg-amber-400 rounded-full animate-pulse" />
          <span className="text-amber-300 text-sm font-medium tracking-widest uppercase">
            Est. 2018
          </span>
        </div>

        <h1
          className="hero-enter font-serif text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold leading-tight mb-6 text-amber-50"
          style={{ animationDelay: "180ms" }}
        >
          Life Begins
          <br />
          <span className="text-amber-400">After Coffee</span>
        </h1>

        <p
          className="hero-enter text-amber-100/80 text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
          style={{ animationDelay: "360ms" }}
        >
          Where every cup tells a story. Expertly crafted coffee served in the heart
          of the city — because you deserve more than ordinary.
        </p>

        <div
          className="hero-enter flex flex-col sm:flex-row items-center justify-center gap-4"
          style={{ animationDelay: "520ms" }}
        >
          <Link
            href="#menu"
            className="bg-amber-500 hover:bg-amber-400 text-amber-950 px-8 py-3.5 rounded-full text-base font-semibold transition-all duration-200 hover:shadow-xl hover:-translate-y-0.5"
          >
            Explore Our Menu
          </Link>
          <Link
            href="#about"
            className="border border-amber-300/50 text-amber-100 hover:border-amber-300 hover:text-amber-300 px-8 py-3.5 rounded-full text-base font-medium transition-all duration-200 backdrop-blur-sm hover:-translate-y-0.5"
          >
            Our Story
          </Link>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 animate-bounce">
        <span className="text-amber-300/60 text-xs tracking-widest uppercase">Scroll</span>
        <svg className="w-5 h-5 text-amber-400/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </section>
  );
}
