"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import Link from "next/link";

// ============ TYPES ============

type BoardItem = {
  id: number;
  type: "image" | "color" | "text";
  content: string;
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: number;
};

const presetColors = [
  "#F4A7BB", "#C4B8E8", "#A8D8EA", "#F0D9A0",
  "#F2A5C0", "#F5C2D0", "#FEF1C7", "#957DAD",
  "#FF6B6B", "#4ECDC4", "#2D2D2D", "#FFFFFF",
];

const sampleImages = [
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=400&fit=crop",
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&h=400&fit=crop",
  "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=300&h=400&fit=crop",
  "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=300&h=400&fit=crop",
  "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=300&h=400&fit=crop",
  "https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?w=300&h=300&fit=crop",
  "https://images.unsplash.com/photo-1525562723836-dca67a71d5f1?w=300&h=300&fit=crop",
  "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=300&h=300&fit=crop",
];

// ============ MAIN APP ============

export default function MoodBoardDemo() {
  const [items, setItems] = useState<BoardItem[]>([]);
  const [boardName, setBoardName] = useState("My Mood Board");
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [showImagePicker, setShowImagePicker] = useState(false);
  const [dragInfo, setDragInfo] = useState<{
    id: number;
    offsetX: number;
    offsetY: number;
  } | null>(null);
  const canvasRef = useRef<HTMLDivElement>(null);

  // Load from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem("mood-board");
      if (saved) {
        const parsed = JSON.parse(saved);
        setItems(parsed.items || []);
        if (parsed.name) setBoardName(parsed.name);
      }
    } catch {}
  }, []);

  // Auto-save
  useEffect(() => {
    localStorage.setItem(
      "mood-board",
      JSON.stringify({ name: boardName, items })
    );
  }, [items, boardName]);

  function addItem(partial: Omit<BoardItem, "id" | "x" | "y">) {
    setItems((prev) => [
      ...prev,
      {
        ...partial,
        id: Date.now() + Math.random(),
        x: 40 + Math.random() * 200,
        y: 40 + Math.random() * 200,
      },
    ]);
    setShowColorPicker(false);
    setShowImagePicker(false);
  }

  function addText() {
    const text = prompt("What do you want to add?");
    if (!text) return;
    addItem({
      type: "text",
      content: text,
      width: 180,
      height: 60,
      rotation: Math.random() * 6 - 3,
    });
  }

  function addImageFromUrl() {
    const url = prompt("Paste an image URL:");
    if (!url) return;
    addItem({
      type: "image",
      content: url,
      width: 180,
      height: 220,
      rotation: Math.random() * 6 - 3,
    });
    setShowImagePicker(false);
  }

  function deleteItem(id: number) {
    setItems((prev) => prev.filter((i) => i.id !== id));
  }

  // ---- Drag handling ----
  const handleMouseDown = useCallback(
    (e: React.MouseEvent, item: BoardItem) => {
      e.preventDefault();
      const rect = canvasRef.current?.getBoundingClientRect();
      if (!rect) return;
      setDragInfo({
        id: item.id,
        offsetX: e.clientX - rect.left - item.x,
        offsetY: e.clientY - rect.top - item.y,
      });
    },
    []
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!dragInfo || !canvasRef.current) return;
      const rect = canvasRef.current.getBoundingClientRect();
      const newX = e.clientX - rect.left - dragInfo.offsetX;
      const newY = e.clientY - rect.top - dragInfo.offsetY;
      setItems((prev) =>
        prev.map((item) =>
          item.id === dragInfo.id ? { ...item, x: newX, y: newY } : item
        )
      );
    },
    [dragInfo]
  );

  const handleMouseUp = useCallback(() => {
    setDragInfo(null);
  }, []);

  // Touch handling
  const handleTouchStart = useCallback(
    (e: React.TouchEvent, item: BoardItem) => {
      const touch = e.touches[0];
      const rect = canvasRef.current?.getBoundingClientRect();
      if (!rect) return;
      setDragInfo({
        id: item.id,
        offsetX: touch.clientX - rect.left - item.x,
        offsetY: touch.clientY - rect.top - item.y,
      });
    },
    []
  );

  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      if (!dragInfo || !canvasRef.current) return;
      const touch = e.touches[0];
      const rect = canvasRef.current.getBoundingClientRect();
      const newX = touch.clientX - rect.left - dragInfo.offsetX;
      const newY = touch.clientY - rect.top - dragInfo.offsetY;
      setItems((prev) =>
        prev.map((item) =>
          item.id === dragInfo.id ? { ...item, x: newX, y: newY } : item
        )
      );
    },
    [dragInfo]
  );

  return (
    <div className="relative z-10 min-h-screen bg-gradient-to-b from-cream via-rose/10 to-cream">
      <div className="px-5 pt-28 pb-28 max-w-[900px] mx-auto">
        {/* Back link */}
        <Link
          href="/guides/mood-board-app"
          className="inline-flex items-center gap-2 text-dark-soft text-sm font-semibold mb-6 no-underline hover:text-dark transition-colors"
        >
          ← Back to guide
        </Link>

        {/* Header */}
        <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <span className="text-3xl">🎨</span>
            <input
              value={boardName}
              onChange={(e) => setBoardName(e.target.value)}
              className="font-heading text-2xl font-bold bg-transparent border-b-2 border-transparent hover:border-lavender-light focus:border-lavender focus:outline-none transition-colors"
            />
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => {
                if (items.length === 0 || confirm("Clear the board?"))
                  setItems([]);
              }}
              className="px-4 py-2 rounded-full text-xs font-semibold bg-white text-dark-soft hover:bg-peach-light transition-colors"
            >
              Clear
            </button>
          </div>
        </div>

        {/* Toolbar */}
        <div className="bg-white rounded-2xl p-4 mb-4 shadow-soft">
          <div className="flex flex-wrap gap-2 items-center">
            <span className="text-xs font-bold text-dark-soft uppercase tracking-wider mr-2">
              Add:
            </span>
            <button
              onClick={() => {
                setShowImagePicker(!showImagePicker);
                setShowColorPicker(false);
              }}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                showImagePicker
                  ? "bg-dark text-white"
                  : "bg-peach-light text-dark-soft hover:bg-peach/30"
              }`}
            >
              🖼️ Image
            </button>
            <button
              onClick={addText}
              className="px-4 py-2 rounded-full text-sm font-semibold bg-lavender-light text-dark-soft hover:bg-lavender/30 transition-all"
            >
              ✏️ Text
            </button>
            <button
              onClick={() => {
                setShowColorPicker(!showColorPicker);
                setShowImagePicker(false);
              }}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                showColorPicker
                  ? "bg-dark text-white"
                  : "bg-mint-light text-dark-soft hover:bg-mint/30"
              }`}
            >
              🎨 Color
            </button>

            <span className="ml-auto text-xs text-dark-soft">
              {items.length} items
            </span>
          </div>

          {/* Color picker dropdown */}
          {showColorPicker && (
            <div className="mt-3 pt-3 border-t border-lavender-light">
              <div className="flex flex-wrap gap-2">
                {presetColors.map((color) => (
                  <button
                    key={color}
                    onClick={() =>
                      addItem({
                        type: "color",
                        content: color,
                        width: 80,
                        height: 80,
                        rotation: Math.random() * 8 - 4,
                      })
                    }
                    className="w-9 h-9 rounded-lg border-2 border-white shadow-soft hover:scale-110 transition-transform"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Image picker dropdown */}
          {showImagePicker && (
            <div className="mt-3 pt-3 border-t border-lavender-light">
              <p className="text-xs text-dark-soft mb-2">
                Pick a sample image or paste your own URL
              </p>
              <div className="flex flex-wrap gap-2 mb-3">
                {sampleImages.map((url, i) => (
                  <button
                    key={i}
                    onClick={() =>
                      addItem({
                        type: "image",
                        content: url,
                        width: 160,
                        height: 200,
                        rotation: Math.random() * 6 - 3,
                      })
                    }
                    className="w-14 h-14 rounded-lg overflow-hidden border-2 border-white shadow-soft hover:scale-110 transition-transform"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={url}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
              <button
                onClick={addImageFromUrl}
                className="text-xs font-semibold text-lavender hover:text-dark transition-colors"
              >
                Or paste a custom URL →
              </button>
            </div>
          )}
        </div>

        {/* Canvas */}
        <div
          ref={canvasRef}
          className="relative bg-white rounded-2xl shadow-soft overflow-hidden border-2 border-lavender-light"
          style={{ minHeight: "500px", touchAction: "none" }}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleMouseUp}
        >
          {/* Grid pattern background */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage:
                "radial-gradient(circle, #4A3B52 1px, transparent 1px)",
              backgroundSize: "24px 24px",
            }}
          />

          {items.length === 0 && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <p className="text-4xl mb-3">✨</p>
                <p className="text-dark-soft text-sm">
                  Click the buttons above to start building your board
                </p>
              </div>
            </div>
          )}

          {items.map((item) => (
            <div
              key={item.id}
              className={`absolute group select-none ${
                dragInfo?.id === item.id
                  ? "z-50 scale-105 opacity-90"
                  : "z-10 hover:z-40"
              }`}
              style={{
                left: item.x,
                top: item.y,
                width: item.width,
                transform: `rotate(${item.rotation}deg)`,
                cursor: dragInfo?.id === item.id ? "grabbing" : "grab",
                transition: dragInfo?.id === item.id ? "none" : "box-shadow 0.2s",
              }}
              onMouseDown={(e) => handleMouseDown(e, item)}
              onTouchStart={(e) => handleTouchStart(e, item)}
            >
              {/* Shadow/frame for images */}
              {item.type === "image" && (
                <div className="bg-white p-2 rounded-lg shadow-card group-hover:shadow-hover transition-shadow">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.content}
                    alt=""
                    draggable={false}
                    className="w-full rounded object-cover"
                    style={{ height: item.height }}
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Crect fill='%23E8E1F5' width='200' height='200'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' fill='%237B6B88' font-size='14'%3EImage not found%3C/text%3E%3C/svg%3E";
                    }}
                  />
                </div>
              )}

              {item.type === "color" && (
                <div
                  className="rounded-lg shadow-card group-hover:shadow-hover transition-shadow border-2 border-white"
                  style={{
                    backgroundColor: item.content,
                    width: item.width,
                    height: item.height,
                  }}
                />
              )}

              {item.type === "text" && (
                <div className="bg-butter/80 p-3 rounded-lg shadow-card group-hover:shadow-hover transition-shadow border border-gold-light">
                  <p className="text-sm font-semibold text-dark leading-snug">
                    {item.content}
                  </p>
                </div>
              )}

              {/* Delete button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  deleteItem(item.id);
                }}
                className="absolute -top-2 -right-2 w-6 h-6 bg-dark text-white rounded-full text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity hover:bg-pink flex items-center justify-center"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Demo banner */}
      <div className="fixed bottom-0 left-0 w-full bg-dark/90 backdrop-blur-sm text-white text-center py-3 px-6 z-50">
        <p className="text-sm">
          This is a live demo!{" "}
          <Link
            href="/guides/mood-board-app"
            className="underline font-semibold text-peach hover:text-peach-light transition-colors"
          >
            Learn how to build it yourself →
          </Link>
        </p>
      </div>
    </div>
  );
}
