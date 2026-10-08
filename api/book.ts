// POST { start, name, email, business, phone, goal, timezone }
//   -> { ok: true } | { ok: false, error: string }
// Re-checks the slot against the calendar, then creates the event. Google emails
// the visitor the invite, with a Meet link.

import { busyBetween, calendarTimeZone, createEvent } from "./_lib/google.js";
import { RULES, isFree, isOfferedSlot, isValidTimeZone } from "./_lib/slots.js";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const text = (value: unknown, max: number) => (typeof value === "string" ? value.trim().slice(0, max) : "");

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const start = typeof body?.start === "string" ? Date.parse(body.start) : NaN;
  const name = text(body?.name, 100);
  const email = text(body?.email, 254);
  if (Number.isNaN(start) || name.length < 2 || !EMAIL_RE.test(email)) {
    return Response.json({ ok: false, error: "A slot, a name and a valid email are required." }, { status: 400 });
  }

  try {
    const end = start + RULES.slotMinutes * 60_000;
    const ownerTz = await calendarTimeZone();
    if (!isOfferedSlot(start, ownerTz, RULES, Date.now()) || !isFree(start, RULES, await busyBetween(start, end))) {
      return Response.json({ ok: false, error: "That time is no longer available." }, { status: 409 });
    }

    await createEvent({
      summary: `Nexara audit call: ${name}`,
      description: [
        `Name: ${name}`,
        `Email: ${email}`,
        `Business: ${text(body.business, 200) || "-"}`,
        `Phone: ${text(body.phone, 50) || "-"}`,
        `Goal: ${text(body.goal, 2000) || "-"}`,
        `Visitor timezone: ${isValidTimeZone(body.timezone) ? body.timezone : "-"}`,
        "",
        "Booked through /book on the website.",
      ].join("\n"),
      start: { dateTime: new Date(start).toISOString() },
      end: { dateTime: new Date(end).toISOString() },
      attendees: [{ email, displayName: name }],
      conferenceData: {
        createRequest: { requestId: crypto.randomUUID(), conferenceSolutionKey: { type: "hangoutsMeet" } },
      },
    });
    return Response.json({ ok: true });
  } catch (err) {
    console.error("booking failed", err);
    return Response.json({ ok: false, error: "Could not create the booking." }, { status: 502 });
  }
}
