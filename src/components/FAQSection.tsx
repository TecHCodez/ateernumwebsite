import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const faqs = [
  {
    question: 'Who can participate in Aeternum MUN?',
    answer:
      'Students from schools and universities worldwide with an interest in diplomacy, international relations, and global affairs are welcome to participate. We encourage delegates of all experience levels to join us.',
  },
  {
    question: 'Is prior MUN experience required?',
    answer:
      'No prior experience is required. We provide comprehensive training resources, committee guides, and preparatory materials to help first-time delegates feel confident and prepared.',
  },
  {
    question: 'What are the registration fees?',
    answer:
      'Registration fees will be released with the official registration opening. Early bird discounts will be available shortly.',
  },
  {
    question: 'What should I bring to the conference?',
    answer:
      'Delegates should wear attire notified by the organizing committee, their position papers, research materials, and enthusiasm. Detailed packing guidelines will be shared closer to the event. Please follow the rules specified by the Organizing Team.',
  },
  {
    question: 'How are committees and country assignments made?',
    answer:
      'Country assignments are based on preference, experience level, and delegation size. We strive to accommodate preferences while ensuring balanced and meaningful debate in all committees.',
  },
  {
    question: 'How do I contact the Aeternum MUN team?',
    answer: (
      <div className="space-y-4">
        <div>
          <p className="font-semibold text-foreground">
            Pratyush Kumar Samal <span className="text-sm text-muted-foreground">(Secretary General)</span>
          </p>
          <p className="text-primary font-medium">📞 7381320823</p>
        </div>

        <div>
          <p className="font-semibold text-foreground">
            Shihan Jaiswal <span className="text-sm text-muted-foreground">(Director General)</span>
          </p>
          <p className="text-primary font-medium">📞 +91 99381 39166</p>
        </div>

        <div>
          <p className="font-semibold text-foreground">
            Priyansi Pati <span className="text-sm text-muted-foreground">(Deputy Secretary General)</span>
          </p>
          <p className="text-primary font-medium">📞 +91 63711 92447</p>
        </div>

        <div>
          <p className="font-semibold text-foreground">
            Angelina Samantaray <span className="text-sm text-muted-foreground">(Charge, D. Affairs)</span>
          </p>
          <p className="text-primary font-medium">📞 +91 97780 24511</p>
        </div>
        </div>
      </div>
    ),
  },
];

const FAQSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="faq" className="relative py-24 lg:py-32 bg-secondary/20">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `
              radial-gradient(circle at 2px 2px, hsl(var(--primary)) 1px, transparent 0)
            `,
            backgroundSize: '40px 40px',
          }}
        />
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
            Have Questions?
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-bold mt-4 mb-6">
            Frequently Asked <span className="text-gradient-gold">Questions</span>
          </h2>
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-primary to-transparent mx-auto" />
        </motion.div>

        {/* FAQ Accordion */}
        <motion.div
          className="max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
              >
                <AccordionItem
                  value={`item-${index}`}
                  className="card-diplomatic px-6 border-border/50 hover:border-primary/30 transition-colors duration-300"
                >
                  <AccordionTrigger className="text-left font-serif text-lg text-foreground hover:text-primary hover:no-underline py-5">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed pb-5">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </motion.div>
      </div>

      {/* Bottom accent */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
    </section>
  );
};

export default FAQSection;
