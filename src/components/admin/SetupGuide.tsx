import React from 'react';
import { Copy, ExternalLink, Key, Globe, CheckCircle2 } from 'lucide-react';

interface SetupGuideProps {
  url: string;
  anonKey: string;
}

export default function SetupGuide({ url, anonKey }: SetupGuideProps) {
  const [copied, setCopied] = React.useState<'url' | 'key' | null>(null);

  const copyToClipboard = (text: string, type: 'url' | 'key') => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="glass rounded-3xl p-8 border-gold/20 bg-gold/5 max-w-2xl mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center">
          <Key className="w-5 h-5 text-gold" />
        </div>
        <div>
          <h2 className="text-xl font-serif font-bold">Configuration Required</h2>
          <p className="text-white/40 text-sm">Follow these steps to connect your database</p>
        </div>
      </div>

      <div className="space-y-6">
        {/* Step 1 */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm font-medium text-gold">
            <span className="w-5 h-5 rounded-full bg-gold text-charcoal flex items-center justify-center text-[10px] font-bold">1</span>
            Open the Secrets Panel
          </div>
          <p className="text-white/60 text-sm pl-7">
            Click the <strong>"Secrets"</strong> icon (looks like a key or lock) in the left sidebar of this AI Studio interface.
          </p>
        </div>

        {/* Step 2 */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm font-medium text-gold">
            <span className="w-5 h-5 rounded-full bg-gold text-charcoal flex items-center justify-center text-[10px] font-bold">2</span>
            Add Supabase URL
          </div>
          <div className="pl-7 flex gap-2">
            <div className="flex-1 bg-black/40 rounded-xl px-4 py-2 text-xs font-mono text-white/80 border border-white/10 truncate">
              VITE_SUPABASE_URL
            </div>
            <button 
              onClick={() => copyToClipboard(url, 'url')}
              className="px-4 py-2 bg-white/5 hover:bg-white/10 rounded-xl transition-colors flex items-center gap-2 text-xs"
            >
              {copied === 'url' ? <CheckCircle2 className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
              {copied === 'url' ? 'Copied' : 'Copy Value'}
            </button>
          </div>
        </div>

        {/* Step 3 */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm font-medium text-gold">
            <span className="w-5 h-5 rounded-full bg-gold text-charcoal flex items-center justify-center text-[10px] font-bold">3</span>
            Add Supabase Anon Key
          </div>
          <div className="pl-7 flex gap-2">
            <div className="flex-1 bg-black/40 rounded-xl px-4 py-2 text-xs font-mono text-white/80 border border-white/10 truncate">
              VITE_SUPABASE_ANON_KEY
            </div>
            <button 
              onClick={() => copyToClipboard(anonKey, 'key')}
              className="px-4 py-2 bg-white/5 hover:bg-white/10 rounded-xl transition-colors flex items-center gap-2 text-xs"
            >
              {copied === 'key' ? <CheckCircle2 className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
              {copied === 'key' ? 'Copied' : 'Copy Value'}
            </button>
          </div>
        </div>

        <div className="pt-4 pl-7">
          <a 
            href="https://app.supabase.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-xs text-gold/60 hover:text-gold flex items-center gap-1 transition-colors"
          >
            Go to Supabase Dashboard <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    </div>
  );
}
