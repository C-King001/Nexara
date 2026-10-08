// Screenshots /fn and /work against a local preview build and runs axe on both.
// Run: npx vite preview --port 4173   (in another terminal), then
//      node scripts/verify-work-pages.mjs

import { chromium } from "playwright";
import { existsSync, mkdirSync, readFileSync } from "node:fs";
import { homedir, tmpdir } from "node:os";

const installed = `${homedir()}/AppData/Local/ms-playwright/chromium_headless_shell-1228/chrome-headless-shell-win64/chrome-headless-shell.exe`;
const launchOptions = existsSync(installed) ? { executablePath: installed } : {};
const axeSource = readFileSync("node_modules/axe-core/axe.min.js", "utf8");
const base = process.env.BASE_URL ?? "http://localhost:4173";
const out = process.env.OUT_DIR ?? `${tmpdir()}/work-verify`;

mkdirSync(out, { recursive: true });

const browser = await chromium.launch(launchOptions);

const shots = [
  { name: "fn-websites-strip", url: `${base}/fn`, width: 1440, height: 900, scrollTo: ".fn3-site-card" },
  { name: "work-websites", url: `${base}/work?tab=websites`, width: 1440, height: 900 },
  { name: "work-websites-mobile", url: `${base}/work?tab=websites`, width: 390, height: 844 },
  { name: "fn-websites-strip-mobile", url: `${base}/fn`, width: 390, height: 844, scrollTo: ".fn3-site-card" },
];

for (const shot of shots) {
  const page = await browser.newPage({ viewport: { width: shot.width, height: shot.height } });
  await page.goto(shot.url, { waitUntil: "networkidle", timeout: 60_000 });
  if (shot.scrollTo) {
    // The marquee never stops moving, so scroll by position rather than waiting
    // for the element to be stable.
    await page.evaluate((sel) => {
      const el = document.querySelector(sel);
      if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 140, behavior: "instant" });
    }, shot.scrollTo);
    await page.waitForTimeout(1500);
  }
  await page.waitForTimeout(1500);
  await page.screenshot({ path: `${out}/${shot.name}.png` });
  console.log(`shot: ${out}/${shot.name}.png`);
  await page.close();
}

const pages = [`${base}/fn`, `${base}/work?tab=websites`];
for (const { url, theme } of pages.flatMap((url) => [{ url, theme: "light" }, { url, theme: "dark" }])) {
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.addInitScript((t) => localStorage.setItem("fn-theme", t), theme);
  await page.goto(url, { waitUntil: "networkidle", timeout: 60_000 });
  await page.addScriptTag({ content: axeSource });
  const results = await page.evaluate(async () =>
    // @ts-ignore - axe is injected above
    (await window.axe.run(document, { runOnly: ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"] })).violations.map((v) => ({
      id: v.id,
      impact: v.impact,
      nodes: v.nodes.length,
      target: v.nodes[0]?.target?.[0],
      help: v.help,
    })),
  );
  console.log(`\naxe ${url} [${theme}]: ${results.length} violation types`);
  for (const v of results) console.log(` - [${v.impact}] ${v.id} (${v.nodes}) ${v.target} — ${v.help}`);
  await page.close();
}

await browser.close();
