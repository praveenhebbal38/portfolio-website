import PortfolioGrid from '@/src/components/portfolio/PortfolioGrid';
import { motion } from 'motion/react';

export default function Portfolio() {
  return (
    <div className="pt-32 pb-24 px-6 min-h-screen">
      <div className="max-w-7xl mx-auto space-y-16">
        <div className="text-center space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <span className="text-gold uppercase tracking-[0.3em] text-xs font-medium mb-4 block">Our Gallery</span>
            <h1 className="text-5xl md:text-7xl font-serif font-bold">Visual <span className="text-gold italic">Legacy</span></h1>
          </motion.div>
          <p className="text-white/50 max-w-2xl mx-auto text-lg">
            Explore our curated collection of moments, from intimate portraits to grand celebrations.
          </p>
        </div>

        <PortfolioGrid />
      </div>
    </div>
  );
}
