import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import FeliciaNavbar from "@/components/felicia/FeliciaNavbar";
import FeliciaFooter from "@/components/felicia/FeliciaFooter";
import MealCard from "@/components/felicia/MealCard";
import CategoryFilter from "@/components/felicia/CategoryFilter";
import { categories } from "@/data/categories";
import { meals } from "@/data/meals";

export default function MenuPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(
    searchParams.get("category") || "all"
  );
  const [showUnavailable, setShowUnavailable] = useState(false);

  const handleCategorySelect = (id: string) => {
    setSelectedCategory(id);
    if (id !== "all") {
      setSearchParams({ category: id });
    } else {
      setSearchParams({});
    }
  };

  const filtered = useMemo(() => {
    let result = meals;

    if (!showUnavailable) {
      result = result.filter((m) => m.available);
    }

    if (selectedCategory !== "all") {
      result = result.filter((m) => m.categoryId === selectedCategory);
    }

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (m) =>
          m.name.toLowerCase().includes(q) ||
          m.description.toLowerCase().includes(q) ||
          m.tags.some((t) => t.toLowerCase().includes(q))
      );
    }

    return result;
  }, [selectedCategory, search, showUnavailable]);

  const currentCategoryName =
    selectedCategory === "all"
      ? "All Meals"
      : categories.find((c) => c.id === selectedCategory)?.name || "Meals";

  return (
    <div className="min-h-screen bg-background">
      <FeliciaNavbar />

      {/* Page header */}
      <section className="pt-20 pb-8 section-dark pattern-adire">
        <div className="container mx-auto px-4 pt-8">
          <p className="text-xs uppercase tracking-widest font-body text-ff-cream/50 mb-2">Our Menu</p>
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-ff-cream mb-3">
            {currentCategoryName}
          </h1>
          <p className="text-ff-cream/60 font-body max-w-lg">
            {filtered.length} {filtered.length === 1 ? "meal" : "meals"} available
            {search && ` matching "${search}"`}
          </p>
        </div>
      </section>

      {/* Sticky filter bar */}
      <div className="sticky top-16 z-30 bg-white border-b border-border shadow-sm">
        <div className="container mx-auto px-4 py-3">
          {/* Search + filter row */}
          <div className="flex items-center gap-3 mb-3">
            <div className="relative flex-1">
              <Search
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
              />
              <input
                type="text"
                placeholder="Search meals..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-9 py-2.5 text-sm rounded-full border border-border bg-secondary/50 focus:outline-none focus:ring-2 focus:ring-ff-spice/30 font-body"
              />
              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  <X size={14} />
                </button>
              )}
            </div>
            <button
              onClick={() => setShowUnavailable((v) => !v)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium border transition-colors font-body ${
                showUnavailable
                  ? "border-ff-spice bg-ff-spice/10 text-ff-spice"
                  : "border-border bg-white text-muted-foreground hover:border-ff-spice/30"
              }`}
              style={showUnavailable ? { color: "hsl(3 68% 32%)", borderColor: "hsl(3 68% 32%)", backgroundColor: "hsl(3 68% 32% / 0.08)" } : {}}
            >
              <SlidersHorizontal size={14} />
              <span className="hidden sm:inline">Show All</span>
            </button>
          </div>

          {/* Category filter */}
          <CategoryFilter
            categories={categories}
            selected={selectedCategory}
            onSelect={handleCategorySelect}
          />
        </div>
      </div>

      {/* Meals grid */}
      <main className="container mx-auto px-4 py-8 min-h-[50vh]">
        <AnimatePresence mode="popLayout">
          {filtered.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center py-24 gap-4 text-center"
            >
              <div className="text-6xl">🍽️</div>
              <h3 className="font-heading text-xl font-semibold text-foreground">No meals found</h3>
              <p className="text-muted-foreground text-sm font-body max-w-xs">
                Try a different search term or category, or clear your filters.
              </p>
              <button
                onClick={() => { setSearch(""); setSelectedCategory("all"); }}
                className="btn-spice mt-2"
              >
                Clear Filters
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="grid"
              layout
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
            >
              {filtered.map((meal, i) => (
                <motion.div
                  key={meal.id}
                  layout
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.3, delay: Math.min(i * 0.05, 0.4) }}
                >
                  <MealCard meal={meal} />
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <FeliciaFooter />
    </div>
  );
}
