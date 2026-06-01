import { useState } from "react";
import { Plus, Minus, Clock, Flame } from "lucide-react";
import { motion } from "framer-motion";
import type { Meal } from "@/data/meals";
import { formatPrice } from "@/data/meals";
import { useCart } from "@/context/CartContext";

interface MealCardProps {
  meal: Meal;
}

const spicyLabels = ["", "Mild", "Medium", "Hot 🌶️"];

export default function MealCard({ meal }: MealCardProps) {
  const { addItem, removeItem, updateQuantity, getItemQuantity, openCart } = useCart();
  const quantity = getItemQuantity(meal.id);
  const [adding, setAdding] = useState(false);

  const handleAdd = async () => {
    setAdding(true);
    addItem(meal);
    setTimeout(() => setAdding(false), 500);
  };

  const handleDecrease = () => {
    if (quantity === 1) removeItem(meal.id);
    else updateQuantity(meal.id, quantity - 1);
  };

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      className="ff-card overflow-hidden flex flex-col group"
    >
      {/* Image area */}
      <div
        className={`relative h-44 bg-gradient-to-br ${meal.gradient} flex items-center justify-center overflow-hidden`}
      >
        <span className="text-6xl drop-shadow-lg">{meal.emoji}</span>

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
          {meal.popular && (
            <span className="ff-badge bg-ff-gold text-ff-charcoal text-[10px] font-semibold uppercase tracking-wide">
              Popular
            </span>
          )}
          {meal.tags[0] && (
            <span className="ff-badge bg-black/30 text-white text-[10px] backdrop-blur-sm">
              {meal.tags[0]}
            </span>
          )}
        </div>

        {!meal.available && (
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
            <span className="text-white font-body text-sm font-medium">Unavailable</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1">
        <h3 className="font-heading text-lg font-semibold text-foreground leading-snug">
          {meal.name}
        </h3>
        <p className="text-xs text-muted-foreground mt-1 leading-relaxed line-clamp-2 font-body flex-1">
          {meal.description}
        </p>

        {/* Meta row */}
        <div className="flex items-center gap-3 mt-2.5 text-xs text-muted-foreground">
          {meal.prepTime > 0 && (
            <span className="flex items-center gap-1">
              <Clock size={11} />
              {meal.prepTime} min
            </span>
          )}
          {meal.spicyLevel > 0 && (
            <span className="flex items-center gap-1">
              <Flame size={11} className="text-ff-terracotta" />
              {spicyLabels[meal.spicyLevel]}
            </span>
          )}
        </div>

        {/* Price + Add to cart */}
        <div className="flex items-center justify-between mt-3 pt-3 border-t border-border">
          <span className="font-heading text-xl font-semibold text-ff-spice">
            {formatPrice(meal.price)}
          </span>

          {quantity === 0 ? (
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={handleAdd}
              disabled={!meal.available || adding}
              className="flex items-center gap-1.5 bg-ff-spice hover:bg-ff-spice-bright disabled:opacity-50 text-ff-cream text-sm font-medium rounded-full px-4 py-2 transition-all duration-200"
              style={{ backgroundColor: adding ? "hsl(3 75% 42%)" : "hsl(3 68% 32%)" }}
            >
              <Plus size={14} />
              Add
            </motion.button>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={handleDecrease}
                className="w-8 h-8 rounded-full border border-border hover:bg-secondary flex items-center justify-center transition-colors"
              >
                <Minus size={13} />
              </button>
              <span className="text-sm font-semibold w-5 text-center">{quantity}</span>
              <button
                onClick={() => updateQuantity(meal.id, quantity + 1)}
                className="w-8 h-8 rounded-full bg-ff-spice flex items-center justify-center transition-colors"
                style={{ backgroundColor: "hsl(3 68% 32%)" }}
              >
                <Plus size={13} className="text-white" />
              </button>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
