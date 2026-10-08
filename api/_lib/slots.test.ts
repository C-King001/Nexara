// @vitest-environment node
import { describe, expect, it } from "vitest";
import { RULES, isFree, isOfferedSlot, slotsForVisitorDate, zonedToUtc } from "./slots";

const iso = (ms: number[]) => ms.map((m) => new Date(m).toISOString());
const at = (s: string) => Date.parse(s);
// Far enough back that notice and window never filter unless a test wants them to.
const now = at("2026-11-02T00:00:00Z");
const summerNow = at("2026-07-01T00:00:00Z");

describe("zonedToUtc", () => {
  it("handles winter and summer offsets", () => {
    expect(new Date(zonedToUtc("2026-11-18", 9 * 60, "Europe/London")).toISOString()).toBe("2026-11-18T09:00:00.000Z");
    expect(new Date(zonedToUtc("2026-07-15", 9 * 60, "Europe/London")).toISOString()).toBe("2026-07-15T08:00:00.000Z");
  });

  it("uses the right offset either side of the clocks going back", () => {
    // UK clocks go back on Sunday 25 October 2026.
    expect(new Date(zonedToUtc("2026-10-23", 9 * 60, "Europe/London")).toISOString()).toBe("2026-10-23T08:00:00.000Z");
    expect(new Date(zonedToUtc("2026-10-26", 9 * 60, "Europe/London")).toISOString()).toBe("2026-10-26T09:00:00.000Z");
  });
});

describe("slotsForVisitorDate", () => {
  it("offers 9:00 to 16:30 on a weekday for a visitor in the same timezone", () => {
    const slots = iso(slotsForVisitorDate("2026-11-18", "Europe/London", "Europe/London", RULES, now));
    expect(slots).toHaveLength(16);
    expect(slots[0]).toBe("2026-11-18T09:00:00.000Z");
    expect(slots[15]).toBe("2026-11-18T16:30:00.000Z");
  });

  it("follows British Summer Time", () => {
    const slots = iso(slotsForVisitorDate("2026-07-15", "Europe/London", "Europe/London", RULES, summerNow));
    expect(slots[0]).toBe("2026-07-15T08:00:00.000Z");
  });

  it("offers nothing at weekends", () => {
    expect(slotsForVisitorDate("2026-11-21", "Europe/London", "Europe/London", RULES, now)).toEqual([]);
  });

  it("maps working hours into a visitor's timezone", () => {
    const slots = iso(slotsForVisitorDate("2026-11-18", "America/New_York", "Europe/London", RULES, now));
    expect(slots).toHaveLength(16);
    expect(slots[0]).toBe("2026-11-18T09:00:00.000Z");
  });

  it("collects slots from two owner days when the visitor's day spans them", () => {
    // Auckland is UTC+13, so its 19 November covers the London afternoon of the 18th and morning of the 19th.
    const slots = iso(slotsForVisitorDate("2026-11-19", "Pacific/Auckland", "Europe/London", RULES, now));
    expect(slots).toHaveLength(16);
    expect(slots[0]).toBe("2026-11-18T11:00:00.000Z");
    expect(slots.at(-1)).toBe("2026-11-19T10:30:00.000Z");
  });

  it("respects minimum notice and the booking window", () => {
    const morning = at("2026-11-18T01:00:00Z");
    const sameDay = iso(slotsForVisitorDate("2026-11-18", "Europe/London", "Europe/London", RULES, morning));
    expect(sameDay[0]).toBe("2026-11-18T13:00:00.000Z");
    expect(slotsForVisitorDate("2026-12-31", "Europe/London", "Europe/London", RULES, now)).toEqual([]);
  });
});

describe("isOfferedSlot", () => {
  it("accepts slots on the grid and rejects everything else", () => {
    expect(isOfferedSlot(at("2026-11-18T09:30:00Z"), "Europe/London", RULES, now)).toBe(true);
    expect(isOfferedSlot(at("2026-11-18T09:15:00Z"), "Europe/London", RULES, now)).toBe(false);
    expect(isOfferedSlot(at("2026-11-18T17:00:00Z"), "Europe/London", RULES, now)).toBe(false);
    expect(isOfferedSlot(at("2026-11-21T10:00:00Z"), "Europe/London", RULES, now)).toBe(false);
  });
});

describe("isFree", () => {
  const busy = [{ start: "2026-11-18T10:00:00Z", end: "2026-11-18T11:00:00Z" }];

  it("rejects overlaps but allows back-to-back slots", () => {
    expect(isFree(at("2026-11-18T10:30:00Z"), RULES, busy)).toBe(false);
    expect(isFree(at("2026-11-18T09:45:00Z"), RULES, busy)).toBe(false);
    expect(isFree(at("2026-11-18T09:30:00Z"), RULES, busy)).toBe(true);
    expect(isFree(at("2026-11-18T11:00:00Z"), RULES, busy)).toBe(true);
  });
});
