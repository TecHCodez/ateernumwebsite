import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Quote } from 'lucide-react';

const SecGenMessage = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="message" className="relative py-24 lg:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/20 to-background" />
      
      {/* Decorative circles */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-primary/5 rounded-full" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] border border-primary/10 rounded-full" />

      <div ref={ref} className="container mx-auto px-6 relative z-10">
        <motion.div
          className="max-w-4xl mx-auto text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          {/* Section Label */}
          <span className="text-xs font-mono tracking-[0.3em] text-primary uppercase">
            From Our Leadership
          </span>

          {/* Quote Icon */}
          <motion.div
            className="my-8"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Quote className="w-12 h-12 text-primary/40 mx-auto" />
          </motion.div>

          {/* Quote Text */}
          <motion.blockquote
            className="text-xl md:text-2xl lg:text-3xl font-serif leading-relaxed text-foreground mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            "Aeternum</span>MUN stands as a platform where ideas are challenged, diplomacy is refined, 
            and leadership is forged. As delegates engage with complex global issues, we 
            encourage integrity, collaboration, and vision. We look forward to welcoming you 
            to a conference rooted in{' '}
            <span className="text-gradient-gold">excellence</span> and{' '}
            <span className="text-gradient-gold">purpose</span>."
          </motion.blockquote>

          {/* Signature */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <div className="w-16 h-px bg-primary mx-auto mb-6" />
            <p className="font-signature text-3xl text-primary mb-2">
              Secretary General
            </p>
            <p className="text-sm font-mono tracking-[0.2em] uppercase text-muted-foreground">
              Aeternum</span>MUN 2026
            </p>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom accent */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
    </section>
  );
};

export default SecGenMessage;
