#!/usr/bin/env node
/**
 * generate-heal-pdfs.js
 * Generates placeholder PDFs for the Heal from Within resource downloads.
 * Run with: node scripts/generate-heal-pdfs.js
 *
 * To replace with real PDFs: drop your styled PDF into public/heal-from-within/resources/
 * using the exact filename listed below and delete the corresponding placeholder.
 */

const { writeFileSync, mkdirSync } = require("fs");
const path = require("path");

const OUT_DIR = path.join(__dirname, "../public/heal-from-within/resources");
mkdirSync(OUT_DIR, { recursive: true });

/* ── PDF helpers ────────────────────────────────────────────────────── */

function esc(str) {
  return str
    .replace(/\\/g, "\\\\")
    .replace(/\(/g, "\\(")
    .replace(/\)/g, "\\)");
}

/**
 * Builds a minimal, valid single-page PDF with Helvetica text.
 * @param {string} title        Large heading
 * @param {string[]} bodyLines  Lines of body text (empty string = blank line)
 * @returns {string} Raw PDF content as a string
 */
function buildPDF(title, bodyLines) {
  // Content stream
  const streamParts = [
    "BT",
    "/F1 22 Tf",                 // Helvetica-Bold, 22pt
    "72 730 Td",                  // start at top-left margin
    `(${esc(title)}) Tj`,
    "/F2 10 Tf",                  // Helvetica, 10pt
    "0 -24 Td",
    "(Heal from Within  |  healfromwithin.com) Tj",
    "/F1 11 Tf",                  // back to bold for body
    "0 -28 Td",
    "(------------------------------------------------------------) Tj",
    "/F2 11 Tf",                  // regular for body
    "0 -22 Td",
  ];

  for (const line of bodyLines) {
    if (line === "") {
      streamParts.push("0 -12 Td");
    } else {
      streamParts.push(`(${esc(line)}) Tj`);
      streamParts.push("0 -18 Td");
    }
  }
  streamParts.push("ET");

  const stream = streamParts.join("\n");
  const streamLen = Buffer.byteLength(stream, "utf8") + 1; // +1 for trailing \n

  // Build PDF body, tracking byte offsets for xref
  let body = "%PDF-1.4\n\n";
  const offsets = [];

  function addObj(n, content) {
    offsets[n - 1] = Buffer.byteLength(body, "utf8");
    body += `${n} 0 obj\n${content}\nendobj\n\n`;
  }

  addObj(1, "<< /Type /Catalog /Pages 2 0 R >>");
  addObj(2, "<< /Type /Pages /Kids [3 0 R] /Count 1 >>");
  addObj(
    3,
    "<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792]\n" +
      "   /Contents 4 0 R\n" +
      "   /Resources << /Font << /F1 5 0 R /F2 6 0 R >> >> >>",
  );
  addObj(4, `<< /Length ${streamLen} >>\nstream\n${stream}\n\nendstream`);
  addObj(5, "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>");
  addObj(6, "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>");

  const xrefOffset = Buffer.byteLength(body, "utf8");
  const n = offsets.length;
  let xref = `xref\n0 ${n + 1}\n0000000000 65535 f \n`;
  for (const off of offsets) {
    xref += `${String(off).padStart(10, "0")} 00000 n \n`;
  }
  body += xref;
  body += `trailer\n<< /Size ${n + 1} /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF\n`;

  return body;
}

/* ── PDFs to generate ───────────────────────────────────────────────── */

