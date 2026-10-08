// Screenshots the live sites listed in SITES into public/images/websites/ and
// prints each page's real title/description so the cards can be written from fact.
//
// Run: node scripts/capture-sites.mjs

import { chromium } from "playwright";
import { existsSync, mkdirSync } from "node:fs";
import { homedir } from "node:os";

// The installed browser build can be newer than the one this Playwright version
// expects, so use it directly when it is there.
const installed = `${homedir()}/AppData/Local/ms-playwright/chromium_headless_shell-1228/chrome-headless-shell-win64/chrome-headless-shell.exe`;
const launchOptions = existsSync(installed) ? { executablePath: installed } : {};

// Optional: node scripts/capture-sites.mjs wigpa meji — recapture only those.
const only = process.argv.slice(2);

const SITES = [
  ["expertlinc", "https://www.expertlinc.com/"],
  ["expertlinc-experience", "https://www.expertlinc.com/experience"],
  ["moodring", "https://moodring-five.vercel.app/"],
  ["wigpa", "https://www.wigpa.org/"],
  ["nexara", "https://nexaraai.tech/"],
  ["nexara-fn", "https://nexaraai.tech/fn"],
  ["meji", "https://meji-eight.vercel.app/"],
  ["momsandmore", "https://momsandmore.com.ng/"],
];

const dir = "public/images/websites";
mkdirSync(dir, { recursive: true });

const browser = await chromium.launch(launchOptions);
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

for (const [slug, url] of SITES.filter(([s]) => only.length === 0 || only.includes(s))) {
  try {
    await page.goto(url, { waitUntil: "domcontentloaded", timeout: 45_000 });
    await page.waitForTimeout(4000); // let fonts, hero images and entry animations settle
    // Clear cookie banners so they stay out of the screenshots.
    for (const label of [/^accept/i, /necessary only/i, /^got it/i, /^i agree/i]) {
      const button = page.getByRole("button", { name: label }).first();
      if (await button.isVisible().catch(() => false)) {
        await button.click().catch(() => {});
        await page.waitForTimeout(1000);
        break;
      }
    }
    await page.screenshot({ path: `${dir}/${slug}.jpg`, type: "jpeg", quality: 82 });
    const facts = await page.evaluate(() => ({
      title: document.title,
      description: document.querySelector('meta[name="description"]')?.content ?? "",
      og: document.querySelector('meta[property="og:description"]')?.content ?? "",
      h1: [...document.querySelectorAll("h1")].map((h) => h.innerText.trim()).slice(0, 3),
      h2: [...document.querySelectorAll("h2")].map((h) => h.innerText.trim()).slice(0, 8),
      nav: [...document.querySelectorAll("nav a")].map((a) => a.innerText.trim()).filter(Boolean).slice(0, 10),
      stack: {
        next: !!document.querySelector('#__next, script[src*="/_next/"]'),
        vite: [...document.scripts].some((s) => /\/assets\/index-[\w-]+\.js/.test(s.src)),
        wordpress: !!document.querySelector('link[href*="wp-content"], script[src*="wp-includes"]'),
        squarespace: !!document.querySelector('script[src*="squarespace"]'),
        wix: !!document.querySelector('script[src*="wix"], meta[name="generator"][content*="Wix"]'),
        shopify: !!document.querySelector('script[src*="cdn.shopify"]'),
      },
      body: document.body.innerText.replace(/\s+/g, " ").trim().slice(0, 700),
    }));
    console.log(JSON.stringify({ slug, url, ...facts }, null, 1));
  } catch (err) {
    console.log(JSON.stringify({ slug, url, error: String(err).split("\n")[0] }));
  }
}

await browser.close();
