/**
 * A tiny, dependency-free Python interpreter for the "Tech with Denise"
 * interactive playground. Supports a beginner-friendly subset: print,
 * variables, f-strings, arithmetic, comparisons, if/elif/else, for/while
 * loops, lists (with append/pop/etc.), common string methods, and the
 * handful of builtins used across the beginner guides (str, int, float,
 * len, round, range, input, min, max, sum, sorted, abs).
 *
 * It deliberately does NOT support def/classes/imports/dict/slicing —
 * anything beyond "first script" level Python. Errors are written in
 * plain English so they read like Denise explaining what went wrong.
 */

export class PyError extends Error {}

// ---------- Values ----------
type PyVal =
  | { t: "none" }
  | { t: "bool"; v: boolean }
  | { t: "int"; v: number }
  | { t: "float"; v: number }
  | { t: "str"; v: string }
  | { t: "list"; v: PyVal[] };

const NONE: PyVal = { t: "none" };
const TRUE: PyVal = { t: "bool", v: true };
const FALSE: PyVal = { t: "bool", v: false };
const pyInt = (v: number): PyVal => ({ t: "int", v });
const pyFloat = (v: number): PyVal => ({ t: "float", v });
const pyStr = (v: string): PyVal => ({ t: "str", v });
const pyBool = (v: boolean): PyVal => (v ? TRUE : FALSE);
const pyList = (v: PyVal[]): PyVal => ({ t: "list", v });

function truthy(v: PyVal): boolean {
  switch (v.t) {
    case "none":
      return false;
    case "bool":
      return v.v;
    case "int":
    case "float":
      return v.v !== 0;
    case "str":
      return v.v.length > 0;
    case "list":
      return v.v.length > 0;
  }
}

function isNum(v: PyVal): v is { t: "int" | "float"; v: number } {
  return v.t === "int" || v.t === "float";
}

function fmtFloat(n: number): string {
  if (!isFinite(n)) return n > 0 ? "inf" : "-inf";
  if (Number.isInteger(n) && Math.abs(n) < 1e16) return n.toFixed(1);
  const s = String(n);
  if (s.includes("e") || s.includes("E")) return s;
  return s;
}

function pyStrOf(v: PyVal): string {
  switch (v.t) {
    case "none":
      return "None";
    case "bool":
      return v.v ? "True" : "False";
    case "int":
      return String(v.v);
    case "float":
      return fmtFloat(v.v);
    case "str":
      return v.v;
    case "list":
      return "[" + v.v.map(pyReprOf).join(", ") + "]";
  }
}

