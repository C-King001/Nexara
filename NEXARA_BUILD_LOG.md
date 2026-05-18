# Nexara Agency Website — Build Log

## What This Is
A multi-page agency portfolio website for **Nexara** (formerly "SYS.architect"), a Revenue Systems & Automation Agency founded by Faithful Nyama. Built on top of an existing React + Vite codebase extracted from `revenue-systems-architect-main.zip`.

---

## Agency Brand
| Key | Value |
|---|---|
| **Agency Name** | Nexara |
| **Tagline** | "Built to scale. Wired to win." |
| **Positioning** | Revenue Systems Architect (NOT "VA", "automation guy", or "chatbot builder") |
| **Booking Link** | https://calendly.com/faithfulnyama/30min |
| **Email** | faithfulnyama@gmail.com |
| **Instagram** | @iam_faithfulnyama |
| **LinkedIn** | faithfulnyama |

---

## Tech Stack
| Tool | Version |
|---|---|
| React | 18.3.1 |
| TypeScript | 5.8.3 |
| Vite | 5.4.19 |
| TailwindCSS | 3.4.17 |
| Framer Motion | 11.0.0 |
| shadcn/ui | latest |
| React Router | 6.30.1 |

---

## Project Structure
```
revenue-systems-architect-main/
├── public/
│   ├── logos/
│   │   ├── logo1.jpg  (renamed from 279016476_...jpg)
│   │   ├── logo2.jpg  (renamed from 625875631_...jpg)
│   │   ├── logo3.png  (renamed from Minimalist Hand Drawn Tree Branch...)
│   │   ├── logo4.png  (renamed from Untitled design - 2.png)
│   │   ├── logo5.png  (renamed from Untitled design - 3.png)
│   │   ├── logo6.png  (renamed from Untitled design - 4.png)
│   │   ├── logo7.jpg  (renamed from WhatsApp Image 5.09.36 PM.jpeg)
│   │   └── logo8.jpg  (renamed from WhatsApp Image 5.09.37 PM.jpeg)
│   └── images/clients/
│       ├── peter-douglas.jpeg  (Peter Douglas, Sustaina Wines)
│       ├── Pierre.jpg          (Pierre-Louis Monnot, Educato AI)
│       └── Tekla.jpg           (Tekla Balfour, POPIN)
│
├── src/
│   ├── pages/
│   │   ├── Index.tsx           ← MODIFIED: added LogoMarquee import
│   │   ├── AutomationPage.tsx  ← NEW: automation deep-dive page
│   │   ├── SocialMediaPage.tsx ← NEW: social media portfolio page
│   │   ├── AboutPage.tsx       ← NEW: founder story + Nexara origin
│   │   ├── CaseStudyPage.tsx   (untouched)
│   │   └── NotFound.tsx        (untouched)
│   │
│   ├── components/
│   │   ├── Navbar.tsx              ← MODIFIED
│   │   ├── HeroSection.tsx         ← MODIFIED
│   │   ├── StorySection.tsx        ← MODIFIED (full rewrite)
│   │   ├── LogoMarquee.tsx         ← NEW (infinite scroll)
│   │   ├── CapabilitiesSection.tsx ← MODIFIED (full rewrite)
│   │   ├── TestimonialsSection.tsx ← MODIFIED (full rewrite)
│   │   ├── CTASection.tsx          ← MODIFIED
│   │   ├── Footer.tsx              ← MODIFIED
│   │   ├── ProblemSection.tsx      (untouched)
│   │   ├── InsightSection.tsx      (untouched)
│   │   ├── CaseStudiesSection.tsx  (untouched)
│   │   ├── SystemDiagram.tsx       (untouched)
│   │   └── ui/ (60+ shadcn components, untouched)
│   │
│   ├── App.tsx     ← MODIFIED (added 3 new routes)
│   └── index.css   ← MODIFIED (added @keyframes marquee + animate-pulse-glow)
```

---

## Pages

