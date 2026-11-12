import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight, Pause, Play, Volume2, VolumeX } from "lucide-react";
import { WEBSITES } from "@/data/websites";

// Nexara Studio: the creative side of Nexara (websites, email journeys, pop-ups,
// motion). Own design (st- prefix) and own navbar, same idea as /social-media.
// The studio stays neutral on purpose so the client work brings the colour.

const STYLES = `
@import url('https://fonts.googleapis.com/css2?family=Familjen+Grotesk:wght@400;500;600&family=Geist+Mono:wght@400;500&display=swap');

.st {
  --paper: #f4f2ee; --ink: #141210; --stone: #6b655c; --rule: rgba(20,18,16,.14);
  --night: #121110; --night-ink: #f1ede6; --night-stone: #a39b8f; --night-rule: rgba(241,237,230,.14);
  --gutter: clamp(16px, 4vw, 56px);
  --mono: 'Geist Mono', ui-monospace, Menlo, monospace;
  background: var(--paper); color: var(--ink);
  font-family: 'Familjen Grotesk', system-ui, sans-serif; font-size: 18px; line-height: 1.55;
  -webkit-font-smoothing: antialiased; overflow-x: clip;
}
.st *, .st *::before, .st *::after { box-sizing: border-box; }
.st img, .st video { display: block; max-width: 100%; }
:where(.st a) { color: inherit; }
.st h1, .st h2, .st h3, .st h4 { font-family: inherit; }
.st :focus-visible { outline: 2px solid currentColor; outline-offset: 3px; }
.st-wrap { max-width: 1440px; margin: 0 auto; padding-inline: var(--gutter); }
.st-mono { font-family: var(--mono); font-size: 12px; letter-spacing: .1em; text-transform: uppercase; font-weight: 400; }
.st-label { color: var(--stone); margin: 0 0 20px; }
.st-dark { background: var(--night); color: var(--night-ink); --stone: var(--night-stone); --rule: var(--night-rule); }
.st-h2 { font-weight: 500; font-size: clamp(2.5rem, 7vw, 6rem); line-height: .98; letter-spacing: -.04em; margin: 0; text-wrap: balance; }
.st-h2 em, .st-h1 em { font-style: normal; color: var(--stone); }
.st-lede { font-size: clamp(1.1rem, 1.5vw, 1.3rem); line-height: 1.5; max-width: 34em; margin: 24px 0 0; color: var(--stone); }

/* Buttons */
.st-btn { display: inline-flex; align-items: center; gap: 10px; min-height: 52px; padding: 12px 26px; font: inherit; font-size: 16px; font-weight: 500; text-decoration: none; border: 1px solid var(--ink); background: var(--ink); color: var(--paper); cursor: pointer; transition: background-color .2s ease, color .2s ease; }
.st-btn:hover { background: transparent; color: var(--ink); }
.st-dark .st-btn { background: var(--night-ink); border-color: var(--night-ink); color: var(--night); }
.st-dark .st-btn:hover { background: transparent; color: var(--night-ink); }
.st-text-link { display: inline-flex; align-items: center; gap: 6px; min-height: 44px; font-size: 16px; font-weight: 500; text-underline-offset: 5px; }

/* Nav */
.st-nav { position: sticky; top: 0; z-index: 40; background: color-mix(in srgb, var(--paper) 90%, transparent); backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px); border-bottom: 1px solid var(--rule); }
.st-nav .st-wrap { display: flex; align-items: center; justify-content: space-between; gap: 16px; min-height: 64px; }
.st-brand { display: inline-flex; align-items: baseline; gap: 8px; min-height: 44px; align-items: center; text-decoration: none; font-weight: 600; font-size: 19px; letter-spacing: -.02em; }
.st-brand span { font-weight: 400; color: var(--stone); }
.st-nav-links { display: none; gap: 32px; font-size: 16px; }
.st-nav-links a { text-decoration: none; color: var(--stone); transition: color .2s ease; }
.st-nav-links a:hover { color: var(--ink); }
.st-nav .st-btn { min-height: 44px; padding: 8px 18px; font-size: 15px; }
@media (min-width: 900px) { .st-nav-links { display: flex; } }

/* Hero */
.st-hero { padding-block: clamp(48px, 8vw, 112px) clamp(48px, 6vw, 88px); }
.st-h1 { font-weight: 500; font-size: clamp(3.4rem, 12.5vw, 11.5rem); line-height: .92; letter-spacing: -.05em; margin: 0; }
.st-hero-row { display: grid; gap: 28px; margin-top: clamp(28px, 4vw, 48px); align-items: end; }
.st-hero-row p { margin: 0; font-size: clamp(1.15rem, 1.7vw, 1.45rem); line-height: 1.45; max-width: 30em; }
.st-cta { display: flex; flex-wrap: wrap; align-items: center; gap: 12px 28px; }
@media (min-width: 960px) { .st-hero-row { grid-template-columns: 1.4fr 1fr; } .st-cta { justify-content: flex-end; } }
@media (prefers-reduced-motion: no-preference) {
  .st-rise { animation: st-rise .9s cubic-bezier(.2,.7,.2,1) both; }
  .st-rise-2 { animation-delay: .12s; } .st-rise-3 { animation-delay: .24s; }
  @keyframes st-rise { from { opacity: 0; transform: translateY(24px); } }
}

/* Reel strip under the hero */
.st-strip { display: flex; gap: 12px; overflow-x: auto; scroll-snap-type: x mandatory; padding-inline: var(--gutter); padding-bottom: 8px; scrollbar-width: none; }
.st-strip::-webkit-scrollbar { display: none; }
.st-strip figure { margin: 0; flex: none; scroll-snap-align: start; display: flex; flex-direction: column; gap: 10px; }
.st-strip .st-media { height: clamp(380px, 32vw, 500px); }
.st-strip figcaption { display: flex; justify-content: space-between; gap: 12px; color: var(--stone); }
@media (min-width: 1100px) { .st-strip { justify-content: safe center; } }

/* Media */
.st-media { position: relative; overflow: hidden; background: #000; }
.st-media img, .st-media video { width: 100%; height: 100%; object-fit: cover; object-position: top; }
.st-r916 { aspect-ratio: 9 / 16; }
.st-r169 { aspect-ratio: 16 / 9; }
.st-r1610 { aspect-ratio: 16 / 10; }
.st-ctl { position: absolute; bottom: 12px; display: flex; gap: 6px; right: 12px; }
.st-ctl button { width: 44px; height: 44px; border-radius: 50%; border: 0; background: rgba(18,17,16,.62); color: #fff; display: inline-flex; align-items: center; justify-content: center; cursor: pointer; backdrop-filter: blur(6px); -webkit-backdrop-filter: blur(6px); }
.st-ctl button:hover { background: rgba(18,17,16,.85); }
.st-browser { background: #fff; border-radius: 10px; overflow: hidden; box-shadow: 0 30px 80px rgba(0,0,0,.28); }
.st-browser-bar { display: flex; align-items: center; gap: 12px; height: 34px; padding-inline: 14px; background: #ecebe8; color: #5d5952; font-family: var(--mono); font-size: 11.5px; }
.st-browser-bar i { width: 9px; height: 9px; border-radius: 50%; background: #cdcac4; box-shadow: 15px 0 0 #cdcac4, 30px 0 0 #cdcac4; margin-right: 32px; flex: none; }
.st-browser-bar span { white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.st-browser .st-media { border-radius: 0; }

/* Work */
.st-work { padding-block: clamp(80px, 11vw, 160px) clamp(40px, 6vw, 80px); }
.st-work-head { display: grid; gap: 20px; margin-bottom: clamp(32px, 6vw, 80px); }
@media (min-width: 960px) { .st-work-head { grid-template-columns: 1.4fr 1fr; align-items: end; } }
.st-case { padding-block: clamp(56px, 8vw, 112px); border-top: 1px solid var(--rule); }
.st-case-head { display: grid; gap: 20px; margin-bottom: clamp(28px, 4vw, 56px); }
.st-case-name { font-weight: 500; font-size: clamp(3rem, 9vw, 8rem); line-height: .92; letter-spacing: -.05em; margin: 0; }
.st-case-line { font-size: clamp(1.1rem, 1.5vw, 1.3rem); line-height: 1.45; margin: 0; max-width: 28em; }
.st-made { list-style: none; margin: 16px 0 0; padding: 0; display: flex; flex-wrap: wrap; gap: 8px; }
.st-made li { border: 1px solid var(--rule); padding: 6px 12px; color: var(--stone); }
@media (min-width: 960px) { .st-case-head { grid-template-columns: 1fr 1fr; align-items: end; } }
.st-case-grid { display: grid; gap: clamp(16px, 2vw, 28px); }
.st-case-grid figure { margin: 0; display: flex; flex-direction: column; gap: 12px; min-width: 0; }
.st-case-grid figcaption { color: var(--stone); }
@media (min-width: 960px) {
  .st-g-inbox-film { grid-template-columns: minmax(0, 1.55fr) minmax(0, .65fr); align-items: start; }
  .st-g-site-film { grid-template-columns: minmax(0, 1.55fr) minmax(0, .45fr); align-items: start; }
  .st-g-two { grid-template-columns: 1fr 1fr; }
  .st-g-popup { grid-template-columns: minmax(0, 1.55fr) minmax(0, .45fr); align-items: start; }
}
.st-case-foot { margin-top: clamp(20px, 3vw, 36px); }

/* Inbox: pick a subject line, read the real email on a phone */
.st-inbox > * { min-width: 0; }
.st-inbox { display: grid; grid-template-columns: minmax(0, 1fr); gap: 24px; border: 1px solid var(--rule); padding: clamp(16px, 2.4vw, 32px); }
.st-inbox-head { display: flex; justify-content: space-between; gap: 12px; color: var(--stone); }
.st-subjects { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; }
.st-subjects button { width: 100%; display: grid; grid-template-columns: 36px 1fr; gap: 8px; align-items: baseline; text-align: left; min-height: 52px; padding: 12px 0; background: none; border: 0; border-top: 1px solid var(--rule); color: var(--stone); font: inherit; font-size: 17px; line-height: 1.3; cursor: pointer; transition: color .2s ease; }
.st-subjects li:last-child button { border-bottom: 1px solid var(--rule); }
.st-subjects button:hover, .st-subjects button[aria-pressed="true"] { color: inherit; }
.st-subjects button[aria-pressed="true"] .st-mono { color: inherit; }
.st-subjects .st-mono { color: var(--stone); }
.st-phone { width: min(100%, 340px); margin-inline: auto; border: 9px solid #050505; border-radius: 42px; overflow: hidden; background: #050505; box-shadow: 0 30px 80px rgba(0,0,0,.4); }
.st-phone-bar { height: 26px; display: flex; justify-content: center; align-items: center; }
.st-phone-bar i { width: 80px; height: 18px; border-radius: 12px; background: #1b1b1b; }
.st-screen { height: min(640px, 72svh); overflow-y: auto; background: #fff; border-radius: 0 0 33px 33px; scrollbar-width: thin; }
.st-screen img { width: 100%; height: auto; }
.st-swipe { text-align: center; color: var(--stone); margin-top: 12px; }
@media (max-width: 759px) {
  .st-subjects { flex-direction: row; overflow-x: auto; gap: 8px; margin-inline: calc(-1 * clamp(16px, 2.4vw, 32px)); padding-inline: clamp(16px, 2.4vw, 32px); scroll-snap-type: x mandatory; scrollbar-width: none; }
  .st-subjects li { flex: none; scroll-snap-align: start; }
  .st-subjects button, .st-subjects li:last-child button { width: 200px; height: 100%; border: 1px solid var(--rule); padding: 12px; grid-template-columns: 1fr; gap: 6px; align-content: start; font-size: 16px; }
  .st-subjects button[aria-pressed="true"] { border-color: currentColor; }
}
@media (min-width: 760px) { .st-inbox { grid-template-columns: minmax(0, 1fr) 340px; align-items: start; } .st-inbox-list { position: sticky; top: 96px; } }

/* More sites */
.st-more { display: grid; gap: clamp(24px, 3vw, 40px); padding-top: clamp(40px, 6vw, 72px); border-top: 1px solid var(--rule); }
.st-more-grid { display: grid; gap: clamp(24px, 3vw, 36px); }
@media (min-width: 720px) { .st-more-grid { grid-template-columns: 1fr 1fr; } }
.st-site { display: flex; flex-direction: column; gap: 14px; text-decoration: none; }
.st-site .st-browser { transition: transform .3s ease; }
.st-site:hover .st-browser { transform: translateY(-4px); }
.st-site-meta { display: flex; justify-content: space-between; align-items: baseline; gap: 12px; flex-wrap: wrap; }
.st-site-meta b { font-weight: 500; font-size: 22px; letter-spacing: -.02em; display: inline-flex; align-items: center; gap: 6px; }
.st-site-meta span { color: var(--stone); }
.st-site p { margin: 0; color: var(--stone); font-size: 16px; max-width: 36em; }

/* What we make */
.st-make { padding-block: clamp(80px, 11vw, 160px); }
.st-offers { display: grid; margin-top: clamp(40px, 6vw, 80px); border-top: 1px solid var(--rule); }
.st-offer { display: grid; gap: 16px; padding-block: clamp(28px, 4vw, 48px); border-bottom: 1px solid var(--rule); }
.st-offer h3 { font-weight: 500; font-size: clamp(2rem, 4.4vw, 3.75rem); line-height: 1; letter-spacing: -.04em; margin: 0; }
.st-offer p { margin: 0; max-width: 32em; }
.st-offer ul { list-style: none; margin: 0; padding: 0; display: grid; gap: 6px; color: var(--stone); font-size: 16px; }
.st-offer-seen { font-size: 16px; color: var(--stone); margin-top: 14px !important; }
.st-offer-seen a { color: var(--ink); text-underline-offset: 4px; }
@media (min-width: 960px) { .st-offer { grid-template-columns: 1fr 1.1fr 1fr; gap: 48px; align-items: start; } }
.st-together { margin-top: clamp(32px, 5vw, 56px); font-size: clamp(1.3rem, 2.4vw, 2rem); line-height: 1.3; letter-spacing: -.02em; max-width: 30em; }

/* Process */
.st-process { padding-block: 0 clamp(80px, 11vw, 160px); }
.st-steps { list-style: none; margin: clamp(32px, 5vw, 56px) 0 0; padding: 0; display: grid; gap: 0; counter-reset: st; }
.st-steps li { display: grid; gap: 8px; padding-block: 24px; border-top: 1px solid var(--rule); }
.st-steps b { font-weight: 500; font-size: clamp(1.5rem, 2.4vw, 2rem); letter-spacing: -.03em; line-height: 1.1; }
.st-steps p { margin: 0; color: var(--stone); font-size: 16px; max-width: 30em; }
@media (min-width: 960px) { .st-steps { grid-template-columns: repeat(4, 1fr); gap: 32px; } }

/* Close */
.st-close { padding-block: clamp(80px, 12vw, 176px); }
.st-close .st-h2 { font-size: clamp(3rem, 10vw, 9rem); }
.st-pick { margin-top: clamp(32px, 5vw, 56px); display: grid; gap: 20px; }
.st-pick-chips { display: flex; flex-wrap: wrap; gap: 8px; }
.st-chip { min-height: 48px; padding: 10px 20px; background: transparent; color: inherit; border: 1px solid var(--rule); font: inherit; font-size: 17px; cursor: pointer; transition: background-color .2s ease, color .2s ease, border-color .2s ease; }
.st-chip:hover { border-color: currentColor; }
.st-chip[aria-pressed="true"] { background: var(--night-ink); color: var(--night); border-color: var(--night-ink); }
.st-pick-go { display: flex; flex-wrap: wrap; align-items: center; gap: 16px 28px; }
.st-pick-go p { margin: 0; color: var(--stone); font-size: 16px; }
.st-foot { border-top: 1px solid var(--rule); padding-block: 28px 40px; }
.st-foot .st-wrap { display: flex; flex-wrap: wrap; justify-content: space-between; gap: 12px 24px; color: var(--stone); font-size: 15px; }
.st-foot a { text-underline-offset: 4px; }
`;

