import React, { useEffect, useState, useRef } from "react";
import { motion } from "motion/react";

interface PreloaderProps {
  onComplete: () => void;
  key?: string;
  skyVideoUrl?: string;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const [progress, setProgress] = useState(0);
  const [isExpanding, setIsExpanding] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    // Progress increment loop
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        const remaining = 100 - prev;
        const step = Math.max(1, Math.floor(Math.random() * Math.min(remaining, 10)));
        return prev + step;
      });
    }, 100);

    return () => {
      clearInterval(progressInterval);
    };
  }, []);

  useEffect(() => {
    if (progress === 100) {
      const expandTimeout = setTimeout(() => {
        setIsExpanding(true);
      }, 400);

      const finishTimeout = setTimeout(() => {
        onComplete();
      }, 1500);

      return () => {
        clearTimeout(expandTimeout);
        clearTimeout(finishTimeout);
      };
    }
  }, [progress, onComplete]);

  // Wireframe architectural drawing on canvas with premium, subtle styling
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (canvas) {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
      }
    };
    window.addEventListener("resize", handleResize);

    // Structure coordinate paths representing isometric modular buildings
    const drawBuilding = (
      xOffset: number,
      yOffset: number,
      scale: number,
      progressRatio: number,
      rotationY: number
    ) => {
      // Basic fallback
      ctx.lineWidth = 0.8;

      // Projection matrix simplified
      const project = (x: number, y: number, z: number) => {
        // Rotate around Y axis
        const cosY = Math.cos(rotationY);
        const sinY = Math.sin(rotationY);
        const rx = x * cosY - z * sinY;
        const rz = x * sinY + z * cosY + 450; // Balanced perspective depth

        // Perspective zoom
        const fov = 500;
        const projX = (rx * fov) / rz + xOffset;
        const projY = (-y * fov) / rz + yOffset;
        return { x: projX, y: projY };
      };

      const drawLine = (p1: { x: number; y: number }, p2: { x: number; y: number }, limit: number) => {
        if (limit <= 0) return;
        const targetX = p1.x + (p2.x - p1.x) * Math.min(1, limit);
        const targetY = p1.y + (p2.y - p1.y) * Math.min(1, limit);

        ctx.save();
        
        // Single ultra-thin high-precision architectural line in warm silver/white
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(targetX, targetY);
        ctx.strokeStyle = "rgba(255, 255, 255, 0.35)";
        ctx.lineWidth = 0.75;
        ctx.stroke();

        ctx.restore();
      };

      // Define vertices of beautifully proportioned modular building blocks (Scaled and Framed)
      const blocks = [
        {
          w: 135, h: 240, d: 110,
          pos: { x: -67, y: 0, z: -55 }
        },
        {
          w: 85, h: 195, d: 85,
          pos: { x: 80, y: 0, z: -12 }
        },
        {
          w: 105, h: 120, d: 115,
          pos: { x: -195, y: 0, z: -45 }
        }
      ];

      blocks.forEach((b, blockIdx) => {
        const dx = b.pos.x * scale;
        const dy = b.pos.y * scale;
        const dz = b.pos.z * scale;
        const w = b.w * scale;
        const h = b.h * scale;
        const d = b.d * scale;

        // Vertices
        const v = [
          project(dx, dy, dz),             // 0 bottom-back-left
          project(dx + w, dy, dz),         // 1 bottom-back-right
          project(dx + w, dy, dz + d),     // 2 bottom-front-right
          project(dx, dy, dz + d),         // 3 bottom-front-left
          project(dx, dy + h, dz),         // 4 top-back-left
          project(dx + w, dy + h, dz),     // 5 top-back-right
          project(dx + w, dy + h, dz + d), // 6 top-front-right
          project(dx, dy + h, dz + d),     // 7 top-front-left
        ];

        // Draw edges sequentially according to global loader progress
        const delay = blockIdx * 0.25;
        const localProgress = Math.max(0, (progressRatio - delay) / 0.5);

        if (localProgress > 0) {
          // Bottom loop edges
          drawLine(v[0], v[1], localProgress * 4);
          drawLine(v[1], v[2], localProgress * 4);
          drawLine(v[2], v[3], localProgress * 4);
          drawLine(v[3], v[0], localProgress * 4);

          // Top loop edges
          drawLine(v[4], v[5], localProgress * 3);
          drawLine(v[5], v[6], localProgress * 3);
          drawLine(v[6], v[7], localProgress * 3);
          drawLine(v[7], v[4], localProgress * 3);

          // Vertical columns
          drawLine(v[0], v[4], localProgress * 2);
          drawLine(v[1], v[5], localProgress * 2);
          drawLine(v[2], v[6], localProgress * 2);
          drawLine(v[3], v[7], localProgress * 2);

          // Grid wireframe details on facade
          if (localProgress > 0.6) {
            // Horizontal partitions (BIM style)
            for (let f = 0.25; f < 1; f += 0.25) {
              const pLeft = project(dx, dy + h * f, dz + d);
              const pRight = project(dx + w, dy + h * f, dz + d);
              drawLine(pLeft, pRight, (localProgress - 0.6) * 3);
            }
          }
        }
      });
    };

    // Fine spatial particles representing architectural grid points (Luxury dual-colored White + Electric Blue flow)
    const particles: {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      alpha: number;
      color: string;
      glow: boolean;
    }[] = [];

    for (let i = 0; i < 75; i++) {
      const isElectric = Math.random() < 0.45;
      const color = isElectric 
        ? "rgba(0, 229, 255, " // Glowing Electric Cyan
        : "rgba(255, 255, 255, "; // Fine Architectural White
      
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 1.3 + 0.4,
        speedX: (Math.random() - 0.5) * 0.18,
        speedY: -(Math.random() * 0.35 + 0.15), // Slow luxury cosmic lift
        alpha: Math.random() * 0.55 + 0.15,
        color,
        glow: isElectric
      });
    }

    let angle = -0.05;

    const render = () => {
      // Elegant classic matte black with subtle ambient vignette
      ctx.fillStyle = "#0a0a0a";
      ctx.fillRect(0, 0, width, height);

      // Ambient luxury mixed-colored particles flowing beautifully in sync with the structure
      ctx.save();
      particles.forEach((p) => {
        p.y += p.speedY;
        p.x += p.speedX;
        
        // Wrap around margins elegantly
        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;

        // Draw matching luxury subtle glows
        if (p.glow) {
          ctx.shadowColor = "rgba(0, 229, 255, 0.75)";
          ctx.shadowBlur = 5;
        } else {
          ctx.shadowBlur = 0;
        }

        ctx.fillStyle = p.color + p.alpha + ")";
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.restore();

      // Ultra subtle grid lines (Cyber blue tint)
      ctx.save();
      ctx.strokeStyle = "rgba(0, 229, 255, 0.012)";
      ctx.lineWidth = 0.5;
      const gridSize = 110;
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }
      ctx.restore();

      // Drawing state projection
      const progressRatio = progress / 100;
      angle += 0.0006; // extremely slow refined rotation

      // Perfect scaled-up luxury frame to engulf space beautifully around text.
      const dynamicScale = Math.min(width, height) / 370;
      
      // Position the architectural sculpture beautifully in the center space (framed around text)
      drawBuilding(width / 2, height / 2 + 50, dynamicScale, progressRatio, angle);

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
    };
  }, [progress]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#0a0a0a] text-white select-none overflow-hidden"
    >
      {/* Background blueprint render */}
      <canvas ref={canvasRef} className="absolute inset-0 z-0 pointer-events-none" />

      {/* Central branding reveal */}
      <div className="flex flex-col items-center justify-center relative z-10 w-full pointer-events-none px-4">
        <div className="flex items-center justify-center gap-4 relative w-full max-w-4xl">
          <motion.h1
            initial={{ scale: 0.98, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-xl sm:text-3xl md:text-4xl font-sans tracking-[0.4em] uppercase text-white font-light text-center bg-transparent py-4 px-10 relative"
          >
            BUILD THE{" "}
            <span
              className="font-normal block sm:inline text-[#00E5FF] transition-all duration-1000 relative"
              style={{
                letterSpacing: "0.45em",
                textShadow: "0 0 10px rgba(0, 229, 255, 0.45), 0 0 2px rgba(0, 229, 255, 0.7)",
              }}
            >
              MATRIX
              <span className="absolute -bottom-1.5 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#00E5FF]/50 to-transparent shadow-[0_0_8px_#00E5FF]" />
            </span>
            <span className="block text-[10px] sm:text-xs font-mono tracking-[0.35em] text-zinc-400 mt-2 font-normal uppercase">
              Pvt.  Ltd.
            </span>
          </motion.h1>
        </div>
      </div>

      {/* Minimal luxury bottom state tracker */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 font-mono text-[9px] text-white/40 tracking-[0.3em] uppercase pointer-events-none">
        <span className="animate-pulse">INITIALIZING BIM GRAPH</span>
        <div className="w-16 h-[1px] bg-white/5 relative overflow-hidden">
          <div 
            className="absolute h-full left-0 bg-[#00E5FF]/60 transition-all duration-300" 
            style={{ width: `${progress}%` }} 
          />
        </div>
        <span className="text-[8px] opacity-75">{progress}%</span>
      </div>
    </motion.div>
  );
}
