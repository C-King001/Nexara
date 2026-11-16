// Nexara Studio styles. Scoped under .st so nothing leaks into the rest of the site.
// Palette is the studio's own (warm night, pearl, sun, lime); client colours only
// appear on the plates behind their own work.

const GRAIN = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`;

export const STYLES = `
@import url('https://fonts.googleapis.com/css2?family=Familjen+Grotesk:wght@400;500;600;700&family=Geist+Mono:wght@400;500&display=swap');

html:has(.st) { scroll-padding-top: 84px; }
@media (prefers-reduced-motion: no-preference) { html:has(.st) { scroll-behavior: smooth; } }

.st {
  --night: #140a07; --night-2: #1c110c; --ember: #2b0f06; --sun: #ff6b1a; --lime: #d6f24a;
  --pearl: #f6f1ea; --pearl-2: #ece4d8; --ink: #22170f; --mute: #6f6156; --mute-l: rgba(246,241,234,.66);
  --line: rgba(34,23,15,.14); --line-l: rgba(246,241,234,.12);
  --gutter: clamp(16px, 4vw, 56px);
  --ease: cubic-bezier(.7,0,.2,1); --out: cubic-bezier(.2,.8,.2,1);
  --mono: 'Geist Mono', ui-monospace, Menlo, monospace;
  background: var(--night); color: var(--pearl);
  font-family: 'Familjen Grotesk', system-ui, sans-serif; font-size: 17px; line-height: 1.55;
  -webkit-font-smoothing: antialiased; overflow-x: clip;
}
.st *, .st *::before, .st *::after { box-sizing: border-box; }
.st img, .st video { display: block; max-width: 100%; }
:where(.st a) { color: inherit; }
.st h1, .st h2, .st h3, .st h4 { font-family: inherit; margin: 0; text-wrap: balance; }
.st p { margin: 0; text-wrap: pretty; }
.st ul, .st ol { margin: 0; padding: 0; list-style: none; }
.st :focus-visible { outline: 2px solid var(--lime); outline-offset: 3px; }
.st-light :focus-visible, .st-sun :focus-visible { outline-color: var(--ink); }
.st-sr { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap; }
.st-skip { position: absolute; left: 12px; top: -60px; z-index: 100; background: var(--lime); color: var(--night); padding: 10px 16px; border-radius: 8px; font-weight: 600; }
.st-skip:focus { top: 12px; }
.st-wrap { max-width: 1440px; margin: 0 auto; padding-inline: var(--gutter); }
.st-mono { font-family: var(--mono); font-size: 12px; letter-spacing: .1em; text-transform: uppercase; font-weight: 400; }
.st-grain { position: relative; isolation: isolate; }
.st-grain::after { content: ""; position: absolute; inset: 0; background-image: ${GRAIN}; opacity: .1; mix-blend-mode: overlay; pointer-events: none; z-index: -1; }
.st section { scroll-margin-top: 72px; }
.st-light { background: var(--pearl); color: var(--ink); }
.st-sun { background: var(--sun); color: var(--ink); }
.st-pad { padding-block: clamp(84px, 10vw, 148px); }

