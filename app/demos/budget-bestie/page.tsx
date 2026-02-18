"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

// ============ DATA ============

type Category = {
  id: string;
  name: string;
  emoji: string;
  color: string;
};

type Expense = {
  id: number;
  amount: number;
  category: string;
  note: string;
  date: string;
};

const categories: Category[] = [
  { id: "food", name: "Food & Groceries", emoji: "🍕", color: "#F4A7BB" },
  { id: "coffee", name: "Coffee & Drinks", emoji: "☕", color: "#F0D9A0" },
  { id: "shopping", name: "Shopping", emoji: "🛍️", color: "#C4B8E8" },
  { id: "going-out", name: "Going Out", emoji: "🎉", color: "#A8D8EA" },
  { id: "subscriptions", name: "Subscriptions", emoji: "📱", color: "#F2A5C0" },
  { id: "transport", name: "Transport", emoji: "🚗", color: "#F5C2D0" },
  { id: "self-care", name: "Self Care", emoji: "💅", color: "#E8E1F5" },
  { id: "other", name: "Other", emoji: "✨", color: "#FEF1C7" },
];

function getCat(id: string) {
  return categories.find((c) => c.id === id) || categories[categories.length - 1];
}

function getDaysLeftInMonth() {
  const now = new Date();
  const last = new Date(now.getFullYear(), now.getMonth() + 1, 0);
  return last.getDate() - now.getDate();
}

// ============ MAIN APP ============

