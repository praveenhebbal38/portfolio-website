import { Instagram, Mail, Phone, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { CONTACT_DETAILS } from '@/src/constants';

export default function Footer() {
  return (
    <footer className="bg-black border-t border-white/5 pt-16 pb-8 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="space-y-4">
          <h3 className="text-2xl font-serif font-bold">
            Mulla <span className="text-gold">Photography</span>
          </h3>
          <p className="text-white/50 text-sm leading-relaxed max-w-xs">
            Capturing your most precious moments with elegance and sophistication. 
            Specializing in weddings, portraits, and commercial photography.
          </p>
          <div className="flex gap-4">
            <a 
              href={CONTACT_DETAILS.socials.instagram} 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-5 h-5 text-white/40 hover:text-gold transition-colors"
            >
              <Instagram className="w-full h-full" />
            </a>
          </div>
        </div>

        <div>
          <h4 className="text-gold font-medium mb-6 uppercase tracking-widest text-xs">Quick Links</h4>
          <ul className="space-y-3 text-sm text-white/60">
            <li><Link to="/" className="hover:text-gold transition-colors">Home</Link></li>
            <li><Link to="/portfolio" className="hover:text-gold transition-colors">Portfolio</Link></li>
            <li><Link to="/services" className="hover:text-gold transition-colors">Services</Link></li>
            <li><Link to="/contact" className="hover:text-gold transition-colors">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-gold font-medium mb-6 uppercase tracking-widest text-xs">Services</h4>
          <ul className="space-y-3 text-sm text-white/60">
            <li>Wedding Photography</li>
            <li>Portrait Sessions</li>
            <li>Event Coverage</li>
            <li>Product Printing</li>
            <li>Studio Shoots</li>
          </ul>
        </div>

        <div>
          <h4 className="text-gold font-medium mb-6 uppercase tracking-widest text-xs">Contact Info</h4>
          <ul className="space-y-4 text-sm text-white/60">
            <li className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-gold shrink-0" />
              <span>{CONTACT_DETAILS.address}</span>
            </li>
            <li className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-gold shrink-0" />
              <span>{CONTACT_DETAILS.phone}</span>
            </li>
            <li className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-gold shrink-0" />
              <span>{CONTACT_DETAILS.email}</span>
            </li>
          </ul>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-white/5 flex flex-col md:row items-center justify-between gap-4 text-xs text-white/30 uppercase tracking-widest">
        <p>© {new Date().getFullYear()} Mulla Photography. All rights reserved.</p>
        <p>Designed with passion</p>
      </div>
    </footer>
  );
}
