import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Globe, Users, Award, Target } from 'lucide-react';

const stats = [
  { icon: Users, value: '200+', label: 'Delegates Expected' },
  { icon: Globe, value: '4', label: 'Committees' },
  { icon: Award, value: '2', label: 'Days of Diplomacy' },
  { icon: Target, value: '1', label: 'Shared Vision' },
];

const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="about" className="relative py-24 lg:py-32 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <svg className="w-full h-full">
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path
              d="M 40 0 L 0 0 0 40"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.5"
              className="text-primary"
            />
          </pattern>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div ref={ref} className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <span className="text-xs font-mono tracking-[0.3em] text-primary uppercase">
            About the Conference
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-bold mt-4 mb-6">
            Where <span className="text-gradient-gold">Diplomacy</span> Meets Excellence
          </h2>
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-primary to-transparent mx-auto" />
        </motion.div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              Aeternum MUN is a premier Model United Nations conference that brings together
              future diplomats, leaders, and policymakers to engage in high-level debate, 
              negotiation, and international cooperation.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              Hosted in the heart of Odisha at the prestigious World Skill Centre, the 
              conference fosters critical thinking, diplomatic realism, and global awareness 
              through immersive committee simulations.
            </p>
            
            {/* Features */}
            <div className="space-y-4">
              {['Immersive Simulations', 'Expert Chairs', 'Networking Opportunities'].map((feature, index) => (
                <motion.div
                  key={feature}
                  className="flex items-center gap-3"
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                >
                  <div className="w-2 h-2 bg-primary rotate-45" />
                  <span className="text-foreground">{feature}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Stats Grid */}
          <motion.div
            className="grid grid-cols-2 gap-4"
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                className="card-diplomatic p-6 text-center group hover:border-primary/30 transition-all duration-500"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <stat.icon className="w-8 h-8 text-primary mx-auto mb-4 group-hover:scale-110 transition-transform duration-300" />
                <span className="block text-3xl font-serif font-bold text-foreground mb-2">
                  {stat.value}
                </span>
                <span className="text-xs font-mono tracking-[0.15em] uppercase text-muted-foreground">
                  {stat.label}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Bottom accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
    </section>
  );
};

export default AboutSection;
