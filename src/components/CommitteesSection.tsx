import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Scale, Shield, Building2, Camera, X } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';

const committees = [
  {
    id: 'unhrc',
    name: 'UNHRC',
    fullName: 'United Nations Human Rights Council',
    icon: Scale,
    description: 'Discussing international human rights crises, accountability mechanisms, and humanitarian policy frameworks.',
    details: 'The UNHRC is responsible for strengthening the promotion and protection of human rights around the globe. Delegates will address pressing humanitarian concerns and work towards comprehensive resolutions.',
    color: 'from-amber-500/20 to-amber-600/10',
  },
  {
    id: 'disec',
    name: 'DISEC',
    fullName: 'Disarmament and International Security Committee',
    icon: Shield,
    description: 'Focused on global security challenges, arms regulation, and international peacekeeping.',
    details: 'As the First Committee of the General Assembly, DISEC deals with disarmament, global challenges, and threats to peace. Delegates will negotiate on critical security matters affecting international stability.',
    color: 'from-primary/20 to-primary/10',
  },
  {
    id: 'aippm',
    name: 'AIPPM',
    fullName: 'All India Political Parties Meet',
    icon: Building2,
    description: 'A simulation of India\'s political landscape, encouraging consensus-building and strategic debate.',
    details: 'This unique committee simulates the dynamics of Indian parliamentary democracy. Delegates will represent various political parties and engage in spirited debate on national issues.',
    color: 'from-accent/20 to-accent/10',
  },
  {
    id: 'ip',
    name: 'International Press',
    fullName: 'International Press Corps',
    icon: Camera,
    description: 'Journalists, photographers, and analysts documenting proceedings with integrity and impact.',
    details: 'The IP Corps plays a vital role in conference proceedings. Members will report on committee sessions, interview delegates, and produce journalistic content that captures the essence of Aeternum MUN.',
    color: 'from-muted-foreground/20 to-muted/10',
  },
];

const CommitteesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [selectedCommittee, setSelectedCommittee] = useState<typeof committees[0] | null>(null);

  return (
    <section id="committees" className="relative py-24 lg:py-32 bg-secondary/30">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />

      <div ref={ref} className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <span className="text-xs font-mono tracking-[0.3em] text-primary uppercase">
            Our Forums
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-bold mt-4 mb-6">
            <span className="text-gradient-gold">Committees</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Four distinct arenas where diplomacy unfolds and future leaders emerge
          </p>
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-primary to-transparent mx-auto mt-6" />
        </motion.div>

        {/* Committees Grid */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto">
          {committees.map((committee, index) => (
            <motion.div
              key={committee.id}
              className="group cursor-pointer"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
              onClick={() => setSelectedCommittee(committee)}
            >
              <div className={`
                relative overflow-hidden rounded-lg border border-border/50 
                bg-gradient-to-br ${committee.color} backdrop-blur-sm
                p-8 h-full transition-all duration-500
                hover:border-primary/40 hover:shadow-xl hover:shadow-primary/10
                group-hover:-translate-y-2
              `}>
                {/* Corner accents */}
                <div className="absolute top-0 left-0 w-8 h-8 border-t border-l border-primary/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-primary/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Icon */}
                <div className="mb-6">
                  <committee.icon className="w-10 h-10 text-primary group-hover:scale-110 transition-transform duration-500" />
                </div>

                {/* Content */}
                <h3 className="font-serif text-2xl font-bold text-foreground mb-2">
                  {committee.name}
                </h3>
                <p className="text-xs font-mono tracking-[0.15em] uppercase text-muted-foreground mb-4">
                  {committee.fullName}
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  {committee.description}
                </p>

                {/* Learn More Indicator */}
                <div className="mt-6 flex items-center gap-2 text-primary text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="font-mono tracking-wider">Learn More</span>
                  <span className="text-lg">→</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Committee Detail Dialog */}
      <Dialog open={!!selectedCommittee} onOpenChange={() => setSelectedCommittee(null)}>
        <DialogContent className="bg-card border-border/50 max-w-lg">
          <DialogHeader>
            <div className="flex items-center gap-4 mb-2">
              {selectedCommittee && (
                <selectedCommittee.icon className="w-8 h-8 text-primary" />
              )}
              <div>
                <DialogTitle className="font-serif text-2xl text-foreground">
                  {selectedCommittee?.name}
                </DialogTitle>
                <p className="text-xs font-mono tracking-[0.1em] uppercase text-muted-foreground">
                  {selectedCommittee?.fullName}
                </p>
              </div>
            </div>
          </DialogHeader>
          <DialogDescription className="text-muted-foreground leading-relaxed">
            {selectedCommittee?.details}
          </DialogDescription>
          <div className="mt-4 pt-4 border-t border-border">
            <button className="btn-diplomatic w-full text-xs">
              Express Interest
            </button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Bottom accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
    </section>
  );
};

export default CommitteesSection;
