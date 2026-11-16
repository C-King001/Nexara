// Content for Nexara Studio (/studio, /websites). Everything here is real:
// project descriptions come from the live sites, screenshots in
// public/studio/sites/ were captured from those sites in November 2026, and
// no prices are published until real figures are confirmed.

export type ProjectKind = "landing" | "business" | "ecommerce" | "redesign" | "custom";

export interface Project {
  slug: string;
  name: string;
  category: string;
  kind: ProjectKind;
  url: string;
  desc: string;
  services: string[];
  /** Brand colours: plate behind the preview, and text on it. */
  bg: string;
  fg: string;
}

export const shot = (slug: string, kind: "desktop" | "mobile") => `/studio/sites/${slug}-${kind}.webp`;
export const host = (url: string) => url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");

export const PROJECTS: Project[] = [
  {
    slug: "bibire", name: "Bibiré", category: "Ecommerce", kind: "ecommerce", url: "https://bibire-six.vercel.app/",
    desc: "A storefront for a UK activewear brand. Collection 003 opens on a strip of the campaign film, then goes down to product detail like adjustable straps and removable cups, with a size guide, bag and account.",
    services: ["Website design & build", "Brand film"], bg: "#10281d", fg: "#f0eee9",
  },
  {
    slug: "expertlinc", name: "ExpertLinc", category: "Careers platform", kind: "business", url: "https://www.expertlinc.com/",
    desc: "Live sessions where you hear from two people in the same career, one senior and one just starting out. The site explains how a session runs, which industries are on offer and how to join the waiting list.",
    services: ["Website design & build", "Campaign page", "Brand intro film", "Showreel"], bg: "#171e31", fg: "#f9f7f3",
  },
  {
    slug: "getyourcrib", name: "Crib", category: "Campus marketplace", kind: "custom", url: "https://www.getyourcrib.app/",
    desc: "One app for three parts of student life: verified lodges, ID-checked local services and a student market. It's live at five campuses in Nigeria, with listings tied to each campus.",
    services: ["Website design & build"], bg: "#17337a", fg: "#ffffff",
  },
  {
    slug: "moodring", name: "Moodring", category: "Product story site", kind: "landing", url: "https://moodring-five.vercel.app/",
    desc: "A scroll-led story for a smart ring built around women's lives. It follows one woman's day hour by hour, shows how the same number can mean two different nights, and ends on the waitlist.",
    services: ["Website design & build", "Welcome email series", "Product film"], bg: "#9a4716", fg: "#fff3e4",
  },
  {
    slug: "momsandmore", name: "Mom's Best Choice", category: "Product landing page", kind: "landing", url: "https://momsandmore.com.ng/",
    desc: "A single-product landing page for a baby head-protection pillow sold across Nigeria. It has a design picker, demo video, specifications, a with-and-without comparison and parent reviews, all leading to one order button.",
    services: ["Landing page design & build"], bg: "#ffd95c", fg: "#2e1a16",
  },
  {
    slug: "meji", name: "Meji Foods", category: "Ecommerce", kind: "ecommerce", url: "https://meji-eight.vercel.app/",
    desc: "A shop for a West African jollof rice brand, with a flavour picker, boxes of 4 or 8, subscribe-and-save, a basket and a list of where to buy it in stores.",
    services: ["Website design & build"], bg: "#6b1d0a", fg: "#fff6ec",
  },
  {
    slug: "wigpa", name: "WIGPA", category: "Community website", kind: "business", url: "https://www.wigpa.org/",
    desc: "Women in God's Prophetic Alliance, a global community marking its Silver Jubilee. The site covers leadership, events, messages, partnership and the academy, with two membership routes and an induction for new members.",
    services: ["Website design & build"], bg: "#3b0508", fg: "#fff6ec",
  },
  {
    slug: "throneroom", name: "The Throneroom", category: "Ministry website", kind: "business", url: "https://the-throneroom.vercel.app/",
    desc: "A house of prayer in Kafanchan, Nigeria, since 1991. The site carries teaching from its vision pioneer, a ministry picker covering missions, a hospital, a nursing college, radio and a guest house, plus gatherings, giving and a live stream.",
    services: ["Website design & build"], bg: "#15103a", fg: "#f6efe0",
  },
];

