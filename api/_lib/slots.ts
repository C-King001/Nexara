// Scheduling rules and slot maths for the booking API. No I/O, so it is unit
// tested directly. Folders starting with "_" are not deployed as functions.

export const RULES = {
  // Working hours, read in your Google Calendar's own timezone.
  workDays: [1, 2, 3, 4, 5], // 0 = Sun … 6 = Sat
  startHour: 9,
  endHour: 17, // the last slot ends here
  slotMinutes: 30, // keep in sync with callLengthMin in src/config/booking.ts
  minNoticeHours: 12,
  windowDays: 21, // keep in sync with bookingWindowDays in src/config/booking.ts
};

export type Rules = typeof RULES;

// Shape of a busy block in a Google freeBusy response.
export interface Interval {
  start: string;
  end: string;
}

const MINUTE = 60_000;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;

export const isValidDate = (date: unknown): date is string =>
  typeof date === "string" &&
  /^\d{4}-\d{2}-\d{2}$/.test(date) &&
  !Number.isNaN(Date.parse(`${date}T00:00:00Z`));

export const isValidTimeZone = (tz: unknown): tz is string => {
  if (typeof tz !== "string" || tz.length === 0) return false;
  try {
    new Intl.DateTimeFormat("en-US", { timeZone: tz });
    return true;
  } catch {
    return false;
  }
};

// The wall-clock reading in `tz` at instant `ms`, encoded as if it were UTC.
const wallClock = (ms: number, tz: string) => {
  const parts = Object.fromEntries(
    new Intl.DateTimeFormat("en-US", {
      timeZone: tz,
      hourCycle: "h23",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    })
      .formatToParts(new Date(ms))
      .map((p) => [p.type, p.value]),
  );
  return Date.UTC(+parts.year, +parts.month - 1, +parts.day, +parts.hour, +parts.minute, +parts.second);
};

const offset = (ms: number, tz: string) => wallClock(ms, tz) - (ms - (ms % 1000));

// The instant at which the clock in `tz` reads `date` plus `minutes` past midnight.
export const zonedToUtc = (date: string, minutes: number, tz: string): number => {
  const [y, m, d] = date.split("-").map(Number);
  const asUtc = Date.UTC(y, m - 1, d, 0, minutes);
  const guess = asUtc - offset(asUtc, tz);
  return asUtc - offset(guess, tz); // second pass corrects across DST changes
};

export const dateInZone = (ms: number, tz: string) =>
  new Date(wallClock(ms, tz)).toISOString().slice(0, 10);

const addDays = (date: string, n: number) =>
  new Date(Date.parse(`${date}T00:00:00Z`) + n * DAY).toISOString().slice(0, 10);

const weekday = (date: string) => new Date(`${date}T00:00:00Z`).getUTCDay();

// Every slot start on one date in the owner's timezone, before notice/window/busy checks.
const ownerDaySlots = (ownerDate: string, ownerTz: string, rules: Rules): number[] => {
  if (!rules.workDays.includes(weekday(ownerDate))) return [];
  const out: number[] = [];
  for (let min = rules.startHour * 60; min + rules.slotMinutes <= rules.endHour * 60; min += rules.slotMinutes) {
    out.push(zonedToUtc(ownerDate, min, ownerTz));
  }
  return out;
};

// The page lets visitors pick up to `windowDays` ahead, so allow that whole last day.
const inBookableRange = (ms: number, rules: Rules, now: number) =>
  ms >= now + rules.minNoticeHours * HOUR && ms < now + (rules.windowDays + 1) * DAY;

// Slot starts that fall on `date` as the visitor sees it in their own timezone.
export const slotsForVisitorDate = (
  date: string,
  visitorTz: string,
  ownerTz: string,
  rules: Rules,
  now: number,
): number[] => {
  const from = zonedToUtc(date, 0, visitorTz);
  const to = zonedToUtc(addDays(date, 1), 0, visitorTz);
  const lastOwnerDate = dateInZone(to - 1, ownerTz);
  const out: number[] = [];
  for (let d = dateInZone(from, ownerTz); d <= lastOwnerDate; d = addDays(d, 1)) {
    for (const ms of ownerDaySlots(d, ownerTz, rules)) {
      if (ms >= from && ms < to && inBookableRange(ms, rules, now)) out.push(ms);
    }
  }
  return out;
};

export const isOfferedSlot = (ms: number, ownerTz: string, rules: Rules, now: number) =>
  ownerDaySlots(dateInZone(ms, ownerTz), ownerTz, rules).includes(ms) && inBookableRange(ms, rules, now);

export const isFree = (ms: number, rules: Rules, busy: Interval[]) => {
  const end = ms + rules.slotMinutes * MINUTE;
  return busy.every((b) => Date.parse(b.end) <= ms || Date.parse(b.start) >= end);
};
