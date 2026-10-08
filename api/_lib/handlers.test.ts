// @vitest-environment node
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { POST as availability } from "../availability";
import { POST as book } from "../book";

const post = (body: unknown) =>
  new Request("http://localhost/api", { method: "POST", body: JSON.stringify(body) });

let busy: { start: string; end: string }[];
let inserted: { url: string; body: any }[];
let calendarFails: boolean;

beforeEach(() => {
  process.env.GOOGLE_CLIENT_ID = "client";
  process.env.GOOGLE_CLIENT_SECRET = "secret";
  process.env.GOOGLE_REFRESH_TOKEN = "refresh";
  vi.useFakeTimers({ toFake: ["Date"] });
  vi.setSystemTime(new Date("2026-11-16T08:00:00Z"));
  busy = [];
  inserted = [];
  calendarFails = false;

  vi.stubGlobal(
    "fetch",
    vi.fn(async (input: string, init?: RequestInit) => {
      const url = String(input);
      if (url === "https://oauth2.googleapis.com/token") return Response.json({ access_token: "tok", expires_in: 3600 });
      if (url.endsWith("/calendars/primary")) {
        return calendarFails
          ? Response.json({ error: { message: "nope" } }, { status: 403 })
          : Response.json({ timeZone: "Europe/London" });
      }
      if (url.endsWith("/freeBusy")) return Response.json({ calendars: { primary: { busy } } });
      if (url.includes("/calendars/primary/events?")) {
        inserted.push({ url, body: JSON.parse(String(init?.body)) });
        return Response.json({ id: "event" });
      }
      return new Response("unexpected request", { status: 500 });
    }),
  );
});

afterEach(() => {
  vi.useRealTimers();
  vi.unstubAllGlobals();
});

describe("POST /api/availability", () => {
  it("returns free slots, minus busy time", async () => {
    busy = [{ start: "2026-11-18T10:00:00Z", end: "2026-11-18T11:00:00Z" }];
    const res = await availability(post({ date: "2026-11-18", timezone: "Europe/London" }));
    const { slots } = await res.json();
    expect(res.status).toBe(200);
    expect(slots).toHaveLength(14);
    expect(slots).not.toContain("2026-11-18T10:00:00.000Z");
    expect(slots).not.toContain("2026-11-18T10:30:00.000Z");
  });

  it("rejects bad input", async () => {
    expect((await availability(post({ date: "18/11/2026", timezone: "Europe/London" }))).status).toBe(400);
    expect((await availability(post({ date: "2026-11-18", timezone: "Mars/Olympus" }))).status).toBe(400);
  });

  it("reports a calendar failure as 502", async () => {
    calendarFails = true;
    vi.spyOn(console, "error").mockImplementation(() => {});
    expect((await availability(post({ date: "2026-11-18", timezone: "Europe/London" }))).status).toBe(502);
  });
});

describe("POST /api/book", () => {
  const booking = {
    start: "2026-11-18T09:30:00.000Z",
    name: "Ada Lovelace",
    email: "ada@example.com",
    business: "Engines Ltd",
    phone: "",
    goal: "Answer leads faster",
    timezone: "Europe/London",
  };

  it("creates the event and has Google email the invite", async () => {
    const res = await book(post(booking));
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ ok: true });
    expect(inserted).toHaveLength(1);
    expect(inserted[0].url).toContain("sendUpdates=all");
    expect(inserted[0].body.attendees).toEqual([{ email: "ada@example.com", displayName: "Ada Lovelace" }]);
    expect(inserted[0].body.start.dateTime).toBe("2026-11-18T09:30:00.000Z");
    expect(inserted[0].body.end.dateTime).toBe("2026-11-18T10:00:00.000Z");
    expect(inserted[0].body.description).toContain("Engines Ltd");
  });

  it("refuses a slot that has been taken", async () => {
    busy = [{ start: "2026-11-18T09:00:00Z", end: "2026-11-18T10:00:00Z" }];
    const res = await book(post(booking));
    expect(res.status).toBe(409);
    expect((await res.json()).ok).toBe(false);
    expect(inserted).toHaveLength(0);
  });

  it("refuses times that were never offered", async () => {
    expect((await book(post({ ...booking, start: "2026-11-18T09:15:00.000Z" }))).status).toBe(409);
    expect((await book(post({ ...booking, start: "2026-11-21T10:00:00.000Z" }))).status).toBe(409);
    expect(inserted).toHaveLength(0);
  });

  it("rejects missing details", async () => {
    expect((await book(post({ ...booking, email: "not-an-email" }))).status).toBe(400);
    expect((await book(post({ ...booking, start: undefined }))).status).toBe(400);
  });
});
