import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { name: 'About', href: '#about' },
  { name: 'Committees', href: '#committees' },
  { name: 'Message', href: '#message' },
  { name: 'FAQ', href: '#faq' },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          isScrolled
            ? 'bg-background/80 backdrop-blur-lg border-b border-border/50'
            : 'bg-transparent'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <a href="#" className="flex items-center space-x-3">
              <span className="text-xl font-serif font-bold tracking-wide text-gradient-gold">
                Aeternum</span>MUN
              </span>
              <span className="text-[10px] font-mono text-muted-foreground tracking-[0.2em] uppercase">
                2026
               </span>
               </a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-12">
              {navLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={() => scrollToSection(link.href)}
                  className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors duration-300 underline-gold"
                >
                  {link.name}
                </button>
              ))}
              <a 
                href="https://forms.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-diplomatic text-xs"
              >
                Register
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-foreground"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <motion.div
        className={`fixed inset-0 z-30 bg-background/95 backdrop-blur-lg md:hidden ${
          isMobileMenuOpen ? 'pointer-events-auto' : 'pointer-events-none'
        }`}
        initial={{ opacity: 0 }}
        animate={{ opacity: isMobileMenuOpen ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex flex-col items-center justify-center h-full space-y-8">
          {navLinks.map((link, index) => (
            <motion.button
              key={link.name}
              onClick={() => scrollToSection(link.href)}
              className="text-2xl font-serif text-foreground hover:text-primary transition-colors"
              initial={{ opacity: 0, y: 20 }}
              animate={{
                opacity: isMobileMenuOpen ? 1 : 0,
                y: isMobileMenuOpen ? 0 : 20,
              }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              {link.name}
            </motion.button>
          ))}
          <motion.a
            href="https://forms.google.com"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gold mt-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{
              opacity: isMobileMenuOpen ? 1 : 0,
              y: isMobileMenuOpen ? 0 : 20,
            }}
            transition={{ duration: 0.3, delay: navLinks.length * 0.1 }}
          >
            Register Now
          </motion.a>
        </div>
      </motion.div>
    </>
  );
};

export default Navbar;
