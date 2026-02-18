"use client";

import { useState } from "react";
import Link from "next/link";

// ============ DATA ============

type ClothingItem = {
  id: number;
  name: string;
  category: "tops" | "bottoms" | "shoes" | "accessories" | "outerwear";
  color: string;
  colorHex: string;
  season: string[];
  vibe: string[];
  emoji: string;
};

const closet: ClothingItem[] = [
  // TOPS
  { id: 1, name: "White Crop Top", category: "tops", color: "white", colorHex: "#F5F0EB", season: ["summer", "spring"], vibe: ["casual", "brunch", "beach"], emoji: "👚" },
  { id: 2, name: "Black Bodysuit", category: "tops", color: "black", colorHex: "#2D2D2D", season: ["all"], vibe: ["date night", "going out", "concert"], emoji: "🖤" },
  { id: 3, name: "Sage Satin Cami", category: "tops", color: "green", colorHex: "#B2C9AD", season: ["summer", "spring"], vibe: ["brunch", "date night"], emoji: "💚" },
  { id: 4, name: "Oversized Band Tee", category: "tops", color: "gray", colorHex: "#9E9E9E", season: ["all"], vibe: ["casual", "concert", "shopping"], emoji: "🎸" },
  { id: 5, name: "Pink Knit Sweater", category: "tops", color: "pink", colorHex: "#F4A7BB", season: ["fall", "winter"], vibe: ["casual", "brunch", "cozy night"], emoji: "🩷" },
  { id: 6, name: "Lavender Blouse", category: "tops", color: "purple", colorHex: "#C4B8E8", season: ["spring", "summer"], vibe: ["brunch", "office", "date night"], emoji: "💜" },

  // BOTTOMS
  { id: 10, name: "High-Waisted Jeans", category: "bottoms", color: "blue", colorHex: "#7CA1C4", season: ["all"], vibe: ["casual", "brunch", "shopping"], emoji: "👖" },
  { id: 11, name: "Black Mini Skirt", category: "bottoms", color: "black", colorHex: "#2D2D2D", season: ["summer", "spring"], vibe: ["date night", "going out", "concert"], emoji: "🖤" },
  { id: 12, name: "Beige Wide-Leg Pants", category: "bottoms", color: "beige", colorHex: "#D4C5B2", season: ["spring", "fall"], vibe: ["office", "brunch", "casual"], emoji: "👩‍💼" },
  { id: 13, name: "White Tennis Skirt", category: "bottoms", color: "white", colorHex: "#F5F0EB", season: ["summer", "spring"], vibe: ["casual", "brunch", "beach"], emoji: "🎾" },
  { id: 14, name: "Leather Pants", category: "bottoms", color: "black", colorHex: "#1A1A1A", season: ["fall", "winter"], vibe: ["date night", "going out", "concert"], emoji: "🔥" },

  // SHOES
  { id: 20, name: "White Air Forces", category: "shoes", color: "white", colorHex: "#F5F0EB", season: ["all"], vibe: ["casual", "shopping", "concert"], emoji: "👟" },
  { id: 21, name: "Black Heeled Boots", category: "shoes", color: "black", colorHex: "#2D2D2D", season: ["fall", "winter"], vibe: ["date night", "going out", "office"], emoji: "👢" },
  { id: 22, name: "Chunky Sandals", category: "shoes", color: "tan", colorHex: "#C9A96E", season: ["summer", "spring"], vibe: ["casual", "brunch", "beach"], emoji: "🩴" },
  { id: 23, name: "Pink Ballet Flats", category: "shoes", color: "pink", colorHex: "#F4A7BB", season: ["spring", "summer"], vibe: ["brunch", "office", "date night"], emoji: "🩰" },

  // ACCESSORIES
  { id: 30, name: "Gold Hoop Earrings", category: "accessories", color: "gold", colorHex: "#F0D9A0", season: ["all"], vibe: ["brunch", "date night", "going out"], emoji: "✨" },
  { id: 31, name: "Layered Necklace Set", category: "accessories", color: "gold", colorHex: "#F0D9A0", season: ["all"], vibe: ["brunch", "casual", "date night"], emoji: "📿" },
  { id: 32, name: "Mini Crossbody Bag", category: "accessories", color: "black", colorHex: "#2D2D2D", season: ["all"], vibe: ["going out", "shopping", "date night"], emoji: "👜" },
  { id: 33, name: "Silk Hair Scarf", category: "accessories", color: "pink", colorHex: "#F4A7BB", season: ["spring", "summer"], vibe: ["brunch", "beach", "casual"], emoji: "🎀" },
  { id: 34, name: "Oversized Sunglasses", category: "accessories", color: "black", colorHex: "#2D2D2D", season: ["summer", "spring"], vibe: ["beach", "brunch", "casual"], emoji: "🕶️" },

  // OUTERWEAR
  { id: 40, name: "Oversized Blazer", category: "outerwear", color: "black", colorHex: "#2D2D2D", season: ["fall", "spring"], vibe: ["office", "date night", "brunch"], emoji: "🧥" },
  { id: 41, name: "Denim Jacket", category: "outerwear", color: "blue", colorHex: "#7CA1C4", season: ["spring", "fall"], vibe: ["casual", "shopping", "concert"], emoji: "🧥" },
  { id: 42, name: "Teddy Bear Coat", category: "outerwear", color: "cream", colorHex: "#F5ECD7", season: ["winter"], vibe: ["cozy night", "casual", "shopping"], emoji: "🧸" },
];

