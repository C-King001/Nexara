import { useEffect, useState } from "react";
import type { CSSProperties } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight, Check, Plus } from "lucide-react";
import { STYLES } from "@/studio/styles";
import {
  ADDONS, EMAIL, FAQS, INSTAGRAM, LAUNCH, LINKEDIN, PACKAGES, PROCESS, PROJECTS, SERVICES, THIRD_PARTY, WORK_ROWS, host, project,
} from "@/studio/data";
import type { Project } from "@/studio/data";
import { ClientMarquee, Comp, Countries, FilmPlayer, HeroStage, Inbox, Phone, Planner, StudioNav, Words } from "@/studio/parts";
import type { Plan } from "@/studio/parts";

// Nexara Studio (/studio and /websites): a website design and development studio
// first, with motion, pop-ups, email and search as add-ons around the site.
// Order: hero → trust → work → website services → process → creative add-ons →
// studio story → pricing → FAQ → start a project. Content lives in src/studio/data.ts.

const TITLE = "Nexara Studio · Website design and development";
const DESCRIPTION = "Nexara Studio designs and builds websites that communicate your value, earn customer trust and turn visitors into enquiries. Landing pages, business websites, ecommerce, redesigns and custom builds, plus motion, email and search.";

const Label = ({ n, children }: { n: string; children: string }) => (
  <p className="st-label st-mono"><b>{n}</b>{children}</p>
);

const WorkCard = ({ p, span, n }: { p: Project; span: number; n: number }) => (
  <article className="st-card" style={{ "--span": span } as CSSProperties}>
    <a className="st-panel" href={p.url} target="_blank" rel="noreferrer" style={{ "--bg": p.bg, "--fg": p.fg } as CSSProperties} aria-label={`Visit the ${p.name} website (opens in a new tab)`}>
      <span className="st-panel-go st-mono" aria-hidden="true">Visit site <ArrowUpRight size={14} /></span>
      <Comp p={p} />
    </a>
    <div className="st-card-meta">
      <div className="st-card-top"><span className="st-mono">{String(n).padStart(2, "0")}</span><h3>{p.name}</h3><span className="st-mono">{p.category}</span></div>
      <p>{p.desc}</p>
      <ul className="st-tags" aria-label="What we delivered">{p.services.map((s) => <li key={s}>{s}</li>)}</ul>
      <a className="st-link" href={p.url} target="_blank" rel="noreferrer">{host(p.url)} <ArrowUpRight size={15} /></a>
    </div>
  </article>
);

const ServiceSlide = ({ id, example, on }: { id: string; example?: string; on: boolean }) => {
  if (!example) {
    return (
      <div className="st-svc-slide st-redesign" data-on={on} style={{ "--bg": "#ff6b1a" } as CSSProperties}>
        <span className="st-mono">Redesigns</span>
        <b>Send us the site you have now.</b>
        <p>We'll tell you what it says to a first-time visitor, what's getting in the way, and what a redesign would change.</p>
      </div>
    );
  }
  const p = project(example);
  return (
    <div className="st-svc-slide" data-on={on} data-id={id} style={{ "--bg": p.bg } as CSSProperties}>
      <Comp p={p} />
    </div>
  );
};

