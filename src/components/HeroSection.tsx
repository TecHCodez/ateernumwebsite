import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';

const HeroSection = () => {
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const heroRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const targetDate = new Date('April 4, 2026 00:00:00').getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance > 0) {
        setCountdown({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Parallax effect on grid
    const handleMouseMove = (e: MouseEvent) => {
      if (gridRef.current) {
        const x = (e.clientX - window.innerWidth / 2) / 30;
        const y = (e.clientY - window.innerHeight / 2) / 30;
        gsap.to(gridRef.current, {
          x: x,
          y: y,
          duration: 0.8,
          ease: 'power2.out',
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const formatNumber = (num: number) => String(num).padStart(2, '0');

  const scrollToRegister = () => {
    const element = document.querySelector('#register');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Grid */}
      <div
        ref={gridRef}
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(to right, hsl(var(--border)) 1px, transparent 1px),
            linear-gradient(to bottom, hsl(var(--border)) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Radial Gradient Overlay */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 0%, hsl(var(--background)) 70%)',
        }}
      />

      {/* Longitude/Latitude Lines */}
      <div className="absolute inset-0 pointer-events-none">
        <svg className="w-full h-full opacity-5">
          <ellipse
            cx="50%"
            cy="50%"
            rx="35%"
            ry="25%"
            fill="none"
            stroke="hsl(var(--primary))"
            strokeWidth="1"
          />
          <ellipse
            cx="50%"
            cy="50%"
            rx="45%"
            ry="32%"
            fill="none"
            stroke="hsl(var(--primary))"
            strokeWidth="0.5"
          />
          <line x1="50%" y1="0" x2="50%" y2="100%" stroke="hsl(var(--primary))" strokeWidth="0.5" />
          <line x1="0" y1="50%" x2="100%" y2="50%" stroke="hsl(var(--primary))" strokeWidth="0.5" />
        </svg>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          {/* Pre-title */}
          <motion.p
            className="text-xs font-mono tracking-[0.4em] text-muted-foreground uppercase mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            A Premier Model United Nations Experience
          </motion.p>

          {/* Main Title */}
          <motion.h1
            className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
          >
            <span className="text-gradient-gold glow-text">Aeternum</span>
            <span className="text-foreground">MUN</span>
          </motion.h1>

          {/* Year */}
          <motion.p
            className="text-6xl md:text-8xl font-serif font-light text-primary/20 mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
          >
            2026
          </motion.p>

          {/* Date & Venue */}
          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 mb-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4, duration: 0.8 }}
          >
            <div className="flex items-center gap-2">
              <div className="w-1 h-1 bg-primary rounded-full" />
              <span className="text-sm tracking-[0.2em] uppercase text-muted-foreground">
                April 04–05, 2026
              </span>
            </div>
            <div className="hidden sm:block w-8 h-px bg-border" />
            <div className="flex items-center gap-2">
              <div className="w-1 h-1 bg-accent rounded-full" />
              <span className="text-sm tracking-[0.2em] uppercase text-muted-foreground">
                World Skill Centre, Bhubaneswar
              </span>
            </div>
          </motion.div>

          {/* Countdown Timer */}
          <motion.div
            className="flex justify-center gap-4 sm:gap-8 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.6, duration: 0.8 }}
          >
            {[
              { value: countdown.days, label: 'Days' },
              { value: countdown.hours, label: 'Hours' },
              { value: countdown.minutes, label: 'Min' },
              { value: countdown.seconds, label: 'Sec' },
            ].map((item, index) => (
              <div
                key={item.label}
                className="relative border-hud bg-card/30 backdrop-blur-sm px-4 py-4 sm:px-6 sm:py-5"
              >
                <span className="block text-2xl sm:text-4xl md:text-5xl font-mono font-bold text-primary">
                  {formatNumber(item.value)}
                </span>
                <span className="block text-[10px] sm:text-xs font-mono tracking-[0.2em] uppercase text-muted-foreground mt-1">
                  {item.label}
                </span>
              </div>
            ))}
          </motion.div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.8, duration: 0.8 }}
          >
            <a 
              href="https://forms.google.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn-gold inline-block"
            >
              Secure Your Seat
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom Decorative Line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

      {/* Corner Markers */}
      <div className="absolute top-24 left-8 font-mono text-[10px] text-muted-foreground/40 tracking-wider hidden md:block">
        SYS.INIT//2026
      </div>
      <div className="absolute top-24 right-8 font-mono text-[10px] text-muted-foreground/40 tracking-wider hidden md:block">
        DIPLOMATIC.PROTOCOL.ACTIVE
      </div>
    </section>
  );
};

export default HeroSection;
