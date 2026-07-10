"use client";

import { useEffect, useId, useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { buildEventRequestUrl } from "@/lib/whatsapp";

export const eventTypes = [
  "Proposal",
  "Birthday",
  "Private gathering",
  "Special occasion",
  "Calm outdoor setting",
] as const;

const notesHints: Record<string, string> = {
  Proposal: "Decoration, privacy, outdoor preference…",
  Birthday: "Cake, decoration, table setup…",
  "Private gathering": "Seating preference, group details…",
  "Special occasion": "Tell us a little about the occasion…",
  "Calm outdoor setting": "Seating preference, best time for you…",
};

const inputClasses =
  "w-full rounded-2xl bg-white px-4 py-3 text-sm text-charcoal ring-1 ring-beige placeholder:text-charcoal-soft/45 focus:outline-none focus:ring-2 focus:ring-sage transition-shadow";

function Field({
  label,
  htmlFor,
  children,
}: {
  label: string;
  htmlFor: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label
        htmlFor={htmlFor}
        className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.15em] text-sage-dark"
      >
        {label}
      </label>
      {children}
    </div>
  );
}

export default function EventRequestModal({
  open,
  initialEventType,
  onClose,
}: {
  open: boolean;
  initialEventType: string;
  onClose: () => void;
}) {
  const id = useId();
  const [eventType, setEventType] = useState(initialEventType);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [guests, setGuests] = useState("");
  const [notes, setNotes] = useState("");

  // Follow whichever chip opened the modal (render-phase state adjustment).
  const [wasOpen, setWasOpen] = useState(open);
  if (wasOpen !== open) {
    setWasOpen(open);
    if (open) setEventType(initialEventType);
  }

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const url = buildEventRequestUrl({
      eventType,
      name: name.trim(),
      phone: phone.trim(),
      date,
      time,
      guests,
      notes: notes.trim(),
    });
    window.open(url, "_blank", "noopener,noreferrer");
    onClose();
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[60] flex items-end justify-center bg-charcoal/40 backdrop-blur-sm sm:items-center sm:p-6"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-labelledby={`${id}-title`}
        >
          <motion.div
            initial={{ opacity: 0, y: 48 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 48 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="max-h-[90svh] w-full overflow-y-auto rounded-t-[2rem] bg-cream p-6 pb-[calc(1.5rem+env(safe-area-inset-bottom))] shadow-2xl sm:max-w-lg sm:rounded-[2rem] sm:p-8"
          >
            <div className="mb-6 flex items-start justify-between gap-4">
              <div>
                <h3
                  id={`${id}-title`}
                  className="font-serif text-2xl text-charcoal"
                >
                  Reserve your moment
                </h3>
                <p className="mt-1 text-sm text-charcoal-soft">
                  We&apos;ll receive your request on WhatsApp and confirm the
                  details with you.
                </p>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close reservation form"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-charcoal-soft transition-colors hover:bg-cream-dark/70 hover:text-charcoal"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.6}
                  className="h-5 w-5"
                >
                  <path
                    strokeLinecap="round"
                    d="M6 6l12 12M18 6L6 18"
                  />
                </svg>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <Field label="Event type" htmlFor={`${id}-type`}>
                <select
                  id={`${id}-type`}
                  value={eventType}
                  onChange={(e) => setEventType(e.target.value)}
                  className={inputClasses}
                >
                  {eventTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </Field>

              <Field label="Full name" htmlFor={`${id}-name`}>
                <input
                  id={`${id}-name`}
                  type="text"
                  required
                  autoComplete="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  className={inputClasses}
                />
              </Field>

              <Field label="Phone number" htmlFor={`${id}-phone`}>
                <input
                  id={`${id}-phone`}
                  type="tel"
                  required
                  autoComplete="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="03 000 000"
                  className={inputClasses}
                />
              </Field>

              <div className="grid grid-cols-2 gap-4">
                <Field label="Preferred date" htmlFor={`${id}-date`}>
                  <input
                    id={`${id}-date`}
                    type="date"
                    required
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className={inputClasses}
                  />
                </Field>
                <Field label="Preferred time" htmlFor={`${id}-time`}>
                  <input
                    id={`${id}-time`}
                    type="time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className={inputClasses}
                  />
                </Field>
              </div>

              <Field label="Number of guests" htmlFor={`${id}-guests`}>
                <input
                  id={`${id}-guests`}
                  type="number"
                  required
                  min={1}
                  max={200}
                  inputMode="numeric"
                  value={guests}
                  onChange={(e) => setGuests(e.target.value)}
                  placeholder="How many people?"
                  className={inputClasses}
                />
              </Field>

              <Field label="Notes (optional)" htmlFor={`${id}-notes`}>
                <textarea
                  id={`${id}-notes`}
                  rows={3}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder={notesHints[eventType] ?? "Anything we should know?"}
                  className={`${inputClasses} resize-none`}
                />
              </Field>

              <button
                type="submit"
                className="mt-2 flex w-full items-center justify-center gap-2.5 rounded-full bg-olive px-7 py-3.5 text-sm font-semibold text-ivory transition-all duration-300 hover:-translate-y-0.5 hover:bg-olive-dark hover:shadow-lg"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-4.5 w-4.5">
                  <path d="M12.04 2c-5.52 0-10 4.48-10 10 0 1.76.46 3.48 1.34 5L2 22l5.16-1.35a9.96 9.96 0 0 0 4.88 1.24h.01c5.52 0 10-4.48 10-10s-4.48-9.89-10.01-9.89Zm0 18.2h-.01a8.2 8.2 0 0 1-4.18-1.14l-.3-.18-3.06.8.82-2.98-.2-.31a8.2 8.2 0 0 1-1.26-4.39c0-4.54 3.7-8.24 8.25-8.24 2.2 0 4.27.86 5.83 2.42a8.18 8.18 0 0 1 2.41 5.82c0 4.55-3.7 8.2-8.3 8.2Zm4.52-6.14c-.25-.12-1.47-.72-1.7-.81-.23-.08-.4-.12-.56.13-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.12-1.04-.38-1.98-1.22-.73-.65-1.23-1.46-1.37-1.7-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.12-.14.16-.25.25-.41.08-.17.04-.31-.02-.44-.06-.12-.56-1.36-.77-1.86-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.87.86-.87 2.09s.9 2.42 1.02 2.59c.12.17 1.78 2.72 4.31 3.81.6.26 1.07.42 1.44.53.6.19 1.15.16 1.59.1.48-.07 1.47-.6 1.68-1.18.2-.58.2-1.08.14-1.18-.06-.1-.23-.16-.48-.28Z" />
                </svg>
                Send Request on WhatsApp
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