const OFFERS = ["Website", "Email journey", "Pop-up", "Motion film"] as const;

const bookHref = (goal: string) => `/book?goal=${encodeURIComponent(goal)}`;
const site = (slug: string) => WEBSITES.find((w) => w.slug === slug)!;
const host = (url: string) => url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");

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

const MORE = ["meji", "momsandmore", "wigpa", "getyourcrib"].map(site);

const reducedMotion = () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** A muted, looping film that plays while on screen. Pause and sound are always reachable. */
const Film = ({ src, poster, label, ratio = "st-r916", sound = false }: { src: string; poster: string; label: string; ratio?: string; sound?: boolean }) => {
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
    <div className={`st-media ${ratio}`}>
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
    <div className="st-media st-r1610">
      <img src={img} alt={alt} loading={eager ? "eager" : "lazy"} />
    </div>
  </div>
);

const Inbox = ({ brand, emails }: { brand: string; emails: { subject: string; src: string }[] }) => {
  const [i, setI] = useState(0);
  const screen = useRef<HTMLDivElement>(null);
  useEffect(() => { screen.current?.scrollTo({ top: 0 }); }, [i]);
  return (
    <div className="st-inbox">
      <div className="st-inbox-list">
        <div className="st-inbox-head st-mono"><span>Welcome series</span><span>{emails.length} emails</span></div>
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
      </div>
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
  );
};

