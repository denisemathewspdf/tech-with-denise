"use client";

import { useState, useEffect, useRef, useCallback, createContext, useContext } from "react";

// ─── Game constants ───
const GAME_W = 480;
const GAME_H = 640;
const PADDLE_W = 80;
const PADDLE_H = 14;
const BALL_R = 7;
const BRICK_ROWS = 6;
const BRICK_COLS = 8;
const BRICK_W = GAME_W / BRICK_COLS - 4;
const BRICK_H = 18;
const BRICK_PAD = 4;

const NEON_COLORS = [
  "#ff2d95", "#ff6b2b", "#ffd62b", "#2bff6b",
  "#2bd4ff", "#a82bff",
];

const KONAMI = [
  "ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown",
  "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight",
  "b", "a",
];

const SECRET_WORD = "denise";

function initBricks() {
  const bricks = [];
  for (let r = 0; r < BRICK_ROWS; r++) {
    for (let c = 0; c < BRICK_COLS; c++) {
      bricks.push({
        x: c * (BRICK_W + BRICK_PAD) + BRICK_PAD / 2 + 2,
        y: r * (BRICK_H + BRICK_PAD) + 60,
        w: BRICK_W,
        h: BRICK_H,
        color: NEON_COLORS[r % NEON_COLORS.length],
        alive: true,
      });
    }
  }
  return bricks;
}

// ─── Context so Nav can open the game ───
const EasterEggContext = createContext<{ open: () => void }>({ open: () => {} });
export function useEasterEgg() {
  return useContext(EasterEggContext);
}

// ─── Hidden trigger dot ───
export function HiddenTrigger({ onClick }: { onClick: () => void }) {
  return (
    <span
      onClick={onClick}
      style={{ cursor: "default", userSelect: "none", position: "relative" }}
    >
      <span
        style={{
          fontFamily: "'Orbitron', monospace",
          fontSize: 11,
          color: "#ffffff15",
          letterSpacing: 2,
          animation: "ee-hintPulse 8s ease-in-out infinite",
          transition: "color 0.3s",
        }}
        onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "#ffffff44")}
        onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "#ffffff15")}
      >
        ▪
      </span>
    </span>
  );
}

