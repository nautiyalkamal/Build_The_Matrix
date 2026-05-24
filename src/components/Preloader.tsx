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
        const step = Math.max(1, Math.floor(Math.random() * Math.min(remaining, 12)));
        return prev + step;
      });
    }, 110);

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

  // Wireframe architectural drawing on canvas (video recreation)
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

    // Structure coordinate paths representing isometric modular buildings from video (0:00 - 0:04)
    // 3D coordinates projected onto 2D screen
    const drawBuilding = (
      xOffset: number,
      yOffset: number,
      scale: number,
      progressRatio: number,
      rotationY: number
    ) => {
      ctx.strokeStyle = "rgba(255, 255, 255, 0.4)";
      ctx.lineWidth = 1;

      // Projection matrix simplified
      const project = (x: number, y: number, z: number) => {
        // Rotate around Y axis
        const cosY = Math.cos(rotationY);
        const sinY = Math.sin(rotationY);
        const rx = x * cosY - z * sinY;
        const rz = x * sinY + z * cosY + 300; // perspective depth

        // Perspective zoom
        const fov = 400;
        const projX = (rx * fov) / rz + xOffset;
        const projY = (-y * fov) / rz + yOffset;
        return { x: projX, y: projY };
      };

      const drawLine = (p1: { x: number; y: number }, p2: { x: number; y: number }, limit: number) => {
        if (limit <= 0) return;
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        const targetX = p1.x + (p2.x - p1.x) * Math.min(1, limit);
        const targetY = p1.y + (p2.y - p1.y) * Math.min(1, limit);
        ctx.lineTo(targetX, targetY);
        ctx.stroke();
      };

      // Define vertices of 3 blocks representing the shop structure from the video
      const blocks = [
        // Main block
        {
          w: 120, h: 220, d: 100,
          pos: { x: -60, y: 0, z: -50 }
        },
        // Right structural block
        {
          w: 80, h: 180, d: 80,
          pos: { x: 80, y: 0, z: -10 }
        },
        // Left horizontal slab
        {
          w: 100, h: 100, d: 110,
          pos: { x: -180, y: 0, z: -40 }
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
            ctx.strokeStyle = "rgba(255, 255, 255, 0.08)";
            // Horizontal partitions
            for (let f = 0.2; f < 1; f += 0.2) {
              const pLeft = project(dx, dy + h * f, dz + d);
              const pRight = project(dx + w, dy + h * f, dz + d);
              drawLine(pLeft, pRight, (localProgress - 0.6) * 3);
            }
          }
        }
      });
    };

    // Particles representing architectural coordinates stars
    const particles: { x: number; y: number; size: number; speed: number; alpha: number }[] = [];
    for (let i = 0; i < 60; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 1.5 + 0.5,
        speed: Math.random() * 0.4 + 0.1,
        alpha: Math.random() * 0.5 + 0.2
      });
    }

    let angle = -0.12;

    const render = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 1)";
      ctx.fillRect(0, 0, width, height);

      // Stars
      particles.forEach((p) => {
        p.y -= p.speed;
        if (p.y < 0) p.y = height;
        ctx.fillStyle = `rgba(255, 255, 255, ${p.alpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });

      // Subtle blueprint grid lines
      ctx.strokeStyle = "rgba(255, 255, 255, 0.02)";
      ctx.lineWidth = 0.5;
      const gridSize = 80;
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

      // Drawing state projection
      const progressRatio = progress / 100;
      angle += 0.001; // extremely subtle rotation Y

      drawBuilding(width / 2, height / 2 + 80, 1.4, progressRatio, angle);

      // HUD text values mirroring coordinates loading (genuine visual design details)
      ctx.fillStyle = "rgba(255, 255, 255, 0.35)";
      ctx.font = "9px monospace";
      ctx.fillText("MATRIX ROTATIONAL COORDINATE SYSTEM ACTIVE", 40, 50);
      ctx.fillText(`VECTOR PROGRESS: ${progress}%`, 40, 70);
      ctx.fillText("LOCUS: SAN FRANCISCO CA", width - 240, 50);
      ctx.fillText("BUILD THE MATRIX INC.", width - 240, 70);

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
      transition={{ duration: 0.7, ease: "easeInOut" }}
      className="fixed inset-0 z-50 flex flex-col justify-between p-8 md:p-12 bg-black text-white select-none overflow-hidden"
    >
      {/* Background blueprint render */}
      <canvas ref={canvasRef} className="absolute inset-0 z-0 pointer-events-none" />

      {/* Header Info Banner */}
      <div className="flex justify-between items-center relative z-20">
        <span className="font-sans text-[10px] tracking-[0.45em] text-white/50 uppercase font-bold">
          BUILD THE MATRIX ARCHIVES
        </span>
        <span className="font-sans text-[10px] tracking-widest text-white/30 uppercase">
          SYS // BOOT ACTIVE 2026
        </span>
      </div>

      {/* Central branding reveal (The video wireframe logo segment) */}
      <div className="flex flex-col items-center justify-center my-auto relative z-10 w-full">
        <div className="flex items-center justify-center gap-4 relative w-full max-w-4xl">
          <motion.h1
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.5 }}
            className="text-2xl sm:text-4xl md:text-5xl font-sans tracking-[0.35em] uppercase text-white font-extralight text-center"
          >
            BUILD THE <span className="font-normal text-white/40 block sm:inline">MATRIX</span>
          </motion.h1>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ delay: 0.3 }}
          className="font-sans text-[10px] tracking-[0.35em] text-white/70 uppercase mt-4 text-center"
        >
          {progress < 100 ? "PARSING WIREFRAME FACADE OUTLINES..." : "GEOMETRIC MATRIX COMPLETE"}
        </motion.p>
      </div>

      {/* Progress display */}
      <div className="flex flex-col gap-4 relative z-20">
        <div className="h-[1px] w-full bg-white/10 relative">
          <motion.div
            className="absolute left-0 top-0 h-full bg-white"
            initial={{ width: "0%" }}
            animate={{ width: `${progress}%` }}
            transition={{ ease: "easeOut" }}
          />
        </div>

        <div className="flex justify-between items-baseline">
          <span className="font-sans text-[9px] uppercase tracking-[0.25em] text-white/30">
            © BUILD THE MATRIX LLC
          </span>

          <span className="font-sans text-3xl font-extralight text-white flex items-baseline">
            <span className="text-[10px] uppercase tracking-widest text-[#7F7A75] mr-2 font-normal">LOADING</span>
            {progress}
            <span className="text-xs text-[#7F7A75] font-normal ml-0.5">%</span>
          </span>
        </div>
      </div>
    </motion.div>
  );
}