const Services = () => {
  const [active, setActive] = useState(0);
  const cur = SERVICES[active];
  return (
    <div className="st-svc">
      <ul className="st-svc-list">
        {SERVICES.map((s, i) => {
          const ex = s.example ? project(s.example) : undefined;
          return (
            <li key={s.id} className="st-svc-item" data-active={i === active}>
              <button type="button" className="st-svc-btn" aria-expanded={i === active} aria-controls={`svc-${s.id}`}
                onClick={() => setActive(i)} onFocus={() => setActive(i)}>
                <span className="st-mono">0{i + 1}</span><h3>{s.title}</h3><Plus size={22} aria-hidden="true" />
              </button>
              <div className="st-svc-body" id={`svc-${s.id}`}>
                <div>
                  <div className="st-svc-inner">
                    <p>{s.body}</p>
                    <ul className="st-chips" aria-label="Good for">{s.goodFor.map((g) => <li key={g}>{g}</li>)}</ul>
                    <div className="st-svc-inline"><ServiceSlide id={s.id} example={s.example} on /></div>
                    {ex && <p className="st-mono st-dim">Example · <a href={ex.url} target="_blank" rel="noreferrer" style={{ color: "var(--lime)" }}>{ex.name} ↗</a></p>}
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
      <div className="st-svc-view" aria-hidden="true">
        <div className="st-svc-frame">
          {SERVICES.map((s, i) => <ServiceSlide key={s.id} id={s.id} example={s.example} on={i === active} />)}
        </div>
        <div className="st-svc-cap st-mono"><span>{cur.title}</span><span>{cur.example ? `Example · ${project(cur.example).name}` : "Your site, next"}</span></div>
      </div>
    </div>
  );
};

const WebsitesPage = () => {
  const [plan, setPlan] = useState<Plan>({ type: "", addons: [] });
  const choose = (type: string, addon?: string) =>
    setPlan((p) => ({ type: type || p.type, addons: addon && !p.addons.includes(addon) ? [...p.addons, addon] : p.addons }));

  // One page-wide reveal: tag the blocks, then let them rise in once as they enter.
  useEffect(() => {
    const root = document.querySelector<HTMLElement>(".st");
    if (!root || !("IntersectionObserver" in window)) return;
    const els = [...root.querySelectorAll<HTMLElement>(".st-head, .st-card, .st-step, .st-pkg, .st-launch, .st-block, .st-mini, .st-principles li, .st-route, .st-table tbody tr, .st-extra, .st-faq, .st-quiz, .st-svc")];
    els.forEach((el) => {
      el.classList.add("st-reveal");
      const sibs = el.parentElement ? [...el.parentElement.children].filter((c) => c.classList.contains("st-reveal")) : [];
      el.style.setProperty("--rd", `${Math.min(sibs.indexOf(el), 4) * 0.08}s`);
    });
    root.dataset.reveal = "on";
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("is-in"); io.unobserve(e.target); } });
    }, { rootMargin: "0px 0px -8% 0px" });
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const prevTitle = document.title;
    const meta = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    const prevDesc = meta?.content;
    document.title = TITLE;
    if (meta) meta.content = DESCRIPTION;
    return () => { document.title = prevTitle; if (meta && prevDesc) meta.content = prevDesc; };
  }, []);

  let n = 0;

  return (
    <div className="st">
      <style>{STYLES}</style>
      <a className="st-skip" href="#main">Skip to content</a>
      <StudioNav />

      <main id="main">
        {/* ── Hero ── */}
        <section className="st-hero st-grain" aria-labelledby="hero-title">
          <div className="st-wrap st-hero-grid">
            <div>
              <p className="st-eyebrow st-mono st-fade" style={{ "--d": "0s" } as CSSProperties}>Website design &amp; development</p>
              <h1 id="hero-title" className="st-h1">
                <Words text="A website that makes your business" /> <em><Words text="easier to choose." start={6} /></em>
              </h1>
              <p className="st-hero-sub st-fade" style={{ "--d": ".55s" } as CSSProperties}>
                We design and build distinctive websites that communicate your value, earn customer trust and turn visitors into meaningful enquiries.
              </p>
              <div className="st-cta st-fade" style={{ "--d": ".7s" } as CSSProperties}>
                <a className="st-btn" href="#start">Start a website project <ArrowRight size={18} /></a>
                <a className="st-btn st-btn-ghost" href="#work">Explore our work</a>
              </div>
            </div>
            <HeroStage />
          </div>
        </section>

        {/* ── Trust: countries and clients ── */}
        <section className="st-trust" aria-label="Who we've worked with">
          <div className="st-wrap">
            <div className="st-trust-grid">
              <Countries />
              <p className="st-trust-note st-dim">Websites, films, emails and systems for brands across four continents. Some of the businesses we've worked with:</p>
            </div>
          </div>
          <ClientMarquee />
        </section>

        {/* ── Selected work ── */}
        <section id="work" className="st-light st-pad" aria-labelledby="work-title">
          <div className="st-wrap">
            <div className="st-head">
              <div>
                <Label n="01">Selected work</Label>
                <h2 id="work-title" className="st-h2">Websites we've designed <em>and built.</em></h2>
              </div>
              <p className="st-lede">Every project below is live. Open any of them and look around. The previews are taken from the real sites as they are today.</p>
            </div>
            <div className="st-work-rows">
              {WORK_ROWS.map((row, r) => (
                <div key={r} className="st-work-row">
                  {row.map(([slug, span]) => <WorkCard key={slug} p={project(slug)} span={span} n={++n} />)}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Website services ── */}
        <section id="websites" className="st-pad" aria-labelledby="websites-title">
          <div className="st-wrap">
            <div className="st-head">
              <div>
                <Label n="02">Websites</Label>
                <h2 id="websites-title" className="st-h2">What we design <em>and build.</em></h2>
              </div>
              <p className="st-lede st-dim">Websites are what we do first. Every one is designed from scratch around your business, then built, tested and ready to launch.</p>
            </div>
            <Services />
          </div>
        </section>

        {/* ── Process ── */}
        <section id="process" className="st-light st-pad" aria-labelledby="process-title">
          <div className="st-wrap">
            <div className="st-head">
              <div>
                <Label n="03">How it works</Label>
                <h2 id="process-title" className="st-h2">From first call <em>to live site.</em></h2>
              </div>
              <p className="st-lede">Five steps. You always know what's being made, what it includes and what comes next.</p>
            </div>
            <ol className="st-steps">
              {PROCESS.map((s, i) => (
                <li key={s.t} className="st-step"><span className="st-mono">Step 0{i + 1}</span><h3>{s.t}</h3><p>{s.b}</p></li>
              ))}
            </ol>
          </div>
        </section>

        {/* ── Motion & creative ── */}
        <section id="creative" className="st-creative st-pad" aria-labelledby="creative-title">
          <div className="st-wrap">
            <div className="st-head">
              <div>
                <Label n="04">Motion &amp; Creative</Label>
                <h2 id="creative-title" className="st-h2">Everything around <em>the website.</em></h2>
              </div>
              <p className="st-lede st-dim">Films that stop the scroll, pop-ups that start the conversation, emails that bring people back. Each one sends people to your site, in your brand's colours and voice. All optional.</p>
            </div>

            <div className="st-blocks">
              <div className="st-block">
                <div className="st-block-copy">
                  <span className="st-mono st-dim">Motion graphics &amp; video</span>
                  <h3>Films that make people want to see more.</h3>
                  <p>Brand films, intros and showreels, cut for your homepage, ads and socials.</p>
                  <ul className="st-ticks"><li>9:16 and 16:9 cuts</li><li>Built from your brand and footage</li><li>Ready to post, or to sit on your site</li></ul>
                </div>
                <FilmPlayer />
              </div>

              <div className="st-block st-flip">
                <div className="st-block-copy">
                  <span className="st-mono st-dim">Popup forms &amp; lead capture</span>
                  <h3>A good reason to leave an email.</h3>
                  <p>Pop-ups and sign-up forms designed as part of the site, not bolted on. Two versions of Taya's, on desktop and phone.</p>
                  <ul className="st-ticks"><li>Desktop and phone layouts</li><li>Newsletter and enquiry capture</li><li>Connected to your email list</li></ul>
                  <p className="st-credit st-mono"><b>Taya</b> · Pop-up · two versions</p>
                </div>
                <div className="st-pop">
                  <div className="st-pop-desk"><img src="/studio/taya/popup-a-desktop.webp" alt="Taya pop-up on desktop: What if you didn't have to remember everything?" loading="lazy" decoding="async" /></div>
                  <Phone><img src="/studio/taya/popup-b-mobile.webp" alt="Taya pop-up on a phone: Some things are too good to lose." loading="lazy" decoding="async" /></Phone>
                </div>
              </div>

              <div className="st-block st-top">
                <div className="st-block-copy">
                  <span className="st-mono st-dim">Email design &amp; marketing</span>
                  <h3>Emails people actually open.</h3>
                  <p>Welcome series, newsletters and campaigns in the founder's own voice, designed to match the site. Tap a subject line to read the real thing.</p>
                  <ul className="st-ticks"><li>Planned email by email</li><li>Copy, design and templates</li><li>Set up in your email platform</li></ul>
                  <p className="st-credit st-mono"><b>Moodring</b> and <b>Taya</b> · Welcome series</p>
                </div>
                <Inbox />
              </div>

              <div className="st-mini">
                <div>
                  <span className="st-mono st-dim">SEO · AEO · GEO</span>
                  <h3>Found on Google, in answer engines and in AI search.</h3>
                  <p>Technical and on-page SEO, plus the content structure answer engines and generative search rely on when they pick a source.</p>
                  <a className="st-link" href="#addons">How it's priced <ArrowRight size={16} /></a>
                </div>
                <div>
                  <span className="st-mono st-dim">Email integrations</span>
                  <h3>Forms that reach you, and emails that reach them.</h3>
                  <p>Contact and pop-up forms connected to Resend, with enquiry notifications for you and confirmation emails for your customer.</p>
                  <a className="st-link" href="#pricing">Part of Launch &amp; integrations <ArrowRight size={16} /></a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Studio story ── */}
        <section id="studio" className="st-sun st-pad" aria-labelledby="studio-title">
          <div className="st-wrap">
            <Label n="05">Why Nexara Studio</Label>
            <div className="st-story-grid">
              <h2 id="studio-title" className="st-story-big">Most websites describe a business. <span>Ours make the case for it.</span></h2>
              <ol className="st-principles">
                <li><span className="st-mono">01</span><div><b>Value before decoration.</b><p>A visitor should understand why you're the right choice within the first screen. If a site only looks good, it hasn't done its job.</p></div></li>
                <li><span className="st-mono">02</span><div><b>Designed and built by the same people.</b><p>What you approve is what ships. Nothing gets lost between a mock-up and the code.</p></div></li>
                <li><span className="st-mono">03</span><div><b>The site is the centre.</b><p>Films, pop-ups and emails are worth making when they bring people to the site and back again. If you don't need them yet, we'll say so.</p></div></li>
                <li><span className="st-mono">04</span><div><b>You see it before we build it.</b><p>The words, the layout and the look are agreed first, so there are no surprises when the site goes live.</p></div></li>
              </ol>
            </div>
            <div className="st-route">
              <p className="st-route-title st-mono">How the pieces work together</p>
              <ol>
                <li><b>A film</b><span>catches her eye on her feed.</span></li>
                <li data-site="true"><b>The website</b><span>makes the case and earns her trust.</span></li>
                <li><b>A pop-up</b><span>gives her a reason to stay in touch.</span></li>
                <li><b>The emails</b><span>bring her back when she's ready.</span></li>
                <li data-site="true"><b>She buys</b><span>on your site.</span></li>
              </ol>
            </div>
          </div>
        </section>

        {/* ── Pricing ── */}
        <section id="pricing" className="st-light st-pad" aria-labelledby="pricing-title">
          <div className="st-wrap">
            <div className="st-head">
              <div>
                <Label n="06">Pricing</Label>
                <h2 id="pricing-title" className="st-h2">Know exactly what <em>you're paying for.</em></h2>
              </div>
              <p className="st-lede">Building a website and launching it are different jobs, so we price them separately. Every project is quoted against an agreed scope, and the written quote lists what's included and what's extra before work starts.</p>
            </div>

            <div className="st-pkgs">
              {PACKAGES.map((pk, i) => (
                <article key={pk.id} className="st-pkg" aria-labelledby={`pkg-${pk.id}`}>
                  <div className="st-pkg-top st-mono"><span>{i === 0 ? "A" : "B"} · Build</span><span>{pk.billing}</span></div>
                  <div>
                    <h3 id={`pkg-${pk.id}`}>{pk.name}</h3>
                    <p className="st-pkg-for" style={{ marginTop: 10 }}>{pk.forWho}</p>
                  </div>
                  <div className="st-price"><b>Quoted to your scope</b><small>Price confirmed in your written quote</small></div>
                  <div className="st-pkg-lists">
                    <div>
                      <h4>Included</h4>
                      <ul className="st-check">{pk.includes.map((x) => <li key={x}><Check size={17} aria-hidden="true" />{x}</li>)}</ul>
                    </div>
                    <div>
                      <h4>Charged separately</h4>
                      <ul className="st-sep">{pk.separate.map((x) => <li key={x}>{x}</li>)}</ul>
                    </div>
                  </div>
                  <div className="st-pkg-foot">
                    <a className="st-btn st-btn-dark" href="#start" onClick={() => choose(pk.planner)}>{pk.cta} <ArrowRight size={18} /></a>
                    {pk.examples && (
                      <p className="st-pkg-ex">For example: {pk.examples.map((s, k) => { const p = project(s); return <span key={s}>{k > 0 && ", "}<a href={p.url} target="_blank" rel="noreferrer">{p.name}</a></span>; })}</p>
                    )}
                  </div>
                </article>
              ))}
            </div>

            <div className="st-plus st-mono" aria-hidden="true"><span><i>+</i>Add to either build</span></div>

            <article className="st-launch" aria-labelledby="pkg-launch">
              <div>
                <span className="st-mono" style={{ color: "var(--lime)" }}>C · Optional</span>
                <h3 id="pkg-launch">{LAUNCH.name}</h3>
                <p className="st-launch-for">{LAUNCH.forWho}</p>
                <div className="st-price"><b>Quoted to your setup</b><small>{LAUNCH.billing}. Hosting, domain and email plans are billed by the provider.</small></div>
                <a className="st-btn" href="#start" onClick={() => choose("", "Launch & integrations")} style={{ marginTop: 22 }}>Add launch &amp; integrations <ArrowRight size={18} /></a>
              </div>
              <div className="st-launch-groups">
                {LAUNCH.groups.map((g) => (
                  <div key={g.t}>
                    <h4>{g.t}</h4>
                    <ul className="st-check">{g.items.map((x) => <li key={x}><Check size={16} aria-hidden="true" />{x}</li>)}</ul>
                  </div>
                ))}
              </div>
            </article>

            <div id="addons" className="st-addons">
              <div className="st-head">
                <div>
                  <Label n="07">Add-ons</Label>
                  <h2 className="st-h2">Only what <em>you need.</em></h2>
                </div>
                <p className="st-lede">None of these come with a website automatically. Add them when they'll help, and each one is priced on its own.</p>
              </div>
              <table className="st-table">
                <thead><tr><th scope="col">Service</th><th scope="col">What it covers</th><th scope="col">How it's billed</th><th scope="col">Third-party costs</th></tr></thead>
                <tbody>
                  {ADDONS.map((a) => (
                    <tr key={a.id}>
                      <td>{a.name}</td>
                      <td>{a.what}</td>
                      <td data-h="How it's billed"><span className="st-bill" data-k={a.billing}>{a.billing}</span><small>{a.billingNote}</small></td>
                      <td data-h="Third-party costs">{a.thirdParty}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="st-extra">
                <div>
                  <h3>Paid to the provider, not to us</h3>
                  <p>These are billed by the service itself, in your name. We'll list the ones your project needs in your quote. Final costs depend on the approved scope and any extra integrations.</p>
                </div>
                <ul>{THIRD_PARTY.map((t) => <li key={t}>{t}</li>)}</ul>
              </div>
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section id="faq" className="st-light st-pad" aria-labelledby="faq-title" style={{ borderTop: "1px solid var(--line)" }}>
          <div className="st-wrap st-faq-grid">
            <div>
              <Label n="08">FAQs</Label>
              <h2 id="faq-title" className="st-h2">Questions, <em>answered.</em></h2>
              <p className="st-lede" style={{ marginTop: 20 }}>Something else? <a href={`mailto:${EMAIL}`} style={{ color: "var(--ink)" }}>Email us</a>.</p>
            </div>
            <div className="st-faq">
              {FAQS.map((f) => (
                <details key={f.q}>
                  <summary>{f.q}<Plus size={22} aria-hidden="true" /></summary>
                  <p>{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* ── Start a project ── */}
        <section id="start" className="st-start st-pad" aria-labelledby="start-title">
          <div className="st-wrap st-start-grid">
            <div className="st-start-copy">
              <Label n="09">Start a project</Label>
              <h2 id="start-title" className="st-h2">Let's make your business <em>easier to choose.</em></h2>
              <p>Tell us what you're building and answer a few questions if you'd like. Your answers go with your booking, so the 30 minutes go on your project.</p>
              <ol className="st-after">
                <li><span>01</span>A 30-minute call about your business and the site it needs.</li>
                <li><span>02</span>A written scope and quote, with what's included and what isn't.</li>
                <li><span>03</span>Design, build, and launch on your domain if you want us to.</li>
              </ol>
            </div>
            <div>
              <Planner plan={plan} setPlan={setPlan} />
              <p className="st-direct">Rather write? <a href={`mailto:${EMAIL}?subject=${encodeURIComponent("Website project")}`}>{EMAIL}</a></p>
            </div>
          </div>
        </section>
      </main>

      {/* ── Footer ── */}
      <footer className="st-foot">
        <div className="st-wrap">
          <div className="st-foot-top">
            <h2>Your next customer is looking. <em>Give them a reason to choose you.</em></h2>
            <div className="st-foot-cta">
              <a className="st-btn" href="#start">Start a project <ArrowRight size={18} /></a>
              <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
            </div>
          </div>
          <div className="st-foot-cols">
            <div>
              <h3>Websites</h3>
              <ul>{SERVICES.map((s) => <li key={s.id}><a href="#websites">{s.title}</a></li>)}</ul>
            </div>
            <div>
              <h3>Add-ons</h3>
              <ul>
                <li><a href="#creative">Motion &amp; video</a></li>
                <li><a href="#creative">Popups &amp; lead capture</a></li>
                <li><a href="#creative">Email marketing</a></li>
                <li><a href="#addons">SEO · AEO · GEO</a></li>
                <li><a href="#pricing">Launch &amp; integrations</a></li>
              </ul>
            </div>
            <div>
              <h3>Selected work</h3>
              <ul>{PROJECTS.slice(0, 5).map((p) => <li key={p.slug}><a href={p.url} target="_blank" rel="noreferrer">{p.name} <ArrowUpRight size={13} aria-hidden="true" /></a></li>)}</ul>
            </div>
            <div>
              <h3>Studio</h3>
              <ul>
                <li><a href="#pricing">Pricing</a></li>
                <li><a href="#faq">FAQs</a></li>
                <li><a href="#start">Start a project</a></li>
                <li><a href={LINKEDIN} target="_blank" rel="noreferrer">LinkedIn <ArrowUpRight size={13} aria-hidden="true" /></a></li>
                <li><a href={INSTAGRAM} target="_blank" rel="noreferrer">Instagram <ArrowUpRight size={13} aria-hidden="true" /></a></li>
                <li><Link to="/">Nexara automation</Link></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="st-wrap" aria-hidden="true"><div className="st-wordmark">Nexara<i /></div></div>
        <div className="st-legal">
          <div className="st-wrap" style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: "8px 24px", width: "100%" }}>
            <span>© {new Date().getFullYear()} Nexara Creative Studio</span>
            <span>Website design &amp; development</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default WebsitesPage;
