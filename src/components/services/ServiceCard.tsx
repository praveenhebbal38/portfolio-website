import React from 'react';
import { motion } from 'motion/react';
import { Check, ArrowRight } from 'lucide-react';
import { formatCurrency } from '../../lib/utils';

type ServiceProps = {
  key?: React.Key;
  title: string;
  price: number;
  features: string[];
  category: string;
  isPopular?: boolean;
};

export default function ServiceCard({ title, price, features, category, isPopular }: ServiceProps) {
  return (
    <motion.div
      whileHover={{ y: -10 }}
      className={`relative p-8 rounded-3xl flex flex-col h-full transition-all ${
        isPopular ? 'glass-gold border-gold/30' : 'glass'
      }`}
    >
      {isPopular && (
        <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gold text-charcoal text-[10px] font-bold uppercase tracking-widest px-4 py-1 rounded-full">
          Most Popular
        </span>
      )}
      
      <div className="mb-8">
        <span className="text-xs uppercase tracking-widest text-gold font-medium">{category}</span>
        <h3 className="text-2xl font-serif font-bold mt-2">{title}</h3>
      </div>

      <div className="mb-8">
        <span className="text-4xl font-bold">{formatCurrency(price)}</span>
        <span className="text-white/40 text-sm ml-2">/ starting</span>
      </div>

      <ul className="space-y-4 mb-12 flex-grow">
        {features.map((feature, i) => (
          <li key={i} className="flex items-start gap-3 text-sm text-white/70">
            <Check className="w-5 h-5 text-gold shrink-0" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      <button className={`w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${
        isPopular ? 'bg-gold text-charcoal hover:bg-gold-light' : 'bg-white/10 text-white hover:bg-white/20'
      }`}>
        Book Now
        <ArrowRight className="w-4 h-4" />
      </button>
    </motion.div>
  );
}
