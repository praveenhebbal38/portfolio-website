import { createClient } from '@supabase/supabase-js';

let rawUrl = import.meta.env.VITE_SUPABASE_URL;
let rawKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Helper to check if a string is a Supabase URL
const isSupabaseUrl = (val: string | undefined | null) => 
  val && val.includes('.supabase.co');

// Helper to check if a string is a Supabase Key
const isSupabaseKey = (val: string | undefined | null) => 
  val && (val.startsWith('sb_') || val.length > 40);

let supabaseUrl = 'https://placeholder.supabase.co';
let supabaseAnonKey = 'placeholder';

const allVars = [rawUrl, rawKey];
const foundUrl = allVars.find(isSupabaseUrl);
const foundKey = allVars.find(isSupabaseKey);

if (foundUrl) {
  supabaseUrl = foundUrl.startsWith('http') ? foundUrl : `https://${foundUrl}`;
}

if (foundKey) {
  supabaseAnonKey = foundKey;
}

if (!foundUrl || !foundKey) {
  console.info('ℹ️ Supabase: Configuration pending. Please add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to the Secrets panel.');
} else if (rawUrl === foundKey && rawKey === foundUrl) {
  console.warn('⚠️ Supabase: Swapped URL and Key detected and corrected.');
}

export const isConfigured = foundUrl !== undefined && foundKey !== undefined;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type PortfolioItem = {
  id: string;
  title: string;
  category: 'Wedding' | 'Portrait' | 'Event' | 'Outdoor' | 'Studio';
  image_url: string;
  created_at: string;
};