export default function BudgetBestieDemo() {
  const [activeTab, setActiveTab] = useState<"overview" | "add" | "history">("overview");
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [budget, setBudget] = useState(500);
  const [loaded, setLoaded] = useState(false);

  // Form state
  const [amount, setAmount] = useState("");
  const [selectedCat, setSelectedCat] = useState("food");
  const [note, setNote] = useState("");

  // Load from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem("budget-bestie");
      if (saved) {
        const parsed = JSON.parse(saved);
        setExpenses(parsed.expenses || []);
        if (parsed.budget) setBudget(parsed.budget);
      }
    } catch {}
    setLoaded(true);
  }, []);

  // Auto-save
  useEffect(() => {
    if (!loaded) return;
    localStorage.setItem(
      "budget-bestie",
      JSON.stringify({ expenses, budget })
    );
  }, [expenses, budget, loaded]);

  // Add expense
  function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    if (!amount || parseFloat(amount) <= 0) return;

    setExpenses((prev) => [
      ...prev,
      {
        id: Date.now(),
        amount: parseFloat(parseFloat(amount).toFixed(2)),
        category: selectedCat,
        note,
        date: new Date().toISOString().split("T")[0],
      },
    ]);
    setAmount("");
    setNote("");
    setActiveTab("overview");
  }

  function deleteExpense(id: number) {
    setExpenses((prev) => prev.filter((e) => e.id !== id));
  }

  // Calculations
  const total = expenses.reduce((sum, e) => sum + e.amount, 0);
  const remaining = budget - total;
  const percentage = budget > 0 ? (total / budget) * 100 : 0;
  const daysLeft = getDaysLeftInMonth();
  const dailyBudget = remaining > 0 && daysLeft > 0 ? remaining / daysLeft : 0;

  // By category
  const byCategory = categories
    .map((cat) => {
      const catExpenses = expenses.filter((e) => e.category === cat.id);
      const catTotal = catExpenses.reduce((sum, e) => sum + e.amount, 0);
      const pct = total > 0 ? (catTotal / total) * 100 : 0;
      return { ...cat, total: catTotal, percentage: Math.round(pct), count: catExpenses.length };
    })
    .filter((c) => c.total > 0)
    .sort((a, b) => b.total - a.total);

  // Vibe check
  let vibe: { emoji: string; message: string; color: string };
  if (percentage < 50) {
    vibe = { emoji: "✨", message: "Looking great! Well under budget.", color: "#A8D8EA" };
  } else if (percentage < 75) {
    vibe = { emoji: "👀", message: "Doing okay! Just keep an eye on it.", color: "#F0D9A0" };
  } else if (percentage < 100) {
    vibe = { emoji: "😬", message: "Getting close to your limit...", color: "#F2A5C0" };
  } else {
    vibe = { emoji: "🫣", message: "Over budget! Time to chill on spending.", color: "#F4A7BB" };
  }

  return (
    <div className="relative z-10 min-h-screen bg-gradient-to-b from-cream via-butter/20 to-cream">
      <div className="max-w-[520px] mx-auto px-5 pt-28 pb-28">
        {/* Back link */}
        <Link
          href="/guides/budget-bestie-app"
          className="inline-flex items-center gap-2 text-dark-soft text-sm font-semibold mb-6 no-underline hover:text-dark transition-colors"
        >
          ← Back to guide
        </Link>

        {/* Header */}
        <div className="text-center mb-6">
          <span className="text-5xl block mb-3">💸</span>
          <h1 className="font-heading text-3xl font-bold mb-1">Budget Bestie</h1>
          <p className="text-dark-soft text-sm">
            Your money, managed with good vibes
          </p>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 justify-center mb-6">
          {(
            [
              { id: "overview", label: "Overview", emoji: "📊" },
              { id: "add", label: "Add", emoji: "➕" },
              { id: "history", label: "History", emoji: "📋" },
            ] as const
          ).map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all ${
                activeTab === tab.id
                  ? "bg-dark text-white shadow-card"
                  : "bg-white text-dark-soft hover:bg-butter"
              }`}
            >
              {tab.emoji} {tab.label}
            </button>
          ))}
        </div>

        {/* ======= OVERVIEW ======= */}
        {activeTab === "overview" && (
          <div>
            {/* Vibe Check */}
            <div
              className="rounded-2xl p-6 mb-4 shadow-soft text-center border-2"
              style={{ borderColor: vibe.color, backgroundColor: vibe.color + "18" }}
            >
              <span className="text-4xl block mb-2">{vibe.emoji}</span>
              <p className="font-semibold text-dark text-sm mb-3">{vibe.message}</p>
              <p className="font-heading text-3xl font-bold text-dark mb-1">
                ${total.toFixed(2)}
              </p>
              <p className="text-dark-soft text-xs">
                of ${budget.toFixed(2)} budget
              </p>

              {/* Progress bar */}
              <div className="mt-4 h-3 bg-white/60 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${Math.min(percentage, 100)}%`,
                    backgroundColor: vibe.color,
                  }}
                />
              </div>

              {remaining > 0 && daysLeft > 0 && (
                <p className="text-dark-soft text-xs mt-3">
                  ~${dailyBudget.toFixed(2)}/day for the next {daysLeft} days
                </p>
              )}
            </div>

            {/* Budget setter */}
            <div className="bg-white rounded-2xl p-5 mb-4 shadow-soft">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-heading text-sm font-bold">Monthly Budget</h3>
                <span className="font-bold text-dark">${budget}</span>
              </div>
              <input
                type="range"
                min="100"
                max="2000"
                step="50"
                value={budget}
                onChange={(e) => setBudget(parseInt(e.target.value))}
                className="w-full accent-gold h-2 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-dark-soft mt-1">
                <span>$100</span>
                <span>$1,000</span>
                <span>$2,000</span>
              </div>
            </div>

            {/* Spending bar */}
            {byCategory.length > 0 && (
              <div className="bg-white rounded-2xl p-5 mb-4 shadow-soft">
                <h3 className="font-heading text-sm font-bold mb-3">
                  Where your money goes
                </h3>

                {/* Colored bar */}
                <div className="flex h-5 rounded-full overflow-hidden mb-4">
                  {byCategory.map((cat) => (
                    <div
                      key={cat.id}
                      className="h-full transition-all duration-300"
                      style={{
                        width: `${cat.percentage}%`,
                        backgroundColor: cat.color,
                        minWidth: cat.percentage > 0 ? "4px" : "0",
                      }}
                    />
                  ))}
                </div>

                {/* Breakdown list */}
                <div className="space-y-2">
                  {byCategory.map((cat) => (
                    <div
                      key={cat.id}
                      className="flex items-center gap-2 text-sm"
                    >
                      <span
                        className="w-3 h-3 rounded-full shrink-0"
                        style={{ backgroundColor: cat.color }}
                      />
                      <span className="flex-1 text-dark-soft">
                        {cat.emoji} {cat.name}
                      </span>
                      <span className="font-semibold text-dark">
                        ${cat.total.toFixed(2)}
                      </span>
                      <span className="text-dark-soft text-xs w-10 text-right">
                        {cat.percentage}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {expenses.length === 0 && (
              <div className="text-center py-10">
                <p className="text-4xl mb-3">🌱</p>
                <p className="text-dark-soft text-sm">
                  No expenses yet. Living for free? Teach me.
                </p>
                <button
                  onClick={() => setActiveTab("add")}
                  className="mt-3 px-5 py-2 rounded-full bg-gold text-dark text-sm font-semibold hover:bg-gold/80 transition-colors"
                >
                  Add your first expense
                </button>
              </div>
            )}
          </div>
        )}

        {/* ======= ADD EXPENSE ======= */}
        {activeTab === "add" && (
          <form onSubmit={handleAdd}>
            <div className="bg-white rounded-2xl p-6 mb-4 shadow-soft">
              <h3 className="font-heading text-lg font-bold mb-4 text-center">
                Add Expense
              </h3>

              {/* Amount */}
              <div className="flex items-center justify-center gap-1 mb-6">
                <span className="text-3xl font-bold text-dark-soft">$</span>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  placeholder="0.00"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="text-4xl font-bold text-dark w-40 text-center bg-transparent border-b-2 border-gold focus:outline-none focus:border-dark transition-colors"
                />
              </div>

              {/* Category grid */}
              <p className="text-xs font-bold text-dark-soft uppercase tracking-wider mb-3">
                Category
              </p>
              <div className="grid grid-cols-4 gap-2 mb-5">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setSelectedCat(cat.id)}
                    className={`py-3 rounded-xl text-center transition-all duration-200 border-2 ${
                      selectedCat === cat.id
                        ? "scale-105 shadow-card"
                        : "border-transparent bg-cream hover:bg-butter/50"
                    }`}
                    style={{
                      borderColor:
                        selectedCat === cat.id ? cat.color : "transparent",
                      backgroundColor:
                        selectedCat === cat.id ? cat.color + "22" : undefined,
                    }}
                  >
                    <span className="text-xl block">{cat.emoji}</span>
                    <span className="text-[9px] font-semibold text-dark-soft mt-0.5 block leading-tight">
                      {cat.name.split(" ")[0]}
                    </span>
                  </button>
                ))}
              </div>

              {/* Note */}
              <input
                type="text"
                placeholder="What was it for? (optional)"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                className="w-full bg-cream rounded-xl p-3 text-sm text-dark placeholder:text-dark-soft/50 border-2 border-transparent focus:border-gold-light focus:outline-none transition-colors mb-4"
              />

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-dark text-white font-bold text-sm hover:-translate-y-0.5 hover:shadow-card transition-all"
              >
                Add Expense 💸
              </button>
            </div>
          </form>
        )}

        {/* ======= HISTORY ======= */}
        {activeTab === "history" && (
          <div>
            <div className="bg-white rounded-2xl p-5 shadow-soft">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-heading text-base font-bold">Recent</h3>
                {expenses.length > 0 && (
                  <button
                    onClick={() => {
                      if (confirm("Clear all expenses?")) setExpenses([]);
                    }}
                    className="text-xs text-dark-soft hover:text-dark font-semibold transition-colors"
                  >
                    Clear all
                  </button>
                )}
              </div>

              {expenses.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-3xl mb-2">📋</p>
                  <p className="text-dark-soft text-sm">
                    No expenses yet. Your wallet is thriving.
                  </p>
                </div>
              ) : (
                <div className="space-y-2">
                  {[...expenses]
                    .reverse()
                    .map((expense) => {
                      const cat = getCat(expense.category);
                      return (
                        <div
                          key={expense.id}
                          className="flex items-center gap-3 p-3 rounded-xl bg-cream group"
                        >
                          <span className="text-xl">{cat.emoji}</span>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-dark truncate">
                              {expense.note || cat.name}
                            </p>
                            <p className="text-[10px] text-dark-soft">
                              {expense.date}
                            </p>
                          </div>
                          <span className="font-bold text-dark text-sm">
                            -${expense.amount.toFixed(2)}
                          </span>
                          <button
                            onClick={() => deleteExpense(expense.id)}
                            className="opacity-0 group-hover:opacity-100 text-dark-soft hover:text-dark text-xs font-bold transition-opacity ml-1"
                          >
                            ✕
                          </button>
                        </div>
                      );
                    })}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Demo banner */}
      <div className="fixed bottom-0 left-0 w-full bg-dark/90 backdrop-blur-sm text-white text-center py-3 px-6 z-50">
        <p className="text-sm">
          This is a live demo!{" "}
          <Link
            href="/guides/budget-bestie-app"
            className="underline font-semibold text-peach hover:text-peach-light transition-colors"
          >
            Learn how to build it yourself →
          </Link>
        </p>
      </div>
    </div>
  );
}
