// One-time helper: gets the Google refresh token the booking API uses and
// saves it into .env.local, so it never has to be copied by hand or shown on screen.
//
// 1. Put GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET (from a "Desktop app" OAuth
//    client) in .env.local
// 2. node --env-file=.env.local scripts/google-auth.mjs
// 3. Open the printed link and approve access with the Google account whose
//    calendar should take bookings.

import http from "node:http";
import { existsSync, readFileSync, writeFileSync } from "node:fs";

const { GOOGLE_CLIENT_ID: clientId, GOOGLE_CLIENT_SECRET: clientSecret } = process.env;
if (!clientId || !clientSecret) {
  console.error("GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET are missing. Add them to .env.local and run:");
  console.error("  node --env-file=.env.local scripts/google-auth.mjs");
  process.exit(1);
}

const PORT = 53682;
const redirectUri = `http://127.0.0.1:${PORT}`;
const authUrl =
  "https://accounts.google.com/o/oauth2/v2/auth?" +
  new URLSearchParams({
    client_id: clientId,
    redirect_uri: redirectUri,
    response_type: "code",
    scope: [
      "https://www.googleapis.com/auth/calendar.readonly",
      "https://www.googleapis.com/auth/calendar.events",
    ].join(" "),
    access_type: "offline",
    prompt: "consent",
  });

const saveToEnvLocal = (token) => {
  const file = ".env.local";
  const lines = existsSync(file) ? readFileSync(file, "utf8").split(/\r?\n/) : [];
  const kept = lines.filter((line) => !line.startsWith("GOOGLE_REFRESH_TOKEN="));
  while (kept.length && kept.at(-1) === "") kept.pop();
  writeFileSync(file, [...kept, `GOOGLE_REFRESH_TOKEN=${token}`, ""].join("\n"));
};

const server = http.createServer(async (req, res) => {
  const params = new URL(req.url, redirectUri).searchParams;
  const code = params.get("code");
  if (!code) {
    res.writeHead(400, { "Content-Type": "text/plain" }).end(params.get("error") ?? "No authorisation code received.");
    return;
  }

  const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    body: new URLSearchParams({
      code,
      client_id: clientId,
      client_secret: clientSecret,
      redirect_uri: redirectUri,
      grant_type: "authorization_code",
    }),
  });
  const data = await tokenRes.json();

  if (!data.refresh_token) {
    console.error("Google did not return a refresh token:", data.error, data.error_description ?? "");
    res.writeHead(500, { "Content-Type": "text/plain" }).end("That didn't work. Check the terminal for the reason.");
    process.exitCode = 1;
  } else {
    saveToEnvLocal(data.refresh_token);
    console.log("Saved GOOGLE_REFRESH_TOKEN to .env.local.");
    console.log("Next: copy it from .env.local into Vercel (Settings > Environment Variables).");
    res.writeHead(200, { "Content-Type": "text/plain" }).end("Done. Close this tab and go back to the terminal.");
  }
  server.close();
});

server.listen(PORT, "127.0.0.1", () => {
  console.log(`Open this link and approve access:\n\n${authUrl}\n`);
});
