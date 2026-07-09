import Image from "next/image";
import { navLinks, siteConfig } from "@/lib/site-config";
import logo from "../../public/logo/the-lawn-logo.jpeg";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-charcoal text-cream/70">
      <div className="mx-auto max-w-7xl px-4 pb-24 pt-16 sm:px-6 sm:pb-8 lg:px-8">
        <div className="grid grid-cols-1 gap-10 pb-12 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3">
              <span className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full ring-1 ring-ivory/20">
                <Image
                  src={logo}
                  alt="The Lawn Cafe logo"
                  fill
                  sizes="44px"
                  className="object-cover"
                />
              </span>
              <span className="font-serif text-xl text-ivory">
                The Lawn Cafe
              </span>
            </div>
            <p className="mt-5 max-w-sm text-sm leading-relaxed">
              A calm, garden-set cafe in Bsatine for everyday coffee, fresh
              food, shisha, and the moments worth celebrating.
            </p>
            <a
              href={siteConfig.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 rounded-full border border-ivory/15 px-4 py-2 text-sm text-cream transition-colors hover:border-ivory/30 hover:text-ivory"
            >
              {siteConfig.instagramHandle}
            </a>
          </div>

          <div>
            <h4 className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-sage-light">
              Quick Links
            </h4>
            <ul className="space-y-2.5">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm transition-colors hover:text-ivory"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-sage-light">
              Visit
            </h4>
            <ul className="space-y-3 text-sm">
              <li>{siteConfig.mapCode}</li>
              <li>{siteConfig.hoursLong}</li>
              <li>
                <a href={siteConfig.phoneHref} className="hover:text-ivory">
                  {siteConfig.phoneDisplay}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-center gap-4 border-t border-ivory/10 pt-8 text-xs sm:flex-row sm:justify-between">
          <p>
            © {year} The Lawn Cafe, Bsatine. All rights reserved.
          </p>
          <p className="text-cream/50">Crafted for calm, everyday luxury.</p>
        </div>
      </div>
    </footer>
  );
}
