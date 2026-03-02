import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { supabase, type PortfolioItem, isConfigured } from '../../lib/supabase';
import { Camera, Loader2 } from 'lucide-react';

const categories = ['All', 'Wedding', 'Portrait', 'Event', 'Outdoor', 'Studio'] as const;

export default function PortfolioGrid({ limit }: { limit?: number }) {
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<typeof categories[number]>('All');

  useEffect(() => {
    async function fetchPortfolio() {
      // Guard: Don't fetch if we're using placeholder credentials
      if (!isConfigured) {
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        let query = supabase.from('portfolio').select('*').order('created_at', { ascending: false });
        
        if (limit) {
          query = query.limit(limit);
        }

        const { data, error } = await query;
        if (!error && data) {
          setItems(data);
        }
      } catch (err) {
        console.error('Error fetching portfolio:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchPortfolio();
  }, [limit]);

  const filteredItems = activeCategory === 'All' 
    ? items 
    : items.filter(item => item.category === activeCategory);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-4">
        <Loader2 className="w-8 h-8 text-gold animate-spin" />
        <p className="text-white/40 uppercase tracking-widest text-xs">Loading Gallery</p>
      </div>
    );
  }

  return (
    <div className="space-y-12">
      {!limit && (
        <div className="flex flex-wrap justify-center gap-4">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                activeCategory === cat 
                  ? 'bg-gold text-charcoal' 
                  : 'bg-white/5 text-white/60 hover:bg-white/10'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence mode="popLayout">
          {filteredItems.map((item, index) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="group relative aspect-[4/5] overflow-hidden rounded-3xl glass"
            >
              <img
                src={item.image_url}
                alt={item.title}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 sm:p-8">
                <span className="text-gold text-[10px] sm:text-xs uppercase tracking-widest mb-1 sm:mb-2">{item.category}</span>
                <h3 className="text-lg sm:text-xl font-serif font-bold leading-tight">{item.title}</h3>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {items.length === 0 && !loading && (
        <div className="text-center py-24 glass rounded-3xl">
          <Camera className="w-12 h-12 text-white/10 mx-auto mb-4" />
          <p className="text-white/40">No items found in the portfolio yet.</p>
        </div>
      )}
    </div>
  );
}
