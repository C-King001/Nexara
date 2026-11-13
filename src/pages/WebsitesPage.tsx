import { useEffect, useRef, useState } from "react";
import type { CSSProperties, ReactNode } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, ArrowUpRight, Pause, Play, Volume2, VolumeX } from "lucide-react";
import { WEBSITES } from "@/data/websites";

// Nexara Studio: the creative side of Nexara (films, websites, pop-ups, emails).
// Own design (st- prefix) and own navbar, same idea as /social-media.
// The page sells the destination, not the journey: it opens on launch day, then
// follows one customer (Maya) from first film to first purchase. Each chapter
// wears the palette of the client whose real work is on screen, and the visitor
// ends on the seven discovery questions, which hand their answers to /book.

const GRAIN = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`;

const STYLES = `
@import url('https://fonts.googleapis.com/css2?family=Familjen+Grotesk:wght@400;500;600;700&family=Geist+Mono:wght@400;500&display=swap');

.st {
  --night: #140a07; --ember: #2b0f06; --sun: #ff6b1a; --lime: #d6f24a; --pearl: #f6f1ea; --pearl-2: #ece4d8; --cocoa-ink: #3a2a20;
  --gutter: clamp(16px, 4vw, 56px);
  --mono: 'Geist Mono', ui-monospace, Menlo, monospace;
  background: var(--night); color: var(--pearl);
  font-family: 'Familjen Grotesk', system-ui, sans-serif; font-size: 18px; line-height: 1.55;
  -webkit-font-smoothing: antialiased; overflow-x: clip;
}
.st *, .st *::before, .st *::after { box-sizing: border-box; }
.st img, .st video { display: block; max-width: 100%; }
:where(.st a) { color: inherit; }
.st h1, .st h2, .st h3, .st h4 { font-family: inherit; margin: 0; text-wrap: balance; }
.st p { margin: 0; }
.st :focus-visible { outline: 2px solid currentColor; outline-offset: 3px; }
.st-wrap { max-width: 1400px; margin: 0 auto; padding-inline: var(--gutter); }
.st-mono { font-family: var(--mono); font-size: 12px; letter-spacing: .1em; text-transform: uppercase; font-weight: 400; }
.st-grain { position: relative; isolation: isolate; }
.st-grain::after { content: ""; position: absolute; inset: 0; background-image: ${GRAIN}; opacity: .13; mix-blend-mode: overlay; pointer-events: none; z-index: -1; }

/* Buttons */
.st-btn { display: inline-flex; align-items: center; gap: 10px; min-height: 54px; padding: 12px 26px; border-radius: 999px; font: inherit; font-size: 16px; font-weight: 600; text-decoration: none; border: 0; background: var(--lime); color: var(--night); cursor: pointer; transition: transform .2s ease, box-shadow .2s ease; }
.st-btn:hover { transform: translateY(-2px); box-shadow: 0 12px 30px rgba(214,242,74,.25); }
.st-btn-ghost { background: transparent; color: inherit; box-shadow: inset 0 0 0 1.5px currentColor; }
.st-btn-ghost:hover { box-shadow: inset 0 0 0 1.5px currentColor; }
.st-text-link { display: inline-flex; align-items: center; gap: 6px; min-height: 44px; font-size: 16px; font-weight: 600; text-underline-offset: 5px; }

/* Nav */
.st-nav { position: sticky; top: 0; z-index: 50; background: rgba(20,10,7,.72); backdrop-filter: blur(14px); -webkit-backdrop-filter: blur(14px); border-bottom: 1px solid rgba(246,241,234,.08); }
.st-nav .st-wrap { display: flex; align-items: center; justify-content: space-between; gap: 16px; min-height: 68px; }
.st-brand { display: inline-flex; align-items: center; gap: 10px; min-height: 44px; text-decoration: none; font-weight: 700; font-size: 19px; letter-spacing: -.02em; }
.st-brand i { width: 12px; height: 12px; border-radius: 50%; background: radial-gradient(circle at 35% 35%, var(--lime), var(--sun)); }
.st-brand span { font-weight: 400; opacity: .7; }
.st-nav-links { display: none; gap: 30px; font-size: 16px; }
.st-nav-links a { text-decoration: none; opacity: .72; transition: opacity .2s ease; }
.st-nav-links a:hover { opacity: 1; }
.st-nav .st-btn { min-height: 44px; padding: 8px 18px; font-size: 15px; }
@media (min-width: 960px) { .st-nav-links { display: flex; } }

