import { useEffect, useRef, useState } from "react";
import type { CSSProperties, FormEvent, SyntheticEvent } from "react";
import { Link } from "react-router-dom";
import { ArrowDown, ArrowRight, ArrowUpRight, Check, Pause, Play, Plus, X } from "lucide-react";
import { WEBSITES } from "@/data/websites";

// The Websites offer page. Own design (ws- prefix), own navbar, same idea as
// /social-media: this audience only sees this world. The page borrows its colour
// from whichever site is on screen, so the range of the work is the design.

const STYLES = `
@import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,500;12..96,700;12..96,800&family=Instrument+Sans:wght@400;500;600&display=swap');

.ws {
  --ink: #0d0e12; --paper: #f2f3f5; --white: #ffffff; --cobalt: #2a2bff; --line: rgba(13,14,18,.14);
  --gutter: clamp(16px, 4vw, 56px);
  background: var(--paper); color: var(--ink);
  font-family: 'Instrument Sans', system-ui, sans-serif; font-size: 17px; line-height: 1.55;
  -webkit-font-smoothing: antialiased; overflow-x: clip;
}
.ws *, .ws *::before, .ws *::after { box-sizing: border-box; }
.ws img, .ws video { display: block; max-width: 100%; }
:where(.ws a) { color: inherit; }
.ws :focus-visible { outline: 3px solid currentColor; outline-offset: 3px; border-radius: 4px; }
.ws-display { font-family: 'Bricolage Grotesque', 'Instrument Sans', sans-serif; font-weight: 700; letter-spacing: -.02em; line-height: 1; margin: 0; text-wrap: balance; }
.ws-h2 { font-size: clamp(2.5rem, 7vw, 5.75rem); }
.ws-h3 { font-family: 'Bricolage Grotesque', sans-serif; font-weight: 700; letter-spacing: -.02em; line-height: 1.1; font-size: 1.6rem; margin: 0; }
.ws-eyebrow { font-weight: 600; font-size: .875rem; margin: 0 0 16px; }
.ws-lede { font-size: clamp(1.1rem, 1.6vw, 1.3rem); line-height: 1.45; max-width: 36em; margin: 20px 0 0; }
.ws-wrap { max-width: 1440px; margin: 0 auto; padding-inline: var(--gutter); }
.ws-section { padding-block: clamp(72px, 11vw, 160px); }

/* Buttons */
.ws-btn { display: inline-flex; align-items: center; justify-content: center; gap: 10px; min-height: 52px; padding: 12px 24px; border-radius: 999px; font: inherit; font-weight: 600; text-decoration: none; border: 1.5px solid transparent; cursor: pointer; transition: transform .2s ease, background-color .2s ease, color .2s ease; }
.ws-btn:hover { transform: translateY(-2px); }
.ws-btn-solid { background: var(--fg, var(--ink)); color: var(--bg, var(--white)); }
.ws-btn-ghost { background: transparent; color: inherit; border-color: currentColor; }
.ws-toggle { display: inline-flex; align-items: center; gap: 8px; min-height: 44px; padding: 8px 16px; border-radius: 999px; font: inherit; font-size: .9375rem; font-weight: 600; cursor: pointer; background: transparent; color: inherit; border: 1.5px solid currentColor; transition: background-color .2s ease, color .2s ease, border-color .2s ease; }
.ws-toggle[aria-pressed="true"] { background: var(--cobalt); border-color: var(--cobalt); color: #fff; }

/* Nav */
.ws-nav { position: fixed; z-index: 40; top: 12px; left: 50%; transform: translateX(-50%); width: min(1120px, calc(100% - 24px)); display: flex; align-items: center; justify-content: space-between; gap: 16px; padding: 6px 6px 6px 20px; border-radius: 999px; background: var(--ink); color: #fff; }
.ws-nav-brand { font-family: 'Bricolage Grotesque', sans-serif; font-weight: 800; font-size: 1.125rem; letter-spacing: -.02em; text-decoration: none; min-height: 44px; display: inline-flex; align-items: center; gap: 8px; }
.ws-nav-brand span { font-weight: 500; opacity: .7; }
.ws-nav-links { display: none; gap: 28px; font-size: .9375rem; }
.ws-nav-links a { text-decoration: none; opacity: .8; transition: opacity .2s ease; }
.ws-nav-links a:hover { opacity: 1; }
.ws-nav-cta { display: inline-flex; align-items: center; min-height: 44px; padding: 8px 20px; border-radius: 999px; background: #fff; color: var(--ink) !important; font-weight: 600; font-size: .9375rem; text-decoration: none; white-space: nowrap; }
@media (min-width: 860px) { .ws-nav-links { display: flex; } }

/* Hero */
.ws-hero { --bg: #6b1d0a; --fg: #fff; display: flex; flex-direction: column; height: max(100svh, 780px); overflow: hidden; padding-top: 96px; background: var(--bg); color: var(--fg); transition: background-color .9s ease, color .9s ease; }
.ws-hero h1 { font-size: clamp(3rem, min(13.4vw, 19svh), 10.5rem); line-height: .94; letter-spacing: -.025em; }
.ws-hero-row { display: flex; flex-wrap: wrap; align-items: flex-end; justify-content: space-between; gap: 20px 40px; margin-top: 24px; }
.ws-hero-sub { font-size: clamp(1.1rem, 1.6vw, 1.3rem); line-height: 1.4; max-width: 31em; margin: 0; }
.ws-hero-cta { display: flex; flex-wrap: wrap; gap: 10px; }
.ws-now { display: flex; align-items: center; justify-content: space-between; gap: 16px; margin-top: 20px; font-size: .9375rem; min-height: 44px; }
.ws-now b { font-weight: 600; }
.ws-now-ctl { display: flex; align-items: center; }
.ws-dot { width: 26px; height: 44px; padding: 0; background: none; border: 0; cursor: pointer; color: inherit; display: inline-flex; align-items: center; justify-content: center; }
.ws-dot i { display: block; width: 18px; height: 3px; border-radius: 2px; background: currentColor; opacity: .3; transition: opacity .3s ease; }
.ws-dot[aria-current="true"] i { opacity: 1; }
.ws-pause { width: 44px; height: 44px; background: none; border: 0; color: inherit; cursor: pointer; display: inline-flex; align-items: center; justify-content: center; }
.ws-stage { position: relative; flex: 1; min-height: 0; margin-top: 8px; }
.ws-stage-inner { position: absolute; top: 0; left: 50%; transform: translateX(-50%); width: min(1180px, calc(100% - 2 * var(--gutter))); }
.ws-stack { position: relative; aspect-ratio: 16 / 10; background: #000; }
.ws-stack img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; object-position: top; opacity: 0; transition: opacity .9s ease; }
.ws-stack img.on { opacity: 1; }
.ws-stack-phone { aspect-ratio: 390 / 844; }

/* Device frames */
.ws-browser { border-radius: 14px 14px 0 0; overflow: hidden; background: #fff; box-shadow: 0 30px 90px rgba(0,0,0,.35); }
.ws-browser.closed { border-radius: 14px; }
.ws-bar { display: flex; align-items: center; gap: 12px; height: 38px; padding-inline: 14px; background: #f1f1f3; color: #55585f; font-size: .8125rem; }
.ws-bar i { display: block; width: 10px; height: 10px; border-radius: 50%; background: #cfd0d4; box-shadow: 16px 0 0 #cfd0d4, 32px 0 0 #cfd0d4; margin-right: 34px; flex: none; }
.ws-bar span { white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.ws-phone { position: absolute; right: 3%; width: clamp(92px, 17%, 200px); border-radius: clamp(14px, 2.4vw, 30px); border: clamp(3px, .5vw, 6px) solid #0b0b0d; overflow: hidden; background: #000; box-shadow: 0 24px 60px rgba(0,0,0,.4); }
.ws-hero .ws-phone { top: 12%; }

/* The argument */
.ws-why-grid { display: grid; gap: 40px; }
.ws-qs { list-style: none; margin: 0; padding: 0; }
.ws-qs li { display: grid; gap: 4px; padding-block: 22px; border-top: 1px solid var(--line); }
.ws-qs b { font-family: 'Bricolage Grotesque', sans-serif; font-weight: 700; font-size: clamp(1.5rem, 3vw, 2.25rem); letter-spacing: -.025em; line-height: 1.1; }
@media (min-width: 960px) { .ws-why-grid { grid-template-columns: 1.25fr 1fr; gap: 80px; align-items: end; } }

/* Work: the section takes on the colour of the project in view */
.ws-work { --bg: #6b1d0a; --fg: #fff; --ac: #ffb23e; background: var(--bg); color: var(--fg); transition: background-color .7s ease, color .7s ease; padding-block: clamp(72px, 10vw, 140px) clamp(48px, 7vw, 96px); }
.ws-project { padding-block: clamp(56px, 8vw, 120px); }
.ws-project-head { display: flex; flex-wrap: wrap; align-items: baseline; justify-content: space-between; gap: 20px; margin-bottom: clamp(20px, 3vw, 36px); }
.ws-project-head h3 { font-size: clamp(2.75rem, 10vw, 9rem); line-height: .95; letter-spacing: -.025em; }
.ws-project-kind { font-weight: 600; font-size: .9375rem; white-space: nowrap; color: var(--ac); transition: color .7s ease; }
.ws-shot { position: relative; display: block; text-decoration: none; padding-bottom: clamp(16px, 3vw, 40px); }
.ws-shot img { width: 100%; height: auto; }
.ws-shot .ws-phone { bottom: 0; }
.ws-shot .ws-browser { transition: transform .35s ease; }
.ws-shot:hover .ws-browser { transform: translateY(-4px); }
.ws-project-body { display: grid; gap: 24px; margin-top: clamp(24px, 4vw, 48px); }
.ws-job { font-size: .875rem; font-weight: 600; color: var(--ac); transition: color .7s ease; margin: 0 0 6px; }
.ws-job-line { font-family: 'Bricolage Grotesque', sans-serif; font-weight: 700; font-size: clamp(1.6rem, 3.2vw, 2.75rem); line-height: 1.05; letter-spacing: -.03em; margin: 0; text-wrap: balance; }
.ws-project-copy p { margin: 0 0 18px; max-width: 38em; }
.ws-link { display: inline-flex; align-items: center; gap: 6px; font-weight: 600; min-height: 44px; text-underline-offset: 4px; }
.ws-also { padding-top: clamp(24px, 4vw, 48px); border-top: 1px solid color-mix(in srgb, currentColor 25%, transparent); font-size: 1rem; }
.ws-also a { font-weight: 600; text-underline-offset: 4px; }
@media (min-width: 860px) { .ws-project-body { grid-template-columns: 1fr 1fr; gap: 64px; } }

/* Offer */
.ws-builds { margin-top: clamp(40px, 6vw, 72px); border-bottom: 1px solid var(--line); }
.ws-build { display: grid; gap: 20px; padding-block: clamp(28px, 4vw, 48px); border-top: 1px solid var(--line); }
.ws-build h3 { font-size: clamp(2.25rem, 4.6vw, 4rem); }
.ws-build-for { margin: 12px 0 0; max-width: 24em; }
.ws-build ul { list-style: none; margin: 0; padding: 0; display: grid; gap: 8px; }
.ws-build li { display: grid; grid-template-columns: 20px 1fr; gap: 8px; }
.ws-build li svg { margin-top: 5px; color: var(--cobalt); }
.ws-build-side { display: flex; flex-direction: column; align-items: flex-start; gap: 14px; font-size: .9375rem; }
.ws-build-side p { margin: 0; }
.ws-build-side a { font-weight: 600; text-underline-offset: 3px; }
.ws-build-price { font-weight: 600; }
.ws-all { display: grid; gap: 20px; margin-top: clamp(32px, 5vw, 56px); padding: clamp(24px, 3vw, 40px); background: var(--white); border-radius: 20px; }
.ws-all ul { list-style: none; margin: 0; padding: 0; display: grid; gap: 10px 32px; }
.ws-all li { display: grid; grid-template-columns: 20px 1fr; gap: 8px; }
.ws-all li svg { margin-top: 5px; color: var(--cobalt); }
@media (min-width: 720px) { .ws-all ul { grid-template-columns: 1fr 1fr; } }
@media (min-width: 1000px) {
  .ws-build { grid-template-columns: 1.1fr 1.1fr .8fr; gap: 48px; }
  .ws-all { grid-template-columns: 1fr 2.4fr; }
}

/* Add-ons */
.ws-addons { background: var(--ink); color: #fff; --line: rgba(255,255,255,.14); }
.ws-grid { display: grid; gap: 14px; margin-top: clamp(40px, 6vw, 72px); }
.ws-card { background: #191b22; border-radius: 20px; padding: clamp(20px, 2.4vw, 32px); display: flex; flex-direction: column; gap: 16px; min-width: 0; }
.ws-card p { margin: 0; color: rgba(255,255,255,.78); }
.ws-card-foot { display: flex; flex-wrap: wrap; align-items: center; gap: 10px 16px; margin-top: auto; padding-top: 4px; }
.ws-source { font-size: .875rem; color: rgba(255,255,255,.72); margin: 0; }
.ws-source a { text-underline-offset: 3px; }
.ws-pic { width: 100%; border-radius: 12px; overflow: hidden; background: #000; }
.ws-pic img { width: 100%; height: 100%; object-fit: cover; object-position: top; }
.ws-pic-popup { aspect-ratio: 760 / 1195; }
.ws-pic-cms { aspect-ratio: 16 / 10; }
.ws-pic-cms img { object-position: left top; }
.ws-pics { display: grid; gap: 10px; }
.ws-reels { display: grid; grid-auto-flow: column; grid-auto-columns: min(62vw, 240px); gap: 12px; overflow-x: auto; scroll-snap-type: x mandatory; padding-bottom: 8px; margin-inline: calc(-1 * clamp(20px, 2.4vw, 32px)); padding-inline: clamp(20px, 2.4vw, 32px); }
.ws-reel { scroll-snap-align: center; margin: 0; }
.ws-reel video { width: 100%; aspect-ratio: 9 / 16; object-fit: cover; border-radius: 12px; background: #000; }
.ws-reel figcaption { font-size: .875rem; margin-top: 8px; color: rgba(255,255,255,.78); }
@media (min-width: 1000px) {
  .ws-grid { grid-template-columns: repeat(12, 1fr); }
  .ws-span-7 { grid-column: span 7; } .ws-span-5 { grid-column: span 5; } .ws-span-4 { grid-column: span 4; } .ws-span-12 { grid-column: span 12; }
  .ws-motion { display: grid; grid-template-columns: 1fr 2.4fr; gap: 40px; align-items: start; }
  .ws-motion-text { display: flex; flex-direction: column; gap: 16px; height: 100%; }
  .ws-reels { grid-auto-flow: row; grid-template-columns: repeat(4, 1fr); overflow: visible; margin: 0; padding: 0; }
  .ws-popup { display: grid; grid-template-columns: .8fr 1.2fr; gap: 28px; height: 100%; }
  .ws-popup-text { display: flex; flex-direction: column; gap: 16px; }
  .ws-pic-popup { aspect-ratio: auto; min-height: 100%; position: relative; }
  .ws-pic-popup img { position: absolute; inset: 0; }
  /* The dashboard shot fills whatever height the email card next to it sets. */
  .ws-pic-cms { flex: 1; aspect-ratio: auto; min-height: 240px; position: relative; }
  .ws-pic-cms img { position: absolute; inset: 0; }
}
@media (max-width: 999px) { .ws-motion-text, .ws-popup-text { display: flex; flex-direction: column; gap: 16px; } .ws-motion, .ws-popup { display: flex; flex-direction: column; gap: 20px; } }

/* Sample pop-up */
.ws-dialog { width: min(460px, calc(100vw - 32px)); padding: 0; border: 0; border-radius: 20px; background: var(--cobalt); color: #fff; font-family: 'Instrument Sans', system-ui, sans-serif; }
.ws-dialog::backdrop { background: rgba(5,6,10,.7); }
.ws-dialog-body { padding: 32px 24px 24px; }
.ws-dialog-close { position: absolute; top: 8px; right: 8px; width: 44px; height: 44px; background: none; border: 0; color: #fff; cursor: pointer; display: flex; align-items: center; justify-content: center; }
.ws-dialog h3 { font-family: 'Bricolage Grotesque', sans-serif; font-weight: 800; font-size: 2.25rem; line-height: 1; letter-spacing: -.035em; margin: 0 40px 12px 0; }
.ws-dialog p { margin: 0 0 16px; }
.ws-dialog label { display: block; font-weight: 600; font-size: .9375rem; margin-bottom: 6px; }
.ws-dialog input { width: 100%; min-height: 52px; padding: 10px 14px; border-radius: 12px; border: 0; font: inherit; color: var(--ink); background: #fff; }
.ws-dialog input:focus-visible { outline: 3px solid #fff; outline-offset: 2px; }
.ws-dialog button[type="submit"] { width: 100%; margin-top: 12px; background: var(--ink); color: #fff; }
.ws-dialog-error { margin: 8px 0 0 !important; font-weight: 600; font-size: .9375rem; }
.ws-dialog-note { margin: 14px 0 0 !important; font-size: .875rem; opacity: .85; }

/* Process */
.ws-steps { list-style: none; margin: clamp(40px, 6vw, 72px) 0 0; padding: 0; display: grid; gap: 32px; }
.ws-step-n { font-family: 'Bricolage Grotesque', sans-serif; font-weight: 800; font-size: clamp(3.5rem, 7vw, 6rem); line-height: 1; letter-spacing: -.05em; color: var(--cobalt); display: block; margin-bottom: 12px; }
.ws-steps p { margin: 8px 0 0; }
@media (min-width: 720px) { .ws-steps { grid-template-columns: 1fr 1fr; } }
@media (min-width: 1100px) { .ws-steps { grid-template-columns: repeat(4, 1fr); } }

/* Who */
.ws-who { background: var(--white); }
.ws-who-grid { display: grid; gap: 40px; }
.ws-who-face { width: 112px; height: 112px; border-radius: 50%; object-fit: cover; margin-bottom: 24px; }
.ws-quotes { display: grid; gap: 28px; }
.ws-quote { margin: 0; padding-top: 22px; border-top: 1px solid var(--line); }
.ws-quote blockquote { margin: 0; font-size: 1.125rem; line-height: 1.45; }
.ws-quote figcaption { display: flex; align-items: center; gap: 12px; margin-top: 16px; font-size: .9375rem; }
.ws-quote img { width: 44px; height: 44px; border-radius: 50%; object-fit: cover; flex: none; }
.ws-quote span { display: block; opacity: .72; font-size: .875rem; }
@media (min-width: 960px) { .ws-who-grid { grid-template-columns: 1fr 1fr; gap: 80px; } }

/* FAQ */
.ws-faq { margin-top: clamp(32px, 5vw, 56px); border-bottom: 1px solid var(--line); }
.ws-faq details { border-top: 1px solid var(--line); }
.ws-faq summary { display: flex; align-items: center; justify-content: space-between; gap: 16px; min-height: 64px; padding-block: 14px; cursor: pointer; list-style: none; font-family: 'Bricolage Grotesque', sans-serif; font-weight: 700; font-size: clamp(1.2rem, 2.2vw, 1.6rem); letter-spacing: -.02em; line-height: 1.15; }
.ws-faq summary::-webkit-details-marker { display: none; }
.ws-faq summary svg { flex: none; transition: transform .2s ease; }
.ws-faq details[open] summary svg { transform: rotate(45deg); }
.ws-faq p { margin: 0; padding-bottom: 24px; max-width: 40em; }

/* Close */
.ws-close { --bg: #2a2bff; --fg: #fff; background: var(--bg); color: var(--fg); }
.ws-close h2 { font-size: clamp(3rem, 12vw, 11rem); line-height: .95; letter-spacing: -.025em; }
.ws-close .ws-hero-cta { margin-top: 32px; }
.ws-foot { background: var(--ink); color: rgba(255,255,255,.8); font-size: .9375rem; padding-block: 32px; }
.ws-foot .ws-wrap { display: flex; flex-wrap: wrap; justify-content: space-between; gap: 12px 32px; }
.ws-foot nav { display: flex; flex-wrap: wrap; gap: 8px 24px; }
.ws-foot a { text-underline-offset: 3px; }

/* Your build bar */
.ws-tray { position: fixed; z-index: 45; left: 50%; bottom: 12px; transform: translateX(-50%); width: min(880px, calc(100% - 24px)); display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 8px 16px; padding: 10px 10px 10px 20px; border-radius: 22px; background: var(--white); color: var(--ink); box-shadow: 0 16px 50px rgba(0,0,0,.35); }
.ws-tray p { margin: 0; font-size: .9375rem; line-height: 1.3; flex: 1 1 220px; min-width: 0; }
.ws-tray b { font-weight: 600; }
.ws-tray-actions { display: flex; align-items: center; gap: 4px; margin-left: auto; }
.ws-tray-clear { width: 44px; height: 44px; background: none; border: 0; cursor: pointer; color: inherit; display: flex; align-items: center; justify-content: center; }
.ws-tray .ws-btn { background: var(--cobalt); color: #fff; min-height: 46px; padding: 8px 18px; font-size: .9375rem; }

/* One load sequence, nothing on scroll */
@media (prefers-reduced-motion: no-preference) {
  .ws-rise { animation: ws-rise .9s cubic-bezier(.2,.7,.2,1) both; }
  .ws-rise-2 { animation-delay: .12s; }
  .ws-rise-3 { animation: ws-rise 1.1s cubic-bezier(.2,.7,.2,1) .24s both; }
  @keyframes ws-rise { from { opacity: 0; transform: translateY(28px); } to { opacity: 1; transform: none; } }
  .ws-stage-inner.ws-rise-3 { animation-name: ws-rise-frame; }
  @keyframes ws-rise-frame { from { opacity: 0; transform: translate(-50%, 60px); } to { opacity: 1; transform: translateX(-50%); } }
}
@media (prefers-reduced-motion: reduce) {
  .ws *, .ws *::before, .ws *::after { transition: none !important; animation: none !important; }
}
`;