// ─── Breakout game overlay ───
function BreakoutGame({ onClose }: { onClose: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gameState = useRef({
    paddle: { x: GAME_W / 2 - PADDLE_W / 2 },
    ball: { x: GAME_W / 2, y: GAME_H - 60, dx: 3.5, dy: -3.5 },
    bricks: initBricks(),
    score: 0,
    lives: 3,
    running: true,
    started: false,
    won: false,
    particles: [] as { x: number; y: number; dx: number; dy: number; life: number; color: string; size: number }[],
  });
  const [, setTick] = useState(0);
  const animRef = useRef<number>(0);
  const mouseX = useRef(GAME_W / 2);

  const spawnParticles = (x: number, y: number, color: string, count = 8) => {
    const gs = gameState.current;
    for (let i = 0; i < count; i++) {
      gs.particles.push({
        x, y,
        dx: (Math.random() - 0.5) * 6,
        dy: (Math.random() - 0.5) * 6,
        life: 1,
        color,
        size: Math.random() * 3 + 1,
      });
    }
  };

  const resetBall = useCallback(() => {
    const gs = gameState.current;
    gs.ball = {
      x: gs.paddle.x + PADDLE_W / 2,
      y: GAME_H - 60,
      dx: (Math.random() > 0.5 ? 1 : -1) * 3.5,
      dy: -3.5,
    };
    gs.started = false;
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const scaleX = GAME_W / rect.width;
    mouseX.current = (e.clientX - rect.left) * scaleX;
  }, []);

  const handleClick = useCallback(() => {
    const gs = gameState.current;
    if (!gs.started && gs.running) {
      gs.started = true;
      return;
    }
    if (gs.won || !gs.running) {
      gs.bricks = initBricks();
      gs.score = 0;
      gs.lives = 3;
      gs.running = true;
      gs.won = false;
      gs.particles = [];
      setTick((t) => t + 1);
      resetBall();
    }
  }, [resetBall]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;

    const loop = () => {
      const gs = gameState.current;
      gs.paddle.x = Math.max(0, Math.min(GAME_W - PADDLE_W, mouseX.current - PADDLE_W / 2));

      if (gs.started && gs.running) {
        gs.ball.x += gs.ball.dx;
        gs.ball.y += gs.ball.dy;

        if (gs.ball.x - BALL_R <= 0 || gs.ball.x + BALL_R >= GAME_W) gs.ball.dx *= -1;
        if (gs.ball.y - BALL_R <= 0) gs.ball.dy *= -1;

        if (
          gs.ball.y + BALL_R >= GAME_H - 30 - PADDLE_H &&
          gs.ball.y + BALL_R <= GAME_H - 30 &&
          gs.ball.x >= gs.paddle.x &&
          gs.ball.x <= gs.paddle.x + PADDLE_W
        ) {
          gs.ball.dy = -Math.abs(gs.ball.dy);
          gs.ball.dx = ((gs.ball.x - gs.paddle.x) / PADDLE_W - 0.5) * 8;
          spawnParticles(gs.ball.x, gs.ball.y, "#2bd4ff", 4);
        }

        if (gs.ball.y > GAME_H + 10) {
          gs.lives--;
          setTick((t) => t + 1);
          if (gs.lives <= 0) {
            gs.running = false;
          } else {
            resetBall();
          }
        }

        gs.bricks.forEach((b) => {
          if (!b.alive) return;
          if (
            gs.ball.x + BALL_R > b.x &&
            gs.ball.x - BALL_R < b.x + b.w &&
            gs.ball.y + BALL_R > b.y &&
            gs.ball.y - BALL_R < b.y + b.h
          ) {
            b.alive = false;
            gs.ball.dy *= -1;
            gs.score += 10;
            spawnParticles(b.x + b.w / 2, b.y + b.h / 2, b.color, 12);
            gs.ball.dx *= 1.01;
            gs.ball.dy *= 1.01;
            if (gs.bricks.every((br) => !br.alive)) {
              gs.won = true;
              gs.running = false;
            }
            setTick((t) => t + 1);
          }
        });
      } else if (!gs.started) {
        gs.ball.x = gs.paddle.x + PADDLE_W / 2;
        gs.ball.y = GAME_H - 60;
      }

      gs.particles = gs.particles.filter((p) => {
        p.x += p.dx;
        p.y += p.dy;
        p.life -= 0.03;
        p.dy += 0.1;
        return p.life > 0;
      });

      // === DRAW ===
      ctx.fillStyle = "#0a0a12";
      ctx.fillRect(0, 0, GAME_W, GAME_H);

      ctx.strokeStyle = "#ffffff08";
      ctx.lineWidth = 1;
      for (let i = 0; i < GAME_W; i += 40) {
        ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, GAME_H); ctx.stroke();
      }
      for (let i = 0; i < GAME_H; i += 40) {
        ctx.beginPath(); ctx.moveTo(0, i); ctx.lineTo(GAME_W, i); ctx.stroke();
      }

      // Bricks
      gs.bricks.forEach((b) => {
        if (!b.alive) return;
        ctx.save();
        ctx.shadowColor = b.color;
        ctx.shadowBlur = 12;
        ctx.fillStyle = b.color;
        ctx.beginPath();
        const r = 3;
        ctx.moveTo(b.x + r, b.y);
        ctx.lineTo(b.x + b.w - r, b.y);
        ctx.quadraticCurveTo(b.x + b.w, b.y, b.x + b.w, b.y + r);
        ctx.lineTo(b.x + b.w, b.y + b.h - r);
        ctx.quadraticCurveTo(b.x + b.w, b.y + b.h, b.x + b.w - r, b.y + b.h);
        ctx.lineTo(b.x + r, b.y + b.h);
        ctx.quadraticCurveTo(b.x, b.y + b.h, b.x, b.y + b.h - r);
        ctx.lineTo(b.x, b.y + r);
        ctx.quadraticCurveTo(b.x, b.y, b.x + r, b.y);
        ctx.fill();
        ctx.restore();
        ctx.fillStyle = "#ffffff22";
        ctx.fillRect(b.x + 2, b.y + 2, b.w - 4, b.h / 3);
      });

      // Paddle
      ctx.save();
      ctx.shadowColor = "#2bd4ff";
      ctx.shadowBlur = 20;
      const padGrad = ctx.createLinearGradient(gs.paddle.x, 0, gs.paddle.x + PADDLE_W, 0);
      padGrad.addColorStop(0, "#2bd4ff");
      padGrad.addColorStop(0.5, "#a82bff");
      padGrad.addColorStop(1, "#ff2d95");
      ctx.fillStyle = padGrad;
      ctx.beginPath();
      ctx.roundRect(gs.paddle.x, GAME_H - 30 - PADDLE_H, PADDLE_W, PADDLE_H, 7);
      ctx.fill();
      ctx.restore();

      // Ball
      ctx.save();
      ctx.shadowColor = "#ffffff";
      ctx.shadowBlur = 16;
      ctx.fillStyle = "#ffffff";
      ctx.beginPath();
      ctx.arc(gs.ball.x, gs.ball.y, BALL_R, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // Ball trail
      ctx.save();
      ctx.globalAlpha = 0.3;
      ctx.fillStyle = "#2bd4ff";
      ctx.beginPath();
      ctx.arc(gs.ball.x - gs.ball.dx, gs.ball.y - gs.ball.dy, BALL_R * 0.7, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalAlpha = 0.15;
      ctx.beginPath();
      ctx.arc(gs.ball.x - gs.ball.dx * 2, gs.ball.y - gs.ball.dy * 2, BALL_R * 0.4, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // Particles
      gs.particles.forEach((p) => {
        ctx.save();
        ctx.globalAlpha = p.life;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 8;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      // HUD
      ctx.save();
      ctx.font = "bold 14px 'Press Start 2P', monospace";
      ctx.fillStyle = "#2bd4ff";
      ctx.shadowColor = "#2bd4ff";
      ctx.shadowBlur = 10;
      ctx.fillText(`SCORE ${gs.score}`, 12, 30);
      ctx.fillStyle = "#ff2d95";
      ctx.shadowColor = "#ff2d95";
      for (let i = 0; i < gs.lives; i++) {
        ctx.fillText("\u2665", GAME_W - 30 - i * 28, 30);
      }
      ctx.restore();

      // Start prompt
      if (!gs.started && gs.running) {
        ctx.save();
        ctx.font = "12px 'Press Start 2P', monospace";
        ctx.fillStyle = "#ffffff";
        ctx.textAlign = "center";
        ctx.shadowColor = "#ffffff";
        ctx.shadowBlur = 10;
        ctx.globalAlpha = 0.6 + Math.sin(Date.now() / 400) * 0.4;
        ctx.fillText("CLICK TO LAUNCH", GAME_W / 2, GAME_H / 2 + 60);
        ctx.restore();
      }

      // Win
      if (gs.won) {
        ctx.save();
        ctx.fillStyle = "#00000099";
        ctx.fillRect(0, 0, GAME_W, GAME_H);
        ctx.font = "bold 22px 'Press Start 2P', monospace";
        ctx.fillStyle = "#ffd62b";
        ctx.textAlign = "center";
        ctx.shadowColor = "#ffd62b";
        ctx.shadowBlur = 20;
        ctx.fillText("YOU WIN!", GAME_W / 2, GAME_H / 2 - 20);
        ctx.font = "10px 'Press Start 2P', monospace";
        ctx.fillStyle = "#ffffff88";
        ctx.shadowBlur = 0;
        ctx.fillText("CLICK TO PLAY AGAIN", GAME_W / 2, GAME_H / 2 + 30);
        ctx.restore();
      }

      // Game over
      if (!gs.running && !gs.won) {
        ctx.save();
        ctx.fillStyle = "#00000099";
        ctx.fillRect(0, 0, GAME_W, GAME_H);
        ctx.font = "bold 20px 'Press Start 2P', monospace";
        ctx.fillStyle = "#ff2d95";
        ctx.textAlign = "center";
        ctx.shadowColor = "#ff2d95";
        ctx.shadowBlur = 20;
        ctx.fillText("GAME OVER", GAME_W / 2, GAME_H / 2 - 20);
        ctx.font = "10px 'Press Start 2P', monospace";
        ctx.fillStyle = "#ffffff88";
        ctx.shadowBlur = 0;
        ctx.fillText(`FINAL SCORE: ${gs.score}`, GAME_W / 2, GAME_H / 2 + 20);
        ctx.fillText("CLICK TO RETRY", GAME_W / 2, GAME_H / 2 + 50);
        ctx.restore();
      }

      animRef.current = requestAnimationFrame(loop);
    };

    animRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animRef.current);
  }, [resetBall]);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 99999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "radial-gradient(ellipse at center, #1a0a2e 0%, #000000 100%)",
        animation: "ee-slideUp 0.4s ease-out",
      }}
    >
      <button
        onClick={onClose}
        style={{
          position: "absolute",
          top: 20,
          right: 24,
          background: "none",
          border: "1px solid #ffffff33",
          color: "#ffffff88",
          fontSize: 18,
          fontFamily: "'Orbitron', monospace",
          cursor: "pointer",
          padding: "6px 14px",
          borderRadius: 6,
          transition: "all 0.2s",
          zIndex: 100000,
        }}
        onMouseEnter={(e) => {
          (e.target as HTMLElement).style.borderColor = "#ff2d95";
          (e.target as HTMLElement).style.color = "#ff2d95";
        }}
        onMouseLeave={(e) => {
          (e.target as HTMLElement).style.borderColor = "#ffffff33";
          (e.target as HTMLElement).style.color = "#ffffff88";
        }}
      >
        ESC
      </button>

      <div style={{ textAlign: "center" }}>
        <div
          style={{
            fontFamily: "'Press Start 2P', monospace",
            fontSize: 13,
            color: "#2bd4ff",
            letterSpacing: 6,
            marginBottom: 12,
            animation: "ee-glitch 3s infinite, ee-float 4s ease-in-out infinite",
            textShadow: "0 0 20px #2bd4ff88",
          }}
        >
          ⚡ TECH WITH DENISE ⚡
        </div>
        <div
          style={{
            fontFamily: "'Orbitron', monospace",
            fontSize: 9,
            color: "#a82bff",
            letterSpacing: 4,
            marginBottom: 20,
            opacity: 0.7,
          }}
        >
          SECRET ARCADE — BREAKOUT
        </div>

        <div
          style={{
            border: "2px solid #2bd4ff",
            borderRadius: 8,
            overflow: "hidden",
            animation: "ee-rainbowBorder 4s linear infinite",
            position: "relative",
          }}
        >
          <canvas
            ref={canvasRef}
            width={GAME_W}
            height={GAME_H}
            style={{
              width: Math.min(GAME_W, 420),
              height: Math.min(GAME_H, 420 * (GAME_H / GAME_W)),
              display: "block",
              cursor: "none",
              animation: "ee-flicker 4s infinite",
            }}
            onMouseMove={handleMouseMove}
            onClick={handleClick}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "repeating-linear-gradient(0deg, transparent, transparent 2px, #00000015 2px, #00000015 4px)",
              pointerEvents: "none",
            }}
          />
        </div>

        <div
          style={{
            fontFamily: "'Orbitron', monospace",
            fontSize: 8,
            color: "#ffffff30",
            marginTop: 14,
            letterSpacing: 3,
          }}
        >
          MOVE MOUSE TO PLAY • ESC TO EXIT
        </div>
      </div>
    </div>
  );
}

