import AnimateOnScroll from "@/components/AnimateOnScroll";

const testimonials = [
  {
    quote:
      "The best cappuccino in the city, hands down. I've been coming every morning for two years and it never disappoints. The baristas remember my order!",
    name: "Sarah M.",
    role: "Regular Customer",
    rating: 5,
  },
  {
    quote:
      "As a remote worker, Brew & Co. is my second office. Perfect WiFi, great music, and the cold brew keeps me going all day. Absolute gem of a place.",
    name: "James K.",
    role: "Freelance Designer",
    rating: 5,
  },
  {
    quote:
      "Came for a friend date and stayed for three hours. The atmosphere is unmatched — warm, cozy, and the avocado toast is to die for. Will be back!",
    name: "Priya L.",
    role: "Food Blogger",
    rating: 5,
  },
];

function StarIcon() {
  return (
    <svg className="w-5 h-5 fill-amber-400" viewBox="0 0 20 20">
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  );
}

export default function Testimonials() {
  return (
    <section className="py-24 bg-stone-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <AnimateOnScroll direction="up">
        <div className="text-center mb-16">
          <span className="inline-block bg-stone-800 text-amber-400 text-sm font-semibold px-4 py-1.5 rounded-full mb-6 tracking-wide uppercase">
            Testimonials
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl font-bold text-stone-50 mb-4">
            What Our Guests Say
          </h2>
          <p className="text-stone-400 text-lg max-w-xl mx-auto">
            Don&apos;t take our word for it — hear from the people who matter most.
          </p>
        </div>

        </AnimateOnScroll>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <AnimateOnScroll key={i} direction="up" delay={i * 130}>
            <div
              className="bg-stone-800/50 border border-stone-700/50 rounded-2xl p-8 hover:border-amber-600/30 transition-colors duration-300"
            >
              <div className="flex gap-1 mb-5">
                {[...Array(t.rating)].map((_, j) => (
                  <StarIcon key={j} />
                ))}
              </div>

              <div className="text-amber-600/20 font-serif text-7xl leading-none mb-2 select-none">
                &ldquo;
              </div>

              <p className="text-stone-300 leading-relaxed mb-8 -mt-4">
                {t.quote}
              </p>

              <div className="flex items-center gap-3 pt-6 border-t border-stone-700/50">
                <div className="w-10 h-10 bg-amber-600/20 rounded-full flex items-center justify-center text-amber-400 font-bold text-sm">
                  {t.name[0]}
                </div>
                <div>
                  <p className="text-stone-100 font-semibold text-sm">{t.name}</p>
                  <p className="text-stone-500 text-xs">{t.role}</p>
                </div>
              </div>
            </div>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