/* ─────────────────────────────────────────
   DATA
───────────────────────────────────────── */

// bg / fg / ac are sampled from each live site. `job` is what the site exists to do.
const SHOWCASE = [
  { slug: "meji", kind: "E-commerce", bg: "#6b1d0a", fg: "#fff6ec", ac: "#ffb23e", job: "Turn an appetite into a basket." },
  { slug: "moodring", kind: "Product story", bg: "#fcebd6", fg: "#4a2a14", ac: "#9c4a0e", job: "Fill a waitlist before the product ships." },
  { slug: "expertlinc", kind: "Careers platform", bg: "#14233f", fg: "#f2f6ff", ac: "#8dbaff", job: "Make a new idea feel worth joining." },
  { slug: "momsandmore", kind: "Product landing page", bg: "#ffd95c", fg: "#2e1a16", ac: "#8a3200", job: "Sell one product with one clear action." },
  { slug: "wigpa", kind: "Community", bg: "#3b0508", fg: "#fff6ec", ac: "#dcb36a", job: "Give a global community a home." },
  { slug: "bibire", kind: "E-commerce", bg: "#efe8dc", fg: "#111111", ac: "#0d4a2e", job: "Make a new label feel established." },
  { slug: "getyourcrib", kind: "Rental marketplace", bg: "#17337a", fg: "#ffffff", ac: "#ffb94d", job: "Make renters feel safe enough to book a viewing." },
].map((s) => ({ ...s, site: WEBSITES.find((w) => w.slug === s.slug)! }));

