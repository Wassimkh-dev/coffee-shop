import AnimateOnScroll from "@/components/AnimateOnScroll";

export default function About() {
  return (
    <section id="about" className="py-24 bg-amber-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimateOnScroll direction="up" className="max-w-3xl mx-auto text-center">
          <span className="inline-block bg-amber-100 text-amber-700 text-sm font-semibold px-4 py-1.5 rounded-full mb-6 tracking-wide uppercase">
            Our Story
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl font-bold text-amber-950 leading-tight mb-6">
            More Than Just Coffee,{" "}
            <span className="text-amber-600">It&apos;s a Community</span>
          </h2>
          <p className="text-stone-600 text-lg leading-relaxed mb-4">
            Founded in 2018, Brew &amp; Co. was born from a simple belief: that great
            coffee has the power to bring people together. We started as a small corner
            shop with big dreams and even bigger passion.
          </p>
          <p className="text-stone-600 text-lg leading-relaxed">
            Every bean we source tells a story of dedicated farmers from Ethiopia,
            Colombia, and beyond, transformed by our master roasters into the rich,
            complex flavors you&apos;ve come to love.
          </p>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
