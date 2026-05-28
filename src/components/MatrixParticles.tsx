import React, { useEffect, useRef } from "react";

interface MatrixParticlesProps {
  particleCount?: number;
  showGrid?: boolean;
  accentColor?: string; // e.g., "rgba(0, 229, 255, " for electric blue
  gridColor?: string;
}

export default function MatrixParticles({
  particleCount = 50,
  showGrid = true,
  accentColor = "rgba(0, 229, 255, ",
  gridColor = "rgba(255, 255, 255, 0.02)"
}: MatrixParticlesProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = 0;
    let height = 0;

    interface Particle {
      x: number;
      y: number;
      size: number;
      speed: number;
      alpha: number;
      isElectric: boolean;
    }
    const particles: Particle[] = [];

    const initParticles = () => {
      particles.length = 0;
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          size: Math.random() * 1.5 + 0.6,
          speed: Math.random() * 0.4 + 0.15,
          alpha: Math.random() * 0.6 + 0.2,
          isElectric: Math.random() < 0.35 // 35% electric blue
        });
      }
    };

    // Resize observer to handle dynamic section sizing beautifully
    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const { width: entryWidth, height: entryHeight } = entry.contentRect;
        width = canvas.width = entryWidth;
        height = canvas.height = entryHeight;
        if (particles.length === 0) {
          initParticles();
        } else {
          // Adjust particles to fit bounds
          particles.forEach((p) => {
            p.x = Math.min(p.x, width);
            p.y = Math.min(p.y, height);
          });
        }
      }
    });

    resizeObserver.observe(container);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw subtle grid lines mimicking the blueprint architecture
      if (showGrid) {
        ctx.strokeStyle = gridColor;
        ctx.lineWidth = 0.5;
        const gridSize = 65;
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
      }

      // Draw and drift floating particles upward
      particles.forEach((p) => {
        p.y -= p.speed;
        if (p.y < 0) {
          p.y = height;
          p.x = Math.random() * width;
        }

        if (p.isElectric) {
          ctx.fillStyle = `${accentColor}${p.alpha})`;
        } else {
          ctx.fillStyle = `rgba(255, 255, 255, ${p.alpha})`;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
    };
  }, [particleCount, showGrid, accentColor, gridColor]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none overflow-hidden select-none"
      style={{ zIndex: 0 }}
    >
      <canvas ref={canvasRef} className="block w-full h-full opacity-60" />
    </div>
  );
}