const allVibes = ["casual", "brunch", "date night", "going out", "concert", "office", "shopping", "beach", "cozy night"];
const allSeasons = ["spring", "summer", "fall", "winter"];
const allCategories = ["tops", "bottoms", "shoes", "accessories", "outerwear"] as const;

const categoryEmojis: Record<string, string> = {
  tops: "👚",
  bottoms: "👖",
  shoes: "👟",
  accessories: "✨",
  outerwear: "🧥",
};

const vibeEmojis: Record<string, string> = {
  casual: "😌",
  brunch: "🥂",
  "date night": "💋",
  "going out": "💃",
  concert: "🎤",
  office: "💼",
  shopping: "🛍️",
  beach: "🏖️",
  "cozy night": "🕯️",
};

// ============ HELPERS ============

function pickRandom<T>(items: T[]): T | null {
  if (items.length === 0) return null;
  return items[Math.floor(Math.random() * items.length)];
}

type Outfit = {
  top: ClothingItem | null;
  bottom: ClothingItem | null;
  shoes: ClothingItem | null;
  accessory: ClothingItem | null;
  outerwear: ClothingItem | null;
};

// ============ COMPONENTS ============

function ClothingCard({
  item,
  selected,
  onSelect,
}: {
  item: ClothingItem;
  selected?: boolean;
  onSelect?: () => void;
}) {
  return (
    <button
      onClick={onSelect}
      className={`text-left w-full p-4 rounded-2xl border-2 transition-all duration-200 hover:-translate-y-1 hover:shadow-card ${
        selected
          ? "border-pink bg-pink-light/50 shadow-card"
          : "border-transparent bg-white hover:border-lavender-light"
      }`}
    >
      <div className="flex items-center gap-3">
        <span className="text-2xl">{item.emoji}</span>
        <div className="min-w-0 flex-1">
          <p className="font-semibold text-dark text-sm truncate">{item.name}</p>
          <div className="flex items-center gap-2 mt-1">
            <span
              className="w-3 h-3 rounded-full border border-dark/10 shrink-0"
              style={{ backgroundColor: item.colorHex }}
            />
            <p className="text-dark-soft text-xs truncate">{item.color}</p>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap gap-1 mt-2.5">
        {item.vibe.slice(0, 3).map((v) => (
          <span
            key={v}
            className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-lavender-light text-dark-soft"
          >
            {v}
          </span>
        ))}
      </div>
    </button>
  );
}

function OutfitSlot({
  label,
  item,
  emoji,
}: {
  label: string;
  item: ClothingItem | null;
  emoji: string;
}) {
  return (
    <div
      className={`rounded-2xl border-2 border-dashed p-4 text-center transition-all duration-300 ${
        item
          ? "border-pink bg-pink-light/30"
          : "border-lavender-light bg-white/50"
      }`}
    >
      <span className="text-2xl block mb-1">{item ? item.emoji : emoji}</span>
      <p className="font-semibold text-dark text-xs">{label}</p>
      {item ? (
        <p className="text-dark-soft text-xs mt-1 truncate">{item.name}</p>
      ) : (
        <p className="text-dark-soft/50 text-xs mt-1 italic">pick one</p>
      )}
    </div>
  );
}

// ============ MAIN PAGE ============