const hostOf = (url: string) => new URL(url).hostname.replace(/^www\./, "");
const hd = (slug: string) => `/images/websites/${slug}-hd.jpg`;
const mobile = (slug: string) => `/images/websites/${slug}-mobile.jpg`;

// Set a price string (e.g. "From £1,500") to show it; null shows `QUOTE_NOTE`.
const BUILDS = [
  {
    id: "Landing page",
    forWho: "One product, offer or launch. The visitor has one thing to do.",
    includes: ["A single long page, written to one action", "Order, sign-up or waitlist form", "Sections built around the objections people have", "Designed for phones first"],
    seen: ["momsandmore", "moodring"],
    price: null as string | null,
  },
  {
    id: "Business website",
    forWho: "A company, service or organisation that has to explain itself and earn trust.",
    includes: ["Page structure planned around your customers", "Your services, story and proof, clearly laid out", "Contact or enquiry route on every page", "Room to add pages as you grow"],
    seen: ["wigpa", "expertlinc"],
    price: null as string | null,
  },
  {
    id: "Online store",
    forWho: "A brand selling a range, where the shop has to feel as good as the product.",
    includes: ["Product pages with options, sizes or flavours", "Basket and checkout", "Delivery, returns and policy pages", "Sign-up list for drops and restocks"],
    seen: ["meji", "bibire"],
    price: null as string | null,
  },
];
const QUOTE_NOTE = "Quoted after your call, based on what the site has to do.";

