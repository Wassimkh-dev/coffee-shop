import AnimateOnScroll from "@/components/AnimateOnScroll";

const hours = [
  { day: "Monday – Friday", time: "7:00 AM – 9:00 PM" },
  { day: "Saturday", time: "8:00 AM – 10:00 PM" },
  { day: "Sunday", time: "9:00 AM – 8:00 PM" },
];

function IconBox({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center flex-shrink-0 text-amber-700">
      {children}
    </div>
  );
}

export default function Contact() {
  return (
    <section id="contact" className="py-24 bg-amber-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <AnimateOnScroll direction="up">
          <div className="text-center mb-16">
            <span className="inline-block bg-amber-100 text-amber-700 text-sm font-semibold px-4 py-1.5 rounded-full mb-6 tracking-wide uppercase">
              Find Us
            </span>
            <h2 className="font-serif text-4xl sm:text-5xl font-bold text-amber-950 mb-4">
              Come Say Hello
            </h2>
            <p className="text-stone-500 text-lg max-w-xl mx-auto">
              We&apos;re always happy to see you. Drop by for a cup or book a private event.
            </p>
          </div>
        </AnimateOnScroll>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Info */}
          <AnimateOnScroll direction="left">
            <div className="space-y-8">
              <div className="flex gap-4">
                <IconBox>
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </IconBox>
                <div>
                  <h3 className="font-semibold text-amber-950 mb-1">Address</h3>
                  <p className="text-stone-600">123 Coffee Lane, SoHo</p>
                  <p className="text-stone-600">New York, NY 10012</p>
                </div>
              </div>

              <div className="flex gap-4">
                <IconBox>
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </IconBox>
                <div>
                  <h3 className="font-semibold text-amber-950 mb-1">Phone</h3>
                  <p className="text-stone-600">+1 (212) 555-0174</p>
                </div>
              </div>

              <div className="flex gap-4">
                <IconBox>
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </IconBox>
                <div>
                  <h3 className="font-semibold text-amber-950 mb-1">Email</h3>
                  <p className="text-stone-600">hello@brewandco.com</p>
                </div>
              </div>

              {/* Hours card */}
              <div className="bg-white rounded-2xl p-6 border border-amber-100 shadow-sm">
                <div className="flex items-center gap-2 mb-4">
                  <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  <h3 className="font-semibold text-amber-950">We&apos;re Open</h3>
                </div>
                <div className="space-y-3">
                  {hours.map((h) => (
                    <div key={h.day} className="flex justify-between items-center text-sm">
                      <span className="text-stone-600">{h.day}</span>
                      <span className="font-medium text-amber-900">{h.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </AnimateOnScroll>

          {/* Map */}
          <AnimateOnScroll direction="right" delay={100}>
            <div className="rounded-2xl overflow-hidden shadow-2xl shadow-amber-900/10 min-h-[420px] border border-amber-100">
              <iframe
                src="https://www.openstreetmap.org/export/embed.html?bbox=-74.0065%2C40.7241%2C-74.0015%2C40.7281&layer=mapnik"
                className="w-full h-full min-h-[420px]"
                style={{ border: 0 }}
                loading="lazy"
                title="Brew & Co. Location"
              />
            </div>
          </AnimateOnScroll>
        </div>
      </div>
    </section>
  );
}
