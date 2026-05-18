export interface CaseMetric {
  label: string;
  value: string;
}

export interface CaseImage {
  src: string;
  caption: string;
}

export interface CaseStudy {
  slug: string;
  tag: string;
  title: string;
  description: string;
  metrics: CaseMetric[];
  tools: string[];
  challenge: string;
  approach: string[];
  results: string[];
  timeline: string;
  coverImage?: string;
  images?: CaseImage[];
  testimonial?: {
    quote: string;
    name: string;
    role: string;
  };
}

export const caseStudies: CaseStudy[] = [
  {
    slug: "real-estate-lifecycle",
    tag: "REAL ESTATE",
    title: "Full Client Lifecycle on Autopilot",
    description:
      "Built a 3-workflow operational system for a UK real estate agency — inbound lead capture, automated follow-ups, and post-sale document collection — all wired through a central CRM layer so nothing falls between the cracks.",
    metrics: [
      { label: "Workflows Built", value: "3" },
      { label: "Follow-up Trigger", value: "48hr" },
      { label: "Manual Admin Steps", value: "0" },
    ],
    tools: ["n8n", "Google Sheets", "Gmail", "Tally", "Gemini"],
    challenge:
      "The agency had no unified system across the client lifecycle. Inquiries arrived from Rightmove/Zoopla-style emails and website forms, responses were slow and inconsistent, follow-ups depended on someone remembering to send them, and post-sale document collection was entirely manual. Each stage of the journey operated in isolation.",
    approach: [
      "Designed three interconnected workflows instead of isolated automations — every workflow feeds into the next through a shared Google Sheets CRM layer",
      "WF1 – AI Concierge (Inbound Engine): Gmail + webhook triggers capture leads, Gemini extracts key details, new records are logged to the CRM, and a personalized reply fires instantly",
      "WF2 – Profit Protector (Follow-up Engine): a daily scheduled run reads the CRM, filters leads silent for 48+ hours, generates AI follow-up emails via Gemini, sends them, and updates the CRM status",
      "WF3A – Onboarding Form Sender: polls the CRM every 15 minutes for leads marked 'Accepted' and automatically sends a Tally document collection form with a status update",
      "WF3B – Document Processor: triggered by the Tally form submission — matches the submission to the CRM lead, creates a Google Drive folder for that client, downloads and stores all attachments, and notifies the agent instantly",
    ],
    results: [
      "Every inbound lead receives an instant, AI-generated response — no delays regardless of time of inquiry",
      "48-hour follow-ups run automatically without anyone needing to remember or manually check",
      "Post-sale document collection is fully automated from form delivery to Drive storage to agent notification",
      "The agency has one source of truth for every lead's status, conversation history, and documents",
      "Admin work eliminated across three separate stages of the client journey",
    ],
    timeline: "3-workflow system covering the full client lifecycle",
    coverImage: "/images/automations/real-estate/wf1-concierge.jpeg",
    images: [
      {
        src: "/images/automations/real-estate/wf1-concierge.jpeg",
        caption: "WF1 – AI Concierge: Gmail + webhook triggers → Gemini AI extraction → CRM dedup check → personalized email response",
      },
      {
        src: "/images/automations/real-estate/wf2-followup.jpeg",
        caption: "WF2 – Profit Protector: daily schedule → CRM scan → filter 48hr+ silent leads → AI-generated follow-up → send + update CRM",
      },
      {
        src: "/images/automations/real-estate/wf3a-onboarding.jpeg",
        caption: "WF3A – Onboarding Form Sender: polls CRM every 15 min → finds 'Accepted' leads → sends Tally form → updates status",
      },
      {
        src: "/images/automations/real-estate/wf3b-docs.jpeg",
        caption: "WF3B – Document Processor: Tally submission webhook → match to CRM lead → create Drive folder → store all documents → notify agent",
      },
    ],
  },
  {
    slug: "kcr-franchise-pipeline",
    tag: "FRANCHISE SALES",
    title: "Franchise Sales Pipeline That Runs Itself",
    description:
      "Mapped and automated the entire franchise candidate journey for Kaminskiy Care & Repair across 7 pipeline stages using 10 GoHighLevel workflows — so the sales team always knows where each candidate stands and every touchpoint happens without manual effort.",
    metrics: [
      { label: "GHL Workflows Built", value: "10" },
      { label: "Pipeline Stages", value: "7" },
      { label: "Manual Follow-ups", value: "0" },
    ],
    tools: ["GoHighLevel"],
    challenge:
      "The franchise sales team was running a complex multi-step evaluation process — from first inquiry through to a signed agreement — but there was no reliable system behind it. Follow-ups were manual, show rates suffered from inconsistent reminders, no-shows weren't being recovered automatically, and the team often didn't know exactly where each candidate was in the pipeline.",
    approach: [
      "Mapped the full franchise evaluation journey across 7 pipeline stages before touching a single workflow",
      "New Lead: form submission triggers tag + assignment + opportunity creation + immediate email and SMS confirmation",
      "Intro Call: booking confirmation with 24hr and 1hr reminders; separate no-show recovery workflow detects missed appointments and prompts rescheduling via SMS + email",
      "Business Overview, Territory Overview, Founder Call: each stage has its own booking flow with next-step emails, confirmation, 24hr and 1hr reminders — all stage-appropriate in tone",
      "Agreement Review: booking confirmation with day-before and hour-before email reminders to maximize attendance at the final decision call",
      "Closed Won: automatic internal notification to Sales + Ops, and a welcome/onboarding handoff email to the new franchisee",
    ],
    results: [
      "Sales team has real-time visibility into where every franchise candidate sits — no digging through notes or guessing",
      "Every candidate receives consistent, stage-appropriate communication from first inquiry to close without manual effort",
      "No-show recovery is automatic — missed calls are flagged and rescheduling prompts go out immediately",
      "Show rates improved through guaranteed 24hr and 1hr reminders at every call stage",
      "The Sales-to-Operations handoff at deal closure happens automatically — no dropped balls between teams",
    ],
    timeline: "10 workflows across 7 pipeline stages",
    coverImage: "/images/automations/kcr/01-workflow-list.png",
    images: [
      {
        src: "/images/automations/kcr/01-workflow-list.png",
        caption: "All 10 franchise automation workflows in GoHighLevel — from New Lead through Closed Won",
      },
      {
        src: "/images/automations/kcr/09-new-leads-builder.jpeg",
        caption: "Franchise Automation – New Leads: form submission → tag → assign user → create opportunity → email + SMS",
      },
      {
        src: "/images/automations/kcr/03-new-lead-compact.jpeg",
        caption: "New Lead workflow trigger configuration — fires on Contact Created or Franchise Landing Page form submission",
      },
      {
        src: "/images/automations/kcr/02-appointment-booking.jpeg",
        caption: "Appointment Booked workflow — update opportunity → assign to user → send email + internal notification",
      },
      {
        src: "/images/automations/kcr/05-no-show-recovery.jpeg",
        caption: "No-Show Recovery workflow — Appointment Status 'No-Show' → update opportunity → SMS + email to reschedule",
      },
      {
        src: "/images/automations/kcr/04-workflow-detail.jpeg",
        caption: "Stage-specific workflow — structured reminder and follow-up sequence",
      },
      {
        src: "/images/automations/kcr/06-workflow-detail.jpeg",
        caption: "Stage-specific workflow — structured reminder and follow-up sequence",
      },
      {
        src: "/images/automations/kcr/07-workflow-detail.jpeg",
        caption: "Stage-specific workflow — structured reminder and follow-up sequence",
      },
      {
        src: "/images/automations/kcr/08-workflow-detail.jpeg",
        caption: "Stage-specific workflow — structured reminder and follow-up sequence",
      },
      {
        src: "/images/automations/kcr/10-workflow-detail.jpeg",
        caption: "Stage-specific workflow — structured reminder and follow-up sequence",
      },
      {
        src: "/images/automations/kcr/11-workflow-detail.jpeg",
        caption: "Stage-specific workflow — structured reminder and follow-up sequence",
      },
    ],
  },
  {
    slug: "publishing-ai-receptionist",
    tag: "PUBLISHING",
    title: "AI Receptionist Across 4 Channels",
    description:
      "Built an always-on AI receptionist for a publishing company that handles messages across Facebook, Instagram, WhatsApp, and voice calls — with memory, image understanding, FAQ caching, and hot-lead alerts to the boss.",
    metrics: [
      { label: "Channels Active", value: "4" },
      { label: "Availability", value: "24/7" },
      { label: "Response Time", value: "Instant" },
    ],
    tools: ["n8n", "Facebook API", "Instagram API", "WhatsApp API", "Vapi", "OpenAI", "Whisper", "Redis", "Supabase"],
    challenge:
      "The publishing company was receiving inquiries from authors, clients, and partners across four platforms simultaneously with no unified intake system. Messages were missed, responses were inconsistent, voice calls had no follow-up mechanism, and the team had no visibility into which inbound contacts were high-intent leads worth prioritizing.",
    approach: [
      "Built one AI brain shared across all four channels — each handles its specific protocol but feeds into the same logic layer",
      "Facebook + Instagram + WhatsApp: each workflow handles text messages, voice notes (Whisper transcription), and image messages (GPT-4o Vision analysis) — so the AI understands every format a user might send",
      "FAQ cache layer checks common questions before hitting the AI — saves API credits and responds instantly for known queries",
      "Conversation memory via Redis (last 5 turns) means the AI has context across messages — it doesn't treat every message as a new conversation",
      "Purchase intent detection on every message — if a hot lead signal is detected, the boss gets a WhatsApp alert immediately",
      "All lead interactions logged to Supabase for a permanent record of every inbound conversation across channels",
      "Voice channel (Vapi): receives end-of-call transcripts, detects purchase intent, logs to Supabase, and sends a WhatsApp follow-up to the caller automatically",
    ],
    results: [
      "No inquiry goes unanswered regardless of channel or time — the receptionist runs 24/7",
      "The AI handles text, voice notes, and images — not just simple text replies",
      "Hot leads trigger an immediate WhatsApp alert to the boss so high-intent contacts get a human response fast",
      "Every conversation across all four channels is logged to a single database",
      "Voice callers automatically receive a WhatsApp follow-up after every call",
      "FAQ responses are instant and don't consume AI credits unnecessarily",
    ],
    timeline: "4-channel deployment — Facebook, Instagram, WhatsApp, Voice",
    coverImage: "/images/automations/publishing/facebook.jpeg",
    images: [
      {
        src: "/images/automations/publishing/facebook.jpeg",
        caption: "Facebook AI Receptionist — text, voice note (Whisper), and image (GPT-4o Vision) handling with FAQ cache, Redis memory, purchase intent detection, and lead logging to Supabase",
      },
      {
        src: "/images/automations/publishing/instagram.jpeg",
        caption: "Instagram AI Receptionist — identical architecture to Facebook, handling DMs across all message types with the same AI brain",
      },
      {
        src: "/images/automations/publishing/whatsapp.jpeg",
        caption: "WhatsApp AI Receptionist — full message handling with voice transcription, image analysis, and hot-lead boss alert via WhatsApp",
      },
      {
        src: "/images/automations/publishing/voice-call.jpeg",
        caption: "Voice Channel (Vapi) — end-of-call webhook → extract transcript → detect purchase intent → log to Supabase → send WhatsApp follow-up to caller",
      },
    ],
  },
  {
    slug: "coaching-lead-automation",
    tag: "COACHING",
    title: "AI Lead Scoring & Routing System",
    description:
      "Built an automated lead qualification engine that reads coaching inquiries, uses AI to score each lead as Qualified, High Potential, or Not a Fit — then routes them into different email sequences and CRM records automatically.",
    metrics: [
      { label: "Lead Categories", value: "3" },
      { label: "Manual Sorting", value: "0" },
      { label: "Pipeline", value: "End-to-End" },
    ],
    tools: ["n8n", "Google Sheets", "Gmail", "Notion"],
    challenge:
      "Coaching businesses live and die by lead quality — but without a system to sort incoming inquiries, every lead gets treated the same. The coach was spending time on prospects who were never going to convert, while genuinely qualified leads didn't get the right response fast enough. There was no structured process from inquiry to follow-up.",
    approach: [
      "Built a scheduled workflow that reads new coaching inquiries from Google Sheets and processes each one automatically",
      "JavaScript scoring logic evaluates each lead based on their inquiry data and assigns a category: Qualified, High Potential, or Not a Fit",
      "Switch node routes each lead down a different path based on their score",
      "Qualified leads: receive a targeted conversion email and get a record created in Notion as an active prospect",
      "High Potential leads: flagged for manual review via a separate email notification, and logged as a HOT LEAD in Notion",
      "Not a Fit leads: receive a resource packet email (keeps the relationship warm) and are logged in Notion accordingly",
      "All processed leads are merged and the Google Sheets row is updated with their category and follow-up status",
    ],
    results: [
      "Every new inquiry is scored and routed automatically — no manual triage required",
      "Qualified and high-potential leads get the right response without delay",
      "The coach's attention is directed only where it's needed — manual review flags only surface for high-potential leads",
      "Not-a-fit leads still get a professional response that preserves the relationship",
      "Notion becomes a clean, categorized CRM with no manual data entry",
    ],
    timeline: "Automated scoring, routing, and CRM pipeline",
    coverImage: "/images/automations/coaching/lead-automation.jpeg",
    images: [
      {
        src: "/images/automations/coaching/lead-automation.jpeg",
        caption: "Coaching Lead Automation — schedule trigger → Google Sheets read → JS scoring → Switch (Qualified / High Potential / Not a Fit) → Gmail + Notion → update sheet",
      },
    ],
  },
  {
    slug: "job-alert-system",
    tag: "PRODUCTIVITY",
    title: "3-in-1 Job Alert System via Telegram",
    description:
      "Built a three-part automated job alert system — user registration, Telegram onboarding, and a live job engine that scans three job boards every 5 minutes and delivers personalized alerts directly to each subscriber.",
    metrics: [
      { label: "Parts Built", value: "3" },
      { label: "Job Boards Monitored", value: "3" },
      { label: "Check Frequency", value: "5 min" },
    ],
    tools: ["n8n", "Telegram", "Airtable", "Remotive", "RemoteOK", "WeWorkRemotely"],
    challenge:
      "Staying on top of relevant remote job postings requires constantly checking multiple platforms — and doing it manually means missing time-sensitive listings. There was no way to monitor several job boards simultaneously, filter by role, and deliver personalized alerts to multiple subscribers without significant manual effort.",
    approach: [
      "Part 1 – User Registration: a form submission adds new users to Airtable, storing their job preferences and contact details",
      "Part 2 – Telegram Onboarding: when a user starts the Telegram bot, it checks whether they're a new user or returning (by email lookup), saves their Chat ID to Airtable, and sends a welcome/confirmation message so alerts can be delivered directly to their Telegram",
      "Part 3 – Main Job Engine: runs every 5 minutes, fetches all active users from Airtable, and for each user simultaneously pulls new listings from Remotive, RemoteOK, and WeWorkRemotely via their APIs and RSS feed",
      "All fetched jobs are normalized into a consistent format, merged, then filtered by the user's role preferences and only jobs posted after their last check",
      "Matching new jobs trigger a formatted Telegram alert to that user; the 'last checked' timestamp updates in Airtable so no job is sent twice",
    ],
    results: [
      "Three job boards monitored simultaneously for every subscriber — Remotive, RemoteOK, and WeWorkRemotely",
      "New matching jobs delivered to a user's Telegram within 5 minutes of going live",
      "Zero manual checking — the engine runs continuously on its own",
      "Each subscriber only receives jobs matching their specific role preferences",
      "No duplicate alerts — the system tracks what each user has already seen",
    ],
    timeline: "3-part system: registration, onboarding, and live job engine",
    coverImage: "/images/automations/job-alert/system.jpeg",
    images: [
      {
        src: "/images/automations/job-alert/system.jpeg",
        caption: "Full 3-part system — Part 1: user registration to Airtable / Part 2: Telegram onboarding + Chat ID capture / Part 3: live job engine scanning Remotive, RemoteOK, and WeWorkRemotely every 5 minutes",
      },
    ],
  },
  {
    slug: "spreadsheet-intelligence",
    tag: "DATA OPS",
    title: "AI-Powered Spreadsheet Restructuring",
    description:
      "Built two versions of a spreadsheet automation — one using pure JavaScript logic, one using an AI Agent — that reads 226 rows of raw YouTube video data and outputs a clean, structured sheet with Title, Views, Duration, and Date Posted.",
    metrics: [
      { label: "Rows Processed", value: "226" },
      { label: "Fields Extracted", value: "4" },
      { label: "Manual Sorting", value: "Eliminated" },
    ],
    tools: ["n8n", "Google Sheets", "OpenRouter"],
    challenge:
      "A large volume of YouTube video data was pasted into a spreadsheet in an unstructured format with no consistent layout. Extracting and reorganizing each entry manually — pulling out Title, Views, Duration, and Date Posted into proper columns — was tedious, inconsistent, and had to be repeated every time new data came in.",
    approach: [
      "Built Version 1 (without AI): a JavaScript Code node reads each row, parses the raw text using regex and string logic, extracts the four fields, and outputs to a clean structured sheet",
      "Built Version 2 (with AI Agent): the same read-then-output flow, but the middle step uses an AI Agent (OpenRouter Chat Model with Simple Memory) — capable of handling messier, less predictable input formats",
      "Both versions append clean rows to a destination sheet and update the source to prevent reprocessing",
      "The AI version handles 226 items in a single run, using memory context to stay consistent across all rows",
    ],
    results: [
      "226 rows of raw video data processed and restructured in a single workflow run",
      "Clean output sheet with all four fields consistently formatted and ready to use",
      "Manual copy-paste and reformatting completely eliminated",
      "Two versions demonstrate the trade-off: JavaScript for structured data, AI Agent for unpredictable formats",
    ],
    timeline: "Two-version automation — JavaScript and AI Agent",
    coverImage: "/images/automations/spreadsheet/with-ai.jpeg",
    images: [
      {
        src: "/images/automations/spreadsheet/with-ai.jpeg",
        caption: "AI Agent version — Execute → Get 226 rows → AI Agent (OpenRouter + Simple Memory) → Append structured rows to destination sheet",
      },
      {
        src: "/images/automations/spreadsheet/without-ai.jpeg",
        caption: "JavaScript version — Execute → Get rows → Code in JavaScript (regex parsing) → Append row + Update source row",
      },
    ],
  },
];