// ─── CSS keyframes (injected once) ───
const easterEggStyles = `
@keyframes ee-flicker {
  0%, 100% { opacity: 1; }
  92% { opacity: 1; }
  93% { opacity: 0.8; }
  94% { opacity: 1; }
}
@keyframes ee-glitch {
  0%, 100% { text-shadow: 2px 0 #ff2d95, -2px 0 #2bd4ff; }
  25% { text-shadow: -2px 0 #ff2d95, 2px 0 #2bd4ff; }
  50% { text-shadow: 2px 2px #ff2d95, -2px -2px #2bd4ff; }
  75% { text-shadow: -2px 2px #ff2d95, 2px -2px #2bd4ff; }
}
@keyframes ee-slideUp {
  from { transform: translateY(40px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}
@keyframes ee-rainbowBorder {
  0%   { border-color: #ff2d95; box-shadow: 0 0 20px #ff2d9555, inset 0 0 20px #00000088; }
  16%  { border-color: #ff6b2b; box-shadow: 0 0 20px #ff6b2b55, inset 0 0 20px #00000088; }
  33%  { border-color: #ffd62b; box-shadow: 0 0 20px #ffd62b55, inset 0 0 20px #00000088; }
  50%  { border-color: #2bff6b; box-shadow: 0 0 20px #2bff6b55, inset 0 0 20px #00000088; }
  66%  { border-color: #2bd4ff; box-shadow: 0 0 20px #2bd4ff55, inset 0 0 20px #00000088; }
  83%  { border-color: #a82bff; box-shadow: 0 0 20px #a82bff55, inset 0 0 20px #00000088; }
  100% { border-color: #ff2d95; box-shadow: 0 0 20px #ff2d9555, inset 0 0 20px #00000088; }
}
@keyframes ee-float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-6px); }
}
@keyframes ee-hintPulse {
  0%, 70%, 100% { opacity: 0.3; }
  85% { opacity: 0.6; }
}
`;

