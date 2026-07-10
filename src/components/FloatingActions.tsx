import { siteConfig } from "@/lib/site-config";

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
      <path d="M12.04 2c-5.52 0-10 4.48-10 10 0 1.76.46 3.48 1.34 5L2 22l5.16-1.35a9.96 9.96 0 0 0 4.88 1.24h.01c5.52 0 10-4.48 10-10s-4.48-9.89-10.01-9.89Zm0 18.2h-.01a8.2 8.2 0 0 1-4.18-1.14l-.3-.18-3.06.8.82-2.98-.2-.31a8.2 8.2 0 0 1-1.26-4.39c0-4.54 3.7-8.24 8.25-8.24 2.2 0 4.27.86 5.83 2.42a8.18 8.18 0 0 1 2.41 5.82c0 4.55-3.7 8.2-8.3 8.2Zm4.52-6.14c-.25-.12-1.47-.72-1.7-.81-.23-.08-.4-.12-.56.13-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.12-1.04-.38-1.98-1.22-.73-.65-1.23-1.46-1.37-1.7-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.12-.14.16-.25.25-.41.08-.17.04-.31-.02-.44-.06-.12-.56-1.36-.77-1.86-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.87.86-.87 2.09s.9 2.42 1.02 2.59c.12.17 1.78 2.72 4.31 3.81.6.26 1.07.42 1.44.53.6.19 1.15.16 1.59.1.48-.07 1.47-.6 1.68-1.18.2-.58.2-1.08.14-1.18-.06-.1-.23-.16-.48-.28Z" />
    </svg>
  );
}

function DirectionsIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      className="h-5 w-5"
    >
      <path
        d="M12 21s-7-6.1-7-11.5A7 7 0 0 1 19 9.5C19 14.9 12 21 12 21Z"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="9.5" r="2.5" />
    </svg>
  );
}

export default function FloatingActions() {
  return (
    // CSS entrance (delay baked into the animation) so the buttons still
    // appear even if JS never hydrates
    <div className="animate-[fade-up-in_0.6s_cubic-bezier(0.16,1,0.3,1)_0.6s_both] pointer-events-none fixed inset-x-0 bottom-0 z-40 flex items-end justify-end gap-2.5 px-4 pb-[calc(1rem+env(safe-area-inset-bottom))] sm:gap-3 sm:px-6 sm:pb-6">
      <a
        href={siteConfig.mapsUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Get directions to The Lawn Cafe"
        title="Get Directions"
        className="premium-shadow pointer-events-auto flex h-11 w-11 items-center justify-center rounded-full bg-ivory text-olive-dark ring-1 ring-beige transition-transform duration-300 hover:-translate-y-0.5 hover:bg-cream sm:h-12 sm:w-12"
      >
        <DirectionsIcon />
      </a>
      <a
        href={siteConfig.whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Message The Lawn Cafe on WhatsApp"
        title="WhatsApp Us"
        className="premium-shadow pointer-events-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366] text-white transition-transform duration-300 hover:-translate-y-0.5 sm:h-14 sm:w-14"
      >
        <WhatsAppIcon />
      </a>
    </div>
  );
}
