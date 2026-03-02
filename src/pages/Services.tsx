import { motion } from 'motion/react';
import ServiceCard from '../components/services/ServiceCard';
import { Printer, Camera } from 'lucide-react';
import { PHOTOGRAPHY_SERVICES, PRINTING_SERVICES, type ServiceItem } from '../constants';

export default function Services() {
  return (
    <div className="pt-32 pb-24 px-6 min-h-screen space-y-32">
      <div className="max-w-7xl mx-auto space-y-16">
        <div className="text-center space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <span className="text-gold uppercase tracking-[0.3em] text-xs font-medium mb-4 block">Pricing & Packages</span>
            <h1 className="text-5xl md:text-7xl font-serif font-bold">Our <span className="text-gold italic">Services</span></h1>
          </motion.div>
          <p className="text-white/50 max-w-2xl mx-auto text-lg">
            Transparent pricing for premium quality. Choose the package that fits your needs or contact us for a custom quote.
          </p>
        </div>

        <div className="space-y-12">
          <div className="flex items-center gap-4 mb-8">
            <Camera className="text-gold w-6 h-6" />
            <h2 className="text-3xl font-serif font-bold">Photography Packages</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {PHOTOGRAPHY_SERVICES.map((service, i) => (
              <ServiceCard 
                key={i} 
                title={service.title}
                price={service.price}
                category={service.category}
                features={service.features}
                isPopular={service.isPopular}
              />
            ))}
          </div>
        </div>

        <div className="space-y-12">
          <div className="flex items-center gap-4 mb-8">
            <Printer className="text-gold w-6 h-6" />
            <h2 className="text-3xl font-serif font-bold">Printing Products</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {PRINTING_SERVICES.map((service, i) => (
              <ServiceCard 
                key={i} 
                title={service.title}
                price={service.price}
                category={service.category}
                features={service.features}
                isPopular={service.isPopular}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Custom Quote CTA */}
      <section className="max-w-5xl mx-auto glass p-12 rounded-[3rem] text-center space-y-8">
        <h2 className="text-3xl md:text-4xl font-serif font-bold">Need a <span className="text-gold">Custom</span> Package?</h2>
        <p className="text-white/60 max-w-xl mx-auto">
          Every project is unique. If our standard packages don't quite fit your vision, 
          let's talk and create something bespoke for you.
        </p>
        <button className="bg-gold hover:bg-gold-light text-charcoal px-12 py-4 rounded-full font-bold transition-all transform hover:scale-105">
          Get a Custom Quote
        </button>
      </section>
    </div>
  );
}