export default function OutfitPlannerDemo() {
  const [activeTab, setActiveTab] = useState<"closet" | "builder" | "surprise">("closet");
  const [activeVibe, setActiveVibe] = useState<string>("all");
  const [activeSeason, setActiveSeason] = useState<string>("all");
  const [activeCategory, setActiveCategory] = useState<string>("all");

  // Outfit builder state
  const [builderCategory, setBuilderCategory] = useState<typeof allCategories[number]>("tops");
  const [outfit, setOutfit] = useState<Outfit>({
    top: null,
    bottom: null,
    shoes: null,
    accessory: null,
    outerwear: null,
  });

  // Surprise me state
  const [surpriseVibe, setSurpriseVibe] = useState<string>("all");
  const [surpriseOutfit, setSurpriseOutfit] = useState<Outfit | null>(null);
  const [isShaking, setIsShaking] = useState(false);

  // ---- Filter closet ----
  const filteredCloset = closet.filter((item) => {
    if (activeCategory !== "all" && item.category !== activeCategory) return false;
    if (activeVibe !== "all" && !item.vibe.includes(activeVibe)) return false;
    if (activeSeason !== "all" && !item.season.includes(activeSeason) && !item.season.includes("all")) return false;
    return true;
  });

  // ---- Builder items ----
  const builderItems = closet.filter((item) => item.category === builderCategory);

  const categoryToOutfitKey: Record<string, keyof Outfit> = {
    tops: "top",
    bottoms: "bottom",
    shoes: "shoes",
    accessories: "accessory",
    outerwear: "outerwear",
  };

  function selectForOutfit(item: ClothingItem) {
    const key = categoryToOutfitKey[item.category];
    setOutfit((prev) => ({
      ...prev,
      [key]: prev[key]?.id === item.id ? null : item,
    }));
  }

  // ---- Surprise me ----
  function generateSurprise() {
    setIsShaking(true);
    setTimeout(() => {
      const filterByVibe = (items: ClothingItem[]) =>
        surpriseVibe === "all" ? items : items.filter((i) => i.vibe.includes(surpriseVibe));

      setSurpriseOutfit({
        top: pickRandom(filterByVibe(closet.filter((i) => i.category === "tops"))),
        bottom: pickRandom(filterByVibe(closet.filter((i) => i.category === "bottoms"))),
        shoes: pickRandom(filterByVibe(closet.filter((i) => i.category === "shoes"))),
        accessory: pickRandom(filterByVibe(closet.filter((i) => i.category === "accessories"))),
        outerwear: pickRandom(filterByVibe(closet.filter((i) => i.category === "outerwear"))),
      });
      setIsShaking(false);
    }, 600);
  }

  const outfitCount = [outfit.top, outfit.bottom, outfit.shoes, outfit.accessory, outfit.outerwear].filter(Boolean).length;

  return (
    <div className="relative z-10 min-h-screen bg-gradient-to-b from-cream via-pink-light/20 to-cream">
      {/* Header */}
      <div className="px-6 md:px-10 pt-28 pb-8 max-w-[1100px] mx-auto">
        <Link
          href="/guides/outfit-planner-app"
          className="inline-flex items-center gap-2 text-dark-soft text-sm font-semibold mb-6 no-underline hover:text-dark transition-colors"
        >
          ← Back to guide
        </Link>

        <div className="text-center mb-8">
          <span className="text-5xl block mb-3">👗</span>
          <h1 className="font-heading text-3xl md:text-4xl font-bold mb-2">
            Outfit Planner
          </h1>
          <p className="text-dark-soft text-base max-w-md mx-auto">
            Your closet, organized. Plan outfits, filter by vibe, or let the
            app surprise you.
          </p>
        </div>

        {/* Tab bar */}
        <div className="flex justify-center gap-2">
          {(
            [
              { id: "closet", label: "My Closet", emoji: "👚" },
              { id: "builder", label: "Build Outfit", emoji: "👗" },
              { id: "surprise", label: "Surprise Me", emoji: "🎲" },
            ] as const
          ).map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all ${
                activeTab === tab.id
                  ? "bg-dark text-white shadow-card"
                  : "bg-white text-dark-soft hover:bg-lavender-light"
              }`}
            >
              <span className="mr-1.5">{tab.emoji}</span>
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="px-6 md:px-10 pb-24 max-w-[1100px] mx-auto">
        {/* ==================== CLOSET TAB ==================== */}
        {activeTab === "closet" && (
          <div>
            {/* Filters */}
            <div className="bg-white rounded-2xl p-5 mb-6 shadow-soft">
              {/* Vibe filter */}
              <div className="mb-4">
                <p className="text-xs font-bold text-dark-soft uppercase tracking-wider mb-2">
                  Vibe
                </p>
                <div className="flex flex-wrap gap-2">
                  <FilterPill
                    label="All"
                    active={activeVibe === "all"}
                    onClick={() => setActiveVibe("all")}
                  />
                  {allVibes.map((v) => (
                    <FilterPill
                      key={v}
                      label={`${vibeEmojis[v]} ${v}`}
                      active={activeVibe === v}
                      onClick={() => setActiveVibe(v)}
                    />
                  ))}
                </div>
              </div>

              {/* Season filter */}
              <div className="mb-4">
                <p className="text-xs font-bold text-dark-soft uppercase tracking-wider mb-2">
                  Season
                </p>
                <div className="flex flex-wrap gap-2">
                  <FilterPill
                    label="All"
                    active={activeSeason === "all"}
                    onClick={() => setActiveSeason("all")}
                  />
                  {allSeasons.map((s) => (
                    <FilterPill
                      key={s}
                      label={s}
                      active={activeSeason === s}
                      onClick={() => setActiveSeason(s)}
                    />
                  ))}
                </div>
              </div>

              {/* Category filter */}
              <div>
                <p className="text-xs font-bold text-dark-soft uppercase tracking-wider mb-2">
                  Category
                </p>
                <div className="flex flex-wrap gap-2">
                  <FilterPill
                    label="All"
                    active={activeCategory === "all"}
                    onClick={() => setActiveCategory("all")}
                  />
                  {allCategories.map((c) => (
                    <FilterPill
                      key={c}
                      label={`${categoryEmojis[c]} ${c}`}
                      active={activeCategory === c}
                      onClick={() => setActiveCategory(c)}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Results count */}
            <p className="text-dark-soft text-sm mb-4">
              Showing <span className="font-bold text-dark">{filteredCloset.length}</span> items
            </p>

            {/* Items grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {filteredCloset.map((item) => (
                <ClothingCard key={item.id} item={item} />
              ))}
            </div>

            {filteredCloset.length === 0 && (
              <div className="text-center py-16">
                <p className="text-4xl mb-3">🤷‍♀️</p>
                <p className="text-dark-soft">
                  Nothing matches those filters. Try a different combo!
                </p>
              </div>
            )}
          </div>
        )}

        {/* ==================== BUILDER TAB ==================== */}
        {activeTab === "builder" && (
          <div>
            {/* Current outfit preview */}
            <div className="bg-white rounded-2xl p-6 mb-6 shadow-soft">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-heading text-lg font-bold">
                  Your Outfit {outfitCount > 0 && `(${outfitCount}/5)`}
                </h2>
                {outfitCount > 0 && (
                  <button
                    onClick={() =>
                      setOutfit({ top: null, bottom: null, shoes: null, accessory: null, outerwear: null })
                    }
                    className="text-xs font-semibold text-dark-soft hover:text-dark transition-colors"
                  >
                    Clear all
                  </button>
                )}
              </div>
              <div className="grid grid-cols-5 gap-3">
                <OutfitSlot label="Top" item={outfit.top} emoji="👚" />
                <OutfitSlot label="Bottom" item={outfit.bottom} emoji="👖" />
                <OutfitSlot label="Shoes" item={outfit.shoes} emoji="👟" />
                <OutfitSlot label="Accessory" item={outfit.accessory} emoji="✨" />
                <OutfitSlot label="Layer" item={outfit.outerwear} emoji="🧥" />
              </div>
            </div>

            {/* Category selector */}
            <div className="flex gap-2 mb-4 overflow-x-auto pb-1">
              {allCategories.map((c) => (
                <button
                  key={c}
                  onClick={() => setBuilderCategory(c)}
                  className={`px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-all ${
                    builderCategory === c
                      ? "bg-pink text-white"
                      : "bg-white text-dark-soft hover:bg-pink-light"
                  }`}
                >
                  {categoryEmojis[c]} {c}
                </button>
              ))}
            </div>

            {/* Items to pick from */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {builderItems.map((item) => {
                const key = categoryToOutfitKey[item.category];
                const isSelected = outfit[key]?.id === item.id;
                return (
                  <ClothingCard
                    key={item.id}
                    item={item}
                    selected={isSelected}
                    onSelect={() => selectForOutfit(item)}
                  />
                );
              })}
            </div>
          </div>
        )}

        {/* ==================== SURPRISE TAB ==================== */}
        {activeTab === "surprise" && (
          <div className="max-w-lg mx-auto">
            <div className="bg-white rounded-2xl p-8 shadow-soft text-center">
              <h2 className="font-heading text-2xl font-bold mb-2">
                What&apos;s the vibe?
              </h2>
              <p className="text-dark-soft text-sm mb-6">
                Pick a vibe and we&apos;ll build your outfit
              </p>

              {/* Vibe selector */}
              <div className="flex flex-wrap justify-center gap-2 mb-8">
                <FilterPill
                  label="Any vibe"
                  active={surpriseVibe === "all"}
                  onClick={() => setSurpriseVibe("all")}
                />
                {allVibes.map((v) => (
                  <FilterPill
                    key={v}
                    label={`${vibeEmojis[v]} ${v}`}
                    active={surpriseVibe === v}
                    onClick={() => setSurpriseVibe(v)}
                  />
                ))}
              </div>

              {/* The big button */}
              <button
                onClick={generateSurprise}
                disabled={isShaking}
                className={`w-full py-4 rounded-2xl bg-gradient-to-r from-pink via-peach to-lavender text-white font-bold text-lg shadow-card transition-all hover:shadow-hover hover:-translate-y-1 active:translate-y-0 disabled:opacity-70 ${
                  isShaking ? "animate-[wiggle_0.1s_ease-in-out_6]" : ""
                }`}
              >
                {isShaking ? "✨ Picking..." : "🎲 Surprise Me!"}
              </button>
            </div>

            {/* Result */}
            {surpriseOutfit && !isShaking && (
              <div className="mt-6 bg-white rounded-2xl p-6 shadow-soft animate-fade-up">
                <h3 className="font-heading text-lg font-bold text-center mb-4">
                  Your Outfit ✨
                </h3>
                <div className="space-y-3">
                  {(
                    [
                      { key: "top" as const, label: "Top", emoji: "👚" },
                      { key: "bottom" as const, label: "Bottom", emoji: "👖" },
                      { key: "shoes" as const, label: "Shoes", emoji: "👟" },
                      { key: "accessory" as const, label: "Accessory", emoji: "✨" },
                      { key: "outerwear" as const, label: "Layer", emoji: "🧥" },
                    ] as const
                  ).map(({ key, label, emoji }) => {
                    const item = surpriseOutfit[key];
                    return (
                      <div
                        key={key}
                        className={`flex items-center gap-3 p-3 rounded-xl ${
                          item ? "bg-pink-light/40" : "bg-gray-50"
                        }`}
                      >
                        <span className="text-xl">{item ? item.emoji : emoji}</span>
                        <div>
                          <p className="text-xs font-semibold text-dark-soft uppercase tracking-wider">
                            {label}
                          </p>
                          <p className="font-semibold text-dark text-sm">
                            {item ? item.name : "Nothing matched"}
                          </p>
                        </div>
                        {item && (
                          <span
                            className="ml-auto w-4 h-4 rounded-full border border-dark/10 shrink-0"
                            style={{ backgroundColor: item.colorHex }}
                          />
                        )}
                      </div>
                    );
                  })}
                </div>

                <button
                  onClick={generateSurprise}
                  className="w-full mt-4 py-3 rounded-xl bg-lavender-light text-dark-soft font-semibold text-sm hover:bg-lavender/30 transition-colors"
                >
                  Try again 🔄
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Demo banner */}
      <div className="fixed bottom-0 left-0 w-full bg-dark/90 backdrop-blur-sm text-white text-center py-3 px-6 z-50">
        <p className="text-sm">
          This is a live demo!{" "}
          <Link
            href="/guides/outfit-planner-app"
            className="underline font-semibold text-peach hover:text-peach-light transition-colors"
          >
            Learn how to build it yourself →
          </Link>
        </p>
      </div>
    </div>
  );
}

// ============ FILTER PILL ============

function FilterPill({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
        active
          ? "bg-dark text-white"
          : "bg-lavender-light/60 text-dark-soft hover:bg-lavender-light"
      }`}
    >
      {label}
    </button>
  );
}