const pdfs = [
  {
    filename: "module-1-worksheet.pdf",
    title: "My Starting Point — Journal Worksheet",
    body: [
      "Module 1: The Wake-Up Call",
      "",
      "SELF-ASSESSMENT: Rate each life area from 1 (struggling) to 10 (thriving)",
      "",
      "  Physical Health          [ 1  2  3  4  5  6  7  8  9  10 ]",
      "  Mental / Emotional       [ 1  2  3  4  5  6  7  8  9  10 ]",
      "  Relationships            [ 1  2  3  4  5  6  7  8  9  10 ]",
      "  Career / Purpose         [ 1  2  3  4  5  6  7  8  9  10 ]",
      "  Finances                 [ 1  2  3  4  5  6  7  8  9  10 ]",
      "  Spirituality / Inner Life[ 1  2  3  4  5  6  7  8  9  10 ]",
      "",
      "MY TOP 3 SELF-SABOTAGE PATTERNS",
      "1. _______________________________________________",
      "2. _______________________________________________",
      "3. _______________________________________________",
      "",
      "MY HEALING INTENTION FOR THIS JOURNEY",
      "_________________________________________________",
      "_________________________________________________",
      "_________________________________________________",
      "",
      "REVISIT AFTER COMPLETION — Rate the same areas again:",
      "  Physical Health          [ 1  2  3  4  5  6  7  8  9  10 ]",
      "  Mental / Emotional       [ 1  2  3  4  5  6  7  8  9  10 ]",
      "  Relationships            [ 1  2  3  4  5  6  7  8  9  10 ]",
      "  Career / Purpose         [ 1  2  3  4  5  6  7  8  9  10 ]",
      "  Finances                 [ 1  2  3  4  5  6  7  8  9  10 ]",
      "  Spirituality / Inner Life[ 1  2  3  4  5  6  7  8  9  10 ]",
      "",
      "healfromwithin.com  |  Created by Denise",
    ],
  },
  {
    filename: "module-2-checklist.pdf",
    title: "7-Day Nature Challenge Checklist",
    body: [
      "Module 2: Healing Through Nature",
      "",
      "Complete at least one nature practice each day for 7 days.",
      "",
      "Day 1  [ ]  10-minute barefoot grounding outdoors",
      "Day 2  [ ]  Forest walk — no phone, just presence",
      "Day 3  [ ]  Sunrise or sunset observation",
      "Day 4  [ ]  Nature journaling — describe what you notice",
      "Day 5  [ ]  Water practice (ocean, river, rain, or bath)",
      "Day 6  [ ]  Plant care or gardening for 20 minutes",
      "Day 7  [ ]  Your choice — any nature connection ritual",
      "",
      "REFLECTION AFTER 7 DAYS",
      "What shifted for you this week?",
      "_________________________________________________",
      "_________________________________________________",
      "",
      "Worksheet coming soon with full content.",
      "",
      "healfromwithin.com  |  Created by Denise",
    ],
  },
  {
    filename: "module-3-guide.pdf",
    title: "Morning & Evening Meditation Guide",
    body: [
      "Module 3: Meditation & Breathwork",
      "",
      "MORNING PRACTICE (5-10 minutes)",
      "1. Sit comfortably — spine tall, shoulders relaxed",
      "2. Close your eyes. Take 3 deep belly breaths.",
      "3. Set an intention: Who do I want to be today?",
      "4. 4-4-4-4 Box Breathing: Inhale 4 / Hold 4 / Exhale 4 / Hold 4",
      "5. Open your eyes. Begin.",
      "",
      "EVENING PRACTICE (10 minutes)",
      "1. Dim lights. Phone away.",
      "2. Body scan: release tension from crown to toes",
      "3. Gratitude: Name 3 things that went well today",
      "4. 4-7-8 Breathing: Inhale 4 / Hold 7 / Exhale 8 (x4)",
      "5. Release the day. Tomorrow is a fresh start.",
      "",
      "HABIT TRACKER",
      "Week 1: Mon[ ] Tue[ ] Wed[ ] Thu[ ] Fri[ ] Sat[ ] Sun[ ]",
      "Week 2: Mon[ ] Tue[ ] Wed[ ] Thu[ ] Fri[ ] Sat[ ] Sun[ ]",
      "Week 3: Mon[ ] Tue[ ] Wed[ ] Thu[ ] Fri[ ] Sat[ ] Sun[ ]",
      "Week 4: Mon[ ] Tue[ ] Wed[ ] Thu[ ] Fri[ ] Sat[ ] Sun[ ]",
      "",
      "healfromwithin.com  |  Created by Denise",
    ],
  },
  {
    filename: "module-4-builder.pdf",
    title: "Custom Affirmation Builder",
    body: [
      "Module 4: The Power of Affirmations",
      "",
      "Step 1: Identify your limiting belief",
      "I believe that: _________________________________",
      "",
      "Step 2: Find the opposite truth",
      "The reality is: _________________________________",
      "",
      "Step 3: Write your affirmation (present tense, first person, positive)",
      "My affirmation: _________________________________",
      "____________________________________________",
      "",
      "AFFIRMATION AREAS",
      "Self-worth:  ____________________________________",
      "Health:      ____________________________________",
      "Abundance:   ____________________________________",
      "Love:        ____________________________________",
      "Purpose:     ____________________________________",
      "",
      "DAILY MIRROR WORK: Say your top 3 affirmations out loud",
      "while looking in the mirror — morning and evening.",
      "",
      "Week 1: Mon[ ] Tue[ ] Wed[ ] Thu[ ] Fri[ ] Sat[ ] Sun[ ]",
      "",
      "healfromwithin.com  |  Created by Denise",
    ],
  },
  {
    filename: "module-5-tracker.pdf",
    title: "Self-Sabotage Pattern Tracker & Interrupt Plan",
    body: [
      "Module 5: Breaking Self-Sabotage",
      "",
      "MY TOP 3 SELF-SABOTAGE PATTERNS",
      "",
      "Pattern 1: ______________________________________",
      "  Trigger: _______________________________________",
      "  Old behavior: __________________________________",
      "  Micro-habit interrupt: __________________________",
      "",
      "Pattern 2: ______________________________________",
      "  Trigger: _______________________________________",
      "  Old behavior: __________________________________",
      "  Micro-habit interrupt: __________________________",
      "",
      "Pattern 3: ______________________________________",
      "  Trigger: _______________________________________",
      "  Old behavior: __________________________________",
      "  Micro-habit interrupt: __________________________",
      "",
      "ACCOUNTABILITY CHECK",
      "Partner or system I will use: ____________________",
      "",
      "If I relapse, my plan is: ________________________",
      "_________________________________________________",
      "",
      "healfromwithin.com  |  Created by Denise",
    ],
  },
  {
    filename: "module-6-routine.pdf",
    title: "Daily Heal from Within Routine Card",
    body: [
      "Module 6: Hypnosis & Deep Reprogramming",
      "",
      "YOUR COMPLETE DAILY ROUTINE",
      "",
      "MORNING",
      "  [ ] 5-min morning meditation (Module 3)",
      "  [ ] 3 affirmations — out loud in the mirror (Module 4)",
      "  [ ] Gratitude — name 3 things before touching your phone",
      "  [ ] Set your healing intention for the day",
      "",
      "MIDDAY",
      "  [ ] Nature break — even 5 minutes outside counts",
      "  [ ] Check your triggers — notice without judgment",
      "  [ ] One micro-habit action toward your goal",
      "",
      "EVENING",
      "  [ ] Evening breathwork (4-7-8 pattern x4)",
      "  [ ] Self-hypnosis or guided audio (Module 6)",
      "  [ ] Journal: What did I do well today?",
      "  [ ] Review your affirmations before sleep",
      "",
      "WEEKLY",
      "  [ ] Review your self-sabotage tracker",
      "  [ ] Revisit your healing intention",
      "  [ ] Celebrate every small win",
      "",
      "healfromwithin.com  |  Created by Denise",
    ],
  },
];

/* ── Write files ─────────────────────────────────────────────────────── */

for (const { filename, title, body } of pdfs) {
  const content = buildPDF(title, body);
  const filepath = path.join(OUT_DIR, filename);
  writeFileSync(filepath, content, "utf8");
  console.log(`✓  ${filename}`);
}

console.log(`\nAll ${pdfs.length} PDFs written to:\n  ${OUT_DIR}`);
