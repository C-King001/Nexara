export interface Category {
  id: string;
  name: string;
  description: string;
  emoji: string;
  color: string; // tailwind bg gradient classes
}

export const categories: Category[] = [
  {
    id: "rice-grains",
    name: "Rice & Grains",
    description: "Jollof, fried, native and specialty rice dishes",
    emoji: "🍚",
    color: "from-amber-600 to-orange-500",
  },
  {
    id: "soups-swallows",
    name: "Soups & Swallows",
    description: "Authentic Northern and Southern Nigerian soups",
    emoji: "🫕",
    color: "from-red-800 to-rose-700",
  },
  {
    id: "protein-grills",
    name: "Protein & Grills",
    description: "Suya, grilled meats, kilishi and skewers",
    emoji: "🍖",
    color: "from-stone-700 to-amber-800",
  },
  {
    id: "street-food",
    name: "Street Favorites",
    description: "Shawarma, burgers, and crowd-pleasing bites",
    emoji: "🌯",
    color: "from-yellow-600 to-orange-600",
  },
  {
    id: "snacks-pastries",
    name: "Snacks & Pastries",
    description: "Puff puff, samosa, meat pie and more",
    emoji: "🥐",
    color: "from-orange-400 to-amber-500",
  },
  {
    id: "drinks",
    name: "Drinks",
    description: "Chapman, kunu, zobo, soft drinks and juices",
    emoji: "🥤",
    color: "from-rose-500 to-pink-600",
  },
];
