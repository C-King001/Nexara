// Minimal Google Calendar client for the booking API. Authenticates with a
// stored OAuth refresh token (see scripts/google-auth.mjs). Server-only.

import type { Interval } from "./slots.js";

const API = "https://www.googleapis.com/calendar/v3";

const env = (name: string) => {
  const value = process.env[name];
  if (!value) throw new Error(`Missing environment variable ${name}`);
  return value;
};

const calendarId = () => process.env.GOOGLE_CALENDAR_ID || "primary";

// Reused while a function instance stays warm.
let cached: { token: string; expiresAt: number } | null = null;

const accessToken = async () => {
  if (cached && cached.expiresAt > Date.now() + 60_000) return cached.token;
  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    body: new URLSearchParams({
      client_id: env("GOOGLE_CLIENT_ID"),
      client_secret: env("GOOGLE_CLIENT_SECRET"),
      refresh_token: env("GOOGLE_REFRESH_TOKEN"),
      grant_type: "refresh_token",
    }),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(`Google token refresh failed (${res.status}): ${data.error} ${data.error_description ?? ""}`);
  }
  cached = { token: data.access_token, expiresAt: Date.now() + data.expires_in * 1000 };
  return cached.token;
};

const call = async (path: string, method = "GET", body?: unknown) => {
  const res = await fetch(`${API}${path}`, {
    method,
    headers: { Authorization: `Bearer ${await accessToken()}`, "Content-Type": "application/json" },
    body: body === undefined ? undefined : JSON.stringify(body),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(`Google Calendar ${method} ${path} failed (${res.status}): ${JSON.stringify(data)}`);
  return data;
};

export const calendarTimeZone = async (): Promise<string> =>
  (await call(`/calendars/${encodeURIComponent(calendarId())}`)).timeZone;

export const busyBetween = async (from: number, to: number): Promise<Interval[]> => {
  const id = calendarId();
  const data = await call("/freeBusy", "POST", {
    timeMin: new Date(from).toISOString(),
    timeMax: new Date(to).toISOString(),
    items: [{ id }],
  });
  const cal = data.calendars?.[id];
  if (!cal || cal.errors?.length) throw new Error(`freeBusy gave no data for ${id}: ${JSON.stringify(cal?.errors)}`);
  return cal.busy ?? [];
};

// sendUpdates=all makes Google email the invite to attendees.
export const createEvent = (event: object) =>
  call(
    `/calendars/${encodeURIComponent(calendarId())}/events?sendUpdates=all&conferenceDataVersion=1`,
    "POST",
    event,
  );
