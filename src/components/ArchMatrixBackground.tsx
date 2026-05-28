import React, { useEffect, useRef } from "react";

interface ArchMatrixBackgroundProps {
  particleCount?: number;
  showGrid?: boolean;
  gridColor?: string;
  accentColor?: string;
  wireframeColor?: string;
  showBuilding?: boolean;
  zIndex?: number;
  canvasOpacity?: string;
}

export default function ArchMatrixBackground({
  particleCount = 65,
  showGrid = true,
  gridColor = "rgba(255, 255, 255, 0.02)",
  accentColor = "rgba(0, 229, 255, ",
  wireframeColor = "rgba(255, 255, 255, 0.15)",
  showBuilding = true,
  zIndex = 0,
  canvasOpacity = "opacity-35"
}: ArchMatrixBackgroundProps) {
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
          size: Math.random() * 1.6 + 0.6,
          speed: Math.random() * 0.35 + 0.12,
          alpha: Math.random() * 0.5 + 0.15,
          isElectric: Math.random() < 0.38 // ~38% electric blue coordinate stars
        });
      }
    };

    // Keep tracked dimensions responsive to boundaries
    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const { width: entryWidth, height: entryHeight } = entry.contentRect;
        width = canvas.width = entryWidth;
        height = canvas.height = entryHeight;
        if (particles.length === 0) {
          initParticles();
        } else {
          // Keep floating coordinate stars bounded gracefully
          particles.forEach((p) => {
            p.x = Math.min(p.x, width);
            p.y = Math.min(p.y, height);
          });
        }
      }
    });

    resizeObserver.observe(container);

    let angle = -0.12;

    // Projection math replicating the preloader's isometric 3D drawing
    const draw3DBuilding = (
      xOffset: number,
      yOffset: number,
      scale: number,
      rotationY: number
    ) => {
      ctx.strokeStyle = wireframeColor;
      ctx.lineWidth = 0.85;

      const project = (x: number, y: number, z: number) => {
        const cosY = Math.cos(rotationY);
        const sinY = Math.sin(rotationY);
        const rx = x * cosY - z * sinY;
        const rz = x * sinY + z * cosY + 320; // depth offset
        const fov = 380; // perspective focal length
        
        return {
          x: (rx * fov) / rz + xOffset,
          y: (-y * fov) / rz + yOffset
        };
      };

      const drawLine = (p1: { x: number; y: number }, p2: { x: number; y: number }) => {
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.stroke();
      };

      // Coordinates for 3 interconnected blocks representing the premium architectural concept
      const blocks = [
        { w: 110, h: 200, d: 90, pos: { x: -55, y: -20, z: -45 } }, // main shaft
        { w: 75, h: 160, d: 75, pos: { x: 70, y: -20, z: -10 } },   // secondary block
        { w: 90, h: 90, d: 100, pos: { x: -165, y: -20, z: -35 } }  // horizontal projection
      ];

      blocks.forEach((b) => {
        const dx = b.pos.x * scale;
        const dy = b.pos.y * scale;
        const dz = b.pos.z * scale;
        const w = b.w * scale;
        const h = b.h * scale;
        const d = b.d * scale;

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

        // Bottom profile
        drawLine(v[0], v[1]);
        drawLine(v[1], v[2]);
        drawLine(v[2], v[3]);
        drawLine(v[3], v[0]);

        // Top profile
        drawLine(v[4], v[5]);
        drawLine(v[5], v[6]);
        drawLine(v[6], v[7]);
        drawLine(v[7], v[4]);

        // Verticals columns
        drawLine(v[0], v[4]);
        drawLine(v[1], v[5]);
        drawLine(v[2], v[6]);
        drawLine(v[3], v[7]);

        // Facade grid wireframe overlays
        ctx.save();
        ctx.strokeStyle = "rgba(255, 255, 255, 0.03)";
        for (let f = 0.25; f < 1; f += 0.25) {
          const pLeft = project(dx, dy + h * f, dz + d);
          const pRight = project(dx + w, dy + h * f, dz + d);
          drawLine(pLeft, pRight);
        }
        ctx.restore();
      });
    };

    const render = () => {
      // Clear with elegant black alpha to support overlays
      ctx.clearRect(0, 0, width, height);

      // 1. Blueprint grid structure
      if (showGrid) {
        ctx.strokeStyle = gridColor;
        ctx.lineWidth = 0.5;
        const gridSize = 72;
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

      // 2. Continuous rotating 3D architectural drawing centered elegantly in the viewport/container top portion
      // We set a dynamic scale based on width to fit notebooks easily
      if (showBuilding) {
        const modelScale = width < 768 ? 0.75 : 1.15;
        angle += 0.0006; // elegant ultra-slow rotation 
        
        // Center the 3D coordinates relative to the initial fold section (roughly matching screen center height)
        const centerY = Math.min(height / 2, 450);
        draw3DBuilding(width / 2, centerY, modelScale, angle);
      }

      // 3. Float particles upward with luxury micro-glows
      particles.forEach((p) => {
        p.y -= p.speed;
        if (p.y < 0) {
          p.y = height;
          p.x = Math.random() * width;
        }

        ctx.save();
        if (p.isElectric) {
          ctx.fillStyle = `${accentColor}${p.alpha * 1.25})`;
          ctx.shadowColor = "rgba(0, 229, 255, 0.75)";
          ctx.shadowBlur = 4.5;
        } else {
          ctx.fillStyle = `rgba(255, 255, 255, ${p.alpha})`;
          ctx.shadowBlur = 0;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
    };
  }, [particleCount, showGrid, gridColor, accentColor, wireframeColor, showBuilding]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none overflow-hidden select-none"
      style={{ zIndex }}
    >
      <canvas ref={canvasRef} className={`block w-full h-full ${canvasOpacity}`} />
    </div>
  );
}