// ─── Provider: wraps the app, handles triggers, renders overlay ───
export default function EasterEggProvider({ children }: { children: React.ReactNode }) {
  const [gameOpen, setGameOpen] = useState(false);
  const [hint, setHint] = useState("");
  const konamiProgress = useRef<string[]>([]);
  const wordBuffer = useRef("");

  const openGame = useCallback((message: string) => {
    setHint(message);
    setTimeout(() => setGameOpen(true), 600);
  }, []);

  // Keyboard listener for Konami code + secret word + ESC
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (gameOpen) {
        if (e.key === "Escape") setGameOpen(false);
        return;
      }

      // Konami Code
      const kp = konamiProgress.current;
      if (e.key === KONAMI[kp.length]) {
        kp.push(e.key);
        if (kp.length === KONAMI.length) {
          openGame("\uD83D\uDD79\uFE0F KONAMI CODE ACCEPTED");
          konamiProgress.current = [];
        }
      } else {
        konamiProgress.current = e.key === KONAMI[0] ? [e.key] : [];
      }

      // Secret word
      if (e.key.length === 1) {
        wordBuffer.current += e.key.toLowerCase();
        if (wordBuffer.current.length > 20) {
          wordBuffer.current = wordBuffer.current.slice(-20);
        }
        if (wordBuffer.current.endsWith(SECRET_WORD)) {
          openGame("\uD83D\uDD13 SECRET WORD DETECTED");
          wordBuffer.current = "";
        }
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [gameOpen, openGame]);

  // Clear hint after 2s
  useEffect(() => {
    if (hint) {
      const t = setTimeout(() => setHint(""), 2000);
      return () => clearTimeout(t);
    }
  }, [hint]);

  return (
    <EasterEggContext.Provider
      value={{
        open: () => openGame("\uD83D\uDC41\uFE0F YOU FOUND THE HIDDEN PORTAL"),
      }}
    >
      <style dangerouslySetInnerHTML={{ __html: easterEggStyles }} />
      {children}

      {/* Hint toast */}
      {hint && (
        <div
          style={{
            position: "fixed",
            top: 30,
            left: "50%",
            transform: "translateX(-50%)",
            background: "#0a0a12ee",
            border: "1px solid #2bd4ff",
            borderRadius: 8,
            padding: "12px 28px",
            fontFamily: "'Press Start 2P', monospace",
            fontSize: 11,
            color: "#2bd4ff",
            zIndex: 99998,
            animation: "ee-slideUp 0.3s ease-out",
            boxShadow: "0 0 30px #2bd4ff33",
            letterSpacing: 1,
          }}
        >
          {hint}
        </div>
      )}

      {/* Game overlay */}
      {gameOpen && <BreakoutGame onClose={() => setGameOpen(false)} />}
    </EasterEggContext.Provider>
  );
}
