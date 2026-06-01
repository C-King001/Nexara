import { motion } from "framer-motion";
import type { Category } from "@/data/categories";

interface CategoryFilterProps {
  categories: Category[];
  selected: string;
  onSelect: (id: string) => void;
}

export default function CategoryFilter({ categories, selected, onSelect }: CategoryFilterProps) {
  return (
    <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-2">
      <FilterChip
        label="All"
        emoji="🍽️"
        selected={selected === "all"}
        onClick={() => onSelect("all")}
      />
      {categories.map((cat) => (
        <FilterChip
          key={cat.id}
          label={cat.name}
          emoji={cat.emoji}
          selected={selected === cat.id}
          onClick={() => onSelect(cat.id)}
        />
      ))}
    </div>
  );
}

interface FilterChipProps {
  label: string;
  emoji: string;
  selected: boolean;
  onClick: () => void;
}

function FilterChip({ label, emoji, selected, onClick }: FilterChipProps) {
  return (
    <motion.button
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      className={`flex-shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium transition-all duration-200 ${
        selected
          ? "text-white shadow-md"
          : "bg-white border border-border text-foreground hover:border-ff-spice/40 hover:bg-secondary"
      }`}
      style={selected ? { backgroundColor: "hsl(3 68% 32%)" } : {}}
    >
      <span className="text-base leading-none">{emoji}</span>
      <span className="font-body whitespace-nowrap">{label}</span>
    </motion.button>
  );
}