const EVERY_BUILD = ["Custom design, no templates", "Written around one clear job", "Fast and fitted to phones", "Search and sharing basics set up", "Analytics connected", "Domain and launch handled"];

const REELS = [
  { src: "/videos/moodring-hype-video.mp4", poster: "/videos/moodring-hype-video.jpg", title: "Moodring, launch film" },
  { src: "/videos/taya-hype-video.mp4", poster: "/videos/taya-hype-video.jpg", title: "Taya, brand film" },
  { src: "/videos/kcr/the-busy-executive.mp4", poster: "/videos/kcr/the-busy-executive.jpg", title: "Kaminskiy, the busy executive" },
  { src: "/videos/kcr/the-caring-father.mp4", poster: "/videos/kcr/the-caring-father.jpg", title: "Kaminskiy, the caring father" },
];

const QUOTES = [
  { quote: "Faithful did an excellent job leading our social media presence at Educato. In just a couple of weeks, he grasped our brand voice, created engaging content, and helped us grow our online presence.", name: "Pierre-Louis Monnot", role: "Co-founder, Educato AI · social media", image: "/images/clients/Pierre.jpg" },
  { quote: "I hired Faithful for a complex wine project after reaching the limits of what standard automation could handle. He consistently delivered creative, out-of-the-box solutions in a timely manner.", name: "Peter Douglas", role: "CEO, Sustaina Wines · automation", image: "/images/clients/peter-douglas.jpeg" },
];