export const project = (slug: string) => PROJECTS.find((p) => p.slug === slug)!;

/** Shown in the hero, in this order. */
export const HERO_SET = ["bibire", "expertlinc", "getyourcrib", "moodring", "momsandmore", "wigpa"].map(project);

/** Work grid rows: spans out of 12 on desktop. */
export const WORK_ROWS: [string, number][][] = [
  [["bibire", 12]],
  [["expertlinc", 7], ["getyourcrib", 5]],
  [["moodring", 5], ["momsandmore", 7]],
  [["meji", 6], ["wigpa", 6]],
  [["throneroom", 12]],
];

export const COUNTRIES = ["India", "Bulgaria", "Germany", "United States", "United Kingdom", "Nigeria"];

export interface Service {
  id: ProjectKind;
  title: string;
  planner: string;
  body: string;
  goodFor: string[];
  example?: string;
}

export const SERVICES: Service[] = [
  {
    id: "landing", title: "Landing pages", planner: "Landing page",
    body: "One focused page with one job: turn a visitor from an ad, a launch or a campaign into a lead or a sale.",
    goodFor: ["Ad campaigns", "Product launches", "Lead generation", "A single offer"], example: "momsandmore",
  },
  {
    id: "business", title: "Business websites", planner: "Business website",
    body: "A complete site that explains what you do, shows why you're the right choice and makes getting in touch easy.",
    goodFor: ["Service businesses", "Organisations", "Platforms", "Professional brands"], example: "expertlinc",
  },
  {
    id: "ecommerce", title: "Ecommerce websites", planner: "Ecommerce website",
    body: "Stores that show the product properly and make buying it feel easy, from the first look to the basket.",
    goodFor: ["Product brands", "Collection drops", "Subscriptions", "Food and lifestyle"], example: "bibire",
  },
  {
    id: "redesign", title: "Website redesigns", planner: "Website redesign",
    body: "For businesses that have outgrown their site. We keep what works, rebuild what doesn't, and make the site match the quality of what you sell.",
    goodFor: ["Outdated sites", "Template sites", "Sites that don't convert", "Rebrands"],
  },
  {
    id: "custom", title: "Custom website experiences", planner: "Custom website",
    body: "When a template can't handle it: custom structures, user accounts, listings, multi-sided marketplaces and third-party integrations.",
    goodFor: ["Marketplaces", "Platforms", "Custom functionality", "Integrations"], example: "getyourcrib",
  },
];

export const PROCESS = [
  { t: "The call", b: "Thirty minutes about your business, who you sell to and what the website needs to do. You can answer the seven questions below first." },
  { t: "Scope and quote", b: "A written scope covering pages, features, what's included and what's charged separately. Nothing starts until you approve it." },
  { t: "Design", b: "You see the layout, the words and the visual direction for the key pages before anything is built." },
  { t: "Build", b: "We develop the approved design and test it on phones, tablets and desktops, with revisions as agreed in the scope." },
  { t: "Launch or handover", b: "You get a production-ready site. Add Launch & integrations and we put it live on your domain and connect the forms and emails." },
];

export interface Package {
  id: string;
  name: string;
  forWho: string;
  includes: string[];
  separate: string[];
  billing: string;
  planner: string;
  cta: string;
  examples?: string[];
}

export const PACKAGES: Package[] = [
  {
    id: "landing", name: "Landing page", planner: "Landing page", cta: "Scope my landing page",
    forWho: "For one focused page: a campaign, a launch, a single product or a lead-generation offer.",
    includes: ["Single-page scope", "Page design", "Development and implementation", "Responsive desktop and mobile layouts", "Agreed sections and content", "A primary call to action"],
    separate: ["Launch & integrations", "Add-ons", "Third-party costs"],
    billing: "One-time project fee", examples: ["momsandmore", "moodring"],
  },
  {
    id: "website", name: "Full website design & build", planner: "Business website", cta: "Scope my website",
    forWho: "For a complete website with multiple pages, designed and built to an agreed scope.",
    includes: ["Custom website design", "Agreed number of pages", "Responsive development", "Functionality within the approved scope", "Agreed revisions", "Production-ready handover"],
    separate: ["Deployment and technical setup, unless your quote includes them", "Add-ons", "Third-party costs"],
    billing: "One-time project fee", examples: ["bibire", "expertlinc", "wigpa"],
  },
];

