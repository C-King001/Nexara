// Websites built, shown as a marquee on /fn and as the Websites tab on /work.
// Screenshots in public/images/websites/ are captured from the live sites by
// scripts/capture-sites.mjs. Descriptions come from each site's own content.

export interface WebsiteItem {
  slug: string;
  name: string;
  tag: string;
  url: string;
  img: string;
  /** One line for the marquee card. */
  short: string;
  /** Fuller description for the Websites tab. */
  desc: string;
  stack: string[];
  /** A second page of the same site worth linking to. */
  extra?: { label: string; href: string; img: string };
}

export const WEBSITES: WebsiteItem[] = [
  {
    slug: "expertlinc",
    name: "ExpertLinc",
    tag: "Careers platform",
    url: "https://www.expertlinc.com/",
    img: "/images/websites/expertlinc.jpg",
    short: "Honest UK career sessions, live",
    desc: "Two hours live with two people from the same career — one senior, one much closer to the start — answering the same five questions on pay, progression, reality and breaking in. The site covers how a session runs, the industries on offer, and a waiting list for industries not yet scheduled.",
    stack: ["Next.js"],
    extra: {
      label: "See inside the working world",
      href: "https://www.expertlinc.com/experience",
      img: "/images/websites/expertlinc-experience.jpg",
    },
  },
  {
    slug: "moodring",
    name: "Moodring",
    tag: "Product story site",
    url: "https://moodring-five.vercel.app/",
    img: "/images/websites/moodring.jpg",
    short: "A smart ring, told as a story",
    desc: "A scroll-led story site for a smart ring built around women's real lives. It walks through one woman's day hour by hour, shows how the same number can mean two different nights, and ends on a waitlist sign-up.",
    stack: ["Vercel"],
  },
  {
    slug: "wigpa",
    name: "WIGPA",
    tag: "Community",
    url: "https://www.wigpa.org/",
    img: "/images/websites/wigpa.jpg",
    short: "25 years, from Agenda to Alliance",
    desc: "Women in God's Prophetic Alliance, a global community marking its Silver Jubilee. Sections for leadership, events, messages, partnership and the academy, with two membership pathways and an induction journey for new members.",
    stack: ["Next.js"],
  },
  {
    slug: "meji",
    name: "Meji Foods",
    tag: "E-commerce",
    url: "https://meji-eight.vercel.app/",
    img: "/images/websites/meji.jpg",
    short: "West African jollof, 90 seconds",
    desc: "Shop for a West African jollof rice brand: flavour picker, boxes of 4 or 8, a subscribe-and-save option, basket, and a stockist list covering Sainsbury's, TikTok Shop and independent markets.",
    stack: ["React", "Vercel"],
  },
  {
    slug: "momsandmore",
    name: "Mom's Best Choice",
    tag: "Product landing page",
    url: "https://momsandmore.com.ng/",
    img: "/images/websites/momsandmore.jpg",
    short: "One product, built to convert",
    desc: "A single-product landing page for a baby head-protection pillow sold across Nigeria. Design picker, demo video, specifications, a with-and-without comparison, parent reviews and an FAQ, all leading to one order action.",
    stack: ["Next.js"],
  },
  {
    slug: "nexara",
    name: "Nexara",
    tag: "Agency site",
    url: "https://nexaraai.tech/",
    img: "/images/websites/nexara.jpg",
    short: "My own agency site",
    desc: "The agency site you are reading now: automation case studies with full workflow breakdowns, a social media portfolio with its own separate design, and a booking flow built on Google Calendar.",
    stack: ["React", "TypeScript", "Vite", "TailwindCSS"],
    extra: {
      label: "My personal portfolio",
      href: "https://nexaraai.tech/fn",
      img: "/images/websites/nexara-fn.jpg",
    },
  },
];