const FAQS = [
  { q: "How much does a website cost?", a: "It depends on the build and the add-ons. You get a clear quote after the call, before any work starts." },
  { q: "What do I need to have ready?", a: "Whatever you already have: logo, photos, product details, sites you like. If something is missing, we will tell you on the call and work out how to fill the gap." },
  { q: "I already have a website. Can you rebuild it?", a: "Yes. Send the link before the call and we will look at what it does well, what it doesn't, and whether it needs a rebuild at all." },
  { q: "Can the site connect to my CRM or follow up with leads?", a: "Yes. Automation is the other half of what Nexara does, so forms, bookings and follow-ups can be wired in as part of the build." },
  { q: "Do you work outside the UK?", a: "Yes. The sites on this page serve customers in the UK and Nigeria, and everything runs remotely." },
];

const bookHref = (goal?: string) => (goal ? `/book?goal=${encodeURIComponent(goal)}` : "/book?goal=" + encodeURIComponent("Website enquiry"));

/* ─────────────────────────────────────────
   PIECES
───────────────────────────────────────── */

const Nav = ({ href }: { href: string }) => (
  <nav className="ws-nav" aria-label="Main">
    <Link to="/websites" className="ws-nav-brand">Nexara <span>Websites</span></Link>
    <div className="ws-nav-links">
      <a href="#work">Work</a>
      <a href="#builds">Builds</a>
      <a href="#addons">Add-ons</a>
      <a href="#process">Process</a>
      <a href="#questions">Questions</a>
    </div>
    <Link to={href} className="ws-nav-cta">Book a call</Link>
  </nav>
);