export const LAUNCH = {
  name: "Launch & integrations",
  forWho: "Optional, after either build. You get a finished website from the build. This is us making it live and connecting everything it needs to work.",
  groups: [
    { t: "Go live", items: ["Website deployment", "Domain connection", "Hosting configuration", "SSL configuration where required"] },
    { t: "Forms and email", items: ["Contact form setup", "Popup form integration", "Resend integration for email delivery", "Automated enquiry notifications", "Customer confirmation emails", "Email template configuration"] },
    { t: "Test and hand over", items: ["Form submission testing", "End-to-end testing", "Final launch and handover"] },
  ],
  billing: "One-time setup fee",
};

export interface Addon {
  id: string;
  name: string;
  what: string;
  billing: "One-time" | "Monthly" | "One-time or monthly" | "Per project";
  billingNote: string;
  thirdParty: string;
}

export const ADDONS: Addon[] = [
  { id: "seo", name: "SEO", what: "Technical and on-page search optimisation: structure, speed, metadata and content that search engines can read.", billing: "One-time or monthly", billingNote: "Setup once, ongoing work monthly", thirdParty: "Paid search tools, only if you want them" },
  { id: "aeo", name: "AEO", what: "Answer Engine Optimisation: content and structure that make your answers easy for answer engines to find and quote.", billing: "One-time or monthly", billingNote: "Setup once, ongoing work monthly", thirdParty: "None by default" },
  { id: "geo", name: "GEO", what: "Generative Engine Optimisation: your content and online presence prepared for generative search and AI-powered discovery.", billing: "One-time or monthly", billingNote: "Setup once, ongoing work monthly", thirdParty: "None by default" },
  { id: "email", name: "Email marketing", what: "List setup, email template design, welcome sequences, newsletters, campaigns and ongoing email support.", billing: "One-time or monthly", billingNote: "Templates and sequences once, campaigns monthly", thirdParty: "Your email platform's subscription" },
  { id: "popups", name: "Popup forms & lead capture", what: "Custom popups, newsletter forms and enquiry capture, designed for desktop and phone.", billing: "One-time", billingNote: "Designed, built and connected once", thirdParty: "Form or email tool, if one is needed" },
  { id: "motion", name: "Motion graphics & video", what: "Promotional films, brand intros and animated brand assets for your site, ads and socials.", billing: "Per project", billingNote: "Quoted per film or set", thirdParty: "Licensed music or footage, if used" },
  { id: "integrations", name: "Other integrations", what: "Extra functionality and third-party services, scoped to what your project needs.", billing: "Per project", billingNote: "Scoped with the build", thirdParty: "Depends on the service" },
];

export const THIRD_PARTY = ["Domain registration", "Hosting", "Email sending plans, such as Resend", "Email marketing platforms", "Premium plugins, fonts and licences"];

export const FAQS = [
  { q: "How much does a website cost?", a: "It depends on scope: the number of pages, the functionality and the integrations. Two \"five-page websites\" can be very different jobs, so we quote each project. After the first call you get a written quote that lists what's included and what's charged separately." },
  { q: "What's the difference between the build and Launch & integrations?", a: "The build gets you a finished, production-ready website. Launch & integrations is us putting it live on your domain, connecting forms and email delivery, setting up enquiry notifications and confirmation emails, then testing everything end to end. If your own developer or host handles that, you only need the build." },
  { q: "Do I need the add-ons?", a: "No. Every add-on is optional and priced on its own. We'll suggest the ones that would help, and tell you if we don't think one is worth it for you yet." },
  { q: "Can you redesign my existing website?", a: "Yes. Send us the link before the call. We'll look at what it says now and what's getting in the way, and tell you whether a full redesign or a few focused changes make more sense." },
  { q: "Do you work with businesses outside the UK?", a: "Yes. We've worked with companies in India, Bulgaria, Germany, the United States, the United Kingdom and Nigeria. Everything runs remotely, over video calls and email." },
  { q: "What do you build websites with?", a: "Most of our sites are built in code with React or Next.js and hosted on Vercel. That keeps them fast and flexible. If your project needs a particular platform, we'll talk it through on the call." },
  { q: "How long does a website take?", a: "It depends on the scope. Your quote includes the timeline, and we agree it before any work starts." },
  { q: "What happens on the first call?", a: "Thirty minutes. We ask about your business, your customers and what the site needs to do, using the seven questions below. You leave knowing whether we're the right fit and what the next step would be." },
];

