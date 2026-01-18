import { motion } from "framer-motion";
import {
  Mail,
  MapPin,
  Calendar,
  Instagram,
  Twitter,
  Linkedin,
} from "lucide-react";

const Footer = () => {
  return (
    <footer id="register" className="relative py-24 bg-card/50">
      {/* Top gradient line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

      <div className="container mx-auto px-6">
        {/* CTA Section */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">
            Ready to{" "}
            <span className="text-gradient-gold">Make Your Mark</span>?
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto mb-8">
            Join us in Bhubaneswar for two days of diplomatic excellence.
            Registration opens soon.
          </p>
          <a
            href="https://forms.google.com"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gold inline-block"
          >
            Register Interest
          </a>
        </motion.div>

        {/* Info Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {/* Date */}
          <motion.div
            className="card-diplomatic p-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-start gap-4">
              <Calendar className="w-5 h-5 text-primary mt-1" />
              <div>
                <h3 className="font-serif text-lg font-semibold text-foreground mb-2">
                  Event Date
                </h3>
                <p className="text-muted-foreground">April 04–05, 2026</p>
              </div>
            </div>
          </motion.div>

          {/* Venue */}
          <motion.div
            className="card-diplomatic p-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="flex items-start gap-4">
              <MapPin className="w-5 h-5 text-primary mt-1" />
              <div>
                <h3 className="font-serif text-lg font-semibold text-foreground mb-2">
                  Venue
                </h3>
                <p className="text-muted-foreground">
                  World Skill Centre
                  <br />
                  Bhubaneswar, Odisha
                </p>
              </div>
            </div>
          </motion.div>

          {/* Contact */}
          <motion.div
            className="card-diplomatic p-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="flex items-start gap-4">
              <Mail className="w-5 h-5 text-primary mt-1" />
              <div>
                <h3 className="font-serif text-lg font-semibold text-foreground mb-2">
                  Contact
                </h3>
                <p className="text-muted-foreground">
                  aeternummun1@gmail.com
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <span className="text-xl font-serif font-bold text-gradient-gold">
                Aeternum <span className="ml-1">MUN</span>
              </span>
              <span className="text-xs font-mono text-muted-foreground">
                2026
              </span>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-4">
              {[Instagram, Twitter, Linkedin].map((Icon, index) => (
                <a
                  key={index}
                  href="#"
                  className="w-10 h-10 border border-border/50 rounded-full flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/30 transition-all duration-300"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>

            {/* Copyright */}
            <p className="text-xs font-mono text-muted-foreground tracking-wider">
              © 2026 Aeternum MUN. All rights reserved.
            </p>
          </div>
        </div>
      </div>

      {/* HUD corner accents */}
      <div className="absolute bottom-4 left-4 font-mono text-[10px] text-muted-foreground/30 tracking-wider hidden md:block">
        PROTOCOL.END
      </div>
      <div className="absolute bottom-4 right-4 font-mono text-[10px] text-muted-foreground/30 tracking-wider hidden md:block">
        SYS.2026.AETERNUM
      </div>
    </footer>
  );
};

export default Footer;