const Hero = () => {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const [ready, setReady] = useState(false); // hold the other screenshots back until the first paint is done
  const current = SHOWCASE[i];

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) setPaused(true);
    const t = window.setTimeout(() => setReady(true), 1200);
    return () => window.clearTimeout(t);
  }, []);

  useEffect(() => {
    if (paused || !ready) return;
    const t = window.setInterval(() => {
      if (!document.hidden) setI((n) => (n + 1) % SHOWCASE.length);
    }, 3800);
    return () => window.clearInterval(t);
  }, [paused, ready]);

  return (
    <header className="ws-hero" style={{ "--bg": current.bg, "--fg": current.fg } as CSSProperties}>
      <div className="ws-wrap" style={{ width: "100%" }}>
        <p className="ws-eyebrow ws-rise">Website design and build</p>
        <h1 className="ws-display ws-rise">Beautiful is the minimum.</h1>
        <div className="ws-hero-row ws-rise ws-rise-2">
          <p className="ws-hero-sub">We design and build websites from scratch around one job: getting the right person to buy, book or join.</p>
          <div className="ws-hero-cta">
            <Link to={bookHref()} className="ws-btn ws-btn-solid">Book a free call <ArrowRight size={18} aria-hidden /></Link>
            <a href="#work" className="ws-btn ws-btn-ghost">See the work <ArrowDown size={18} aria-hidden /></a>
          </div>
        </div>
        <div className="ws-now ws-rise ws-rise-2">
          <span>Our work: <b>{current.site.name}</b></span>
          <div className="ws-now-ctl">
            {SHOWCASE.map((s, n) => (
              <button key={s.slug} type="button" className="ws-dot" aria-label={`Show ${s.site.name}`} aria-current={n === i} onClick={() => { setI(n); setPaused(true); }}><i /></button>
            ))}
            <button type="button" className="ws-pause" aria-label={paused ? "Play the slideshow" : "Pause the slideshow"} onClick={() => setPaused((p) => !p)}>
              {paused ? <Play size={18} aria-hidden /> : <Pause size={18} aria-hidden />}
            </button>
          </div>
        </div>
      </div>
      <div className="ws-stage">
        <div className="ws-stage-inner ws-rise-3" aria-hidden>
          <div className="ws-browser">
            <div className="ws-bar"><i /><span>{hostOf(current.site.url)}</span></div>
            <div className="ws-stack">
              {SHOWCASE.map((s, n) => (n === 0 || ready) && <img key={s.slug} src={hd(s.slug)} alt="" className={n === i ? "on" : ""} />)}
            </div>
          </div>
          <div className="ws-phone">
            <div className="ws-stack ws-stack-phone">
              {SHOWCASE.map((s, n) => (n === 0 || ready) && <img key={s.slug} src={mobile(s.slug)} alt="" className={n === i ? "on" : ""} />)}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

const Work = () => {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    // A project owns the colour while it crosses the middle of the screen.
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) setActive(refs.current.indexOf(e.target as HTMLElement));
      }),
      { rootMargin: "-50% 0px -50% 0px" },
    );
    refs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  const c = SHOWCASE[active];

  return (
    <section id="work" className="ws-work" style={{ "--bg": c.bg, "--fg": c.fg, "--ac": c.ac } as CSSProperties}>
      <div className="ws-wrap">
        <h2 className="ws-display ws-h2">Seven sites. Seven jobs. No two alike.</h2>
        <p className="ws-lede">Every one of these is live. Open them on your phone, then decide what you think.</p>

        {SHOWCASE.map((s, n) => (
          <article key={s.slug} className="ws-project" ref={(el) => (refs.current[n] = el)}>
            <div className="ws-project-head">
              <h3 className="ws-display">{s.site.name}</h3>
              <span className="ws-project-kind">{s.kind}</span>
            </div>
            <a className="ws-shot" href={s.site.url} target="_blank" rel="noopener noreferrer" aria-label={`Open ${s.site.name}, opens in a new tab`}>
              <div className="ws-browser closed">
                <div className="ws-bar"><i /><span>{hostOf(s.site.url)}</span></div>
                <img src={hd(s.slug)} alt={`${s.site.name} home page on desktop`} width={2160} height={1350} loading="lazy" decoding="async" />
              </div>
              <div className="ws-phone">
                <img src={mobile(s.slug)} alt="" width={780} height={1688} loading="lazy" decoding="async" />
              </div>
            </a>
            <div className="ws-project-body">
              <div>
                <p className="ws-job">The job</p>
                <p className="ws-job-line">{s.job}</p>
              </div>
              <div className="ws-project-copy">
                <p>{s.site.desc}</p>
                <a className="ws-link" href={s.site.url} target="_blank" rel="noopener noreferrer">Visit {hostOf(s.site.url)} <ArrowUpRight size={18} aria-hidden /></a>
              </div>
            </div>
          </article>
        ))}

        <p className="ws-also">
          Also ours: the <a href="https://www.expertlinc.com/experience" target="_blank" rel="noopener noreferrer">ExpertLinc campaign page</a>, the <Link to="/">Nexara site</Link>, a <Link to="/fn">personal portfolio</Link>, and the page you're reading.
        </p>
      </div>
    </section>
  );
};

const Toggle = ({ on, onClick, label }: { on: boolean; onClick: () => void; label: string }) => (
  <button type="button" className="ws-toggle" aria-pressed={on} onClick={onClick}>
    {on ? <Check size={16} aria-hidden /> : <Plus size={16} aria-hidden />}
    {on ? "Added" : label}
  </button>
);

// The live demo of the pop-up add-on. Deliberately sends nothing anywhere.
const SamplePopup = ({ dialogRef }: { dialogRef: React.RefObject<HTMLDialogElement> }) => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("That email looks incomplete. Check it and try again.");
      return;
    }
    setError("");
    setDone(true);
  };
  const reset = () => { setEmail(""); setError(""); setDone(false); };

  return (
    <dialog ref={dialogRef} className="ws-dialog" aria-labelledby="ws-sample-title" onClose={reset}>
      <form method="dialog"><button className="ws-dialog-close" aria-label="Close the sample"><X size={22} aria-hidden /></button></form>
      <div className="ws-dialog-body">
        {done ? (
          <>
            <h3 id="ws-sample-title">You're on the list.</h3>
            <p>On your site, this is where the guide lands in their inbox and the address joins your email list.</p>
            <p className="ws-dialog-note">This was a sample, so nothing was sent or saved.</p>
          </>
        ) : (
          <>
            <h3 id="ws-sample-title">Before you go, take the guide.</h3>
            <p>A pop-up should offer one useful thing, ask for one thing, and be easy to close.</p>
            <form onSubmit={submit} noValidate>
              <label htmlFor="ws-sample-email">Email address</label>
              <input id="ws-sample-email" type="email" autoComplete="off" value={email} aria-invalid={!!error} aria-describedby={error ? "ws-sample-error" : undefined} onChange={(e) => setEmail(e.target.value)} />
              {error && <p id="ws-sample-error" role="alert" className="ws-dialog-error">{error}</p>}
              <button type="submit" className="ws-btn">Send me the guide</button>
            </form>
            <p className="ws-dialog-note">This is a sample. Nothing you type here is sent or saved.</p>
          </>
        )}
      </div>
    </dialog>
  );
};

/* ─────────────────────────────────────────
   PAGE
───────────────────────────────────────── */

