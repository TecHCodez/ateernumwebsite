import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';

interface LoadingScreenProps {
  onComplete: () => void;
}

const LoadingScreen = ({ onComplete }: LoadingScreenProps) => {
  const [isVisible, setIsVisible] = useState(true);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const arcRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);

    // World map dot coordinates (simplified projection)
    const dots: { x: number; y: number; baseOpacity: number; phase: number }[] = [];
    
    // Generate dots based on simplified world map regions
    const generateWorldDots = () => {
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const mapWidth = Math.min(canvas.width * 0.7, 900);
      const mapHeight = mapWidth * 0.5;
      
      // Simplified continent regions
      const regions = [
        // North America
        { xMin: -0.45, xMax: -0.15, yMin: -0.35, yMax: 0.1, density: 0.6 },
        // South America
        { xMin: -0.25, xMax: -0.05, yMin: 0.1, yMax: 0.45, density: 0.5 },
        // Europe
        { xMin: -0.05, xMax: 0.15, yMin: -0.35, yMax: -0.1, density: 0.8 },
        // Africa
        { xMin: -0.1, xMax: 0.2, yMin: -0.1, yMax: 0.35, density: 0.5 },
        // Asia
        { xMin: 0.1, xMax: 0.5, yMin: -0.4, yMax: 0.15, density: 0.7 },
        // India (highlight)
        { xMin: 0.2, xMax: 0.3, yMin: -0.05, yMax: 0.15, density: 1.2 },
        // Australia
        { xMin: 0.35, xMax: 0.5, yMin: 0.2, yMax: 0.4, density: 0.4 },
      ];

      regions.forEach(region => {
        const dotCount = Math.floor(80 * region.density);
        for (let i = 0; i < dotCount; i++) {
          const x = centerX + (region.xMin + Math.random() * (region.xMax - region.xMin)) * mapWidth;
          const y = centerY + (region.yMin + Math.random() * (region.yMax - region.yMin)) * mapHeight;
          dots.push({
            x,
            y,
            baseOpacity: 0.3 + Math.random() * 0.4,
            phase: Math.random() * Math.PI * 2,
          });
        }
      });
    };

    generateWorldDots();

    // Animation loop
    let animationFrame: number;
    let startTime = Date.now();

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const elapsed = Date.now() - startTime;

      // Draw dots with pulsing effect
      dots.forEach(dot => {
        const pulse = Math.sin(elapsed * 0.001 + dot.phase) * 0.3 + 0.7;
        const opacity = dot.baseOpacity * pulse;
        
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, 1.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(207, 174, 112, ${opacity})`;
        ctx.fill();
      });

      // Draw India highlight
      const indiaX = canvas.width / 2 + 0.25 * Math.min(canvas.width * 0.7, 900);
      const indiaY = canvas.height / 2 + 0.05 * Math.min(canvas.width * 0.7, 900) * 0.5;
      
      const glowPulse = Math.sin(elapsed * 0.002) * 0.3 + 0.7;
      
      // Outer glow
      const gradient = ctx.createRadialGradient(indiaX, indiaY, 0, indiaX, indiaY, 50);
      gradient.addColorStop(0, `rgba(255, 122, 24, ${0.4 * glowPulse})`);
      gradient.addColorStop(0.5, `rgba(207, 174, 112, ${0.2 * glowPulse})`);
      gradient.addColorStop(1, 'rgba(207, 174, 112, 0)');
      
      ctx.beginPath();
      ctx.arc(indiaX, indiaY, 50, 0, Math.PI * 2);
      ctx.fillStyle = gradient;
      ctx.fill();

      // Inner bright dot
      ctx.beginPath();
      ctx.arc(indiaX, indiaY, 4, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 122, 24, ${0.8 + glowPulse * 0.2})`;
      ctx.fill();

      animationFrame = requestAnimationFrame(animate);
    };

    animate();

    // GSAP arc animation
    if (arcRef.current) {
      const arcLength = arcRef.current.getTotalLength();
      gsap.set(arcRef.current, {
        strokeDasharray: arcLength,
        strokeDashoffset: arcLength,
      });
      gsap.to(arcRef.current, {
        strokeDashoffset: 0,
        duration: 2,
        ease: 'power2.inOut',
        delay: 0.5,
      });
    }

    // Mouse parallax effect
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const x = (e.clientX - window.innerWidth / 2) / 50;
        const y = (e.clientY - window.innerHeight / 2) / 50;
        gsap.to(containerRef.current, {
          x: x,
          y: y,
          duration: 0.5,
          ease: 'power2.out',
        });
      }
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Complete loading after animation
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onComplete, 800);
    }, 3000);

    return () => {
      window.removeEventListener('resize', setCanvasSize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrame);
      clearTimeout(timer);
    };
  }, [onComplete]);

  // Calculate arc path for SVG
  const getArcPath = () => {
    const width = typeof window !== 'undefined' ? window.innerWidth : 1200;
    const height = typeof window !== 'undefined' ? window.innerHeight : 800;
    const mapWidth = Math.min(width * 0.7, 900);
    
    // Start point (Americas)
    const startX = width / 2 - 0.3 * mapWidth;
    const startY = height / 2 - 0.1 * mapWidth * 0.5;
    
    // End point (India)
    const endX = width / 2 + 0.25 * mapWidth;
    const endY = height / 2 + 0.05 * mapWidth * 0.5;
    
    // Control point for curve (arc upward)
    const ctrlX = width / 2;
    const ctrlY = height / 2 - 0.4 * mapWidth * 0.5;
    
    return `M ${startX} ${startY} Q ${ctrlX} ${ctrlY} ${endX} ${endY}`;
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-background"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
        >
          {/* HUD Frame */}
          <div className="absolute inset-8 border border-primary/10 pointer-events-none">
            <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-primary/40" />
            <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-primary/40" />
            <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-primary/40" />
            <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-primary/40" />
          </div>

          {/* World Map Canvas */}
          <div ref={containerRef} className="relative w-full h-full">
            <canvas
              ref={canvasRef}
              className="absolute inset-0"
            />
            
            {/* Arc Path SVG */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
              <defs>
                <linearGradient id="arcGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="rgba(207, 174, 112, 0.2)" />
                  <stop offset="50%" stopColor="rgba(255, 122, 24, 0.6)" />
                  <stop offset="100%" stopColor="rgba(255, 122, 24, 1)" />
                </linearGradient>
              </defs>
              <path
                ref={arcRef}
                d={getArcPath()}
                fill="none"
                stroke="url(#arcGradient)"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </div>

          {/* Loading Text */}
          <motion.div
            className="absolute bottom-24 left-1/2 -translate-x-1/2 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <p className="font-mono text-xs tracking-[0.3em] text-primary/80 uppercase mb-4">
              Establishing Diplomatic Uplink…
            </p>
            <div className="w-48 h-px bg-primary/20 mx-auto overflow-hidden">
              <motion.div
                className="h-full bg-primary"
                initial={{ x: '-100%' }}
                animate={{ x: '100%' }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'linear',
                }}
              />
            </div>
          </motion.div>

          {/* Corner coordinates */}
          <div className="absolute bottom-8 left-8 font-mono text-[10px] text-muted-foreground/50 tracking-wider">
            20.2961° N, 85.8245° E
          </div>
          <div className="absolute bottom-8 right-8 font-mono text-[10px] text-muted-foreground/50 tracking-wider">
            BHUBANESWAR, INDIA
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
