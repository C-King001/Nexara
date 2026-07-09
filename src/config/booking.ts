// Central config for the in-app booking flow.
//
// The booking UI talks to two n8n webhooks. Until those are live, leave the
// URLs blank and the UI falls back to the Calendly link automatically, so the
// site is never broken.
//
// To go live: paste your n8n Production webhook URLs below (or set the matching
// VITE_ env vars in Vercel), then the CTAs can be switched from Calendly to /book.
//
// ── Webhook contract the n8n side must implement ─────────────────────────────
// availabilityUrl  POST { date: "YYYY-MM-DD", timezone: "Area/City" }
//                  -> 200 { slots: string[] }   // each slot an ISO-8601 UTC start time
//
// bookingUrl       POST { start, name, email, business, phone, goal, timezone }
//                  -> 200 { ok: true }  |  { ok: false, error: string }
//                  (start = the ISO-8601 UTC slot the visitor chose)
// ─────────────────────────────────────────────────────────────────────────────

export const BOOKING = {
  availabilityUrl:
    (import.meta.env.VITE_BOOKING_AVAILABILITY_URL as string | undefined) ?? "",
  bookingUrl:
    (import.meta.env.VITE_BOOKING_CREATE_URL as string | undefined) ?? "",

  // Call length shown in the UI (minutes). Matches the free audit offer.
  callLengthMin: 30,

  // How many days ahead visitors may book.
  bookingWindowDays: 21,

  // Days of week that are never bookable (0 = Sun … 6 = Sat). Real per-day
  // availability still comes from your Google Calendar via n8n; this only hides
  // obviously-off days in the date picker for a cleaner first impression.
  disabledWeekdays: [0, 6],

  // Shown to the visitor while their booking is created.
  fallbackCalendly:
    "https://calendly.com/faithfulnyama/30-minute-one-on-one-meeting",
} as const;

export const isBookingBackendLive = () =>
  BOOKING.availabilityUrl.length > 0 && BOOKING.bookingUrl.length > 0;