const WebsitesPage = () => {
  const [build, setBuild] = useState<string | null>(null);
  const [addons, setAddons] = useState<string[]>([]);
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const previous = document.title;
    document.title = "Website design and build | Nexara";
    return () => { document.title = previous; };
  }, []);

  const toggleAddon = (name: string) =>
    setAddons((list) => (list.includes(name) ? list.filter((a) => a !== name) : [...list, name]));
  const has = (name: string) => addons.includes(name);

  const picked = [...(build ? [build] : []), ...addons];
  const href = bookHref(picked.length ? `Website enquiry: ${picked.join(" + ")}` : undefined);

  // Only one reel plays at a time.
  const onlyThis = (e: SyntheticEvent<HTMLVideoElement>) => {
    e.currentTarget.closest(".ws-reels")?.querySelectorAll("video").forEach((v) => {
      if (v !== e.currentTarget) v.pause();
    });
  };

  return (
    <div className="ws">
      <style>{STYLES}</style>
      <Nav href={href} />
      <Hero />

      <main>
        <section className="ws-section">
          <div className="ws-wrap ws-why-grid">
            <div>
              <h2 className="ws-display ws-h2">Most sites don't fail for being ugly. They fail because nobody decided what they're for.</h2>
            </div>
            <div>
              <p style={{ margin: "0 0 20px" }}>A visitor gives you a few seconds. In that time, they want three answers. Every site we build starts here, before any design.</p>
              <ul className="ws-qs">
                <li><b>What is this?</b>Said plainly, in the first screen.</li>
                <li><b>Is it for me?</b>Proof and detail that sound like their life.</li>
                <li><b>What do I do next?</b>One clear action, always within reach.</li>
              </ul>
            </div>
          </div>
        </section>

        <Work />

        <section id="builds" className="ws-section">
          <div className="ws-wrap">
            <h2 className="ws-display ws-h2">Three ways to start.</h2>
            <p className="ws-lede">Pick what fits, or leave it to the call. Choosing here just tells us what you have in mind.</p>

            <div className="ws-builds">
              {BUILDS.map((b) => (
                <div className="ws-build" key={b.id}>
                  <div>
                    <h3 className="ws-display">{b.id}</h3>
                    <p className="ws-build-for">{b.forWho}</p>
                  </div>
                  <ul>
                    {b.includes.map((item) => <li key={item}><Check size={16} aria-hidden />{item}</li>)}
                  </ul>
                  <div className="ws-build-side">
                    <p className="ws-build-price">{b.price ?? QUOTE_NOTE}</p>
                    <p>
                      Like{" "}
                      {b.seen.map((slug, n) => {
                        const site = WEBSITES.find((w) => w.slug === slug)!;
                        return <span key={slug}>{n > 0 && " and "}<a href={site.url} target="_blank" rel="noopener noreferrer">{site.name}</a></span>;
                      })}
                    </p>
                    <button type="button" className="ws-toggle" aria-pressed={build === b.id} onClick={() => setBuild(build === b.id ? null : b.id)}>
                      {build === b.id ? <><Check size={16} aria-hidden /> Selected</> : "Start with this"}
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="ws-all">
              <h3 className="ws-h3">In every build</h3>
              <ul>
                {EVERY_BUILD.map((item) => <li key={item}><Check size={16} aria-hidden />{item}</li>)}
              </ul>
            </div>
          </div>
        </section>

        <section id="addons" className="ws-section ws-addons">
          <div className="ws-wrap">
            <h2 className="ws-display ws-h2">Then make it work harder.</h2>
            <p className="ws-lede">A site can do more than sit there. Add what earns its place. Everything below is something we've already built.</p>

            <div className="ws-grid">
              <div className="ws-card ws-span-7">
                <div className="ws-popup">
                  <div className="ws-popup-text">
                    <h3 className="ws-h3">Pop-up forms</h3>
                    <p>Catch people at the right moment with one useful offer. Ours can ask a question first, so you learn who is signing up, not just their address.</p>
                    <p className="ws-source">Pictured: the community pop-up on ExpertLinc.</p>
                    <div className="ws-card-foot">
                      <button type="button" className="ws-btn ws-btn-ghost" style={{ minHeight: 44, padding: "8px 16px", fontSize: ".9375rem" }} onClick={() => dialogRef.current?.showModal()}>Open a sample</button>
                      <Toggle on={has("Pop-up form")} onClick={() => toggleAddon("Pop-up form")} label="Add" />
                    </div>
                  </div>
                  <div className="ws-pic ws-pic-popup">
                    <img src="/images/websites/addons/popup-expertlinc.jpg" alt="ExpertLinc pop-up inviting visitors to a free WhatsApp community, asking which industry they are curious about" loading="lazy" />
                  </div>
                </div>
              </div>

              <div className="ws-card ws-span-5">
                <h3 className="ws-h3">Waitlist</h3>
                <p>Build demand before launch, and learn what people care about while you do.</p>
                <div className="ws-pic">
                  <img src="/images/websites/addons/waitlist-moodring.jpg" alt="Moodring waitlist form with name, email and a question about what is taking the most out of you" loading="lazy" />
                </div>
                <p className="ws-source">Pictured: Moodring.</p>
                <div className="ws-card-foot"><Toggle on={has("Waitlist")} onClick={() => toggleAddon("Waitlist")} label="Add" /></div>
              </div>

              <div className="ws-card ws-span-12">
                <div className="ws-motion">
                  <div className="ws-motion-text">
                    <h3 className="ws-h3">Motion video</h3>
                    <p>Short films for your hero, your launch and your feed, made with AI and directed by us, so the brand feels alive before anyone reads a word.</p>
                    <div className="ws-card-foot"><Toggle on={has("Motion video")} onClick={() => toggleAddon("Motion video")} label="Add" /></div>
                  </div>
                  <div className="ws-reels">
                    {REELS.map((r) => (
                      <figure className="ws-reel" key={r.src}>
                        <video src={r.src} poster={r.poster} controls playsInline preload="none" onPlay={onlyThis} aria-label={r.title} />
                        <figcaption>{r.title}</figcaption>
                      </figure>
                    ))}
                  </div>
                </div>
              </div>

              <div className="ws-card ws-span-7">
                <h3 className="ws-h3">Email list</h3>
                <p>Sign-up forms connected to your email tool, so every visitor who isn't ready today can still hear from you tomorrow.</p>
                <div className="ws-pics">
                  <div className="ws-pic"><img src="/images/websites/addons/email-bibire.jpg" alt="BIBIRÉ Wellness Club email sign-up" loading="lazy" /></div>
                  <div className="ws-pic"><img src="/images/websites/addons/email-meji.jpg" alt="Meji Foods email sign-up" loading="lazy" /></div>
                </div>
                <p className="ws-source">Pictured: BIBIRÉ and Meji Foods.</p>
                <div className="ws-card-foot"><Toggle on={has("Email list")} onClick={() => toggleAddon("Email list")} label="Add" /></div>
              </div>

              <div className="ws-card ws-span-5">
                <h3 className="ws-h3">Content dashboard</h3>
                <p>A private workspace for planning and tracking your content, built around how your team actually works.</p>
                <div className="ws-pic ws-pic-cms"><img src="/images/cms/cms-calendar-sheet.jpeg" alt="Content calendar laid out by week and format: reels, carousels, AI video and more" loading="lazy" /></div>
                <p className="ws-source">Pictured: built for a home services franchise brand.</p>
                <div className="ws-card-foot"><Toggle on={has("Content dashboard")} onClick={() => toggleAddon("Content dashboard")} label="Add" /></div>
              </div>

              <div className="ws-card ws-span-4">
                <h3 className="ws-h3">Online booking</h3>
                <p>Visitors pick a time on your site and it lands straight in your Google Calendar. No back and forth.</p>
                <p className="ws-source"><Link to={bookHref()}>This site's own booking page</Link> is one of ours.</p>
                <div className="ws-card-foot"><Toggle on={has("Online booking")} onClick={() => toggleAddon("Online booking")} label="Add" /></div>
              </div>

              <div className="ws-card ws-span-4">
                <h3 className="ws-h3">AI receptionist</h3>
                <p>Answers enquiries when you can't. We've built one across Facebook, Instagram, WhatsApp and voice calls.</p>
                <p className="ws-source"><Link to="/case/publishing-ai-receptionist">See how it was built</Link></p>
                <div className="ws-card-foot"><Toggle on={has("AI receptionist")} onClick={() => toggleAddon("AI receptionist")} label="Add" /></div>
              </div>

              <div className="ws-card ws-span-4">
                <h3 className="ws-h3">Lead follow-up</h3>
                <p>Every form on the site feeds your CRM and starts the follow-up on its own, so no enquiry goes quiet.</p>
                <p className="ws-source"><Link to="/case/kcr-franchise-pipeline">See a full pipeline</Link></p>
                <div className="ws-card-foot"><Toggle on={has("Lead follow-up")} onClick={() => toggleAddon("Lead follow-up")} label="Add" /></div>
              </div>
            </div>
          </div>
        </section>

        <section id="process" className="ws-section">
          <div className="ws-wrap">
            <h2 className="ws-display ws-h2">How it works.</h2>
            <ol className="ws-steps">
              <li><span className="ws-step-n">1</span><h3 className="ws-h3">Call</h3><p>30 minutes on your business, your customers and the one job the site has to do. You leave knowing what we'd build.</p></li>
              <li><span className="ws-step-n">2</span><h3 className="ws-h3">Direction</h3><p>You see the look and the structure first, so we agree on where it's going before the build starts.</p></li>
              <li><span className="ws-step-n">3</span><h3 className="ws-h3">Build</h3><p>You get a private link to the real site. Open it on your own phone, and tell us what to change.</p></li>
              <li><span className="ws-step-n">4</span><h3 className="ws-h3">Launch</h3><p>We connect your domain, forms and analytics, test everything, and take it live.</p></li>
            </ol>
          </div>
        </section>

        <section className="ws-section ws-who">
          <div className="ws-wrap ws-who-grid">
            <div>
              <img className="ws-who-face" src="/images/faithful-2026.jpg" alt="Faithful Nyama" width={112} height={112} loading="lazy" />
              <h2 className="ws-display ws-h2" style={{ fontSize: "clamp(2.25rem, 5vw, 4.25rem)" }}>You work with the person building it.</h2>
              <p className="ws-lede">I'm Faithful, founder of Nexara. I came up through social media and automation, so I build sites knowing what happens before someone lands on them and after they fill in the form.</p>
            </div>
            <div className="ws-quotes">
              <p className="ws-eyebrow" style={{ margin: 0 }}>Clients on working with Faithful</p>
              {QUOTES.map((q) => (
                <figure className="ws-quote" key={q.name}>
                  <blockquote>"{q.quote}"</blockquote>
                  <figcaption>
                    <img src={q.image} alt="" width={44} height={44} loading="lazy" />
                    <div>{q.name}<span>{q.role}</span></div>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        <section id="questions" className="ws-section">
          <div className="ws-wrap" style={{ maxWidth: 1040 }}>
            <h2 className="ws-display ws-h2">Questions.</h2>
            <div className="ws-faq">
              {FAQS.map((f) => (
                <details key={f.q}>
                  <summary>{f.q}<Plus size={22} aria-hidden /></summary>
                  <p>{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="ws-section ws-close">
          <div className="ws-wrap">
            <h2 className="ws-display">What's your site's one job?</h2>
            <p className="ws-lede">Tell us on a free 30-minute call. You'll leave with a clear idea of what to build, whether or not you build it with us.</p>
            <div className="ws-hero-cta">
              <Link to={href} className="ws-btn ws-btn-solid">Book a free call <ArrowRight size={18} aria-hidden /></Link>
              <a href="mailto:faithfulnyama@gmail.com" className="ws-btn ws-btn-ghost">Email instead</a>
            </div>
          </div>
        </section>
      </main>

      <footer className="ws-foot" style={{ paddingBottom: picked.length ? 120 : 32 }}>
        <div className="ws-wrap">
          <span>© {new Date().getFullYear()} Nexara</span>
          <nav aria-label="Footer">
            <Link to="/">Nexara home</Link>
            <Link to="/about">About</Link>
            <a href="mailto:faithfulnyama@gmail.com">faithfulnyama@gmail.com</a>
          </nav>
        </div>
      </footer>

      <SamplePopup dialogRef={dialogRef} />

      <div aria-live="polite">
        {picked.length > 0 && (
          <div className="ws-tray">
            <p><b>Your build:</b> {picked.join(" + ")}</p>
            <div className="ws-tray-actions">
              <button type="button" className="ws-tray-clear" aria-label="Clear your selection" onClick={() => { setBuild(null); setAddons([]); }}><X size={20} aria-hidden /></button>
              <Link to={href} className="ws-btn">Book a call about this <ArrowRight size={16} aria-hidden /></Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WebsitesPage;