/* Type */
.st-h1 { font-weight: 600; font-size: clamp(2.65rem, 5.5vw, 5.5rem); line-height: .98; letter-spacing: -.045em; }
.st-h2 { font-weight: 600; font-size: clamp(2.1rem, 4.4vw, 4rem); line-height: 1; letter-spacing: -.04em; }
.st-h2 em, .st-h1 em { font-style: normal; color: var(--lime); }
.st-light .st-h2 em { color: #c4470a; }
.st-sun .st-h2 em { color: var(--night); opacity: .55; }
.st-lede { font-size: clamp(1.08rem, 1.35vw, 1.24rem); line-height: 1.55; max-width: 34em; }
.st-light .st-lede, .st-light .st-dim { color: var(--mute); }
.st-dim { color: var(--mute-l); }
.st-label { display: flex; align-items: center; gap: 12px; margin-bottom: 22px; }
.st-label b { font-weight: 500; color: var(--lime); }
.st-light .st-label b { color: #c4470a; }
.st-sun .st-label b { color: var(--night); }
.st-label::after { content: ""; flex: 0 0 40px; height: 1px; background: currentColor; opacity: .35; }
.st-head { display: grid; gap: 22px 48px; align-items: end; margin-bottom: clamp(44px, 6vw, 80px); }
@media (min-width: 960px) { .st-head { grid-template-columns: minmax(0, 1.25fr) minmax(0, 1fr); } }

/* Buttons */
.st-btn { --bg: var(--lime); --fg: var(--night); position: relative; display: inline-flex; align-items: center; justify-content: center; gap: 10px; min-height: 52px; padding: 12px 24px; border-radius: 999px; font: inherit; font-size: 16px; font-weight: 600; letter-spacing: -.01em; text-decoration: none; border: 0; background: var(--bg); color: var(--fg); cursor: pointer; transition: transform .25s var(--out), background-color .25s ease; }
.st-btn svg { transition: transform .3s var(--out); }
.st-btn:hover svg { transform: translateX(4px); }
.st-btn:hover { transform: translateY(-1px); }
.st-btn-dark { --bg: var(--night); --fg: var(--pearl); }
.st-btn-ghost { --bg: transparent; --fg: currentColor; box-shadow: inset 0 0 0 1px currentColor; }
.st-btn-ghost:hover { --bg: rgba(127,127,127,.12); }
.st-btn-sm { min-height: 44px; padding: 8px 18px; font-size: 15px; }
.st-link { display: inline-flex; align-items: center; gap: 6px; min-height: 44px; font-weight: 600; text-decoration: underline; text-decoration-thickness: 1px; text-underline-offset: 5px; }
.st-link:hover { text-decoration-thickness: 2px; }

/* Nav */
.st-nav { position: sticky; top: 0; z-index: 50; transition: transform .45s var(--ease), background-color .3s ease, border-color .3s ease; border-bottom: 1px solid transparent; }
.st-nav[data-scrolled="true"] { background: rgba(20,10,7,.86); backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px); border-bottom-color: var(--line-l); }
.st-nav[data-hidden="true"] { transform: translateY(-100%); }
.st-nav .st-wrap { display: flex; align-items: center; gap: 24px; min-height: 72px; }
.st-logo { display: inline-flex; align-items: baseline; gap: 8px; min-height: 44px; align-items: center; text-decoration: none; margin-right: auto; }
.st-logo b { font-weight: 700; font-size: 21px; letter-spacing: -.045em; }
.st-logo b i { display: inline-block; width: 7px; height: 7px; border-radius: 50%; background: var(--sun); margin-left: 2px; transition: transform .4s var(--out); }
.st-logo:hover b i { transform: scale(1.5); }
.st-logo span { font-family: var(--mono); font-size: 11px; letter-spacing: .14em; text-transform: uppercase; padding: 4px 8px; border: 1px solid var(--line-l); border-radius: 999px; color: var(--mute-l); }
.st-menu { display: none; align-items: center; gap: 4px; }
.st-menu a { position: relative; display: inline-flex; align-items: center; min-height: 44px; padding: 0 12px; font-size: 15px; text-decoration: none; color: var(--mute-l); transition: color .2s ease; }
.st-menu a::after { content: ""; position: absolute; left: 12px; right: 12px; bottom: 8px; height: 1px; background: var(--lime); transform: scaleX(0); transform-origin: left; transition: transform .35s var(--out); }
.st-menu a:hover { color: var(--pearl); }
.st-menu a:hover::after, .st-menu a[aria-current="true"]::after { transform: scaleX(1); }
.st-menu a[aria-current="true"] { color: var(--pearl); }
.st-burger { display: inline-flex; align-items: center; gap: 10px; min-height: 44px; padding: 0 4px 0 12px; border: 0; background: none; color: inherit; font: inherit; font-size: 15px; cursor: pointer; }
.st-burger i { position: relative; width: 22px; height: 10px; }
.st-burger i::before, .st-burger i::after { content: ""; position: absolute; left: 0; right: 0; height: 1.5px; background: currentColor; }
.st-burger i::before { top: 0; } .st-burger i::after { bottom: 0; }
.st-nav-cta { display: none; }
@media (min-width: 1080px) { .st-menu, .st-nav-cta { display: inline-flex; } .st-burger { display: none; } }
@media (min-width: 560px) and (max-width: 1079px) { .st-nav-cta { display: inline-flex; } }
.st-sheet { position: fixed; inset: 0; z-index: 70; background: var(--night); display: flex; flex-direction: column; padding: 0 var(--gutter) 28px; overflow-y: auto; }
.st-sheet-top { display: flex; align-items: center; justify-content: space-between; min-height: 72px; }
.st-sheet nav { margin-top: 24px; display: flex; flex-direction: column; }
.st-sheet nav a { display: flex; align-items: baseline; gap: 16px; padding: 14px 0; border-bottom: 1px solid var(--line-l); text-decoration: none; font-size: clamp(1.8rem, 8vw, 2.6rem); font-weight: 600; letter-spacing: -.035em; line-height: 1.1; }
.st-sheet nav a small { font-family: var(--mono); font-size: 12px; color: var(--lime); letter-spacing: .1em; }
.st-sheet-foot { margin-top: auto; padding-top: 32px; display: grid; gap: 16px; }
.st-sheet-foot .st-btn { width: 100%; }
@media (prefers-reduced-motion: no-preference) {
  .st-sheet { animation: st-sheet .5s var(--ease) both; }
  .st-sheet nav a { animation: st-up .6s var(--out) both; animation-delay: calc(.08s + var(--i) * .05s); }
  @keyframes st-sheet { from { clip-path: inset(0 0 100% 0); } to { clip-path: inset(0); } }
}

/* Hero */
.st-hero { position: relative; padding-block: clamp(24px, 4vw, 48px) clamp(56px, 7vw, 96px); overflow: clip; }
.st-hero::before { content: ""; position: absolute; inset: -20% -10% auto 30%; height: 120%; background: radial-gradient(closest-side, rgba(255,107,26,.2), transparent); pointer-events: none; z-index: -1; }
.st-hero-grid { display: grid; gap: clamp(40px, 5vw, 64px); align-items: center; }
@media (min-width: 1100px) { .st-hero-grid { grid-template-columns: minmax(0, 5fr) minmax(0, 6.4fr); min-height: min(calc(100svh - 120px), 820px); } }
.st-eyebrow { display: inline-flex; align-items: center; gap: 10px; color: var(--lime); }
.st-eyebrow::before { content: ""; width: 8px; height: 8px; background: var(--lime); border-radius: 50%; }
.st-hero .st-h1 { margin-top: 22px; }
.st-hero-sub { font-size: clamp(1.08rem, 1.4vw, 1.25rem); line-height: 1.55; max-width: 31em; margin-top: 24px !important; color: rgba(246,241,234,.8); }
.st-cta { display: flex; flex-wrap: wrap; align-items: center; gap: 12px; margin-top: 34px; }
.st-word { display: inline-block; overflow: hidden; vertical-align: top; padding-bottom: .08em; margin-bottom: -.08em; }
.st-word > span { display: inline-block; }
@media (prefers-reduced-motion: no-preference) {
  .st-word > span { animation: st-word .9s var(--out) both; animation-delay: calc(.1s + var(--i) * .045s); }
  @keyframes st-word { from { transform: translateY(105%); } }
  .st-fade { animation: st-up .9s var(--out) both; animation-delay: var(--d, .5s); }
  @keyframes st-up { from { opacity: 0; transform: translateY(18px); } }
}

.st-stage-wrap { min-width: 0; }
.st-stage { position: relative; aspect-ratio: 16 / 11.6; }
.st-plate { position: absolute; inset: 9% -3% -2% 14%; border-radius: 14px; background: var(--plate); transition: background-color .9s var(--ease); }
.st-plate::after { content: attr(data-name); position: absolute; right: 18px; bottom: 14px; font-family: var(--mono); font-size: 11px; letter-spacing: .12em; text-transform: uppercase; color: var(--plate-fg); opacity: .8; }
.st-stage-browser { position: absolute; top: 0; left: 4%; width: 88%; }
.st-stage-phone { position: absolute; left: -1%; bottom: -3%; width: 21%; z-index: 3; }
@media (min-width: 1100px) { .st-stage { margin-right: calc(var(--gutter) * -0.5); } }
.st-now { display: flex; flex-wrap: wrap; justify-content: space-between; align-items: center; gap: 8px 16px; margin-top: 26px; }
.st-now a { color: var(--lime); text-decoration: none; display: inline-flex; gap: 6px; align-items: center; min-height: 44px; }
.st-now a:hover { text-decoration: underline; text-underline-offset: 4px; }

/* Browser + phone frames around real screenshots */
.st-browser { background: #f2efea; border-radius: 10px; overflow: hidden; box-shadow: 0 1px 0 rgba(255,255,255,.4) inset, 0 30px 80px -20px rgba(0,0,0,.6); }
.st-browser-bar { display: flex; align-items: center; gap: 10px; height: 28px; padding-inline: 12px; color: #6b665f; font-family: var(--mono); font-size: 10.5px; }
.st-browser-bar i { width: 8px; height: 8px; border-radius: 50%; background: #d8d2c9; box-shadow: 13px 0 0 #d8d2c9, 26px 0 0 #d8d2c9; margin-right: 26px; flex: none; }
.st-browser-bar span { flex: 1; text-align: center; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; background: #e6e1d9; border-radius: 5px; padding: 2px 10px; max-width: 260px; margin-inline: auto; transform: translateX(-20px); }
.st-screen { position: relative; aspect-ratio: 16 / 10; background: #ddd; overflow: hidden; }
.st-screen img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; object-position: top; }
.st-phone { background: #0b0b0b; border-radius: 22%/10.5%; padding: 4.5%; box-shadow: 0 30px 70px -18px rgba(0,0,0,.65); }
.st-phone .st-screen { aspect-ratio: 9 / 19.2; border-radius: 17%/8%; }
.st-shot { visibility: hidden; }
.st-shot.is-prev { visibility: visible; z-index: 1; }
.st-shot.is-cur { visibility: visible; z-index: 2; }
@media (prefers-reduced-motion: no-preference) {
  .st-shot.is-cur { animation: st-wipe 1s var(--ease) both; }
  .st-phone .st-shot.is-cur { animation-delay: .12s; }
  @keyframes st-wipe { from { clip-path: inset(100% 0 0 0); } to { clip-path: inset(0); } }
}

/* Project index under the hero stage */
.st-index { display: grid; grid-auto-flow: column; grid-auto-columns: minmax(128px, 1fr); gap: 4px; margin-top: 22px; overflow-x: auto; scrollbar-width: none; scroll-snap-type: x mandatory; }
.st-index::-webkit-scrollbar { display: none; }
.st-index button { scroll-snap-align: start; position: relative; display: grid; gap: 2px; text-align: left; min-height: 64px; padding: 14px 4px 6px 0; border: 0; background: none; color: var(--mute-l); font: inherit; cursor: pointer; transition: color .25s ease; }
.st-index button::before { content: ""; position: absolute; left: 0; right: 8px; top: 0; height: 2px; background: var(--line-l); }
.st-index button::after { content: ""; position: absolute; left: 0; right: 8px; top: 0; height: 2px; background: var(--lime); transform: scaleX(0); transform-origin: left; }
.st-index button[aria-pressed="true"] { color: var(--pearl); }
.st-index button[aria-pressed="true"]::after { transform: scaleX(1); }
.st-index[data-auto="true"] button[aria-pressed="true"]::after { animation: st-progress var(--dur) linear both; }
.st-index[data-paused="true"] button::after { animation-play-state: paused !important; }
@keyframes st-progress { from { transform: scaleX(0); } }
.st-index b { font-weight: 600; font-size: 16px; letter-spacing: -.01em; }
.st-index { align-items: start; }
.st-index small { font-family: var(--mono); font-size: 10.5px; letter-spacing: .08em; text-transform: uppercase; opacity: .7; line-height: 1.35; }
.st-index b { line-height: 1.2; }

/* Trust: countries + client logos */
.st-trust { border-top: 1px solid var(--line-l); padding-block: clamp(48px, 6vw, 80px) clamp(56px, 7vw, 96px); }
.st-trust-grid { display: grid; gap: 28px; align-items: end; margin-bottom: clamp(36px, 4vw, 56px); }
@media (min-width: 900px) { .st-trust-grid { grid-template-columns: minmax(0, 1.4fr) minmax(0, 1fr); } }
.st-countries { font-weight: 600; font-size: clamp(1.9rem, 4.2vw, 3.8rem); line-height: 1.05; letter-spacing: -.04em; }
.st-countries > span:first-child { color: var(--mute-l); }
.st-country-slot { display: block; position: relative; height: 1.12em; overflow: hidden; color: var(--lime); }
.st-country-slot > span { display: block; white-space: nowrap; }
.st-trust-note { max-width: 26em; }
.st-marquee { overflow: hidden; -webkit-mask-image: linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent); mask-image: linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent); }
.st-marquee-track { display: flex; gap: 12px; width: max-content; animation: st-marq 48s linear infinite; }
.st-marquee:hover .st-marquee-track, .st-marquee:focus-within .st-marquee-track { animation-play-state: paused; }
@keyframes st-marq { to { transform: translateX(-50%); } }
.st-logo-tile { flex: none; display: flex; align-items: center; justify-content: center; width: 176px; height: 88px; padding: 14px 22px; border-radius: 10px; background: #fffdf9 !important; transition: transform .35s var(--out); }
.st-logo-tile:hover { transform: translateY(-3px); }
.st-logo-tile img { width: 100%; height: 100%; object-fit: contain; }
@media (prefers-reduced-motion: reduce) {
  .st-marquee { -webkit-mask-image: none; mask-image: none; }
  .st-marquee-track { animation: none; width: auto; flex-wrap: wrap; justify-content: flex-start; }
  .st-marquee-track [data-dup] { display: none; }
}

/* Selected work */
.st-work-rows { display: grid; gap: clamp(48px, 6vw, 88px); }
.st-work-row { display: grid; gap: clamp(48px, 5vw, 32px) clamp(16px, 2vw, 28px); grid-template-columns: minmax(0, 1fr); }
@media (min-width: 900px) { .st-work-row { grid-template-columns: repeat(12, minmax(0, 1fr)); } .st-card { grid-column: span var(--span); } }
.st-card { min-width: 0; display: flex; flex-direction: column; gap: 22px; }
.st-panel { --h: clamp(300px, 36vw, 560px); position: relative; display: grid; place-items: center; height: var(--h); border-radius: 12px; background: var(--bg); overflow: hidden; text-decoration: none; isolation: isolate; }
.st-card[style*="--span: 12"] .st-panel { --h: clamp(320px, 44vw, 680px); }
.st-panel-comp { position: relative; width: min(88%, calc(var(--h) * 1.32)); margin-top: 4%; transition: transform .7s var(--out); }
.st-panel-comp .st-browser { width: 86%; }
.st-panel-comp .st-phone { position: absolute; right: 0; bottom: -6%; width: 22%; transition: transform .7s var(--out); }
.st-panel:hover .st-panel-comp { transform: translateY(-6px); }
.st-panel:hover .st-panel-comp .st-phone { transform: translateY(-14px); }
.st-panel-go { position: absolute; top: 16px; right: 16px; z-index: 2; display: inline-flex; align-items: center; gap: 6px; padding: 8px 12px; border-radius: 999px; background: var(--fg); color: var(--bg); opacity: 0; transform: translateY(-6px); transition: opacity .3s ease, transform .4s var(--out); }
.st-panel:hover .st-panel-go, .st-panel:focus-visible .st-panel-go { opacity: 1; transform: none; }
@media (max-width: 899px) { .st-panel, .st-card[style*="--span: 12"] .st-panel { height: auto; aspect-ratio: 4 / 3.1; } .st-panel-comp { width: 86%; } .st-panel-go { opacity: 1; transform: none; } }
.st-card-meta { display: grid; gap: 10px; }
.st-card-top { display: flex; align-items: baseline; gap: 14px; flex-wrap: wrap; }
.st-card-top .st-mono { color: var(--mute); }
.st-card h3 { font-weight: 600; font-size: clamp(1.6rem, 2.4vw, 2.2rem); letter-spacing: -.035em; line-height: 1; }
.st-card p { color: var(--mute); max-width: 38em; font-size: 16px; }
.st-tags { display: flex; flex-wrap: wrap; gap: 6px; }
.st-tags li { font-family: var(--mono); font-size: 11px; letter-spacing: .06em; text-transform: uppercase; padding: 5px 9px; border-radius: 6px; background: rgba(34,23,15,.06); }
.st-card .st-link { justify-self: start; min-height: 36px; font-size: 15px; }

/* Services */
.st-svc { display: grid; gap: clamp(32px, 4vw, 64px); }
@media (min-width: 1000px) { .st-svc { grid-template-columns: minmax(0, 1fr) minmax(0, 1.05fr); align-items: start; } }
.st-svc-list { border-top: 1px solid var(--line-l); }
.st-svc-item { border-bottom: 1px solid var(--line-l); }
.st-svc-btn { width: 100%; display: grid; grid-template-columns: 44px minmax(0, 1fr) auto; align-items: center; gap: 12px; padding: 22px 0; border: 0; background: none; color: var(--mute-l); font: inherit; text-align: left; cursor: pointer; transition: color .25s ease; }
.st-svc-btn h3 { font-weight: 600; font-size: clamp(1.5rem, 2.7vw, 2.5rem); letter-spacing: -.035em; line-height: 1.05; }
.st-svc-btn .st-mono { color: var(--lime); opacity: .8; }
.st-svc-btn svg { transition: transform .35s var(--out), opacity .25s ease; opacity: .4; }
.st-svc-item[data-active="true"] .st-svc-btn, .st-svc-btn:hover { color: var(--pearl); }
.st-svc-item[data-active="true"] .st-svc-btn svg { transform: rotate(45deg); opacity: 1; color: var(--lime); }
.st-svc-body { display: grid; grid-template-rows: 0fr; transition: grid-template-rows .5s var(--ease); }
.st-svc-item[data-active="true"] .st-svc-body { grid-template-rows: 1fr; }
.st-svc-body > div { overflow: hidden; }
.st-svc-inner { padding: 0 0 26px 56px; display: grid; gap: 16px; }
.st-svc-inner p { color: rgba(246,241,234,.8); max-width: 34em; }
.st-chips { display: flex; flex-wrap: wrap; gap: 6px; }
.st-chips li { font-size: 14px; padding: 6px 12px; border-radius: 999px; box-shadow: inset 0 0 0 1px var(--line-l); color: rgba(246,241,234,.85); }
.st-svc-inline { display: none; }
.st-svc-view { position: sticky; top: 96px; }
.st-svc-frame { position: relative; aspect-ratio: 16 / 12; border-radius: 12px; overflow: hidden; background: var(--night-2); }
.st-svc-slide { position: absolute; inset: 0; display: grid; place-items: center; background: var(--bg); opacity: 0; transition: opacity .6s ease; }
.st-svc-slide[data-on="true"] { opacity: 1; }
.st-svc-slide .st-panel-comp { width: 84%; --h: 400px; }
.st-svc-cap { display: flex; justify-content: space-between; gap: 12px; margin-top: 14px; color: var(--mute-l); }
.st-redesign { padding: clamp(24px, 4vw, 48px); align-content: center; justify-items: start; gap: 14px; text-align: left; color: var(--night); }
.st-redesign b { font-size: clamp(1.8rem, 3.2vw, 3rem); font-weight: 600; letter-spacing: -.04em; line-height: 1; max-width: 12em; }
.st-redesign p { max-width: 28em; }
@media (max-width: 999px) {
  .st-svc-view { display: none; }
  .st-svc-body, .st-svc-item[data-active="true"] .st-svc-body { grid-template-rows: 1fr; }
  .st-svc-btn { color: var(--pearl); cursor: default; padding-bottom: 14px; }
  .st-svc-btn svg { display: none; }
  .st-svc-inner { padding-left: 0; }
  .st-svc-inline { display: block; border-radius: 10px; overflow: hidden; }
  .st-svc-inline .st-svc-slide { position: relative; opacity: 1; aspect-ratio: 4 / 3; }
}

/* Process */
.st-steps { display: grid; gap: 0; counter-reset: s; }
@media (min-width: 900px) { .st-steps { grid-template-columns: repeat(5, minmax(0, 1fr)); } }
.st-step { position: relative; padding: 26px 24px 8px 0; border-top: 1px solid var(--line); }
.st-step::before { content: ""; position: absolute; top: -5px; left: 0; width: 9px; height: 9px; border-radius: 50%; background: var(--sun); }
.st-step .st-mono { color: var(--mute); }
.st-step h3 { font-weight: 600; font-size: 22px; letter-spacing: -.02em; margin: 10px 0 8px !important; }
.st-step p { color: var(--mute); font-size: 15.5px; }
@media (max-width: 899px) { .st-step { padding: 20px 0 22px 28px; border-top: 0; border-left: 1px solid var(--line); } .st-step::before { top: 26px; left: -5px; } }

/* Motion & creative */
.st-creative { background: var(--night-2); }
.st-blocks { display: grid; gap: clamp(72px, 9vw, 128px); }
.st-block { display: grid; gap: clamp(28px, 4vw, 64px); align-items: center; }
@media (min-width: 1000px) { .st-block { grid-template-columns: minmax(0, .8fr) minmax(0, 1.2fr); } .st-block.st-flip > :first-child { order: 2; } .st-block.st-top { align-items: start; } .st-block.st-top > :first-child { position: sticky; top: 100px; } }
.st-block-copy { display: grid; gap: 18px; align-content: start; }
.st-block-copy h3 { font-weight: 600; font-size: clamp(1.8rem, 3.2vw, 2.9rem); letter-spacing: -.04em; line-height: 1.02; }
.st-block-copy > p { color: rgba(246,241,234,.78); max-width: 32em; }
.st-ticks { display: grid; gap: 8px; font-size: 15.5px; }
.st-ticks li { display: grid; grid-template-columns: 18px 1fr; gap: 10px; }
.st-ticks li::before { content: ""; width: 10px; height: 1.5px; background: var(--lime); margin-top: 12px; }
.st-light .st-ticks li::before { background: var(--sun); }
.st-credit { color: var(--mute-l); }
.st-credit b { color: var(--pearl); font-weight: 500; }
.st-player { position: relative; border-radius: 12px; overflow: hidden; background: var(--bg, #000); aspect-ratio: 16 / 9; transition: background-color .5s ease; }
.st-player .st-media { position: absolute; inset: 0; background: transparent; }
.st-player video { width: 100%; height: 100%; object-fit: contain; }
.st-reels { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 14px; }
.st-reels button { min-height: 44px; padding: 8px 14px; border-radius: 999px; border: 0; box-shadow: inset 0 0 0 1px var(--line-l); background: none; color: var(--mute-l); font: inherit; font-size: 14.5px; cursor: pointer; }
.st-reels button[aria-pressed="true"] { background: var(--pearl); color: var(--night); box-shadow: none; }
.st-reels button small { font-family: var(--mono); font-size: 10.5px; letter-spacing: .08em; margin-left: 6px; opacity: .7; }
.st-media { position: relative; overflow: hidden; background: #000; }
.st-ctl { position: absolute; bottom: 12px; right: 12px; display: flex; gap: 6px; z-index: 2; }
.st-ctl button { width: 44px; height: 44px; border-radius: 50%; border: 0; background: rgba(18,12,10,.62); color: #fff; display: inline-flex; align-items: center; justify-content: center; cursor: pointer; backdrop-filter: blur(6px); -webkit-backdrop-filter: blur(6px); }
.st-ctl button:hover { background: rgba(18,12,10,.88); }
.st-pop { position: relative; padding: 5% 5% 9%; border-radius: 12px; background: #231b18; }
.st-pop-desk { width: 82%; border-radius: 8px; overflow: hidden; box-shadow: 0 30px 70px -20px rgba(0,0,0,.7); }
.st-pop .st-phone { position: absolute; right: 5%; bottom: 6%; width: 24%; }
.st-pop img { width: 100%; }
.st-mini { display: grid; gap: 1px; background: var(--line-l); border-radius: 12px; overflow: hidden; }
@media (min-width: 760px) { .st-mini { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
.st-mini > div { background: var(--night-2); padding: clamp(22px, 3vw, 36px); display: grid; gap: 10px; align-content: start; }
.st-mini h3 { font-weight: 600; font-size: 24px; letter-spacing: -.025em; }
.st-mini p { color: rgba(246,241,234,.76); font-size: 16px; }
.st-mini a { color: var(--lime); }

/* Inbox: pick a subject line, read the real email on a phone */
.st-inbox-wrap { border-radius: 12px; padding: clamp(18px, 3vw, 36px); background: #5e3b24; color: #fff7ed; --mute: #f0d9c2; --ac: #ffe39a; --rule: rgba(255,247,237,.18); }
.st-inbox { display: grid; grid-template-columns: minmax(0, 1fr); gap: 22px; }
.st-inbox > * { min-width: 0; }
.st-tabs { display: inline-flex; padding: 4px; border-radius: 999px; background: rgba(0,0,0,.2); gap: 4px; justify-self: start; }
.st-tabs button { min-height: 44px; padding: 8px 16px; border-radius: 999px; border: 0; background: transparent; color: inherit; font: inherit; font-size: 15px; font-weight: 600; cursor: pointer; }
.st-tabs button[aria-pressed="true"] { background: #fff7ed; color: #5e3b24; }
.st-inbox-main { display: grid; grid-template-columns: minmax(0, 1fr); gap: 22px; }
.st-inbox-main > * { min-width: 0; }
.st-subjects { display: flex; flex-direction: column; }
.st-subjects button { width: 100%; display: grid; grid-template-columns: 36px 1fr; gap: 8px; align-items: baseline; text-align: left; min-height: 50px; padding: 11px 0; background: none; border: 0; border-top: 1px solid var(--rule); color: var(--mute); font: inherit; font-size: 16.5px; line-height: 1.3; cursor: pointer; }
.st-subjects li:last-child button { border-bottom: 1px solid var(--rule); }
.st-subjects button:hover, .st-subjects button[aria-pressed="true"] { color: #fff7ed; }
.st-subjects button[aria-pressed="true"] .st-mono { color: var(--ac); }
.st-handset { width: min(100%, 310px); margin-inline: auto; border: 8px solid #0a0a0a; border-radius: 40px; overflow: hidden; background: #0a0a0a; }
.st-handset-bar { height: 24px; display: flex; justify-content: center; align-items: center; }
.st-handset-bar i { width: 76px; height: 16px; border-radius: 10px; background: #1d1d1d; }
.st-handset-screen { height: min(560px, 66svh); overflow-y: auto; background: #fff; border-radius: 0 0 32px 32px; scrollbar-width: thin; }
.st-handset-screen img { width: 100%; height: auto; }
.st-swipe { text-align: center; color: var(--mute); margin-top: 12px !important; }
@media (max-width: 759px) {
  .st-subjects { flex-direction: row; overflow-x: auto; gap: 8px; scroll-snap-type: x mandatory; scrollbar-width: none; }
  .st-subjects li { flex: none; scroll-snap-align: start; }
  .st-subjects button, .st-subjects li:last-child button { width: 180px; height: 100%; border: 1px solid var(--rule); border-radius: 10px; padding: 12px; grid-template-columns: 1fr; gap: 6px; align-content: start; font-size: 15.5px; }
  .st-subjects button[aria-pressed="true"] { border-color: #fff7ed; }
}
@media (min-width: 760px) { .st-inbox-main { grid-template-columns: minmax(0, 1fr) 310px; align-items: start; } }

/* Studio story */
.st-story-grid { display: grid; gap: clamp(40px, 5vw, 72px); }
@media (min-width: 1000px) { .st-story-grid { grid-template-columns: minmax(0, 1.1fr) minmax(0, 1fr); } }
.st-story-big { font-weight: 600; font-size: clamp(2.2rem, 4.8vw, 4.6rem); line-height: 1; letter-spacing: -.045em; }
.st-story-big span { opacity: .55; }
.st-principles { display: grid; gap: 0; border-top: 1px solid rgba(34,23,15,.25); }
.st-principles li { display: grid; grid-template-columns: 44px minmax(0, 1fr); gap: 8px; padding: 20px 0; border-bottom: 1px solid rgba(34,23,15,.25); }
.st-principles b { display: block; font-size: 20px; font-weight: 600; letter-spacing: -.02em; margin-bottom: 4px; }
.st-principles p { font-size: 16px; opacity: .85; }
.st-route { margin-top: clamp(56px, 7vw, 96px); display: grid; grid-template-columns: minmax(0, 1fr); gap: 2px; }
.st-route-title { margin-bottom: 18px; }
@media (min-width: 900px) { .st-route ol { grid-template-columns: repeat(5, minmax(0, 1fr)); } }
.st-route ol { display: grid; gap: 2px; counter-reset: r; }
.st-route li { padding: 18px; background: rgba(20,10,7,.08); display: grid; gap: 4px; }
.st-route li[data-site="true"] { background: var(--night); color: var(--pearl); }
.st-route li b { font-size: 18px; font-weight: 600; letter-spacing: -.015em; }
.st-route li span { font-size: 15px; opacity: .78; }

/* Pricing */
.st-pkgs { display: grid; gap: 16px; }
@media (min-width: 900px) { .st-pkgs { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
.st-pkg { background: #fffdf9; border-radius: 12px; padding: clamp(24px, 3vw, 40px); display: grid; gap: 22px; align-content: start; box-shadow: inset 0 0 0 1px var(--line); }
.st-pkg-top { display: flex; justify-content: space-between; gap: 12px; align-items: baseline; color: var(--mute); }
.st-pkg h3 { font-weight: 600; font-size: clamp(1.7rem, 2.6vw, 2.4rem); letter-spacing: -.035em; line-height: 1.02; }
.st-pkg-for { color: var(--mute); font-size: 16px; }
.st-price { display: grid; gap: 4px; padding: 18px 0; border-block: 1px solid var(--line); }
.st-price b { font-size: clamp(1.4rem, 2vw, 1.8rem); font-weight: 600; letter-spacing: -.03em; }
.st-price small { color: var(--mute); font-size: 14.5px; }
.st-pkg-lists { display: grid; gap: 20px; }
.st-pkg-lists h4 { font-family: var(--mono); font-size: 11.5px; letter-spacing: .1em; text-transform: uppercase; font-weight: 400; color: var(--mute); margin-bottom: 10px !important; }
.st-check { display: grid; gap: 8px; font-size: 16px; }
.st-check li { display: grid; grid-template-columns: 20px 1fr; gap: 10px; align-items: start; }
.st-check li svg { margin-top: 3px; color: #1f7a3f; }
.st-sep { display: grid; gap: 6px; font-size: 15px; color: var(--mute); }
.st-sep li { display: grid; grid-template-columns: 20px 1fr; gap: 10px; }
.st-sep li::before { content: "+"; font-family: var(--mono); text-align: center; }
.st-pkg-foot { display: flex; flex-wrap: wrap; gap: 8px 18px; align-items: center; justify-content: space-between; }
.st-pkg-ex { font-size: 14.5px; color: var(--mute); }
.st-pkg-ex a { color: var(--ink); }
.st-plus { display: flex; align-items: center; gap: 14px; margin: 16px 0; color: var(--mute); }
.st-plus::before, .st-plus::after { content: ""; flex: 1; height: 1px; background: var(--line); }
.st-plus span { display: inline-flex; align-items: center; gap: 10px; }
.st-plus i { width: 30px; height: 30px; border-radius: 50%; display: grid; place-items: center; background: var(--ink); color: var(--pearl); font-style: normal; font-family: var(--mono); }
.st-launch { background: var(--night); color: var(--pearl); border-radius: 12px; padding: clamp(24px, 3vw, 40px); display: grid; gap: 28px; }
@media (min-width: 1000px) { .st-launch { grid-template-columns: minmax(0, .8fr) minmax(0, 1.6fr); } }
.st-launch h3 { font-weight: 600; font-size: clamp(1.7rem, 2.6vw, 2.4rem); letter-spacing: -.035em; line-height: 1.02; margin-top: 10px !important; }
.st-launch-for { color: var(--mute-l); margin-top: 14px !important; font-size: 16px; }
.st-launch .st-price { border-color: var(--line-l); margin-top: 20px; }
.st-launch .st-price small { color: var(--mute-l); }
.st-launch-groups { display: grid; gap: 22px; }
@media (min-width: 700px) { .st-launch-groups { grid-template-columns: repeat(3, minmax(0, 1fr)); } }
.st-launch-groups h4 { font-family: var(--mono); font-size: 11.5px; letter-spacing: .1em; text-transform: uppercase; font-weight: 400; color: var(--lime); margin-bottom: 12px !important; padding-bottom: 10px; border-bottom: 1px solid var(--line-l); }
.st-launch .st-check li svg { color: var(--lime); }
.st-launch .st-check { font-size: 15.5px; }
.st-legend { display: flex; flex-wrap: wrap; gap: 8px 20px; margin-top: 18px; color: var(--mute); font-size: 14.5px; }
.st-legend span { display: inline-flex; gap: 8px; align-items: center; }

/* Add-ons table */
.st-addons { margin-top: clamp(72px, 9vw, 120px); }
.st-table { width: 100%; border-collapse: collapse; font-size: 16px; }
.st-table th { text-align: left; font-family: var(--mono); font-size: 11.5px; letter-spacing: .1em; text-transform: uppercase; font-weight: 400; color: var(--mute); padding: 0 16px 12px 0; border-bottom: 1px solid var(--ink); }
.st-table td { padding: 20px 16px 20px 0; border-bottom: 1px solid var(--line); vertical-align: top; }
.st-table td:first-child { font-weight: 600; font-size: 19px; letter-spacing: -.015em; width: 22%; }
.st-table td:nth-child(2) { color: var(--mute); width: 40%; }
.st-table td small { display: block; color: var(--mute); font-size: 14px; margin-top: 4px; }
.st-bill { display: inline-block; font-family: var(--mono); font-size: 11px; letter-spacing: .06em; text-transform: uppercase; padding: 5px 9px; border-radius: 6px; background: var(--pearl-2); white-space: nowrap; }
.st-bill[data-k="Monthly"], .st-bill[data-k="One-time or monthly"] { background: #f8dcc6; }
@media (max-width: 760px) {
  .st-table thead { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); }
  .st-table, .st-table tbody, .st-table tr, .st-table td { display: block; width: auto !important; }
  .st-table tr { padding: 18px 0; border-bottom: 1px solid var(--line); display: grid; gap: 8px; }
  .st-table td { padding: 0; border: 0; }
  .st-table td[data-h]::before { content: attr(data-h); display: block; font-family: var(--mono); font-size: 10.5px; letter-spacing: .1em; text-transform: uppercase; color: var(--mute); margin-bottom: 4px; }
}
.st-extra { margin-top: 40px; display: grid; gap: 24px; padding: clamp(22px, 3vw, 36px); border-radius: 12px; background: var(--pearl-2); }
@media (min-width: 900px) { .st-extra { grid-template-columns: minmax(0, 1fr) minmax(0, 1.4fr); } }
.st-extra h3 { font-weight: 600; font-size: 24px; letter-spacing: -.025em; }
.st-extra p { color: var(--mute); margin-top: 8px !important; font-size: 16px; }
.st-extra ul { display: flex; flex-wrap: wrap; gap: 8px; align-content: start; }
.st-extra li { padding: 8px 14px; border-radius: 999px; background: var(--pearl); font-size: 15px; }

/* FAQ */
.st-faq-grid { display: grid; gap: 32px; }
@media (min-width: 1000px) { .st-faq-grid { grid-template-columns: minmax(0, .8fr) minmax(0, 1.2fr); } .st-faq-grid > :first-child { position: sticky; top: 100px; align-self: start; } }
.st-faq { border-top: 1px solid var(--line); }
.st-faq details { border-bottom: 1px solid var(--line); }
.st-faq summary { list-style: none; display: flex; justify-content: space-between; align-items: center; gap: 16px; min-height: 64px; padding: 16px 0; cursor: pointer; font-weight: 600; font-size: clamp(1.1rem, 1.5vw, 1.3rem); letter-spacing: -.015em; }
.st-faq summary::-webkit-details-marker { display: none; }
.st-faq summary svg { flex: none; transition: transform .35s var(--out); }
.st-faq details[open] summary svg { transform: rotate(45deg); }
.st-faq details p { padding: 0 48px 22px 0; color: var(--mute); max-width: 40em; }

/* Start a project */
.st-start { background: linear-gradient(180deg, var(--night) 0%, var(--ember) 100%); }
.st-start-grid { display: grid; gap: clamp(36px, 5vw, 72px); align-items: start; }
@media (min-width: 1000px) { .st-start-grid { grid-template-columns: minmax(0, .85fr) minmax(0, 1.15fr); } .st-start-copy { position: sticky; top: 100px; } }
.st-start-copy { display: grid; gap: 22px; }
.st-start-copy > p { color: rgba(246,241,234,.8); max-width: 30em; font-size: clamp(1.08rem, 1.35vw, 1.22rem); }
.st-after { display: grid; gap: 10px; color: rgba(246,241,234,.8); font-size: 16px; }
.st-after li { display: grid; grid-template-columns: 30px 1fr; gap: 8px; }
.st-after span { color: var(--lime); font-family: var(--mono); font-size: 12px; padding-top: 4px; }
.st-quiz { background: var(--pearl); color: var(--ink); border-radius: 16px; padding: clamp(22px, 3.4vw, 44px); }
.st-quiz-top { display: flex; justify-content: space-between; align-items: center; gap: 12px; color: var(--mute); }
.st-bar { height: 4px; border-radius: 999px; background: var(--pearl-2); margin-top: 14px; overflow: hidden; }
.st-bar i { display: block; height: 100%; border-radius: inherit; background: var(--sun); transition: width .45s var(--ease); }
.st-quiz h3 { font-weight: 600; font-size: clamp(1.6rem, 3vw, 2.6rem); letter-spacing: -.035em; line-height: 1.04; margin-top: 26px !important; }
.st-quiz h4 { font-family: var(--mono); font-size: 11.5px; letter-spacing: .1em; text-transform: uppercase; font-weight: 400; color: var(--mute); margin: 24px 0 0 !important; }
.st-quiz-hint { color: var(--mute); margin-top: 10px !important; font-size: 16px; }
.st-quiz textarea { width: 100%; margin-top: 20px; min-height: 116px; padding: 14px 16px; border-radius: 10px; border: 1px solid #d5cabd; background: #fffdf9; color: inherit; font: inherit; font-size: 17px; line-height: 1.5; resize: vertical; }
.st-quiz textarea:focus { outline: none; border-color: var(--sun); box-shadow: 0 0 0 3px rgba(255,107,26,.18); }
.st-quiz-chips { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 12px; }
.st-quiz-chips button { min-height: 44px; padding: 8px 16px; border-radius: 999px; border: 1px solid #d5cabd; background: transparent; color: inherit; font: inherit; font-size: 15px; cursor: pointer; transition: border-color .2s ease, background-color .2s ease; }
.st-quiz-chips button:hover { border-color: var(--ink); }
.st-quiz-chips button[aria-pressed="true"] { background: var(--ink); border-color: var(--ink); color: var(--pearl); }
.st-quiz-nav { display: flex; flex-wrap: wrap; justify-content: space-between; align-items: center; gap: 12px; margin-top: 26px; }
.st-quiz-back { display: inline-flex; align-items: center; gap: 6px; min-height: 44px; padding: 8px 4px; border: 0; background: none; color: inherit; font: inherit; font-size: 16px; font-weight: 600; cursor: pointer; }
.st-quiz-back:disabled { opacity: .35; cursor: default; }
.st-dots { display: flex; gap: 6px; margin-top: 24px; flex-wrap: wrap; }
.st-dots button { width: 44px; height: 44px; border-radius: 50%; border: 1px solid #d5cabd; background: transparent; font-family: var(--mono); font-size: 12px; color: var(--mute); cursor: pointer; }
.st-dots button[data-done="true"] { background: var(--pearl-2); color: var(--ink); }
.st-dots button[aria-current="step"] { border-color: var(--ink); color: var(--ink); }
.st-summary { margin-top: 20px; }
.st-summary li { display: grid; gap: 4px; padding-block: 12px; border-top: 1px solid #e2d8cb; }
.st-summary small { font-family: var(--mono); font-size: 11px; letter-spacing: .08em; text-transform: uppercase; color: var(--mute); }
.st-summary span { font-size: 16px; }
.st-summary .st-empty { color: #9a8b7f; }
.st-direct { margin-top: 18px; color: rgba(246,241,234,.75); font-size: 15.5px; }
.st-direct a { color: var(--lime); }

/* Footer */
.st-foot { position: relative; background: var(--night); border-top: 1px solid var(--line-l); padding-top: clamp(64px, 8vw, 112px); overflow: hidden; }
.st-foot-top { display: grid; gap: 32px; align-items: end; padding-bottom: clamp(48px, 6vw, 80px); border-bottom: 1px solid var(--line-l); }
@media (min-width: 960px) { .st-foot-top { grid-template-columns: minmax(0, 1.4fr) auto; } }
.st-foot-top h2 { font-weight: 600; font-size: clamp(2.2rem, 5vw, 4.6rem); line-height: .98; letter-spacing: -.045em; }
.st-foot-top h2 em { font-style: normal; color: var(--lime); }
.st-foot-cta { display: grid; gap: 14px; justify-items: start; }
.st-foot-cta a:not(.st-btn) { color: var(--mute-l); text-decoration: none; }
.st-foot-cta a:not(.st-btn):hover { color: var(--pearl); }
.st-foot-cols { display: grid; gap: 32px 24px; grid-template-columns: repeat(2, minmax(0, 1fr)); padding-block: clamp(40px, 5vw, 64px); }
@media (min-width: 900px) { .st-foot-cols { grid-template-columns: repeat(4, minmax(0, 1fr)); } }
.st-foot-cols h3 { font-family: var(--mono); font-size: 11.5px; letter-spacing: .12em; text-transform: uppercase; font-weight: 400; color: var(--lime); margin-bottom: 14px !important; }
.st-foot-cols ul { display: grid; gap: 2px; }
.st-foot-cols a { display: inline-flex; align-items: center; gap: 6px; min-height: 36px; text-decoration: none; color: rgba(246,241,234,.78); font-size: 15.5px; transition: color .2s ease; }
.st-foot-cols a:hover { color: var(--pearl); }
.st-wordmark { font-weight: 700; font-size: clamp(5rem, 25vw, 23rem); line-height: .78; letter-spacing: -.07em; white-space: nowrap; color: var(--pearl); margin-bottom: -.06em; user-select: none; }
.st-wordmark i { display: inline-block; width: .13em; height: .13em; border-radius: 50%; background: var(--sun); margin-left: .02em; }
.st-wordmark span { color: transparent; -webkit-text-stroke: 1px rgba(246,241,234,.35); }
.st-legal { padding-block: 22px 28px; color: var(--mute-l); font-size: 14px; border-top: 1px solid var(--line-l); position: relative; background: var(--night); }
.st-legal a { color: inherit; }

/* One reveal for the whole page: content rises in once as it enters. Without JS, or with
   reduced motion, everything is simply visible. */
@media (prefers-reduced-motion: no-preference) {
  .st[data-reveal] .st-reveal { opacity: 0; transform: translateY(28px); transition: opacity .9s var(--out), transform .9s var(--out); transition-delay: var(--rd, 0s); }
  .st[data-reveal] .st-reveal.is-in { opacity: 1; transform: none; }
  .st[data-reveal] .st-card.st-reveal .st-panel { clip-path: inset(10% 4% 0 4% round 12px); transition: clip-path 1.2s var(--ease); }
  .st[data-reveal] .st-card.st-reveal.is-in .st-panel { clip-path: inset(0 0 0 0 round 12px); }
}
`;
