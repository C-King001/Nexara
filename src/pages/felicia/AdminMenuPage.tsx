import { useState } from "react";
import { Plus, Search, Edit2, ToggleLeft, ToggleRight, Flame, Clock } from "lucide-react";
import AdminSidebar from "@/components/felicia/AdminSidebar";
import { meals as initialMeals, type Meal, formatPrice } from "@/data/meals";
import { categories } from "@/data/categories";

export default function AdminMenuPage() {
  const [meals, setMeals] = useState<Meal[]>(initialMeals);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [editingMeal, setEditingMeal] = useState<Meal | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);

  const toggleAvailability = (id: string) => {
    setMeals((prev) =>
      prev.map((m) => (m.id === id ? { ...m, available: !m.available } : m))
    );
  };

  const filtered = meals.filter((m) => {
    const matchCat = categoryFilter === "all" || m.categoryId === categoryFilter;
    const q = search.toLowerCase();
    const matchSearch = !q || m.name.toLowerCase().includes(q);
    return matchCat && matchSearch;
  });

  const getCategoryName = (id: string) =>
    categories.find((c) => c.id === id)?.name || id;

  return (
    <div className="flex min-h-screen bg-background">
      <AdminSidebar />

      <main className="flex-1 overflow-y-auto">
        <div className="border-b border-border bg-white px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="font-heading text-2xl font-semibold text-foreground">Menu Management</h1>
            <p className="text-sm text-muted-foreground font-body">{meals.length} meals · {meals.filter((m) => m.available).length} available</p>
          </div>
          <button
            onClick={() => setShowAddForm(true)}
            className="flex items-center gap-2 text-sm font-medium font-body text-white rounded-full px-5 py-2.5 transition-colors"
            style={{ backgroundColor: "hsl(3 68% 32%)" }}
          >
            <Plus size={16} /> Add Meal
          </button>
        </div>

        <div className="p-6 space-y-5">
          {/* Filters */}
          <div className="bg-white rounded-2xl border border-border shadow-sm p-4 flex flex-wrap gap-3">
            <div className="relative flex-1 min-w-[200px]">
              <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search meals..."
                className="w-full pl-9 pr-4 py-2.5 text-sm rounded-xl border border-border bg-secondary/40 outline-none font-body"
              />
            </div>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-4 py-2.5 text-sm rounded-xl border border-border bg-white outline-none font-body"
            >
              <option value="all">All Categories</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>

          {/* Meals grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filtered.map((meal) => (
              <div
                key={meal.id}
                className={`bg-white rounded-2xl border shadow-sm overflow-hidden transition-opacity ${
                  !meal.available ? "opacity-60" : ""
                } border-border`}
              >
                {/* Meal image placeholder */}
                <div className={`h-32 bg-gradient-to-br ${meal.gradient} flex items-center justify-center text-5xl relative`}>
                  {meal.emoji}
                  <div className="absolute top-2 right-2">
                    <button
                      onClick={() => toggleAvailability(meal.id)}
                      className="text-white drop-shadow"
                      title={meal.available ? "Mark unavailable" : "Mark available"}
                    >
                      {meal.available ? <ToggleRight size={22} /> : <ToggleLeft size={22} />}
                    </button>
                  </div>
                  {meal.popular && (
                    <div className="absolute top-2 left-2 bg-ff-gold text-ff-charcoal text-[10px] font-semibold px-2 py-0.5 rounded-full" style={{ backgroundColor: "hsl(43 78% 45%)", color: "hsl(28 20% 8%)" }}>
                      Popular
                    </div>
                  )}
                </div>

                <div className="p-4">
                  <p className="font-heading text-base font-semibold text-foreground leading-snug">{meal.name}</p>
                  <p className="text-xs text-muted-foreground font-body mt-0.5">{getCategoryName(meal.categoryId)}</p>

                  <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                    {meal.prepTime > 0 && (
                      <span className="flex items-center gap-1"><Clock size={11} /> {meal.prepTime}m</span>
                    )}
                    {meal.spicyLevel > 0 && (
                      <span className="flex items-center gap-1"><Flame size={11} className="text-ff-terracotta" style={{ color: "hsl(16 56% 47%)" }} /> L{meal.spicyLevel}</span>
                    )}
                    <span className={`ml-auto font-medium ${meal.available ? "text-green-600" : "text-muted-foreground"}`}>
                      {meal.available ? "Available" : "Unavailable"}
                    </span>
                  </div>

                  <div className="flex items-center justify-between mt-3 pt-3 border-t border-border">
                    <span className="font-heading text-lg font-semibold" style={{ color: "hsl(3 68% 32%)" }}>
                      {formatPrice(meal.price)}
                    </span>
                    <button
                      onClick={() => setEditingMeal(meal)}
                      className="flex items-center gap-1.5 text-xs font-medium font-body border border-border rounded-full px-3 py-1.5 hover:bg-secondary transition-colors"
                    >
                      <Edit2 size={12} /> Edit
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Edit modal */}
      {editingMeal && (
        <EditMealModal
          meal={editingMeal}
          onClose={() => setEditingMeal(null)}
          onSave={(updated) => {
            setMeals((prev) => prev.map((m) => (m.id === updated.id ? updated : m)));
            setEditingMeal(null);
          }}
        />
      )}

      {/* Add modal placeholder */}
      {showAddForm && (
        <div
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center px-4"
          onClick={() => setShowAddForm(false)}
        >
          <div
            className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="font-heading text-xl font-semibold text-foreground mb-3">Add New Meal</h3>
            <p className="text-sm text-muted-foreground font-body mb-5">
              This feature connects to your Supabase backend. Fill in meal details and upload a photo.
            </p>
            <button
              onClick={() => setShowAddForm(false)}
              className="w-full btn-spice justify-center"
            >
              Close (Demo)
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function EditMealModal({ meal, onClose, onSave }: { meal: Meal; onClose: () => void; onSave: (m: Meal) => void }) {
  const [name, setName] = useState(meal.name);
  const [price, setPrice] = useState(String(meal.price));
  const [available, setAvailable] = useState(meal.available);
  const [popular, setPopular] = useState(meal.popular);

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center px-4" onClick={onClose}>
      <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl space-y-4" onClick={(e) => e.stopPropagation()}>
        <h3 className="font-heading text-xl font-semibold text-foreground">Edit Meal</h3>

        <div className="space-y-1.5">
          <label className="text-sm font-medium text-foreground font-body">Meal Name</label>
          <input value={name} onChange={(e) => setName(e.target.value)} className="w-full px-4 py-2.5 border border-border rounded-xl text-sm font-body outline-none focus:ring-2" />
        </div>
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-foreground font-body">Price (₦)</label>
          <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} className="w-full px-4 py-2.5 border border-border rounded-xl text-sm font-body outline-none focus:ring-2" />
        </div>
        <div className="flex gap-6">
          <label className="flex items-center gap-2 text-sm font-body cursor-pointer">
            <input type="checkbox" checked={available} onChange={(e) => setAvailable(e.target.checked)} className="rounded" />
            Available
          </label>
          <label className="flex items-center gap-2 text-sm font-body cursor-pointer">
            <input type="checkbox" checked={popular} onChange={(e) => setPopular(e.target.checked)} className="rounded" />
            Mark Popular
          </label>
        </div>
        <div className="flex gap-3 pt-2">
          <button onClick={onClose} className="flex-1 py-2.5 rounded-xl border border-border text-sm font-medium font-body hover:bg-secondary transition-colors">
            Cancel
          </button>
          <button
            onClick={() => onSave({ ...meal, name, price: Number(price), available, popular })}
            className="flex-1 py-2.5 rounded-xl text-white text-sm font-medium font-body transition-colors"
            style={{ backgroundColor: "hsl(3 68% 32%)" }}
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
