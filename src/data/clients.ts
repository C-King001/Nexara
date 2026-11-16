// Brands Nexara has worked with. Same logo files as the marquees on / and /fn
// (public/logos), listed once each with their real names. `bg` is the colour the
// logo file is drawn on. `tile` is the same logo trimmed to a 2:1 box (public/studio/logos)
// so it reads at marquee size; the original files are unchanged.
export interface ClientLogo {
  src: string;
  name: string;
  bg: string;
  tile: string;
}

export const CLIENT_LOGOS: ClientLogo[] = [
  { src: "/logos/kaminskiy-logo.png", name: "Kaminskiy Care + Repair", bg: "#000000", tile: "/studio/logos/kaminskiy-logo.webp" },
  { src: "/logos/popin-logo.png", name: "POPIN", bg: "#ffffff", tile: "/studio/logos/popin-logo.webp" },
  { src: "/logos/logo1.png", name: "Emergence Publishers", bg: "#ffffff", tile: "/studio/logos/logo1.webp" },
  { src: "/logos/logo4.png", name: "Educato", bg: "#000000", tile: "/studio/logos/logo4.webp" },
  { src: "/logos/logo2.png", name: "Sustaina Wines", bg: "#ffffff", tile: "/studio/logos/logo2.webp" },
  { src: "/logos/logo6.png", name: "Kuuka", bg: "#000000", tile: "/studio/logos/logo6.webp" },
];
