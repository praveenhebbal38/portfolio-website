import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Camera, Menu, X, Instagram, Phone } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { CONTACT_DETAILS } from '@/src/constants';

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'Portfolio', href: '/portfolio' },
  { name: 'Services', href: '/services' },
  { name: 'Contact', href: '/contact' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4',
        scrolled ? 'glass py-3' : 'bg-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 bg-gold rounded-full flex items-center justify-center group-hover:rotate-12 transition-transform">
            <Camera className="text-charcoal w-6 h-6" />
          </div>
          <span className="text-xl font-serif font-bold tracking-tight">
            Mulla <span className="text-gold">Photography</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.href}
              className={cn(
                'text-sm font-medium transition-colors hover:text-gold',
                location.pathname === link.href ? 'text-gold' : 'text-white/70'
              )}
            >
              {link.name}
            </Link>
          ))}
          <a 
            href={CONTACT_DETAILS.socials.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/70 hover:text-gold transition-colors"
          >
            <Instagram className="w-5 h-5" />
          </a>
          <Link
            to="/admin"
            className="text-xs uppercase tracking-widest text-white/40 hover:text-gold transition-colors"
          >
            Admin
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 glass border-t border-white/10 md:hidden flex flex-col p-6 gap-4"
          >
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                onClick={() => setIsOpen(false)}
                className="text-lg font-medium hover:text-gold transition-colors"
              >
                {link.name}
              </Link>
            ))}
            <div className="flex gap-6 pt-4 border-t border-white/10">
              <a 
                href={CONTACT_DETAILS.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/60 hover:text-gold transition-colors"
              >
                <Instagram className="w-6 h-6" />
              </a>
              <a 
                href={`tel:${CONTACT_DETAILS.phone}`}
                className="text-white/60 hover:text-gold transition-colors"
              >
                <Phone className="w-6 h-6" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