export const PROJECT_TYPES = [...SERVICES.map((s) => s.planner), "Not sure yet"];
export const PLANNER_ADDONS = ["Launch & integrations", "SEO / AEO / GEO", "Email marketing", "Popups & lead capture", "Motion & video", "Other integrations"];

export const QUESTIONS = [
  { q: "What is the single biggest challenge in your business right now?", short: "Biggest challenge", hint: "The thing that keeps coming back.", chips: ["Not enough enquiries", "Our site looks dated", "The site doesn't convert", "Nobody has heard of us"] },
  { q: "How long has the problem existed?", short: "How long", hint: "A rough answer is fine.", chips: ["A few weeks", "A few months", "Over a year", "Since we started"] },
  { q: "What have you already tried that did not work?", short: "Already tried", hint: "Agencies, templates, ads, doing it yourself.", chips: ["A template site", "Paid ads", "Another agency", "Doing it myself"] },
  { q: "What outcome are you actually after?", short: "Outcome", hint: "Picture it working. What do you see?", chips: ["More enquiries", "More online sales", "A brand people trust", "A successful launch"] },
  { q: "Why now?", short: "Why now", hint: "What changed, or what's coming up.", chips: ["A launch is coming", "Sales have stalled", "We've outgrown our site", "A rebrand"] },
  { q: "What is it costing you to leave this alone?", short: "Cost of waiting", hint: "Money, time, or the customers you never hear from.", chips: ["Lost sales", "Wasted ad spend", "My time", "Credibility"] },
  { q: "What would make you confident enough to move forward?", short: "To move forward", hint: "What would you need to see or hear from us?", chips: ["Seeing similar work", "A clear scope and price", "Knowing the timeline", "Talking it through"] },
];

export const TAYA_EMAILS = [
  "The thought you almost lost.",
  "Why a necklace?",
  "Your phone can already take a voice note.",
  "We decided TAYA should know less.",
  "$650 is a lot for a necklace.",
  "Who is TAYA actually for?",
  "Maybe you're ready.",
].map((subject, i) => ({ subject, src: `/studio/taya/email-${i + 1}.webp` }));

export const MOODRING_EMAILS = [
  "you're in ☀️",
  "nobody noticed a thing",
  "7h 14m",
  "you said work",
  "your grown-up mood ring",
  "does it tell me I'm burning out?",
  "what happens next",
].map((subject, i) => ({ subject, src: `/studio/moodring/email-${i + 1}.webp` }));

export const FILMS = [
  { id: "expertlinc-showreel", name: "ExpertLinc", kind: "Showreel", ratio: "16:9", sound: false, bg: "#171e31" },
  { id: "bibire-film", name: "Bibiré", kind: "Brand film", ratio: "9:16", sound: true, bg: "#10281d" },
  { id: "expertlinc-intro", name: "ExpertLinc", kind: "Brand intro", ratio: "16:9", sound: true, bg: "#171e31" },
  { id: "taya-film", name: "Taya", kind: "Launch film", ratio: "16:9", sound: true, bg: "#231b18" },
];

export const NAV = [
  { href: "#websites", label: "Websites" },
  { href: "#creative", label: "Motion & Creative" },
  { href: "#addons", label: "Add-ons" },
  { href: "#work", label: "Selected Work" },
  { href: "#pricing", label: "Pricing" },
];

export const EMAIL = "faithfulnyama@gmail.com";
export const LINKEDIN = "https://www.linkedin.com/in/faithfulnyama";
export const INSTAGRAM = "https://www.instagram.com/iam_faithfulnyama";