function pyReprOf(v: PyVal): string {
  if (v.t === "str") return "'" + v.v.replace(/\\/g, "\\\\").replace(/'/g, "\\'") + "'";
  return pyStrOf(v);
}

// ---------- Tokenizer ----------
type Token =
  | { type: "NUMBER"; value: number; isFloat: boolean }
  | { type: "STRING"; value: string; fstring: boolean }
  | { type: "NAME"; value: string }
  | { type: "KEYWORD"; value: string }
  | { type: "OP"; value: string };

const KEYWORDS = new Set([
  "if",
  "elif",
  "else",
  "for",
  "in",
  "while",
  "and",
  "or",
  "not",
  "True",
  "False",
  "None",
  "break",
  "continue",
  "pass",
]);

function readString(line: string, start: number, lineNo: number): { str: string; next: number } {
  const quote = line[start];
  let i = start + 1;
  let out = "";
  const escapes: Record<string, string> = { n: "\n", t: "\t", "\\": "\\", "'": "'", '"': '"', r: "\r" };
  while (i < line.length && line[i] !== quote) {
    if (line[i] === "\\") {
      const next = line[i + 1];
      out += escapes[next] !== undefined ? escapes[next] : next;
      i += 2;
    } else {
      out += line[i];
      i++;
    }
  }
  if (i >= line.length) throw new PyError(`Line ${lineNo}: this string is missing its closing quote`);
  return { str: out, next: i + 1 };
}

function tokenizeLine(line: string, lineNo: number): Token[] {
  const toks: Token[] = [];
  let i = 0;
  const n = line.length;
  while (i < n) {
    const c = line[i];
    if (c === " " || c === "\t") {
      i++;
      continue;
    }
    if (c === "#") break;
    if ((c === "f" || c === "F") && (line[i + 1] === "'" || line[i + 1] === '"')) {
      const { str, next } = readString(line, i + 1, lineNo);
      toks.push({ type: "STRING", value: str, fstring: true });
      i = next;
      continue;
    }
    if (c === "'" || c === '"') {
      const { str, next } = readString(line, i, lineNo);
      toks.push({ type: "STRING", value: str, fstring: false });
      i = next;
      continue;
    }
    if (/[0-9]/.test(c) || (c === "." && /[0-9]/.test(line[i + 1] || ""))) {
      let j = i;
      let isFloat = false;
      while (j < n && /[0-9]/.test(line[j])) j++;
      if (line[j] === ".") {
        isFloat = true;
        j++;
        while (j < n && /[0-9]/.test(line[j])) j++;
      }
      if (line[j] === "e" || line[j] === "E") {
        isFloat = true;
        j++;
        if (line[j] === "+" || line[j] === "-") j++;
        while (j < n && /[0-9]/.test(line[j])) j++;
      }
      const raw = line.slice(i, j);
      toks.push({ type: "NUMBER", value: isFloat ? parseFloat(raw) : parseInt(raw, 10), isFloat });
      i = j;
      continue;
    }
    if (/[A-Za-z_]/.test(c)) {
      let j = i;
      while (j < n && /[A-Za-z0-9_]/.test(line[j])) j++;
      const word = line.slice(i, j);
      if (KEYWORDS.has(word)) toks.push({ type: "KEYWORD", value: word });
      else toks.push({ type: "NAME", value: word });
      i = j;
      continue;
    }
    const three = line.slice(i, i + 3);
    const two = line.slice(i, i + 2);
    if (three === "**=") {
      toks.push({ type: "OP", value: three });
      i += 3;
      continue;
    }
    if (["==", "!=", "<=", ">=", "//", "**", "+=", "-=", "*=", "/=", "%="].includes(two)) {
      toks.push({ type: "OP", value: two });
      i += 2;
      continue;
    }
    if ("+-*/%()[]{}:,.<>=".includes(c)) {
      toks.push({ type: "OP", value: c });
      i++;
      continue;
    }
    throw new PyError(`Line ${lineNo}: I don't understand the character "${c}"`);
  }
  return toks;
}

function stripComment(line: string): string {
  let inStr: string | null = null;
  for (let i = 0; i < line.length; i++) {
    const c = line[i];
    if (inStr) {
      if (c === "\\") {
        i++;
        continue;
      }
      if (c === inStr) inStr = null;
      continue;
    }
    if (c === "'" || c === '"') {
      inStr = c;
      continue;
    }
    if (c === "#") return line.slice(0, i);
  }
  return line;
}

type SourceLine = { lineNo: number; indent: number; tokens: Token[] };

function preprocess(source: string): SourceLine[] {
  const rawLines = source.replace(/\t/g, "    ").split("\n");
  const out: SourceLine[] = [];
  for (let n = 0; n < rawLines.length; n++) {
    const stripped = stripComment(rawLines[n]);
    if (stripped.trim() === "") continue;
    const indent = (stripped.match(/^ */) as RegExpMatchArray)[0].length;
    const content = stripped.trim();
    out.push({ lineNo: n + 1, indent, tokens: tokenizeLine(content, n + 1) });
  }
  return out;
}

// ---------- AST ----------
type Expr =
  | { k: "Int"; value: number }
  | { k: "Float"; value: number }
  | { k: "Str"; value: string }
  | { k: "Bool"; value: boolean }
  | { k: "NoneLit" }
  | { k: "ListLit"; elements: Expr[] }
  | { k: "FString"; parts: ({ type: "text"; text: string } | { type: "expr"; expr: Expr; fmt?: string })[] }
  | { k: "Name"; name: string }
  | { k: "UnaryOp"; op: string; operand: Expr }
  | { k: "BoolOp"; op: "and" | "or"; left: Expr; right: Expr }
  | { k: "Compare"; op: string; left: Expr; right: Expr }
  | { k: "BinOp"; op: string; left: Expr; right: Expr }
  | { k: "Call"; callee: Expr; args: Expr[] }
  | { k: "Attribute"; obj: Expr; name: string }
  | { k: "Subscript"; obj: Expr; index: Expr };

type Stmt =
  | { k: "ExprStmt"; expr: Expr }
  | { k: "Assign"; op: string; target: Expr; value: Expr; lineNo: number }
  | { k: "If"; clauses: { cond: Expr | null; body: Stmt[] }[] }
  | { k: "For"; varName: string; iter: Expr; body: Stmt[] }
  | { k: "While"; cond: Expr; body: Stmt[] }
  | { k: "Break" }
  | { k: "Continue" }
  | { k: "Pass" };

// ---------- Expression parser ----------
class ExprParser {
  toks: Token[];
  pos = 0;
  lineNo: number;
  constructor(tokens: Token[], lineNo: number) {
    this.toks = tokens;
    this.lineNo = lineNo;
  }
  peek(): Token | undefined {
    return this.toks[this.pos];
  }
  next(): Token | undefined {
    return this.toks[this.pos++];
  }
  atEnd(): boolean {
    return this.pos >= this.toks.length;
  }
  expectOp(op: string): void {
    const t = this.next();
    if (!t || t.type !== "OP" || t.value !== op) {
      throw new PyError(`Line ${this.lineNo}: expected "${op}"`);
    }
  }
  isOp(v: string): boolean {
    const t = this.peek();
    return !!t && t.type === "OP" && t.value === v;
  }
  isKw(v: string): boolean {
    const t = this.peek();
    return !!t && t.type === "KEYWORD" && t.value === v;
  }

  parseExpr(): Expr {
    return this.parseOr();
  }
  parseOr(): Expr {
    let left = this.parseAnd();
    while (this.isKw("or")) {
      this.next();
      const right = this.parseAnd();
      left = { k: "BoolOp", op: "or", left, right };
    }
    return left;
  }
  parseAnd(): Expr {
    let left = this.parseNot();
    while (this.isKw("and")) {
      this.next();
      const right = this.parseNot();
      left = { k: "BoolOp", op: "and", left, right };
    }
    return left;
  }
  parseNot(): Expr {
    if (this.isKw("not")) {
      this.next();
      return { k: "UnaryOp", op: "not", operand: this.parseNot() };
    }
    return this.parseCompare();
  }
  parseCompare(): Expr {
    let left = this.parseAdd();
    const cmpOps = ["==", "!=", "<", ">", "<=", ">="];
    while ((this.peek()?.type === "OP" && cmpOps.includes((this.peek() as Token & { type: "OP" }).value)) || this.isKw("in")) {
      let op: string;
      if (this.isKw("in")) {
        this.next();
        op = "in";
      } else {
        op = (this.next() as Token & { type: "OP" }).value;
      }
      const right = this.parseAdd();
      left = { k: "Compare", op, left, right };
    }
    return left;
  }
  parseAdd(): Expr {
    let left = this.parseMul();
    while (this.isOp("+") || this.isOp("-")) {
      const op = (this.next() as Token & { type: "OP" }).value;
      const right = this.parseMul();
      left = { k: "BinOp", op, left, right };
    }
    return left;
  }
  parseMul(): Expr {
    let left = this.parseUnary();
    while (this.isOp("*") || this.isOp("/") || this.isOp("//") || this.isOp("%")) {
      const op = (this.next() as Token & { type: "OP" }).value;
      const right = this.parseUnary();
      left = { k: "BinOp", op, left, right };
    }
    return left;
  }
  parseUnary(): Expr {
    if (this.isOp("-")) {
      this.next();
      return { k: "UnaryOp", op: "-", operand: this.parseUnary() };
    }
    if (this.isOp("+")) {
      this.next();
      return this.parseUnary();
    }
    return this.parsePow();
  }
  parsePow(): Expr {
    const base = this.parsePostfix();
    if (this.isOp("**")) {
      this.next();
      const exp = this.parseUnary();
      return { k: "BinOp", op: "**", left: base, right: exp };
    }
    return base;
  }
  parsePostfix(): Expr {
    let expr = this.parsePrimary();
    for (;;) {
      if (this.isOp("(")) {
        this.next();
        const args: Expr[] = [];
        if (!this.isOp(")")) {
          args.push(this.parseExpr());
          while (this.isOp(",")) {
            this.next();
            args.push(this.parseExpr());
          }
        }
        this.expectOp(")");
        expr = { k: "Call", callee: expr, args };
      } else if (this.isOp("[")) {
        this.next();
        const index = this.parseExpr();
        this.expectOp("]");
        expr = { k: "Subscript", obj: expr, index };
      } else if (this.isOp(".")) {
        this.next();
        const name = this.next();
        if (!name || name.type !== "NAME") throw new PyError(`Line ${this.lineNo}: expected a name after "."`);
        expr = { k: "Attribute", obj: expr, name: name.value };
      } else break;
    }
    return expr;
  }
  parsePrimary(): Expr {
    const t = this.next();
    if (!t) throw new PyError(`Line ${this.lineNo}: expression ended unexpectedly`);
    if (t.type === "NUMBER") return { k: t.isFloat ? "Float" : "Int", value: t.value };
    if (t.type === "STRING") {
      if (t.fstring) return this.parseFString(t.value);
      return { k: "Str", value: t.value };
    }
    if (t.type === "NAME") return { k: "Name", name: t.value };
    if (t.type === "KEYWORD") {
      if (t.value === "True") return { k: "Bool", value: true };
      if (t.value === "False") return { k: "Bool", value: false };
      if (t.value === "None") return { k: "NoneLit" };
    }
    if (t.type === "OP" && t.value === "(") {
      const e = this.parseExpr();
      this.expectOp(")");
      return e;
    }
    if (t.type === "OP" && t.value === "[") {
      const elements: Expr[] = [];
      if (!this.isOp("]")) {
        elements.push(this.parseExpr());
        while (this.isOp(",")) {
          this.next();
          if (this.isOp("]")) break;
          elements.push(this.parseExpr());
        }
      }
      this.expectOp("]");
      return { k: "ListLit", elements };
    }
    throw new PyError(`Line ${this.lineNo}: didn't expect "${t.value}" there`);
  }
  parseFString(raw: string): Expr {
    const parts: ({ type: "text"; text: string } | { type: "expr"; expr: Expr; fmt?: string })[] = [];
    let i = 0;
    let text = "";
    while (i < raw.length) {
      if (raw[i] === "{" && raw[i + 1] !== "{") {
        if (text) {
          parts.push({ type: "text", text });
          text = "";
        }
        let depth = 1;
        let j = i + 1;
        while (j < raw.length && depth > 0) {
          if (raw[j] === "{") depth++;
          else if (raw[j] === "}") depth--;
          if (depth > 0) j++;
        }
        let inner = raw.slice(i + 1, j);
        let fmt: string | undefined;
        const colonIdx = inner.indexOf(":");
        if (colonIdx !== -1) {
          fmt = inner.slice(colonIdx + 1);
          inner = inner.slice(0, colonIdx);
        }
        const toks = tokenizeLine(inner, this.lineNo);
        const p = new ExprParser(toks, this.lineNo);
        const expr = p.parseExpr();
        parts.push({ type: "expr", expr, fmt });
        i = j + 1;
      } else if (raw[i] === "{" && raw[i + 1] === "{") {
        text += "{";
        i += 2;
      } else if (raw[i] === "}" && raw[i + 1] === "}") {
        text += "}";
        i += 2;
      } else {
        text += raw[i];
        i++;
      }
    }
    if (text) parts.push({ type: "text", text });
    return { k: "FString", parts };
  }
}

function parseExprFromTokens(tokens: Token[], lineNo: number): Expr {
  const p = new ExprParser(tokens, lineNo);
  const e = p.parseExpr();
  if (!p.atEnd()) throw new PyError(`Line ${lineNo}: unexpected extra text after expression`);
  return e;
}

// ---------- Statement parser ----------
function endsWithColon(tokens: Token[]): boolean {
  const last = tokens[tokens.length - 1];
  return tokens.length > 0 && last.type === "OP" && last.value === ":";
}

function parseBlock(lines: SourceLine[], startIdx: number, indentLevel: number): { stmts: Stmt[]; nextIdx: number } {
  const stmts: Stmt[] = [];
  let idx = startIdx;
  while (idx < lines.length) {
    const line = lines[idx];
    if (line.indent < indentLevel) break;
    if (line.indent > indentLevel) throw new PyError(`Line ${line.lineNo}: unexpected indent`);
    const { stmt, nextIdx } = parseStatement(lines, idx);
    stmts.push(stmt);
    idx = nextIdx;
  }
  return { stmts, nextIdx: idx };
}

function bodyIndent(lines: SourceLine[], headerIdx: number): number {
  if (headerIdx + 1 >= lines.length) throw new PyError(`Line ${lines[headerIdx].lineNo}: this block has no body`);
  const next = lines[headerIdx + 1];
  if (next.indent <= lines[headerIdx].indent) throw new PyError(`Line ${next.lineNo}: expected an indented block here`);
  return next.indent - lines[headerIdx].indent;
}

function findTopLevelAssignOp(toks: Token[]): number {
  let depth = 0;
  const assignOps = ["=", "+=", "-=", "*=", "/=", "//=", "%="];
  for (let i = 0; i < toks.length; i++) {
    const t = toks[i];
    if (t.type === "OP" && "([".includes(t.value)) depth++;
    if (t.type === "OP" && ")]".includes(t.value)) depth--;
    if (depth === 0 && t.type === "OP" && assignOps.includes(t.value)) return i;
  }
  return -1;
}

function parseSimple(toks: Token[], lineNo: number): Stmt {
  const eqIdx = findTopLevelAssignOp(toks);
  if (eqIdx !== -1) {
    const targetToks = toks.slice(0, eqIdx);
    const op = (toks[eqIdx] as Token & { type: "OP" }).value;
    const valueToks = toks.slice(eqIdx + 1);
    const target = parseExprFromTokens(targetToks, lineNo);
    if (target.k !== "Name" && target.k !== "Subscript") {
      throw new PyError(`Line ${lineNo}: left side of "=" must be a variable name`);
    }
    const value = parseExprFromTokens(valueToks, lineNo);
    return { k: "Assign", op, target, value, lineNo };
  }
  const expr = parseExprFromTokens(toks, lineNo);
  return { k: "ExprStmt", expr };
}

function parseIf(lines: SourceLine[], idx: number): { stmt: Stmt; nextIdx: number } {
  const clauses: { cond: Expr | null; body: Stmt[] }[] = [];
  const header = lines[idx];
  {
    const toks = header.tokens;
    if (!endsWithColon(toks)) throw new PyError(`Line ${header.lineNo}: "if" needs a ":" at the end`);
    const cond = parseExprFromTokens(toks.slice(1, -1), header.lineNo);
    const { stmts, nextIdx } = parseBlock(lines, idx + 1, header.indent + bodyIndent(lines, idx));
    clauses.push({ cond, body: stmts });
    idx = nextIdx;
  }
  while (idx < lines.length && lines[idx].indent === header.indent) {
    const t = lines[idx].tokens[0];
    if (t && t.type === "KEYWORD" && t.value === "elif") {
      const toks = lines[idx].tokens;
      if (!endsWithColon(toks)) throw new PyError(`Line ${lines[idx].lineNo}: "elif" needs a ":" at the end`);
      const cond = parseExprFromTokens(toks.slice(1, -1), lines[idx].lineNo);
      const bIndent = lines[idx].indent + bodyIndent(lines, idx);
      const { stmts, nextIdx } = parseBlock(lines, idx + 1, bIndent);
      clauses.push({ cond, body: stmts });
      idx = nextIdx;
    } else if (t && t.type === "KEYWORD" && t.value === "else") {
      const toks = lines[idx].tokens;
      if (!endsWithColon(toks)) throw new PyError(`Line ${lines[idx].lineNo}: "else" needs a ":" at the end`);
      const bIndent = lines[idx].indent + bodyIndent(lines, idx);
      const { stmts, nextIdx } = parseBlock(lines, idx + 1, bIndent);
      clauses.push({ cond: null, body: stmts });
      idx = nextIdx;
      break;
    } else break;
  }
  return { stmt: { k: "If", clauses }, nextIdx: idx };
}

function parseFor(lines: SourceLine[], idx: number): { stmt: Stmt; nextIdx: number } {
  const line = lines[idx];
  const toks = line.tokens;
  if (!endsWithColon(toks)) throw new PyError(`Line ${line.lineNo}: "for" needs a ":" at the end`);
  if (!(toks[1] && toks[1].type === "NAME")) throw new PyError(`Line ${line.lineNo}: expected a variable name after "for"`);
  const varName = toks[1].value;
  if (!(toks[2] && toks[2].type === "KEYWORD" && toks[2].value === "in")) {
    throw new PyError(`Line ${line.lineNo}: expected "in" after "for ${varName}"`);
  }
  const iter = parseExprFromTokens(toks.slice(3, -1), line.lineNo);
  const bIndent = line.indent + bodyIndent(lines, idx);
  const { stmts, nextIdx } = parseBlock(lines, idx + 1, bIndent);
  return { stmt: { k: "For", varName, iter, body: stmts }, nextIdx };
}

function parseWhile(lines: SourceLine[], idx: number): { stmt: Stmt; nextIdx: number } {
  const line = lines[idx];
  const toks = line.tokens;
  if (!endsWithColon(toks)) throw new PyError(`Line ${line.lineNo}: "while" needs a ":" at the end`);
  const cond = parseExprFromTokens(toks.slice(1, -1), line.lineNo);
  const bIndent = line.indent + bodyIndent(lines, idx);
  const { stmts, nextIdx } = parseBlock(lines, idx + 1, bIndent);
  return { stmt: { k: "While", cond, body: stmts }, nextIdx };
}

function parseStatement(lines: SourceLine[], idx: number): { stmt: Stmt; nextIdx: number } {
  const line = lines[idx];
  const first = line.tokens[0];
  if (first && first.type === "KEYWORD" && first.value === "if") return parseIf(lines, idx);
  if (first && first.type === "KEYWORD" && first.value === "for") return parseFor(lines, idx);
  if (first && first.type === "KEYWORD" && first.value === "while") return parseWhile(lines, idx);
  if (first && first.type === "KEYWORD" && first.value === "break") return { stmt: { k: "Break" }, nextIdx: idx + 1 };
  if (first && first.type === "KEYWORD" && first.value === "continue") return { stmt: { k: "Continue" }, nextIdx: idx + 1 };
  if (first && first.type === "KEYWORD" && first.value === "pass") return { stmt: { k: "Pass" }, nextIdx: idx + 1 };
  return { stmt: parseSimple(line.tokens, line.lineNo), nextIdx: idx + 1 };
}

// ---------- Evaluator ----------
type Env = Map<string, PyVal>;
const BREAK = Symbol("break");
const CONTINUE = Symbol("continue");
type Signal = typeof BREAK | typeof CONTINUE | null;

function formatValue(v: PyVal, fmt?: string): string {
  if (!fmt) return pyStrOf(v);
  const m = fmt.match(/^\.(\d+)f$/);
  if (m && isNum(v)) return v.v.toFixed(parseInt(m[1], 10));
  return pyStrOf(v);
}

function doSubscript(obj: PyVal, idx: PyVal): PyVal {
  if (obj.t === "list") {
    if (idx.t !== "int") throw new PyError(`List positions have to be whole numbers`);
    let i = idx.v;
    if (i < 0) i += obj.v.length;
    if (i < 0 || i >= obj.v.length) throw new PyError(`That position (${idx.v}) is outside the list — it only has ${obj.v.length} items`);
    return obj.v[i];
  }
  if (obj.t === "str") {
    if (idx.t !== "int") throw new PyError(`String positions have to be whole numbers`);
    let i = idx.v;
    if (i < 0) i += obj.v.length;
    if (i < 0 || i >= obj.v.length) throw new PyError(`That position (${idx.v}) is outside the string`);
    return pyStr(obj.v[i]);
  }
  throw new PyError(`Can't index into a ${obj.t}`);
}

function valuesEqual(l: PyVal, r: PyVal): boolean {
  if (isNum(l) && isNum(r)) return l.v === r.v;
  if (l.t !== r.t) return false;
  if (l.t === "list" && r.t === "list") return l.v.length === r.v.length && l.v.every((e, i) => valuesEqual(e, r.v[i]));
  if ("v" in l && "v" in r) return l.v === r.v;
  return true;
}

function compare(op: string, l: PyVal, r: PyVal): boolean {
  if (op === "in") {
    if (r.t === "list") return r.v.some((el) => valuesEqual(el, l));
    if (r.t === "str" && l.t === "str") return r.v.includes(l.v);
    throw new PyError(`"in" needs a list or string on the right`);
  }
  if (op === "==") return valuesEqual(l, r);
  if (op === "!=") return !valuesEqual(l, r);
  if (isNum(l) && isNum(r)) {
    switch (op) {
      case "<":
        return l.v < r.v;
      case ">":
        return l.v > r.v;
      case "<=":
        return l.v <= r.v;
      case ">=":
        return l.v >= r.v;
    }
  }
  if (l.t === "str" && r.t === "str") {
    switch (op) {
      case "<":
        return l.v < r.v;
      case ">":
        return l.v > r.v;
      case "<=":
        return l.v <= r.v;
      case ">=":
        return l.v >= r.v;
    }
  }
  throw new PyError(`Can't compare a ${l.t} and a ${r.t} with "${op}"`);
}

function numResult(l: { t: "int" | "float" }, r: { t: "int" | "float" }, v: number): PyVal {
  return l.t === "int" && r.t === "int" ? pyInt(v) : pyFloat(v);
}

function binOp(op: string, l: PyVal, r: PyVal): PyVal {
  if (op === "+") {
    if (isNum(l) && isNum(r)) return numResult(l, r, l.v + r.v);
    if (l.t === "str" && r.t === "str") return pyStr(l.v + r.v);
    if (l.t === "list" && r.t === "list") return pyList([...l.v, ...r.v]);
    throw new PyError(`Can't add a ${l.t} and a ${r.t} — try using str() to convert a number to text first`);
  }
  if (op === "-") {
    if (isNum(l) && isNum(r)) return numResult(l, r, l.v - r.v);
    throw new PyError(`Can't subtract a ${r.t} from a ${l.t}`);
  }
  if (op === "*") {
    if (isNum(l) && isNum(r)) return numResult(l, r, l.v * r.v);
    if (l.t === "str" && r.t === "int") return pyStr(l.v.repeat(Math.max(0, r.v)));
    if (r.t === "str" && l.t === "int") return pyStr(r.v.repeat(Math.max(0, l.v)));
    throw new PyError(`Can't multiply a ${l.t} and a ${r.t}`);
  }
  if (op === "/") {
    if (isNum(l) && isNum(r)) {
      if (r.v === 0) throw new PyError(`Can't divide by zero`);
      return pyFloat(l.v / r.v);
    }
    throw new PyError(`Can't divide a ${l.t} by a ${r.t}`);
  }
  if (op === "//") {
    if (isNum(l) && isNum(r)) {
      if (r.v === 0) throw new PyError(`Can't divide by zero`);
      const res = Math.floor(l.v / r.v);
      return l.t === "int" && r.t === "int" ? pyInt(res) : pyFloat(res);
    }
    throw new PyError(`"//" needs numbers on both sides`);
  }
  if (op === "%") {
    if (isNum(l) && isNum(r)) {
      if (r.v === 0) throw new PyError(`Can't divide by zero`);
      const res = ((l.v % r.v) + r.v) % r.v;
      return l.t === "int" && r.t === "int" ? pyInt(res) : pyFloat(res);
    }
    throw new PyError(`"%" needs numbers on both sides`);
  }
  if (op === "**") {
    if (isNum(l) && isNum(r)) return numResult(l, r, Math.pow(l.v, r.v));
    throw new PyError(`"**" needs numbers on both sides`);
  }
  throw new PyError(`Unknown operator ${op}`);
}

function minMax(args: PyVal[], fn: (...ns: number[]) => number): PyVal {
  let values = args;
  if (args.length === 1 && args[0].t === "list") values = args[0].v;
  if (values.length === 0) throw new PyError(`min()/max() needs at least one value`);
  for (const v of values) if (!isNum(v)) throw new PyError(`min()/max() needs numbers`);
  const nums = values as { t: "int" | "float"; v: number }[];
  const res = fn(...nums.map((v) => v.v));
  const allInt = nums.every((v) => v.t === "int");
  return allInt ? pyInt(res) : pyFloat(res);
}

function callMethod(obj: PyVal, name: string, args: PyVal[]): PyVal {
  if (obj.t === "list") {
    if (name === "append") {
      obj.v.push(args[0]);
      return NONE;
    }
    if (name === "pop") {
      if (obj.v.length === 0) throw new PyError(`Can't pop from an empty list`);
      return obj.v.pop() as PyVal;
    }
    if (name === "insert") {
      const i = (args[0] as { v: number }).v;
      obj.v.splice(i, 0, args[1]);
      return NONE;
    }
    if (name === "remove") {
      const i = obj.v.findIndex((e) => valuesEqual(e, args[0]));
      if (i === -1) throw new PyError(`That value isn't in the list`);
      obj.v.splice(i, 1);
      return NONE;
    }
    if (name === "reverse") {
      obj.v.reverse();
      return NONE;
    }
    if (name === "sort") {
      obj.v.sort((a, b) => {
        const av = (a as { v: unknown }).v;
        const bv = (b as { v: unknown }).v;
        return av! > bv! ? 1 : av! < bv! ? -1 : 0;
      });
      return NONE;
    }
  }
  if (obj.t === "str") {
    if (name === "upper") return pyStr(obj.v.toUpperCase());
    if (name === "lower") return pyStr(obj.v.toLowerCase());
    if (name === "strip") return pyStr(obj.v.trim());
    if (name === "title") return pyStr(obj.v.replace(/\w\S*/g, (w) => w[0].toUpperCase() + w.slice(1).toLowerCase()));
    if (name === "replace") return pyStr(obj.v.split((args[0] as { v: string }).v).join((args[1] as { v: string }).v));
    if (name === "split")
      return pyList((args.length ? obj.v.split((args[0] as { v: string }).v) : obj.v.split(/\s+/).filter(Boolean)).map(pyStr));
    if (name === "startswith") return pyBool(obj.v.startsWith((args[0] as { v: string }).v));
    if (name === "endswith") return pyBool(obj.v.endsWith((args[0] as { v: string }).v));
  }
  throw new PyError(`${obj.t} objects don't have a method called "${name}"`);
}

function callBuiltin(name: string, args: PyVal[], out: string[]): PyVal {
  switch (name) {
    case "print": {
      out.push(args.map(pyStrOf).join(" ") + "\n");
      return NONE;
    }
    case "str":
      return pyStr(args.length ? pyStrOf(args[0]) : "");
    case "int": {
      if (args.length === 0) return pyInt(0);
      const a = args[0];
      if (a.t === "str") {
        const n = parseInt(a.v.trim(), 10);
        if (isNaN(n)) throw new PyError(`Can't turn "${a.v}" into a whole number`);
        return pyInt(n);
      }
      if (isNum(a)) return pyInt(Math.trunc(a.v));
      throw new PyError(`Can't turn that into a whole number`);
    }
    case "float": {
      if (args.length === 0) return pyFloat(0);
      const a = args[0];
      if (a.t === "str") {
        const n = parseFloat(a.v.trim());
        if (isNaN(n)) throw new PyError(`Can't turn "${a.v}" into a decimal number`);
        return pyFloat(n);
      }
      if (isNum(a)) return pyFloat(a.v);
      throw new PyError(`Can't turn that into a decimal number`);
    }
    case "len": {
      const a = args[0];
      if (a.t === "list" || a.t === "str") return pyInt(a.v.length);
      throw new PyError(`"len()" doesn't work on a ${a.t}`);
    }
    case "round": {
      const a = args[0];
      if (!isNum(a)) throw new PyError(`"round()" needs a number`);
      const digits = args[1] ? (args[1] as { v: number }).v : 0;
      const factor = Math.pow(10, digits);
      const res = Math.round((a.v + Number.EPSILON) * factor) / factor;
      return digits > 0 ? pyFloat(res) : pyInt(Math.round(a.v));
    }
    case "abs": {
      const a = args[0] as { t: "int" | "float"; v: number };
      return a.t === "int" ? pyInt(Math.abs(a.v)) : pyFloat(Math.abs(a.v));
    }
    case "min":
      return minMax(args, Math.min);
    case "max":
      return minMax(args, Math.max);
    case "sum": {
      const list = args[0];
      if (list.t !== "list") throw new PyError(`"sum()" needs a list`);
      let total = 0;
      let allInt = true;
      for (const v of list.v) {
        if (!isNum(v)) throw new PyError(`"sum()" needs a list of numbers`);
        total += v.v;
        if (v.t !== "int") allInt = false;
      }
      return allInt ? pyInt(total) : pyFloat(total);
    }
    case "sorted": {
      const list = args[0];
      if (list.t !== "list") throw new PyError(`"sorted()" needs a list`);
      const copy = [...list.v].sort((a, b) => {
        const av = (a as { v: unknown }).v;
        const bv = (b as { v: unknown }).v;
        return av! > bv! ? 1 : av! < bv! ? -1 : 0;
      });
      return pyList(copy);
    }
    case "range": {
      let start = 0;
      let stop: number;
      let step = 1;
      if (args.length === 1) stop = (args[0] as { v: number }).v;
      else if (args.length === 2) {
        start = (args[0] as { v: number }).v;
        stop = (args[1] as { v: number }).v;
      } else if (args.length === 3) {
        start = (args[0] as { v: number }).v;
        stop = (args[1] as { v: number }).v;
        step = (args[2] as { v: number }).v;
      } else throw new PyError(`range() takes 1 to 3 numbers`);
      const items: PyVal[] = [];
      if (step > 0) for (let i = start; i < stop; i += step) items.push(pyInt(i));
      else if (step < 0) for (let i = start; i > stop; i += step) items.push(pyInt(i));
      else throw new PyError(`range() step can't be zero`);
      return pyList(items);
    }
    case "input": {
      const promptText = args.length ? pyStrOf(args[0]) : "";
      let answer = "";
      if (typeof window !== "undefined" && typeof window.prompt === "function") {
        answer = window.prompt(promptText) || "";
      }
      out.push(promptText + answer + "\n");
      return pyStr(answer);
    }
    default:
      throw new PyError(`I don't know a function called "${name}()" — this playground supports a beginner subset of Python`);
  }
}

function evalExpr(node: Expr, env: Env, out: string[]): PyVal {
  switch (node.k) {
    case "Int":
      return pyInt(node.value);
    case "Float":
      return pyFloat(node.value);
    case "Str":
      return pyStr(node.value);
    case "Bool":
      return pyBool(node.value);
    case "NoneLit":
      return NONE;
    case "ListLit":
      return pyList(node.elements.map((e) => evalExpr(e, env, out)));
    case "FString": {
      let s = "";
      for (const p of node.parts) {
        if (p.type === "text") s += p.text;
        else s += formatValue(evalExpr(p.expr, env, out), p.fmt);
      }
      return pyStr(s);
    }
    case "Name": {
      if (!env.has(node.name)) throw new PyError(`"${node.name}" isn't defined yet — did you spell it right, or forget to set it first?`);
      return env.get(node.name) as PyVal;
    }
    case "UnaryOp": {
      const v = evalExpr(node.operand, env, out);
      if (node.op === "not") return pyBool(!truthy(v));
      if (node.op === "-") {
        if (!isNum(v)) throw new PyError(`Can't negate a ${v.t}`);
        return v.t === "int" ? pyInt(-v.v) : pyFloat(-v.v);
      }
      throw new PyError(`Unknown unary operator ${node.op}`);
    }
    case "BoolOp": {
      const left = evalExpr(node.left, env, out);
      if (node.op === "and") return truthy(left) ? evalExpr(node.right, env, out) : left;
      return truthy(left) ? left : evalExpr(node.right, env, out);
    }
    case "Compare":
      return pyBool(compare(node.op, evalExpr(node.left, env, out), evalExpr(node.right, env, out)));
    case "BinOp":
      return binOp(node.op, evalExpr(node.left, env, out), evalExpr(node.right, env, out));
    case "Call": {
      if (node.callee.k === "Attribute") {
        const obj = evalExpr(node.callee.obj, env, out);
        const args = node.args.map((a) => evalExpr(a, env, out));
        return callMethod(obj, node.callee.name, args);
      }
      if (node.callee.k !== "Name") throw new PyError(`That's not something you can call`);
      const args = node.args.map((a) => evalExpr(a, env, out));
      return callBuiltin(node.callee.name, args, out);
    }
    case "Attribute":
      throw new PyError(`Attribute access isn't supported here`);
    case "Subscript":
      return doSubscript(evalExpr(node.obj, env, out), evalExpr(node.index, env, out));
  }
}

function getVar(env: Env, name: string, lineNo: number): PyVal {
  if (!env.has(name)) throw new PyError(`Line ${lineNo}: "${name}" isn't defined yet`);
  return env.get(name) as PyVal;
}

function execBlock(stmts: Stmt[], env: Env, out: string[]): Signal {
  for (const stmt of stmts) {
    const signal = execStmt(stmt, env, out);
    if (signal) return signal;
  }
  return null;
}

function execStmt(stmt: Stmt, env: Env, out: string[]): Signal {
  switch (stmt.k) {
    case "ExprStmt":
      evalExpr(stmt.expr, env, out);
      return null;
    case "Assign": {
      const value = evalExpr(stmt.value, env, out);
      if (stmt.target.k === "Name") {
        if (stmt.op === "=") env.set(stmt.target.name, value);
        else env.set(stmt.target.name, binOp(stmt.op.slice(0, -1), getVar(env, stmt.target.name, stmt.lineNo), value));
      } else if (stmt.target.k === "Subscript") {
        const obj = evalExpr(stmt.target.obj, env, out);
        const idx = evalExpr(stmt.target.index, env, out);
        if (obj.t !== "list") throw new PyError(`Can only assign into a list by position`);
        let i = (idx as { v: number }).v;
        if (i < 0) i += obj.v.length;
        if (stmt.op === "=") obj.v[i] = value;
        else obj.v[i] = binOp(stmt.op.slice(0, -1), obj.v[i], value);
      }
      return null;
    }
    case "If": {
      for (const clause of stmt.clauses) {
        if (clause.cond === null || truthy(evalExpr(clause.cond, env, out))) {
          return execBlock(clause.body, env, out);
        }
      }
      return null;
    }
    case "For": {
      const iterable = evalExpr(stmt.iter, env, out);
      let items: PyVal[];
      if (iterable.t === "list") items = iterable.v;
      else if (iterable.t === "str") items = iterable.v.split("").map(pyStr);
      else throw new PyError(`Can't loop over a ${iterable.t}`);
      for (const item of items) {
        env.set(stmt.varName, item);
        const signal = execBlock(stmt.body, env, out);
        if (signal === BREAK) break;
        if (signal && signal !== CONTINUE) return signal;
      }
      return null;
    }
    case "While": {
      let guard = 0;
      while (truthy(evalExpr(stmt.cond, env, out))) {
        if (++guard > 100000) throw new PyError(`This loop ran too many times — check for an infinite loop`);
        const signal = execBlock(stmt.body, env, out);
        if (signal === BREAK) break;
        if (signal && signal !== CONTINUE) return signal;
      }
      return null;
    }
    case "Break":
      return BREAK;
    case "Continue":
      return CONTINUE;
    case "Pass":
      return null;
  }
}

export interface RunResult {
  output: string;
  error: string | null;
}

export function runPython(source: string): RunResult {
  const out: string[] = [];
  try {
    const lines = preprocess(source);
    const { stmts } = parseBlock(lines, 0, 0);
    const env: Env = new Map();
    execBlock(stmts, env, out);
    return { output: out.join(""), error: null };
  } catch (e) {
    return { output: out.join(""), error: e instanceof Error ? e.message : String(e) };
  }
}
