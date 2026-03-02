import { motion } from 'motion/react';
import { ArrowRight, Camera, Star, Award, Users, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import PortfolioGrid from '../components/portfolio/PortfolioGrid';
import ContactForm from '../components/contact/ContactForm';
import { CONTACT_DETAILS } from '../constants';

export default function Home() {
  return (
    <div className="space-y-32 pb-24">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden px-6">
        <div className="absolute inset-0 z-0">
          <img 
            src={CONTACT_DETAILS.heroImage} 
            className="w-full h-full object-cover opacity-60"
            alt="Hero Background"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-charcoal/20 via-charcoal/60 to-charcoal" />
        </div>

        <div className="relative z-10 max-w-5xl text-center space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-gold uppercase tracking-[0.3em] text-sm font-medium mb-4 block">Premium Photography Studio</span>
            <h1 className="text-6xl md:text-8xl font-serif font-bold leading-tight">
              Capturing <span className="italic text-gradient-gold">Eternal</span> <br /> Moments
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-white/60 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
          >
            Experience the art of visual storytelling. We blend sophisticated aesthetics 
            with raw emotion to create timeless memories.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6"
          >
            <Link 
              to="/portfolio" 
              className="bg-gold hover:bg-gold-light text-charcoal px-10 py-4 rounded-full font-bold transition-all transform hover:scale-105 flex items-center gap-2"
            >
              View Portfolio <ArrowRight className="w-5 h-5" />
            </Link>
            <Link 
              to="/services" 
              className="glass hover:bg-white/10 px-10 py-4 rounded-full font-bold transition-all"
            >
              Our Services
            </Link>
          </motion.div>
        </div>

        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/30"
        >
          <span className="text-[10px] uppercase tracking-widest">Scroll to explore</span>
          <div className="w-px h-12 bg-gradient-to-b from-gold to-transparent" />
        </motion.div>
      </section>

      {/* Why Choose Us */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20 space-y-4">
          <h2 className="text-4xl md:text-5xl font-serif font-bold">Why <span className="text-gold">Mulla</span> Photography?</h2>
          <div className="w-24 h-1 bg-gold mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { icon: Camera, title: "Pro Equipment", desc: "Using the latest Sony Alpha series for unmatched clarity." },
            { icon: Star, title: "Artistic Vision", desc: "Every shot is composed with an editorial eye for detail." },
            { icon: Award, title: "Certified Excellence", desc: "Award-winning studio with 10+ years of experience." },
            { icon: Users, title: "Client Focused", desc: "We tailor every session to your unique personality." }
          ].map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass p-8 rounded-3xl text-center space-y-4 hover:glass-gold transition-all group"
            >
              <div className="w-16 h-16 bg-gold/10 rounded-2xl flex items-center justify-center text-gold mx-auto group-hover:bg-gold group-hover:text-charcoal transition-all">
                <feature.icon className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold">{feature.title}</h3>
              <p className="text-white/50 text-sm leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Portfolio Preview */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:row items-end justify-between mb-12 gap-6">
          <div className="space-y-4">
            <h2 className="text-4xl md:text-5xl font-serif font-bold">Featured <span className="text-gold">Works</span></h2>
            <p className="text-white/50 max-w-md">A glimpse into our world of visual storytelling across various categories.</p>
          </div>
          <Link to="/portfolio" className="text-gold flex items-center gap-2 hover:gap-4 transition-all font-medium">
            Explore Full Gallery <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
        
        <PortfolioGrid limit={6} />
      </section>

      {/* Stats Section */}
      <section className="bg-gold/5 py-24">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
          {[
            { label: "Happy Clients", value: "500+" },
            { label: "Weddings Shot", value: "150+" },
            { label: "Photos Taken", value: "1M+" },
            { label: "Years Experience", value: "10+" }
          ].map((stat, i) => (
            <div key={i} className="space-y-2">
              <div className="text-4xl md:text-5xl font-serif font-bold text-gold">{stat.value}</div>
              <div className="text-xs uppercase tracking-widest text-white/40">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <ContactForm />
    </div>
  );
}
