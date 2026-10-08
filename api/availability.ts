// POST { date: "YYYY-MM-DD", timezone: "Area/City" } -> { slots: string[] }
// Open slots on that date as the visitor sees it, read live from Google Calendar.

import { busyBetween, calendarTimeZone } from "./_lib/google.js";
import { RULES, isFree, isValidDate, isValidTimeZone, slotsForVisitorDate } from "./_lib/slots.js";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  if (!isValidDate(body?.date) || !isValidTimeZone(body?.timezone)) {
    return Response.json({ error: "Send a date as YYYY-MM-DD and an IANA timezone." }, { status: 400 });
  }

  try {
    const ownerTz = await calendarTimeZone();
    const candidates = slotsForVisitorDate(body.date, body.timezone, ownerTz, RULES, Date.now());
    let slots: string[] = [];
    if (candidates.length > 0) {
      const busy = await busyBetween(candidates[0], candidates[candidates.length - 1] + RULES.slotMinutes * 60_000);
      slots = candidates.filter((ms) => isFree(ms, RULES, busy)).map((ms) => new Date(ms).toISOString());
    }
    return Response.json({ slots }, { headers: { "Cache-Control": "no-store" } });
  } catch (err) {
    console.error("availability failed", err);
    return Response.json({ error: "Could not read the calendar." }, { status: 502 });
  }
}
