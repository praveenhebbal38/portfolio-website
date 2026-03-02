import { motion } from 'motion/react';
import ContactForm from '@/src/components/contact/ContactForm';
import { Mail, Phone, MapPin, Clock, Instagram } from 'lucide-react';
import { CONTACT_DETAILS } from '@/src/constants';

export default function Contact() {
  return (
    <div className="pt-32 pb-24 px-6 min-h-screen">
      <div className="max-w-7xl mx-auto space-y-16">
        <div className="text-center space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <span className="text-gold uppercase tracking-[0.3em] text-xs font-medium mb-4 block">Get In Touch</span>
            <h1 className="text-5xl md:text-7xl font-serif font-bold">Contact <span className="text-gold italic">Us</span></h1>
          </motion.div>
          <p className="text-white/50 max-w-2xl mx-auto text-lg">
            Have a project in mind? We'd love to hear from you. Reach out through the form below or use our contact details.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Info Cards */}
          <div className="lg:col-span-1 space-y-6">
            <div className="glass p-8 rounded-3xl space-y-6">
              <h3 className="text-xl font-serif font-bold text-gold">Contact Details</h3>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-gold/10 rounded-xl flex items-center justify-center text-gold shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-widest text-white/40 mb-1">Call Us</p>
                    <p className="font-medium">{CONTACT_DETAILS.phone}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-gold/10 rounded-xl flex items-center justify-center text-gold shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-widest text-white/40 mb-1">Email Us</p>
                    <p className="font-medium">{CONTACT_DETAILS.email}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-gold/10 rounded-xl flex items-center justify-center text-gold shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-widest text-white/40 mb-1">Visit Us</p>
                    <p className="font-medium">{CONTACT_DETAILS.address}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-gold/10 rounded-xl flex items-center justify-center text-gold shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-widest text-white/40 mb-1">Working Hours</p>
                    <p className="font-medium">{CONTACT_DETAILS.workingHours}</p>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-white/10">
                <p className="text-xs uppercase tracking-widest text-white/40 mb-4">Follow Us</p>
                <div className="flex gap-4">
                  <a 
                    href={CONTACT_DETAILS.socials.instagram} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-5 h-5 text-white/60 hover:text-gold transition-colors"
                  >
                    <Instagram className="w-full h-full" />
                  </a>
                </div>
              </div>
            </div>

            {/* Map Embed */}
            <div className="glass rounded-3xl overflow-hidden aspect-video relative">
              <iframe 
                src={CONTACT_DETAILS.googleMapsEmbedUrl}
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={true} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                className="grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-500"
              ></iframe>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
}