const CaseHead = ({ name, line, made, url }: { name: string; line: string; made: string[]; url?: string }) => (
  <div className="st-case-head">
    <h3 className="st-case-name">{name}</h3>
    <div>
      <p className="st-case-line">{line}</p>
      <ul className="st-made st-mono" aria-label="What we made">{made.map((m) => <li key={m}>{m}</li>)}</ul>
      {url && <a className="st-text-link" href={url} target="_blank" rel="noreferrer">Visit {host(url)} <ArrowUpRight size={16} /></a>}
    </div>
  </div>
);

const WebsitesPage = () => {
  const [picked, setPicked] = useState<string[]>([]);
  const goal = picked.length ? `Studio enquiry: ${picked.join(" + ")}` : "Studio enquiry";
  const moodring = site("moodring");
  const bibire = site("bibire");
  const expertlinc = site("expertlinc");

  useEffect(() => { document.title = "Nexara Studio · Websites, emails, pop-ups and motion"; }, []);

  return (
    <div className="st">
      <style>{STYLES}</style>

      <nav className="st-nav" aria-label="Studio">
        <div className="st-wrap">
          <Link to="/websites" className="st-brand">Nexara <span>Studio</span></Link>
          <div className="st-nav-links">
            <a href="#work">Work</a>
            <a href="#make">What we make</a>
            <a href="#process">How it works</a>
          </div>
          <a className="st-btn" href="#start">Start a project</a>
        </div>
      </nav>

      <header className="st-hero">
        <div className="st-wrap">
          <p className="st-mono st-label st-rise">Websites · Email journeys · Pop-ups · Motion</p>
          <h1 className="st-h1 st-rise st-rise-2">Brands people <em>remember.</em></h1>
          <div className="st-hero-row st-rise st-rise-3">
            <p>We design the whole first impression. The website, the pop-up that turns a visitor into a subscriber, the emails that follow, and the film that gets it all shared.</p>
            <div className="st-cta">
              <a className="st-btn" href="#start">Start a project <ArrowRight size={18} /></a>
              <a className="st-text-link" href="#work">See the work</a>
            </div>
          </div>
        </div>
      </header>

      <div className="st-strip" aria-label="Recent work">
        <figure>
          <Film src="/studio/films/bibire-film.mp4" poster="/studio/films/bibire-film.webp" label="Bibiré brand film" />
          <figcaption className="st-mono"><span>Bibiré</span><span>Film</span></figcaption>
        </figure>
        <figure>
          <div className="st-media st-r1610"><img src={moodring.img.replace(".jpg", "-hd.jpg")} alt="The Moodring website" /></div>
          <figcaption className="st-mono"><span>Moodring</span><span>Website</span></figcaption>
        </figure>
        <figure>
          <Film src="/studio/films/taya-film.mp4" poster="/studio/films/taya-film.webp" label="Taya launch film" />
          <figcaption className="st-mono"><span>Taya</span><span>Film</span></figcaption>
        </figure>
      </div>

      <main>
        <section id="work" className="st-dark st-work" aria-labelledby="work-title">
          <div className="st-wrap">
            <div className="st-work-head">
              <div>
                <p className="st-mono st-label">Selected work</p>
                <h2 id="work-title" className="st-h2">Every piece, <em>one world.</em></h2>
              </div>
              <p className="st-lede">Each brand gets a site, emails, a pop-up and film that look and sound like the same company. Tap a subject line to read the real emails.</p>
            </div>

            <article className="st-case" id="taya" aria-label="Taya">
              <CaseHead name="Taya" line="A necklace that keeps the thought you almost lost. Press once, say it, get back to your day." made={["Welcome series", "Pop-up", "Launch film"]} />
              <div className="st-case-grid st-g-inbox-film">
                <Inbox brand="Taya" emails={TAYA_EMAILS} />
                <figure>
                  <Film src="/studio/films/taya-film.mp4" poster="/studio/films/taya-film.webp" label="Taya launch film" sound />
                  <figcaption className="st-mono">Launch film · 9:16</figcaption>
                </figure>
              </div>
              <div className="st-case-grid st-g-popup st-case-foot">
                <figure>
                  <div className="st-media"><img src="/studio/taya/popup-a-desktop.webp" alt="Taya sign-up pop-up on desktop: What if you didn't have to remember everything?" loading="lazy" /></div>
                  <figcaption className="st-mono">Pop-up · desktop</figcaption>
                </figure>
                <figure>
                  <div className="st-media"><img src="/studio/taya/popup-b-mobile.webp" alt="Taya sign-up pop-up on a phone: Some things are too good to lose." loading="lazy" /></div>
                  <figcaption className="st-mono">Second version · phone</figcaption>
                </figure>
              </div>
            </article>

            <article className="st-case" id="moodring" aria-label="Moodring">
              <CaseHead name="Moodring" line="A smart ring built around women's real lives, told hour by hour, ending on a waitlist." made={["Website", "Waitlist", "Welcome series", "Hype film"]} url={moodring.url} />
              <Browser url={moodring.url} img={moodring.img.replace(".jpg", "-hd.jpg")} alt="The Moodring website" />
              <div className="st-case-grid st-g-inbox-film st-case-foot">
                <Inbox brand="Moodring" emails={MOODRING_EMAILS} />
                <figure>
                  <Film src="/studio/films/moodring-film.mp4" poster="/studio/films/moodring-film.webp" label="Moodring waitlist film" sound />
                  <figcaption className="st-mono">Waitlist film · 9:16</figcaption>
                </figure>
              </div>
            </article>

            <article className="st-case" id="bibire" aria-label="Bibiré">
              <CaseHead name="Bibiré" line="UK activewear. A storefront for Collection 003, opened by the campaign film." made={["Online store", "Brand film"]} url={bibire.url} />
              <div className="st-case-grid st-g-site-film">
                <figure>
                  <Browser url={bibire.url} img={bibire.img.replace(".jpg", "-hd.jpg")} alt="The Bibiré online store" />
                </figure>
                <figure>
                  <Film src="/studio/films/bibire-film.mp4" poster="/studio/films/bibire-film.webp" label="Bibiré brand film" sound />
                  <figcaption className="st-mono">Brand film · 9:16</figcaption>
                </figure>
              </div>
            </article>

            <article className="st-case" id="expertlinc" aria-label="ExpertLinc">
              <CaseHead name="ExpertLinc" line="Live career sessions with two people from the same industry, one senior and one just starting out." made={["Website", "Campaign page", "Brand intro", "Showreel"]} url={expertlinc.url} />
              <Browser url={expertlinc.url} img={expertlinc.img.replace(".jpg", "-hd.jpg")} alt="The ExpertLinc website" />
              <div className="st-case-grid st-g-two st-case-foot">
                <figure>
                  <Film src="/studio/films/expertlinc-intro.mp4" poster="/studio/films/expertlinc-intro.webp" label="ExpertLinc brand intro" ratio="st-r169" sound />
                  <figcaption className="st-mono">Brand intro · 16:9</figcaption>
                </figure>
                <figure>
                  <Film src="/studio/films/expertlinc-showreel.mp4" poster="/studio/films/expertlinc-showreel.webp" label="ExpertLinc showreel" ratio="st-r169" sound />
                  <figcaption className="st-mono">Showreel · 16:9</figcaption>
                </figure>
              </div>
            </article>

            <div className="st-more">
              <p className="st-mono st-label">More sites</p>
              <div className="st-more-grid">
                {MORE.map((w) => (
                  <a key={w.slug} className="st-site" href={w.url} target="_blank" rel="noreferrer">
                    <Browser url={w.url} img={w.img.replace(".jpg", "-hd.jpg")} alt={`The ${w.name} website`} />
                    <div className="st-site-meta"><b>{w.name} <ArrowUpRight size={18} /></b><span className="st-mono">{w.tag}</span></div>
                    <p>{w.short}.</p>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="make" className="st-make" aria-labelledby="make-title">
          <div className="st-wrap">
            <p className="st-mono st-label">What we make</p>
            <h2 id="make-title" className="st-h2">Four things, <em>built to work together.</em></h2>
            <div className="st-offers">
              <div className="st-offer">
                <h3>Websites</h3>
                <p>Story sites, online stores and landing pages. Designed around what your customer needs to believe before they buy.</p>
                <div>
                  <ul><li>Design and build</li><li>Your domain, analytics and search console set up</li><li>Tested on phone and desktop</li></ul>
                  <p className="st-offer-seen">Seen in <a href="#moodring">Moodring</a>, <a href="#bibire">Bibiré</a>, <a href="#expertlinc">ExpertLinc</a></p>
                </div>
              </div>
              <div className="st-offer">
                <h3>Email journeys</h3>
                <p>A welcome series written in your voice and designed to match the site, so a sign-up gets to know you before the price arrives.</p>
                <div>
                  <ul><li>Journey planned email by email</li><li>Copy and design for phone and desktop</li><li>Set up in your email platform</li></ul>
                  <p className="st-offer-seen">Seen in <a href="#taya">Taya</a>, <a href="#moodring">Moodring</a></p>
                </div>
              </div>
              <div className="st-offer">
                <h3>Pop-ups</h3>
                <p>The moment a visitor becomes a subscriber. A reason to sign up that fits the brand, on every screen size.</p>
                <div>
                  <ul><li>Desktop and phone layouts</li><li>Two versions to test</li><li>Connected to your email list</li></ul>
                  <p className="st-offer-seen">Seen in <a href="#taya">Taya</a></p>
                </div>
              </div>
              <div className="st-offer">
                <h3>Motion films</h3>
                <p>Brand films, launch reels and intros, cut for your site, your ads and your socials.</p>
                <div>
                  <ul><li>9:16 and 16:9 cuts</li><li>Built from your brand and footage</li><li>Ready to post</li></ul>
                  <p className="st-offer-seen">Seen in <a href="#bibire">Bibiré</a>, <a href="#expertlinc">ExpertLinc</a>, <a href="#taya">Taya</a></p>
                </div>
              </div>
            </div>
            <p className="st-together">The film brings people to the site. The pop-up catches them. The emails carry them to the sale. Take one, or take the whole launch.</p>
          </div>
        </section>

        <section id="process" className="st-process" aria-labelledby="process-title">
          <div className="st-wrap">
            <p className="st-mono st-label">How it works</p>
            <h2 id="process-title" className="st-h2">From call <em>to launch.</em></h2>
            <ol className="st-steps">
              <li><span className="st-mono st-label">01</span><b>A 30-minute call</b><p>What you sell, who buys it, and what you need first.</p></li>
              <li><span className="st-mono st-label">02</span><b>The direction</b><p>You see the look, the words and the plan before anything is built.</p></li>
              <li><span className="st-mono st-label">03</span><b>The build</b><p>Site, emails, pop-up and film made as one piece, with your feedback along the way.</p></li>
              <li><span className="st-mono st-label">04</span><b>Launch</b><p>Live on your domain, tested on real phones and inboxes, then handed over.</p></li>
            </ol>
          </div>
        </section>

        <section id="start" className="st-dark st-close" aria-labelledby="start-title">
          <div className="st-wrap">
            <p className="st-mono st-label">Start a project</p>
            <h2 id="start-title" className="st-h2">Let's make <em>yours.</em></h2>
            <div className="st-pick">
              <p className="st-mono st-label" id="pick-label" style={{ margin: 0 }}>What do you need?</p>
              <div className="st-pick-chips" role="group" aria-labelledby="pick-label">
                {OFFERS.map((o) => (
                  <button key={o} type="button" className="st-chip" aria-pressed={picked.includes(o)}
                    onClick={() => setPicked((p) => (p.includes(o) ? p.filter((x) => x !== o) : [...p, o]))}>
                    {o}
                  </button>
                ))}
              </div>
              <div className="st-pick-go">
                <Link className="st-btn" to={bookHref(goal)}>Book a 30-minute call <ArrowRight size={18} /></Link>
                <p>{picked.length ? `We'll talk about your ${picked.join(", ").toLowerCase()}.` : "Pick any, or just book and tell us on the call."}</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="st-dark st-foot">
        <div className="st-wrap">
          <span>© {new Date().getFullYear()} Nexara Studio</span>
          <span><Link to="/">Nexara</Link> · <a href="mailto:faithfulnyama@gmail.com">faithfulnyama@gmail.com</a></span>
        </div>
      </footer>
    </div>
  );
};

export default WebsitesPage;
