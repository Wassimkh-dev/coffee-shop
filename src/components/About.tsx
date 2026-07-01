import Image from "next/image";
import AnimateOnScroll from "@/components/AnimateOnScroll";

const stats = [
  { value: "500+", label: "Daily Visitors" },
  { value: "15+", label: "Coffee Origins" },
  { value: "8", label: "Years of Excellence" },
];

export default function About() {
  return (
    <section id="about" className="py-24 bg-amber-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Text */}
          <AnimateOnScroll direction="left">
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
            <p className="text-stone-600 leading-relaxed mb-4">
              Every bean we source tells a story of dedicated farmers from Ethiopia,
              Colombia, and beyond. Our master roasters transform these beans into the
              rich, complex flavors you&apos;ve come to love.
            </p>
            <p className="text-stone-600 leading-relaxed mb-10">
              Whether you&apos;re a morning regular grabbing your daily espresso or spending
              an afternoon with your laptop, we&apos;ve created a space that feels like home.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-amber-200">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <p className="font-serif text-3xl font-bold text-amber-700 mb-1">
                    {stat.value}
                  </p>
                  <p className="text-stone-500 text-sm">{stat.label}</p>
                </div>
              ))}
            </div>
          </AnimateOnScroll>

          {/* Image */}
          <AnimateOnScroll direction="right" delay={100}>
            <div className="relative">
              <div className="relative h-[500px] rounded-3xl overflow-hidden shadow-2xl shadow-amber-900/20">
                <Image
                  src="https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=800&q=80"
                  alt="Barista crafting coffee"
                  fill
                  className="object-cover"
                />
              </div>
              {/* Floating rating card */}
              <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl p-5 max-w-[190px]">
                <div className="flex gap-0.5 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-4 h-4 fill-amber-400" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-stone-700 text-sm font-semibold">4.9 / 5 on Google</p>
                <p className="text-stone-400 text-xs mt-0.5">2,400+ reviews</p>
              </div>
            </div>
          </AnimateOnScroll>
        </div>
      </div>
    </section>
  );
}