### 1. Main Landing Page (`/`)
**Color scheme**: Dark/cyan (existing — user confirmed they like it)
**Sections** (in order):
1. Navbar — Nexara brand, page links
2. HeroSection — "If your [industry] business doubled tomorrow, would your system survive?" with rotating industries (Real Estate → Consultancy → SaaS → Agency → E-Commerce → Coaching)
3. ProblemSection — (untouched)
4. StorySection — Full founder copy: social media → hitting the wall → Revenue Systems Architect + 3 mini case cards (Wine, Popin, Real Estate)
5. LogoMarquee — All 8 client logos scroll left→right infinitely. Grayscale → color on hover. Pauses on hover.
6. InsightSection — (untouched)
7. CaseStudiesSection — (untouched, user said they'll add portfolio pieces later)
8. CapabilitiesSection — Rebuilt as "The 3-Part Operational System": Inbound Lead Engine (AI Concierge) → Follow-Up Engine (Profit Protector) → Post-Sale Hub (Onboarding Automation)
9. SystemDiagram — (untouched)
10. TestimonialsSection — Real client photos + real quotes (Peter Douglas, Pierre-Louis, Tekla)
11. CTASection — "Book a 15-Minute System Audit" → Calendly
12. Footer — Nexara brand + 3-column links

---

### 2. Automation Page (`/automation`)
**Color scheme**: Dark/cyan (same as main)
**File**: `src/pages/AutomationPage.tsx`
**Sections**:
1. Hero: "We build the infrastructure your business runs on. Even when you log out."
2. The Problem: "Your backend is leaking revenue." + core insight callout
3. The 3-Part System: Expanded detail with step-by-step breakdown for each system
4. Results highlights: Wine (12+ hrs → 30 min), Popin (2,400+ signups), Real Estate (140% leads)
5. Tech stack chips: n8n, GoHighLevel, Make, Zapier, Airtable, OpenAI, Webhooks
6. TestimonialsSection (reused)
7. CTA: "Book a 15-Minute System Audit" → Calendly

---

### 3. Social Media Page (`/social-media`)
**Color scheme**: White/black/purple/cold — matching https://faithful-nyama-portfolio-website.vercel.app/
**File**: `src/pages/SocialMediaPage.tsx`
**Key colors**:
- Background: `#ffffff` / `#fafafb`
- Primary: `#6c63ff` → `#8b84ff` gradient
- Text: `#1a1a1a` / `#6b6b6b`
- Tint: `#bedbff` / `#ededff`
- Fonts: Poppins (headings) + Inter (body)
**Has its own LightNavbar** (white background, purple accents)
**Sections**:
1. Hero: "Social Media that Sells — Without Losing the Soul."
2. Services (4 cards): Strategy & Management, Meta Ads, Community Building, Analytics
3. Portfolio projects (4 cards): POPIN (470+ businesses), Book Addicts (1M views), Book Lovers (3K→3K followers), GlowVibe (400K views)
4. Stats strip (purple gradient background): 1M+ views, 470+ engaged, 3K+ followers, 400K monthly
5. Testimonials (purple/cold styled): Pierre-Louis, Tekla, Peter Douglas
6. CTA: "Let's Build Your Growth System" → Calendly
7. Light Footer

---

### 4. About Page (`/about`)
**Color scheme**: Dark/cyan (same as main)
**File**: `src/pages/AboutPage.tsx`
**Sections**:
1. Hero: "Hi, I'm Faithful. I build the systems that make businesses unbreakable."
   - **⚠️ Photo placeholder (🧠 emoji)** — replace with real photo when ready
2. Founder Story: Full journey copy (social media → wall → systems architect)
3. Nexara Origin: "Most agencies build campaigns. We build infrastructure." + 3 pillars (Strategic Storytelling, Revenue Architecture, Operational Clarity)
4. Tools: n8n, GoHighLevel, Make, Zapier, Airtable, OpenAI API, Meta Ads, Google Ads, Notion, Slack
5. Social links: Instagram, LinkedIn, Email
6. CTA → Calendly

---

## Testimonials (Real)
| Name | Company | Role | Image File | Used On |
|---|---|---|---|---|
| Peter Douglas | Sustaina Wines | CEO | `peter-douglas.jpeg` | All dark pages + social media page |
| Pierre-Louis Monnot | Educato AI | Co-founder | `Pierre.jpg` | All pages |
| Tekla Balfour | POPIN | CEO | `Tekla.jpg` | All pages |

---

## Logo Marquee
- **File**: `src/components/LogoMarquee.tsx`
- **Animation**: CSS `@keyframes marquee` added to `index.css` — scrolls left at 30s/loop
- **Behavior**: Grayscale by default, full color on hover, pauses on hover
- **Position**: Between StorySection and InsightSection on the main page

---

## Key CSS Additions (`src/index.css`)
```css
@keyframes marquee {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}
.marquee-track {
  animation: marquee 30s linear infinite;
  width: max-content;
}
.marquee-track:hover { animation-play-state: paused; }

@keyframes pulse-glow { 0%, 100% { opacity: 0.5; } 50% { opacity: 1; } }
.animate-pulse-glow { animation: pulse-glow 3s ease-in-out infinite; }
```

---

## Routing (`src/App.tsx`)
```
/                  → Index (main landing)
/automation        → AutomationPage
/social-media      → SocialMediaPage
/about             → AboutPage
/case/:slug        → CaseStudyPage (existing)
*                  → NotFound
```

---

## How to Run
```bash
# Install dependencies
npm install

# Development server (usually port 8080 or 8081)
npm run dev

# Production build
npm run build
# Output goes to dist/ folder — drag to Netlify or run:
npx vercel --prod  # to deploy to Vercel
```

---

## Still To Do (User Will Provide Later)
- [ ] **Portfolio pieces**: User will provide case study content → add to `src/data/caseStudies.ts` and `CaseStudiesSection.tsx`
- [ ] **Personal photo**: Replace the 🧠 emoji placeholder in `AboutPage.tsx` with Faithful's real photo
- [ ] **Deploy to production**: Push to Vercel/Netlify for a live URL
- [ ] **More logo context**: The 8 logos in `/public/logos/` are all named `logo1-8` — consider adding company names as alt text once confirmed

---

## Design Decisions Made
1. **Dark/cyan theme kept** on main, automation, and about pages — user confirmed they like the existing Lovable design
2. **White/purple/cold theme only on social media page** — matches the existing portfolio at faithful-nyama-portfolio-website.vercel.app
3. **Social Media page has its own navbar** (`LightNavbar`) to avoid the dark navbar clashing with the white page
4. **"Book Audit" CTA everywhere** points to the actual Calendly link
5. **3-Part System** replaces the old 5-service list to match the user's copy and positioning
6. **Logo filenames renamed** (spaces/special chars removed) to `logo1-8` for URL safety
7. **Client image `Peter Douglas.jpeg` renamed** to `peter-douglas.jpeg` for URL safety