/* Hero: launch day, already happening */
.st-hero { background: radial-gradient(120% 90% at 85% 115%, #ff8a2a 0%, #e24a12 18%, #8c2408 36%, #3a1206 56%, var(--night) 78%); padding-block: clamp(40px, 7vw, 96px) clamp(56px, 8vw, 120px); overflow: hidden; }
.st-hero-grid { display: grid; gap: clamp(40px, 6vw, 72px); align-items: center; }
@media (min-width: 1040px) { .st-hero-grid { grid-template-columns: minmax(0, 1.05fr) minmax(0, 1fr); } }
.st-eyebrow { display: inline-flex; align-items: center; gap: 10px; padding: 8px 14px; border-radius: 999px; background: rgba(246,241,234,.08); border: 1px solid rgba(246,241,234,.14); }
.st-eyebrow i { width: 8px; height: 8px; border-radius: 50%; background: var(--lime); box-shadow: 0 0 0 4px rgba(214,242,74,.18); }
.st-h1 { font-weight: 700; font-size: clamp(3.4rem, 9.6vw, 8.6rem); line-height: .9; letter-spacing: -.045em; margin-top: 24px !important; }
.st-h1 em { font-style: normal; color: var(--lime); display: block; }
.st-hero-sub { font-size: clamp(1.15rem, 1.6vw, 1.4rem); line-height: 1.5; max-width: 32em; margin-top: 28px !important; color: rgba(246,241,234,.86); }
.st-cta { display: flex; flex-wrap: wrap; align-items: center; gap: 12px 16px; margin-top: 36px; }

.st-stage { position: relative; width: min(100%, 620px); aspect-ratio: 1 / .96; margin-inline: auto; }
.st-stage-browser { position: absolute; top: 2%; left: 0; width: 82%; transform: rotate(-4deg); }
.st-stage-phone { position: absolute; right: 2%; bottom: 0; width: 36%; transform: rotate(5deg); }
.st-toasts { position: absolute; left: 4%; bottom: 6%; width: 62%; display: flex; flex-direction: column; gap: 10px; z-index: 3; }
.st-toast { display: grid; grid-template-columns: 38px 1fr auto; gap: 12px; align-items: center; padding: 12px 14px; border-radius: 18px; background: rgba(250,246,240,.94); color: #1a120e; box-shadow: 0 18px 50px rgba(0,0,0,.35); backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px); font-size: clamp(12px, 1.25vw, 15px); line-height: 1.3; }
.st-toast b { display: block; font-weight: 700; }
.st-toast small { font-family: var(--mono); font-size: 10.5px; color: #6c5e55; letter-spacing: .04em; }
.st-toast-icon { width: 38px; height: 38px; border-radius: 11px; display: grid; place-items: center; font-weight: 700; font-size: 15px; }
.st-stage-note { position: absolute; right: 0; top: -8px; transform: rotate(4deg); background: var(--lime); color: var(--night); padding: 6px 12px; border-radius: 999px; z-index: 4; }
@media (prefers-reduced-motion: no-preference) {
  .st-toast { animation: st-toast .7s cubic-bezier(.2,.8,.2,1) both; }
  .st-toast:nth-child(1) { animation-delay: .7s; } .st-toast:nth-child(2) { animation-delay: 1.5s; } .st-toast:nth-child(3) { animation-delay: 2.3s; }
  @keyframes st-toast { from { opacity: 0; transform: translateY(18px) scale(.96); } }
  .st-stage-phone { animation: st-bob 7s ease-in-out infinite; }
  @keyframes st-bob { 50% { transform: rotate(5deg) translateY(-10px); } }
  .st-rise { animation: st-rise .9s cubic-bezier(.2,.7,.2,1) both; }
  .st-rise-2 { animation-delay: .1s; } .st-rise-3 { animation-delay: .2s; }
  @keyframes st-rise { from { opacity: 0; transform: translateY(24px); } }
}

/* Device frames */
.st-media { position: relative; overflow: hidden; background: #000; }
.st-media img, .st-media video { width: 100%; height: 100%; object-fit: cover; object-position: top; }
.st-r916 { aspect-ratio: 9 / 16; }
.st-r169 { aspect-ratio: 16 / 9; }
.st-r1610 { aspect-ratio: 16 / 10; }
.st-round { border-radius: 22px; }
.st-browser { background: #fff; border-radius: 14px; overflow: hidden; box-shadow: 0 40px 90px rgba(0,0,0,.35); }
.st-browser-bar { display: flex; align-items: center; gap: 12px; height: 32px; padding-inline: 14px; background: #efebe5; color: #5d5952; font-family: var(--mono); font-size: 11px; }
.st-browser-bar i { width: 9px; height: 9px; border-radius: 50%; background: #ff5f57; box-shadow: 15px 0 0 #febc2e, 30px 0 0 #28c840; margin-right: 32px; flex: none; }
.st-browser-bar span { white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.st-device { border: 7px solid #0a0a0a; border-radius: 34px; overflow: hidden; background: #0a0a0a; box-shadow: 0 40px 90px rgba(0,0,0,.45); }
.st-device img { width: 100%; aspect-ratio: 9 / 18.5; object-fit: cover; object-position: top; border-radius: 27px; }
.st-ctl { position: absolute; bottom: 12px; right: 12px; display: flex; gap: 6px; }
.st-ctl button { width: 44px; height: 44px; border-radius: 50%; border: 0; background: rgba(18,12,10,.6); color: #fff; display: inline-flex; align-items: center; justify-content: center; cursor: pointer; backdrop-filter: blur(6px); -webkit-backdrop-filter: blur(6px); }
.st-ctl button:hover { background: rgba(18,12,10,.85); }

/* Maya intro */
.st-meet { background: var(--pearl); color: var(--cocoa-ink); padding-block: clamp(80px, 11vw, 150px); }
.st-meet-grid { display: grid; gap: 32px; align-items: end; }
@media (min-width: 960px) { .st-meet-grid { grid-template-columns: 1.3fr 1fr; } }
.st-h2 { font-weight: 700; font-size: clamp(2.6rem, 6.6vw, 5.8rem); line-height: .95; letter-spacing: -.04em; }
.st-h2 em { font-style: normal; color: var(--accent, var(--sun)); }
.st-lede { font-size: clamp(1.1rem, 1.5vw, 1.3rem); line-height: 1.5; max-width: 30em; }
.st-route { list-style: none; margin: clamp(40px, 6vw, 72px) 0 0; padding: 0; display: grid; grid-template-columns: repeat(5, minmax(0, 1fr)); gap: 0; position: relative; }
.st-route::before { content: ""; position: absolute; left: 10px; right: 10px; top: 9px; height: 2px; background: repeating-linear-gradient(90deg, var(--cocoa-ink) 0 6px, transparent 6px 12px); opacity: .35; }
.st-route li { position: relative; display: flex; flex-direction: column; gap: 6px; padding-right: 12px; }
.st-route li::before { content: ""; width: 20px; height: 20px; border-radius: 50%; background: var(--dot); box-shadow: 0 0 0 5px var(--pearl); position: relative; }
.st-route a { text-decoration: none; display: flex; flex-direction: column; gap: 4px; min-height: 44px; }
.st-route b { font-size: clamp(15px, 1.5vw, 19px); font-weight: 600; letter-spacing: -.01em; line-height: 1.2; }
.st-route small { color: #7a6a5e; }
@media (max-width: 720px) {
  .st-route { grid-template-columns: 1fr; gap: 18px; }
  .st-route::before { left: 9px; right: auto; top: 10px; bottom: 10px; width: 2px; height: auto; background: repeating-linear-gradient(180deg, var(--cocoa-ink) 0 6px, transparent 6px 12px); }
  .st-route li { flex-direction: row; gap: 16px; align-items: flex-start; }
  .st-route li::before { flex: none; }
}

/* Chapters: each one wears the client's palette */
.st-chapter { background: var(--bg); color: var(--fg); padding-block: clamp(80px, 11vw, 150px); overflow: hidden; }
.st-chapter-grid { display: grid; gap: clamp(40px, 6vw, 80px); align-items: center; }
@media (min-width: 1000px) {
  .st-chapter-grid { grid-template-columns: minmax(0, .9fr) minmax(0, 1.1fr); }
  .st-flip .st-chapter-copy { order: 2; }
  .st-chapter-grid.st-wide { grid-template-columns: minmax(0, .8fr) minmax(0, 1.2fr); align-items: start; }
  .st-wide .st-chapter-copy { position: sticky; top: 110px; }
}
.st-chapter-copy { display: flex; flex-direction: column; gap: 22px; }
.st-time { display: inline-flex; align-items: center; gap: 10px; color: var(--ac); }
.st-time::before { content: ""; width: 28px; height: 2px; background: currentColor; }
.st-chapter h2 { font-weight: 700; font-size: clamp(2.6rem, 6vw, 5.4rem); line-height: .95; letter-spacing: -.04em; }
.st-chapter h2 em { font-style: normal; color: var(--ac); }
.st-chapter-copy > p { font-size: clamp(1.1rem, 1.4vw, 1.25rem); line-height: 1.55; max-width: 30em; color: var(--mute); }
.st-credit { display: flex; flex-wrap: wrap; align-items: center; gap: 8px 16px; color: var(--mute); }
.st-credit b { color: var(--fg); font-weight: 600; font-family: 'Familjen Grotesk', sans-serif; letter-spacing: 0; text-transform: none; font-size: 16px; }
.st-credit a { color: var(--fg); }

/* Palette swatches, like a brand board */
.st-swatches { display: grid; grid-template-columns: repeat(3, minmax(0, 120px)); gap: 10px; }
.st-swatch { aspect-ratio: 4 / 5; border-radius: 14px; padding: 12px; display: flex; flex-direction: column; justify-content: flex-end; gap: 4px; box-shadow: 0 0 0 1px rgba(127,127,127,.18) inset; }
.st-swatch b { font-weight: 600; font-size: 15px; line-height: 1.1; }
.st-swatch small { font-family: var(--mono); font-size: 10.5px; letter-spacing: .04em; opacity: .85; }
.st-swatch small::before { content: ""; display: block; width: 14px; height: 1.5px; background: currentColor; margin-bottom: 6px; }

/* Chapter media compositions */
.st-comp { position: relative; }
.st-comp-film { display: grid; grid-template-columns: minmax(0, 1.25fr) minmax(0, .75fr); gap: 14px; align-items: center; max-width: 640px; margin-inline: auto; }
.st-stills { display: flex; flex-direction: column; gap: 14px; }
.st-stills img { width: 100%; aspect-ratio: 9 / 16; object-fit: cover; border-radius: 18px; }
.st-stills img:first-child { transform: translateX(-10%) rotate(-3deg); }
.st-stills img:last-child { transform: translateX(6%) rotate(3deg); }
.st-comp-site { padding-bottom: 12%; }
.st-comp-site .st-browser { width: 92%; }
.st-comp-site .st-device { position: absolute; right: 0; bottom: 0; width: 26%; }
.st-comp-pop { padding-bottom: 8%; }
.st-comp-pop .st-pop-desk { width: 88%; border-radius: 14px; overflow: hidden; box-shadow: 0 40px 90px rgba(0,0,0,.4); }
.st-comp-pop .st-pop-phone { position: absolute; right: 0; bottom: 0; width: 28%; }

/* Inbox: pick a subject line, read the real email on a phone */
.st-inbox { display: grid; grid-template-columns: minmax(0, 1fr); gap: 24px; }
.st-inbox > * { min-width: 0; }
.st-brand-tabs { display: inline-flex; padding: 4px; border-radius: 999px; background: rgba(0,0,0,.18); gap: 4px; justify-self: start; }
.st-brand-tabs button { min-height: 44px; padding: 8px 18px; border-radius: 999px; border: 0; background: transparent; color: inherit; font: inherit; font-size: 15px; font-weight: 600; cursor: pointer; }
.st-brand-tabs button[aria-pressed="true"] { background: var(--fg); color: var(--bg); }
.st-inbox-main { display: grid; grid-template-columns: minmax(0, 1fr); gap: 24px; }
.st-inbox-main > * { min-width: 0; }
.st-subjects { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; }
.st-subjects button { width: 100%; display: grid; grid-template-columns: 40px 1fr; gap: 8px; align-items: baseline; text-align: left; min-height: 52px; padding: 12px 0; background: none; border: 0; border-top: 1px solid var(--rule); color: var(--mute); font: inherit; font-size: 17px; line-height: 1.3; cursor: pointer; transition: color .2s ease; }
.st-subjects li:last-child button { border-bottom: 1px solid var(--rule); }
.st-subjects button:hover, .st-subjects button[aria-pressed="true"] { color: var(--fg); }
.st-subjects button[aria-pressed="true"] .st-mono { color: var(--ac); }
.st-phone { width: min(100%, 330px); margin-inline: auto; border: 9px solid #0a0a0a; border-radius: 44px; overflow: hidden; background: #0a0a0a; box-shadow: 0 40px 90px rgba(0,0,0,.45); }
.st-phone-bar { height: 26px; display: flex; justify-content: center; align-items: center; }
.st-phone-bar i { width: 80px; height: 18px; border-radius: 12px; background: #1d1d1d; }
.st-screen { height: min(620px, 70svh); overflow-y: auto; background: #fff; border-radius: 0 0 35px 35px; scrollbar-width: thin; }
.st-screen img { width: 100%; height: auto; }
.st-swipe { text-align: center; color: var(--mute); margin-top: 12px !important; }
@media (max-width: 759px) {
  .st-subjects { flex-direction: row; overflow-x: auto; gap: 8px; scroll-snap-type: x mandatory; scrollbar-width: none; }
  .st-subjects li { flex: none; scroll-snap-align: start; }
  .st-subjects button, .st-subjects li:last-child button { width: 190px; height: 100%; border: 1px solid var(--rule); border-radius: 14px; padding: 12px; grid-template-columns: 1fr; gap: 6px; align-content: start; font-size: 16px; }
  .st-subjects button[aria-pressed="true"] { border-color: var(--fg); }
}
@media (min-width: 760px) { .st-inbox-main { grid-template-columns: minmax(0, 1fr) 330px; align-items: start; } }

/* Launch day finale */
.st-finale { background: radial-gradient(110% 80% at 50% 120%, #ff8a2a 0%, #e24a12 20%, #8c2408 40%, #3a1206 60%, var(--night) 82%); padding-block: clamp(96px, 13vw, 180px); text-align: center; overflow: hidden; }
.st-finale .st-time { justify-content: center; color: var(--lime); }
.st-finale h2 { font-weight: 700; font-size: clamp(3.2rem, 10vw, 9rem); line-height: .9; letter-spacing: -.05em; margin-top: 20px !important; }
.st-finale h2 em { font-style: normal; color: var(--lime); }
.st-finale p { font-size: clamp(1.15rem, 1.7vw, 1.45rem); line-height: 1.5; max-width: 32em; margin: 28px auto 0 !important; color: rgba(246,241,234,.86); }
.st-finale .st-toast { max-width: 420px; margin: 40px auto 0; text-align: left; animation: none; }
.st-finale .st-cta { justify-content: center; }

/* Worlds we've built */
.st-worlds { background: var(--pearl); color: var(--cocoa-ink); padding-block: clamp(80px, 11vw, 150px); }
.st-worlds-head { display: grid; gap: 24px; align-items: end; margin-bottom: clamp(40px, 6vw, 72px); }
@media (min-width: 960px) { .st-worlds-head { grid-template-columns: 1.3fr 1fr; } }
.st-world-grid { display: grid; gap: 16px; grid-template-columns: minmax(0, 1fr); }
@media (min-width: 760px) { .st-world-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
@media (min-width: 1100px) { .st-world-grid { grid-template-columns: repeat(4, minmax(0, 1fr)); } .st-world.st-big { grid-column: span 2; } }
.st-world { background: var(--bg); color: var(--fg); border-radius: 26px; padding: clamp(18px, 2vw, 26px); display: flex; flex-direction: column; gap: 18px; text-decoration: none; transition: transform .3s ease; min-width: 0; }
a.st-world:hover { transform: translateY(-6px); }
.st-world-top { display: flex; justify-content: space-between; align-items: flex-start; gap: 12px; }
.st-world h3 { font-weight: 700; font-size: clamp(1.7rem, 2.6vw, 2.6rem); letter-spacing: -.035em; line-height: 1; }
.st-world h3 svg { display: inline; vertical-align: .1em; margin-left: 4px; }
.st-world-tag { opacity: .75; margin-top: 8px !important; }
.st-dots { display: flex; gap: 4px; flex: none; }
.st-dots i { width: 18px; height: 18px; border-radius: 50%; box-shadow: 0 0 0 1.5px rgba(127,127,127,.35); }
.st-world .st-media { border-radius: 14px; margin-top: auto; }
.st-made { list-style: none; margin: 0; padding: 0; display: flex; flex-wrap: wrap; gap: 6px; }
.st-made li { padding: 5px 10px; border-radius: 999px; background: rgba(127,127,127,.16); }

/* What we make */
.st-make { background: var(--night); padding-block: clamp(80px, 11vw, 150px); }
.st-make-grid { display: grid; gap: 14px; margin-top: clamp(40px, 6vw, 64px); grid-template-columns: minmax(0, 1fr); }
@media (min-width: 760px) { .st-make-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
@media (min-width: 1100px) { .st-make-grid { grid-template-columns: repeat(4, minmax(0, 1fr)); } }
.st-offer { border-radius: 24px; padding: 26px; background: #22140f; border: 1px solid rgba(246,241,234,.08); display: flex; flex-direction: column; gap: 14px; }
.st-offer h3 { font-weight: 700; font-size: 30px; letter-spacing: -.03em; line-height: 1; }
.st-offer p { color: rgba(246,241,234,.78); font-size: 16px; }
.st-offer ul { list-style: none; margin: auto 0 0; padding: 14px 0 0; display: grid; gap: 6px; font-size: 15px; border-top: 1px solid rgba(246,241,234,.1); }
.st-offer li { display: flex; gap: 10px; }
.st-offer li::before { content: ""; width: 7px; height: 7px; border-radius: 50%; background: var(--dot); margin-top: 9px; flex: none; }
.st-offer-chapter { color: var(--dot); }
.st-whole { margin-top: 14px; border-radius: 24px; padding: clamp(24px, 3vw, 40px); background: var(--lime); color: var(--night); display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 20px; }
.st-whole b { font-size: clamp(1.5rem, 2.8vw, 2.4rem); font-weight: 700; letter-spacing: -.03em; line-height: 1.05; display: block; }
.st-whole p { font-size: 16px; margin-top: 6px !important; max-width: 38em; }
.st-whole .st-btn { background: var(--night); color: var(--pearl); }

/* Seven questions */
.st-start { background: linear-gradient(180deg, var(--night) 0%, var(--ember) 100%); padding-block: clamp(80px, 11vw, 150px); }
.st-start-grid { display: grid; gap: clamp(32px, 5vw, 64px); align-items: start; }
@media (min-width: 1000px) { .st-start-grid { grid-template-columns: minmax(0, .85fr) minmax(0, 1.15fr); } .st-start-copy { position: sticky; top: 110px; } }
.st-start-copy { display: flex; flex-direction: column; gap: 22px; }
.st-start-copy > p:not(.st-mono) { color: rgba(246,241,234,.8); font-size: clamp(1.1rem, 1.4vw, 1.25rem); max-width: 30em; }
.st-after { list-style: none; margin: 8px 0 0; padding: 0; display: grid; gap: 10px; color: rgba(246,241,234,.8); font-size: 16px; }
.st-after li { display: grid; grid-template-columns: 26px 1fr; gap: 8px; }
.st-after span { color: var(--lime); font-family: var(--mono); font-size: 12px; padding-top: 4px; }
.st-quiz { background: var(--pearl); color: var(--cocoa-ink); border-radius: 30px; padding: clamp(22px, 3.4vw, 44px); box-shadow: 0 40px 100px rgba(0,0,0,.4); }
.st-quiz-top { display: flex; justify-content: space-between; align-items: center; gap: 12px; color: #7a6a5e; }
.st-bar { height: 6px; border-radius: 999px; background: var(--pearl-2); margin-top: 14px; overflow: hidden; }
.st-bar i { display: block; height: 100%; border-radius: inherit; background: linear-gradient(90deg, var(--sun), #b9d61f); transition: width .4s ease; }
.st-quiz h3 { font-weight: 700; font-size: clamp(1.8rem, 3.4vw, 3rem); letter-spacing: -.035em; line-height: 1.02; margin-top: 28px !important; }
.st-quiz-hint { color: #7a6a5e; margin-top: 10px !important; font-size: 16px; }
.st-quiz textarea { width: 100%; margin-top: 22px; min-height: 120px; padding: 16px 18px; border-radius: 16px; border: 1.5px solid #d9cfc2; background: #fffdf9; color: inherit; font: inherit; font-size: 17px; line-height: 1.5; resize: vertical; }
.st-quiz textarea:focus { outline: none; border-color: var(--sun); box-shadow: 0 0 0 4px rgba(255,107,26,.15); }
.st-quiz-chips { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 14px; }
.st-quiz-chips button { min-height: 44px; padding: 8px 16px; border-radius: 999px; border: 1.5px solid #d9cfc2; background: transparent; color: inherit; font: inherit; font-size: 15px; cursor: pointer; transition: border-color .2s ease, background-color .2s ease; }
.st-quiz-chips button:hover { border-color: var(--cocoa-ink); }
.st-quiz-chips button[aria-pressed="true"] { background: var(--cocoa-ink); border-color: var(--cocoa-ink); color: var(--pearl); }
.st-quiz-nav { display: flex; flex-wrap: wrap; justify-content: space-between; align-items: center; gap: 12px; margin-top: 26px; }
.st-quiz-nav .st-btn { background: var(--night); color: var(--pearl); }
.st-quiz-back { display: inline-flex; align-items: center; gap: 6px; min-height: 44px; padding: 8px 4px; border: 0; background: none; color: inherit; font: inherit; font-size: 16px; font-weight: 600; cursor: pointer; }
.st-quiz-back:disabled { opacity: .35; cursor: default; }
.st-steps { display: flex; gap: 6px; margin-top: 26px; flex-wrap: wrap; }
.st-steps button { width: 44px; height: 44px; border-radius: 50%; border: 1.5px solid #d9cfc2; background: transparent; font-family: var(--mono); font-size: 12px; color: #7a6a5e; cursor: pointer; }
.st-steps button[data-done="true"] { background: var(--pearl-2); color: var(--cocoa-ink); }
.st-steps button[aria-current="step"] { border-color: var(--cocoa-ink); color: var(--cocoa-ink); }
.st-summary { list-style: none; margin: 22px 0 0; padding: 0; display: grid; gap: 0; }
.st-summary li { display: grid; gap: 4px; padding-block: 14px; border-top: 1px solid #e2d8cb; }
.st-summary small { font-family: var(--mono); font-size: 11px; letter-spacing: .08em; text-transform: uppercase; color: #7a6a5e; }
.st-summary span { font-size: 16px; }
.st-summary .st-empty { color: #9a8b7f; }

.st-foot { background: var(--ember); border-top: 1px solid rgba(246,241,234,.08); padding-block: 28px 40px; }
.st-foot .st-wrap { display: flex; flex-wrap: wrap; justify-content: space-between; gap: 12px 24px; color: rgba(246,241,234,.7); font-size: 15px; }
.st-foot a { text-underline-offset: 4px; }
`;

const bookHref = (goal: string) => `/book?goal=${encodeURIComponent(goal)}`;
const site = (slug: string) => WEBSITES.find((w) => w.slug === slug)!;
const host = (url: string) => url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");
const hd = (img: string) => img.replace(".jpg", "-hd.jpg");
const reducedMotion = () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

type Swatch = { name: string; hex: string };
type Palette = { bg: string; fg: string; mute: string; ac: string; rule: string; swatches: Swatch[] };

// Brand palettes. Moodring's come from its email code; the others are sampled
// from the delivered emails and films.
const PALETTES = {
  bibire: { bg: "#10281d", fg: "#f0eee9", mute: "#c3cbbd", ac: "#c9d98a", rule: "rgba(240,238,233,.16)", swatches: [{ name: "Forest", hex: "#10281D" }, { name: "Bone", hex: "#F0EEE9" }, { name: "Sage", hex: "#9BA18E" }] },
  moodring: { bg: "#ffe8c8", fg: "#5e3b24", mute: "#7a5238", ac: "#a3500f", rule: "rgba(94,59,36,.18)", swatches: [{ name: "Peach", hex: "#FFE8C8" }, { name: "Cocoa", hex: "#5E3B24" }, { name: "Ember", hex: "#B85D14" }] },
  taya: { bg: "#231b18", fg: "#faf6f0", mute: "#cfc6ba", ac: "#dec58d", rule: "rgba(250,246,240,.16)", swatches: [{ name: "Espresso", hex: "#231B18" }, { name: "Linen", hex: "#FAF6F0" }, { name: "Gold", hex: "#DEC58D" }] },
  inbox: { bg: "#5e3b24", fg: "#fff7ed", mute: "#f0d9c2", ac: "#ffe39a", rule: "rgba(255,247,237,.18)", swatches: [] },
  expertlinc: { bg: "#171e31", fg: "#f9f7f3", mute: "#c4c8d4", ac: "#7fa8ea", rule: "rgba(249,247,243,.16)", swatches: [{ name: "Navy", hex: "#171E31" }, { name: "Signal blue", hex: "#2764BB" }, { name: "Paper", hex: "#F9F7F3" }] },
} satisfies Record<string, Palette>;

const lightText = (hex: string) => {
  const [r, g, b] = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16));
  return 0.299 * r + 0.587 * g + 0.114 * b < 150;
};

const bandStyle = (p: Palette) => ({ "--bg": p.bg, "--fg": p.fg, "--mute": p.mute, "--ac": p.ac, "--rule": p.rule } as CSSProperties);

const TAYA_EMAILS = [
  "The thought you almost lost.",
  "Why a necklace?",
  "Your phone can already take a voice note.",
  "We decided TAYA should know less.",
  "$650 is a lot for a necklace.",
  "Who is TAYA actually for?",
  "Maybe you're ready.",
].map((subject, i) => ({ subject, src: `/studio/taya/email-${i + 1}.webp` }));

const MOODRING_EMAILS = [
  "you're in ☀️",
  "nobody noticed a thing",
  "7h 14m",
  "you said work",
  "your grown-up mood ring",
  "does it tell me I'm burning out?",
  "what happens next",
].map((subject, i) => ({ subject, src: `/studio/moodring/email-${i + 1}.webp` }));

const ROUTE = [
  { href: "#film", time: "08:12", label: "She sees a film", dot: "#9BA18E" },
  { href: "#site", time: "08:13", label: "She falls for the site", dot: "#B85D14" },
  { href: "#popup", time: "08:15", label: "She leaves her email", dot: "#DEC58D" },
  { href: "#inbox", time: "Days 1–18", label: "Her inbox does the rest", dot: "#5E3B24" },
  { href: "#launch", time: "Launch day", label: "She buys", dot: "#ff6b1a" },
];

const QUESTIONS = [
  { q: "What is the single biggest challenge in your business right now?", short: "Biggest challenge", hint: "The thing that keeps coming back.", chips: ["Not enough sales", "Nobody has heard of us", "The site doesn't convert", "No email list yet"] },
  { q: "How long has the problem existed?", short: "How long", hint: "A rough answer is fine.", chips: ["A few weeks", "A few months", "Over a year", "Since we started"] },
  { q: "What have you already tried that did not work?", short: "Already tried", hint: "Agencies, templates, ads, doing it yourself.", chips: ["A template site", "Paid ads", "Another agency", "Doing it myself"] },
  { q: "What outcome are you actually after?", short: "Outcome", hint: "Picture it working. What do you see?", chips: ["A sold-out launch", "Steady sales every week", "A brand people trust", "A list that buys"] },
  { q: "Why now?", short: "Why now", hint: "What changed, or what's coming up.", chips: ["A launch is coming", "Sales have stalled", "We've outgrown our site", "Raising money"] },
  { q: "What is it costing you to leave this alone?", short: "Cost of waiting", hint: "Money, time, or the customers you never hear from.", chips: ["Lost sales", "Wasted ad spend", "My time", "Credibility"] },
  { q: "What would make you confident enough to move forward?", short: "To move forward", hint: "What would you need to see or hear from us?", chips: ["Seeing similar work", "A clear plan and price", "Knowing the timeline", "Talking it through"] },
];

const MORE = ["meji", "momsandmore", "wigpa", "getyourcrib"].map(site);
const MORE_COLORS: Record<string, { bg: string; fg: string; dots: string[] }> = {
  meji: { bg: "#6b1d0a", fg: "#fff6ec", dots: ["#6B1D0A", "#FFF6EC", "#FFB23E"] },
  momsandmore: { bg: "#ffd95c", fg: "#2e1a16", dots: ["#FFD95C", "#2E1A16", "#8A3200"] },
  wigpa: { bg: "#3b0508", fg: "#fff6ec", dots: ["#3B0508", "#FFF6EC", "#DCB36A"] },
  getyourcrib: { bg: "#17337a", fg: "#ffffff", dots: ["#17337A", "#FFFFFF", "#FFB94D"] },
};

/** A muted, looping film that plays while on screen. Pause and sound are always reachable. */
const Film = ({ src, poster, label, ratio = "st-r916", sound = false, className = "" }: { src: string; poster: string; label: string; ratio?: string; sound?: boolean; className?: string }) => {
  const ref = useRef<HTMLVideoElement>(null);
  const userPaused = useRef(false);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);

  useEffect(() => {
    const v = ref.current;
    if (!v || reducedMotion()) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !userPaused.current) v.play().catch(() => {});
      else if (!e.isIntersecting) v.pause();
    }, { threshold: 0.3 });
    io.observe(v);
    return () => io.disconnect();
  }, []);

  useEffect(() => { if (ref.current) ref.current.muted = muted; }, [muted]);

  const toggle = () => {
    const v = ref.current;
    if (!v) return;
    if (v.paused) { userPaused.current = false; v.play().catch(() => {}); }
    else { userPaused.current = true; v.pause(); }
  };

  return (
    <div className={`st-media ${ratio} ${className}`}>
      <video ref={ref} src={src} poster={poster} muted loop playsInline preload="none" aria-label={label}
        onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)} />
      <div className="st-ctl">
        {sound && (
          <button type="button" onClick={() => setMuted((m) => !m)} aria-label={muted ? `Turn sound on: ${label}` : `Mute: ${label}`}>
            {muted ? <VolumeX size={18} /> : <Volume2 size={18} />}
          </button>
        )}
        <button type="button" onClick={toggle} aria-label={playing ? `Pause ${label}` : `Play ${label}`}>
          {playing ? <Pause size={18} /> : <Play size={18} />}
        </button>
      </div>
    </div>
  );
};

const Browser = ({ url, img, alt, eager = false }: { url: string; img: string; alt: string; eager?: boolean }) => (
  <div className="st-browser">
    <div className="st-browser-bar" aria-hidden="true"><i /><span>{host(url)}</span></div>
    <div className="st-media st-r1610"><img src={img} alt={alt} loading={eager ? "eager" : "lazy"} /></div>
  </div>
);

const Swatches = ({ items }: { items: Swatch[] }) => (
  <div className="st-swatches" aria-label="Brand palette">
    {items.map((s) => (
      <div key={s.hex} className="st-swatch" style={{ background: s.hex, color: lightText(s.hex) ? "#fff" : "#1a120e" }}>
        <b>{s.name}</b><small>{s.hex}</small>
      </div>
    ))}
  </div>
);

const Toast = ({ icon, iconBg, iconFg, title, body, time }: { icon: string; iconBg: string; iconFg: string; title: string; body: string; time: string }) => (
  <div className="st-toast">
    <span className="st-toast-icon" style={{ background: iconBg, color: iconFg }} aria-hidden="true">{icon}</span>
    <span><b>{title}</b>{body}</span>
    <small>{time}</small>
  </div>
);

const SERIES = { Moodring: MOODRING_EMAILS, Taya: TAYA_EMAILS };

const Inbox = () => {
  const [brand, setBrand] = useState<keyof typeof SERIES>("Moodring");
  const [i, setI] = useState(0);
  const screen = useRef<HTMLDivElement>(null);
  const emails = SERIES[brand];
  useEffect(() => { screen.current?.scrollTo({ top: 0 }); }, [i, brand]);
  return (
    <div className="st-inbox">
      <div className="st-brand-tabs" role="group" aria-label="Welcome series">
        {(Object.keys(SERIES) as (keyof typeof SERIES)[]).map((b) => (
          <button key={b} type="button" aria-pressed={b === brand} onClick={() => { setBrand(b); setI(0); }}>{b} · 7 emails</button>
        ))}
      </div>
      <div className="st-inbox-main">
        <ol className="st-subjects" aria-label={`${brand} welcome emails`}>
          {emails.map((e, n) => (
            <li key={e.src}>
              <button type="button" aria-pressed={n === i} onClick={() => setI(n)}>
                <span className="st-mono">{String(n + 1).padStart(2, "0")}</span>
                <span>{e.subject}</span>
              </button>
            </li>
          ))}
        </ol>
        <div>
          <div className="st-phone">
            <div className="st-phone-bar" aria-hidden="true"><i /></div>
            <div className="st-screen" ref={screen} tabIndex={0} role="region" aria-label={`${brand} email ${i + 1}, scroll to read`}>
              <img key={emails[i].src} src={emails[i].src} alt={`${brand} email ${i + 1}, "${emails[i].subject}", as it reads on a phone`} loading="lazy" />
            </div>
          </div>
          <p className="st-swipe st-mono">Scroll the phone to read</p>
        </div>
      </div>
    </div>
  );
};

const Chapter = ({ id, palette, time, title, children, media, flip = false, wide = false, credit }: { id: string; palette: Palette; time: string; title: ReactNode; children: ReactNode; media: ReactNode; flip?: boolean; wide?: boolean; credit: ReactNode }) => (
  <section id={id} className="st-chapter" style={bandStyle(palette)} aria-labelledby={`${id}-title`}>
    <div className={`st-wrap st-chapter-grid${flip ? " st-flip" : ""}${wide ? " st-wide" : ""}`}>
      <div className="st-chapter-copy">
        <span className="st-time st-mono">{time}</span>
        <h2 id={`${id}-title`}>{title}</h2>
        <p>{children}</p>
        <div className="st-credit st-mono">{credit}</div>
        {palette.swatches.length > 0 && <Swatches items={palette.swatches} />}
      </div>
      <div className="st-comp">{media}</div>
    </div>
  </section>
);

const Quiz = () => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>(() => QUESTIONS.map(() => ""));
  const done = step === QUESTIONS.length;
  const field = useRef<HTMLTextAreaElement>(null);
  const first = useRef(true);

  useEffect(() => {
    if (first.current) { first.current = false; return; }
    if (!done) field.current?.focus();
  }, [step, done]);

  const set = (v: string) => setAnswers((a) => a.map((x, n) => (n === step ? v : x)));
  const toggleChip = (chip: string) => {
    const parts = answers[step].split(", ").filter(Boolean);
    set(parts.includes(chip) ? parts.filter((p) => p !== chip).join(", ") : [...parts, chip].join(", "));
  };
  const goal = ["Studio enquiry", ...QUESTIONS.map((q, n) => `${n + 1}. ${q.short}: ${answers[n].trim().slice(0, 240) || "-"}`)].join("\n");
  const answered = answers.filter((a) => a.trim()).length;

  return (
    <div className="st-quiz" aria-live="polite">
      <div className="st-quiz-top st-mono">
        <span>{done ? "All set" : `Question ${step + 1} of ${QUESTIONS.length}`}</span>
        <span>{answered} answered</span>
      </div>
      <div className="st-bar" aria-hidden="true"><i style={{ width: `${(Math.min(step, QUESTIONS.length) / QUESTIONS.length) * 100}%` }} /></div>

      {!done ? (
        <>
          <h3 id="quiz-q">{QUESTIONS[step].q}</h3>
          <p className="st-quiz-hint">{QUESTIONS[step].hint}</p>
          <textarea id={`quiz-a-${step}`} ref={field} aria-labelledby="quiz-q" value={answers[step]} onChange={(e) => set(e.target.value)} placeholder="Type here, or tap an answer below" />
          <div className="st-quiz-chips" role="group" aria-label="Quick answers">
            {QUESTIONS[step].chips.map((c) => (
              <button key={c} type="button" aria-pressed={answers[step].split(", ").includes(c)} onClick={() => toggleChip(c)}>{c}</button>
            ))}
          </div>
          <div className="st-quiz-nav">
            <button type="button" className="st-quiz-back" onClick={() => setStep((s) => s - 1)} disabled={step === 0}><ArrowLeft size={18} /> Back</button>
            <button type="button" className="st-btn" onClick={() => setStep((s) => s + 1)}>
              {step === QUESTIONS.length - 1 ? "Review my answers" : answers[step].trim() ? "Next question" : "Skip for now"} <ArrowRight size={18} />
            </button>
          </div>
        </>
      ) : (
        <>
          <h3>Ready when you are.</h3>
          <p className="st-quiz-hint">Your answers go with your booking, so the call starts where it matters.</p>
          <ul className="st-summary">
            {QUESTIONS.map((q, n) => (
              <li key={q.short}><small>{q.short}</small><span className={answers[n].trim() ? "" : "st-empty"}>{answers[n].trim() || "We'll ask on the call"}</span></li>
            ))}
          </ul>
          <div className="st-quiz-nav">
            <button type="button" className="st-quiz-back" onClick={() => setStep(QUESTIONS.length - 1)}><ArrowLeft size={18} /> Edit answers</button>
            <Link className="st-btn" to={bookHref(goal)}>Book my 30-minute call <ArrowRight size={18} /></Link>
          </div>
        </>
      )}

      <div className="st-steps" aria-label="Jump to a question">
        {QUESTIONS.map((q, n) => (
          <button key={q.short} type="button" aria-label={`Question ${n + 1}: ${q.short}`} aria-current={n === step ? "step" : undefined} data-done={!!answers[n].trim()} onClick={() => setStep(n)}>{n + 1}</button>
        ))}
      </div>
    </div>
  );
};

const WebsitesPage = () => {
  const moodring = site("moodring");
  const bibire = site("bibire");
  const expertlinc = site("expertlinc");

  useEffect(() => { document.title = "Nexara Studio · Films, websites, pop-ups and emails"; }, []);

  return (
    <div className="st">
      <style>{STYLES}</style>

      <nav className="st-nav" aria-label="Studio">
        <div className="st-wrap">
          <Link to="/websites" className="st-brand"><i aria-hidden="true" />Nexara <span>Studio</span></Link>
          <div className="st-nav-links">
            <a href="#journey">The journey</a>
            <a href="#worlds">Work</a>
            <a href="#make">What we make</a>
          </div>
          <a className="st-btn" href="#start">Plan my launch</a>
        </div>
      </nav>

      <header className="st-hero st-grain">
        <div className="st-wrap st-hero-grid">
          <div>
            <span className="st-eyebrow st-mono st-rise"><i aria-hidden="true" />Films · Websites · Pop-ups · Emails</span>
            <h1 className="st-h1 st-rise st-rise-2">Picture <em>launch day.</em></h1>
            <p className="st-hero-sub st-rise st-rise-3">Pre-orders landing while you sleep. Strangers writing back like old friends. A brand that finally looks as big as it feels. We build everything that gets you there.</p>
            <div className="st-cta st-rise st-rise-3">
              <a className="st-btn" href="#start">Plan my launch <ArrowRight size={18} /></a>
              <a className="st-btn st-btn-ghost" href="#journey">See how it happens</a>
            </div>
          </div>

          <div className="st-stage" role="img" aria-label="Launch day, pictured: the Moodring website and a Taya email on a phone, with notifications for a pre-order, a waitlist sign-up and a reply.">
            <span className="st-stage-note st-mono">Launch day, pictured</span>
            <div className="st-stage-browser"><Browser url={moodring.url} img={hd(moodring.img)} alt="" eager /></div>
            <div className="st-stage-phone st-device"><img src="/studio/taya/email-7.webp" alt="" /></div>
            <div className="st-toasts">
              <Toast icon="T" iconBg="#231B18" iconFg="#DEC58D" title="Taya · Pre-order received" body="Batch 2 · $650" time="now" />
              <Toast icon="M" iconBg="#FFE8C8" iconFg="#5E3B24" title="Moodring · New on the waitlist" body="Maya joined" time="2m" />
              <Toast icon="✉" iconBg="#d6f24a" iconFg="#140a07" title="Reply to “you're in ☀️”" body="Maya wrote back" time="4m" />
            </div>
          </div>
        </div>
      </header>

      <main>
        <section id="journey" className="st-meet" aria-labelledby="meet-title" style={{ "--accent": "#e24a12" } as CSSProperties}>
          <div className="st-wrap">
            <div className="st-meet-grid">
              <div>
                <p className="st-mono" style={{ color: "#7a6a5e", marginBottom: 20 }}>How a stranger becomes a customer</p>
                <h2 id="meet-title" className="st-h2">This is Maya. <em>She hasn't heard of you yet.</em></h2>
              </div>
              <p className="st-lede">Follow her from the first film she sees to the moment she buys. Every step is real work we've shipped, in the colours of the brand it was made for.</p>
            </div>
            <ol className="st-route">
              {ROUTE.map((r) => (
                <li key={r.href} style={{ "--dot": r.dot } as CSSProperties}>
                  <a href={r.href}><small className="st-mono">{r.time}</small><b>{r.label}</b></a>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <Chapter id="film" palette={PALETTES.bibire} time="08:12 · The film" title={<>She sees a film. <em>She stops scrolling.</em></>}
          credit={<><b>Bibiré</b><span>Brand film · 9:16</span></>}
          media={
            <div className="st-comp-film">
              <Film src="/studio/films/bibire-film.mp4" poster="/studio/films/bibire-film.webp" label="Bibiré brand film" sound className="st-round" />
              <div className="st-stills">
                <img src="/studio/films/bibire-still-train.webp" alt="Still from the Bibiré film: Your day was never just the workout." loading="lazy" />
                <img src="/studio/films/bibire-still-bra.webp" alt="Still from the Bibiré film: product detail for the leggings." loading="lazy" />
              </div>
            </div>
          }>
          Fifty seconds on her feed: a morning run, a commute, a dinner, all in the same kit. She's never heard of the brand. Now she wants to be the person in the film.
        </Chapter>

        <Chapter id="site" palette={PALETTES.moodring} time="08:13 · The website" flip title={<>She taps through <em>to a world.</em></>}
          credit={<><b>Moodring</b><span>Story site</span><a href={moodring.url} target="_blank" rel="noreferrer">{host(moodring.url)} ↗</a></>}
          media={
            <div className="st-comp-site">
              <Browser url={moodring.url} img={hd(moodring.img)} alt="The Moodring website" />
              <div className="st-device"><img src={moodring.img.replace(".jpg", "-mobile.jpg")} alt="The Moodring website on a phone" loading="lazy" /></div>
            </div>
          }>
          Not a brochure. A site that walks through her own day, hour by hour, until the ring on the screen feels like it was made for her.
        </Chapter>

        <Chapter id="popup" palette={PALETTES.taya} time="08:15 · The pop-up" title={<>She gets a reason <em>to stay.</em></>}
          credit={<><b>Taya</b><span>Pop-up · two versions</span></>}
          media={
            <div className="st-comp-pop">
              <div className="st-pop-desk"><img src="/studio/taya/popup-a-desktop.webp" alt="Taya pop-up on desktop: What if you didn't have to remember everything?" loading="lazy" /></div>
              <div className="st-pop-phone st-device"><img src="/studio/taya/popup-b-mobile.webp" alt="Taya pop-up on a phone: Some things are too good to lose." loading="lazy" /></div>
            </div>
          }>
          Just before she leaves, one good question. She gives her email because she wants to hear the rest of the story, not because a timer told her to.
        </Chapter>

        <Chapter id="inbox" palette={PALETTES.inbox} time="Days 1–18 · The emails" wide title={<>Her inbox <em>does the selling.</em></>}
          credit={<><b>Moodring</b><span>and</span><b>Taya</b><span>Welcome series</span></>}
          media={<Inbox />}>
          Seven emails in the founder's own voice. The story, the product up close, the honest answers. By the time the price arrives, she already trusts who she's buying from. Tap a subject line to read them.
        </Chapter>

        <section id="launch" className="st-finale st-grain" aria-labelledby="launch-title">
          <div className="st-wrap">
            <span className="st-time st-mono">Launch day</span>
            <h2 id="launch-title">She buys. <em>You get to enjoy it.</em></h2>
            <p>That's the trip. The film brought her in, the site made her want it, the pop-up kept her, and the emails carried her to the sale. One studio, so every step looks and sounds like you.</p>
            <Toast icon="T" iconBg="#231B18" iconFg="#DEC58D" title="Taya · Pre-order received" body="Maya · Batch 2" time="now" />
            <div className="st-cta">
              <a className="st-btn" href="#start">Plan my launch <ArrowRight size={18} /></a>
              <a className="st-btn st-btn-ghost" href="#worlds">See more work</a>
            </div>
          </div>
        </section>

        <section id="worlds" className="st-worlds" aria-labelledby="worlds-title" style={{ "--accent": "#e24a12" } as CSSProperties}>
          <div className="st-wrap">
            <div className="st-worlds-head">
              <div>
                <p className="st-mono" style={{ color: "#7a6a5e", marginBottom: 20 }}>Worlds we've built</p>
                <h2 id="worlds-title" className="st-h2">Every brand gets <em>its own world.</em></h2>
              </div>
              <p className="st-lede">Its own colours, its own voice, its own story. Nothing here came from a template.</p>
            </div>
            <div className="st-world-grid">
              <a className="st-world st-big" href={expertlinc.url} target="_blank" rel="noreferrer" style={{ "--bg": PALETTES.expertlinc.bg, "--fg": PALETTES.expertlinc.fg } as CSSProperties}>
                <div className="st-world-top">
                  <div><h3>ExpertLinc <ArrowUpRight size={22} /></h3><p className="st-world-tag st-mono">Careers platform</p></div>
                  <div className="st-dots" aria-hidden="true">{PALETTES.expertlinc.swatches.map((s) => <i key={s.hex} style={{ background: s.hex }} />)}</div>
                </div>
                <ul className="st-made st-mono"><li>Website</li><li>Campaign page</li><li>Brand intro</li><li>Showreel</li></ul>
                <Film src="/studio/films/expertlinc-showreel.mp4" poster="/studio/films/expertlinc-showreel.webp" label="ExpertLinc showreel" ratio="st-r169" />
              </a>
              <a className="st-world st-big" href={bibire.url} target="_blank" rel="noreferrer" style={{ "--bg": PALETTES.bibire.bg, "--fg": PALETTES.bibire.fg } as CSSProperties}>
                <div className="st-world-top">
                  <div><h3>Bibiré <ArrowUpRight size={22} /></h3><p className="st-world-tag st-mono">Activewear store</p></div>
                  <div className="st-dots" aria-hidden="true">{PALETTES.bibire.swatches.map((s) => <i key={s.hex} style={{ background: s.hex }} />)}</div>
                </div>
                <ul className="st-made st-mono"><li>Online store</li><li>Brand film</li></ul>
                <div className="st-media st-r169"><img src={hd(bibire.img)} alt="The Bibiré online store" loading="lazy" /></div>
              </a>
              <div className="st-world st-big" style={{ "--bg": PALETTES.expertlinc.bg, "--fg": PALETTES.expertlinc.fg } as CSSProperties}>
                <div className="st-world-top">
                  <div><h3>ExpertLinc · Intro</h3><p className="st-world-tag st-mono">Brand film · 16:9</p></div>
                </div>
                <Film src="/studio/films/expertlinc-intro.mp4" poster="/studio/films/expertlinc-intro.webp" label="ExpertLinc brand intro" ratio="st-r169" sound />
              </div>
              <div className="st-world st-big" style={{ "--bg": PALETTES.taya.bg, "--fg": PALETTES.taya.fg } as CSSProperties}>
                <div className="st-world-top">
                  <div><h3>Taya</h3><p className="st-world-tag st-mono">Jewelry that remembers</p></div>
                  <div className="st-dots" aria-hidden="true">{PALETTES.taya.swatches.map((s) => <i key={s.hex} style={{ background: s.hex }} />)}</div>
                </div>
                <ul className="st-made st-mono"><li>Welcome series</li><li>Pop-ups</li><li>Launch film</li></ul>
                <Film src="/studio/films/taya-film.mp4" poster="/studio/films/taya-film.webp" label="Taya launch film" ratio="st-r169" sound />
              </div>
              {MORE.map((w) => {
                const c = MORE_COLORS[w.slug];
                return (
                  <a key={w.slug} className="st-world" href={w.url} target="_blank" rel="noreferrer" style={{ "--bg": c.bg, "--fg": c.fg } as CSSProperties}>
                    <div className="st-world-top">
                      <div><h3>{w.name} <ArrowUpRight size={20} /></h3><p className="st-world-tag st-mono">{w.tag}</p></div>
                      <div className="st-dots" aria-hidden="true">{c.dots.map((d) => <i key={d} style={{ background: d }} />)}</div>
                    </div>
                    <div className="st-media st-r1610"><img src={hd(w.img)} alt={`The ${w.name} website`} loading="lazy" /></div>
                  </a>
                );
              })}
            </div>
          </div>
        </section>

        <section id="make" className="st-make" aria-labelledby="make-title" style={{ "--accent": "#d6f24a" } as CSSProperties}>
          <div className="st-wrap">
            <p className="st-mono" style={{ opacity: .7, marginBottom: 20 }}>What we make</p>
            <h2 id="make-title" className="st-h2">Every stop <em>on her journey.</em></h2>
            <div className="st-make-grid">
              {[
                { name: "Motion films", chapter: "08:12 · She sees it", dot: "#c9d98a", body: "Brand films, launch reels and intros, cut for your site, ads and socials.", items: ["9:16 and 16:9 cuts", "Built from your brand and footage", "Ready to post"] },
                { name: "Websites", chapter: "08:13 · She falls for it", dot: "#ff9a4a", body: "Story sites, stores and landing pages built around what she needs to believe before she buys.", items: ["Design and build", "Your domain, analytics and search set up", "Tested on phone and desktop"] },
                { name: "Pop-ups", chapter: "08:15 · She stays", dot: "#DEC58D", body: "The moment a visitor becomes a subscriber, on every screen size.", items: ["Desktop and phone layouts", "Two versions to test", "Connected to your list"] },
                { name: "Email journeys", chapter: "Days 1–18 · She trusts you", dot: "#ffe39a", body: "A welcome series in your voice, designed to match the site.", items: ["Planned email by email", "Copy and design", "Set up in your email platform"] },
              ].map((o) => (
                <div key={o.name} className="st-offer" style={{ "--dot": o.dot } as CSSProperties}>
                  <span className="st-offer-chapter st-mono">{o.chapter}</span>
                  <h3>{o.name}</h3>
                  <p>{o.body}</p>
                  <ul>{o.items.map((it) => <li key={it}>{it}</li>)}</ul>
                </div>
              ))}
            </div>
            <div className="st-whole">
              <div>
                <b>Or the whole launch.</b>
                <p>Film, site, pop-up and emails, made as one piece so every step looks and sounds like the same brand.</p>
              </div>
              <a className="st-btn" href="#start">Plan my launch <ArrowRight size={18} /></a>
            </div>
          </div>
        </section>

        <section id="start" className="st-start" aria-labelledby="start-title" style={{ "--accent": "#d6f24a" } as CSSProperties}>
          <div className="st-wrap st-start-grid">
            <div className="st-start-copy">
              <p className="st-mono" style={{ opacity: .7 }}>Start here</p>
              <h2 id="start-title" className="st-h2">Seven questions <em>before we build anything.</em></h2>
              <p>The same ones we'll ask on the call. Answer what you can and your answers travel with your booking, so the 30 minutes go on your launch, not on introductions.</p>
              <ol className="st-after">
                <li><span>01</span>A 30-minute call about what you sell and who buys it.</li>
                <li><span>02</span>You see the look, the words and the plan before anything is built.</li>
                <li><span>03</span>We build, test on real phones and inboxes, and launch on your domain.</li>
              </ol>
            </div>
            <Quiz />
          </div>
        </section>
      </main>

      <footer className="st-foot">
        <div className="st-wrap">
          <span>© {new Date().getFullYear()} Nexara Studio</span>
          <span><Link to="/">Nexara</Link> · <a href="mailto:faithfulnyama@gmail.com">faithfulnyama@gmail.com</a></span>
        </div>
      </footer>
    </div>
  );
};

export default WebsitesPage;
