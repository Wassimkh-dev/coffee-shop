import { siteConfig } from "@/lib/site-config";

export type EventRequest = {
  eventType: string;
  name: string;
  phone: string;
  date: string;
  time: string;
  guests: string;
  notes: string;
};

/**
 * Builds the prefilled WhatsApp link for an event/reservation request.
 * The message format is intentionally plain text so it reads cleanly
 * in WhatsApp on any device.
 */
export function buildEventRequestUrl(details: EventRequest): string {
  const message = [
    "Hello The Lawn Cafe,",
    "",
    "I would like to request an event/reservation.",
    "",
    `Event type: ${details.eventType}`,
    `Name: ${details.name}`,
    `Phone: ${details.phone}`,
    `Date: ${details.date}`,
    `Time: ${details.time || "—"}`,
    `Number of guests: ${details.guests}`,
    `Notes: ${details.notes || "—"}`,
    "",
    "Thank you.",
  ].join("\n");

  return `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(
    message
  )}`;
}
