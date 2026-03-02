import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { supabase, type PortfolioItem, isConfigured } from '../lib/supabase';
import SetupGuide from '../components/admin/SetupGuide';
import { 
  Plus, 
  Trash2, 
  Edit3, 
  LogOut, 
  Image as ImageIcon, 
  Upload, 
  X, 
  Loader2,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { cn } from '../lib/utils';

export default function Admin() {
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [dbStatus, setDbStatus] = useState<'checking' | 'connected' | 'error'>('checking');
  const [user, setUser] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<{id: string, imageUrl: string} | null>(null);
  const [editingItem, setEditingItem] = useState<PortfolioItem | null>(null);
  const [formLoading, setFormLoading] = useState(false);
  const [status, setStatus] = useState<{ type: 'success' | 'error', message: string } | null>(null);
  
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate('/login');
      } else {
        setUser(session.user);
        fetchPortfolio();
      }
    };
    checkAuth();
  }, [navigate]);

  async function fetchPortfolio() {
    // Guard: Don't fetch if we're using placeholder credentials
    if (!isConfigured) {
      setDbStatus('error');
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('portfolio')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      if (data) setItems(data);
      setDbStatus('connected');
    } catch (err: any) {
      console.error('Database connection error:', err);
      // Handle "Failed to fetch" specifically
      if (err.message === 'Failed to fetch') {
        setDbStatus('error');
      } else {
        setDbStatus('error');
      }
    } finally {
      setLoading(false);
    }
  }

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };

  const handleDeleteClick = (id: string, imageUrl: string) => {
    setItemToDelete({ id, imageUrl });
  };

  const confirmDelete = async () => {
    if (!itemToDelete) return;
    const { id, imageUrl } = itemToDelete;
    setItemToDelete(null);

    try {
      // 1. Attempt to delete from storage (but don't let it block the DB delete)
      if (imageUrl && imageUrl.includes('supabase.co')) {
        const parts = imageUrl.split('/');
        const fileName = parts[parts.length - 1];
        if (fileName) {
          const { error: storageError } = await supabase.storage
            .from('portfolio')
            .remove([fileName]);
          
          if (storageError) {
            console.warn('Storage cleanup failed, proceeding with DB delete:', storageError);
          }
        }
      }

      // 2. Delete from database (The most important part)
      console.log('Attempting to delete ID:', id);
      const { error: dbError, status: dbStatus } = await supabase
        .from('portfolio')
        .delete()
        .eq('id', id);

      if (dbError) {
        console.error('Full Database Error Object:', dbError);
        throw new Error(`Database error (${dbStatus}): ${dbError.message}. Please verify your Table RLS Policy is set to "ALL" or "DELETE" for authenticated users.`);
      }

      setItems(prev => prev.filter(item => item.id !== id));
      showStatus('success', 'Item deleted successfully');
    } catch (err: any) {
      console.error('Delete operation failed:', err);
      showStatus('error', err.message || 'Failed to delete item.');
    }
  };

  const showStatus = (type: 'success' | 'error', message: string) => {
    setStatus({ type, message });
    setTimeout(() => setStatus(null), 3000);
  };

  return (
    <div className="pt-32 pb-24 px-6 min-h-screen">
      <div className="max-w-7xl mx-auto space-y-12">
        {!isConfigured && (
          <SetupGuide 
            url="https://hjjbuohrssvthqhpjrhe.supabase.co" 
            anonKey="sb_publishable_c1OHH-nyN3nAscSQvQZQJw_5Ll9GyTK" 
          />
        )}

        <div className="flex flex-col md:row items-center justify-between gap-6">
          <div className="space-y-2">
            <h1 className="text-4xl font-serif font-bold">Dashboard</h1>
            <div className="flex items-center gap-3">
              <p className="text-white/40 text-sm">Welcome back, {user?.email}</p>
              <div className={cn(
                "flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border",
                dbStatus === 'connected' ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-500" : 
                dbStatus === 'error' ? "bg-red-500/10 border-red-500/20 text-red-500" : 
                "bg-white/5 border-white/10 text-white/40"
              )}>
                <div className={cn(
                  "w-1.5 h-1.5 rounded-full",
                  dbStatus === 'connected' ? "bg-emerald-500" : 
                  dbStatus === 'error' ? "bg-red-500" : 
                  "bg-white/20 animate-pulse"
                )} />
                {dbStatus === 'connected' ? 'Database Connected' : dbStatus === 'error' ? 'Connection Failed' : 'Checking Connection...'}
              </div>
            </div>
          </div>
          <div className="flex gap-4">
            <button
              onClick={() => {
                setEditingItem(null);
                setIsModalOpen(true);
              }}
              className="bg-gold hover:bg-gold-light text-charcoal px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-all"
            >
              <Plus className="w-5 h-5" />
              Add New Work
            </button>
            <button
              onClick={handleLogout}
              className="bg-white/5 hover:bg-white/10 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-all"
            >
              <LogOut className="w-5 h-5" />
              Logout
            </button>
          </div>
        </div>

        {status && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className={cn(
              "p-4 rounded-xl flex items-center gap-3 text-sm",
              status.type === 'success' ? "bg-emerald-500/10 border border-emerald-500/20 text-emerald-500" : "bg-red-500/10 border border-red-500/20 text-red-500"
            )}
          >
            {status.type === 'success' ? <CheckCircle2 className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
            {status.message}
          </motion.div>
        )}

        {loading ? (
          <div className="flex flex-col items-center justify-center py-24 gap-4">
            <Loader2 className="w-8 h-8 text-gold animate-spin" />
            <p className="text-white/40 uppercase tracking-widest text-xs">Syncing Portfolio</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((item) => (
              <div key={item.id} className="glass rounded-3xl overflow-hidden group">
                <div className="aspect-video relative overflow-hidden">
                  <img src={item.image_url} alt={item.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                    <button 
                      onClick={() => {
                        setEditingItem(item);
                        setIsModalOpen(true);
                      }}
                      className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-charcoal hover:bg-gold transition-colors"
                    >
                      <Edit3 className="w-5 h-5" />
                    </button>
                    <button 
                      onClick={() => handleDeleteClick(item.id, item.image_url)}
                      className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-red-500 hover:bg-red-500 hover:text-white transition-colors"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
                <div className="p-6 space-y-2">
                  <span className="text-[10px] uppercase tracking-widest text-gold font-bold">{item.category}</span>
                  <h3 className="font-serif font-bold text-lg">{item.title}</h3>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <AnimatePresence>
        {itemToDelete && (
          <div className="fixed inset-0 z-[70] flex items-center justify-center p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setItemToDelete(null)}
              className="absolute inset-0 bg-black/90 backdrop-blur-md"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-sm glass p-8 rounded-[2.5rem] text-center space-y-6 border border-white/10"
            >
              <div className="w-16 h-16 bg-red-500/10 rounded-2xl flex items-center justify-center text-red-500 mx-auto">
                <Trash2 className="w-8 h-8" />
              </div>
              <div className="space-y-2">
                <h2 className="text-xl font-serif font-bold text-white">Delete Work?</h2>
                <p className="text-sm text-white/40">This action cannot be undone. Are you sure you want to remove this from your portfolio?</p>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => setItemToDelete(null)}
                  className="flex-1 bg-white/5 hover:bg-white/10 text-white py-3 rounded-xl font-bold transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDelete}
                  className="flex-1 bg-red-500 hover:bg-red-600 text-white py-3 rounded-xl font-bold transition-all shadow-lg shadow-red-500/20"
                >
                  Delete
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-lg glass p-8 rounded-[2.5rem] space-y-8"
            >
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-serif font-bold">
                  {editingItem ? 'Edit Work' : 'Add New Work'}
                </h2>
                <button onClick={() => setIsModalOpen(false)} className="text-white/40 hover:text-white">
                  <X className="w-6 h-6" />
                </button>
              </div>

              <PortfolioForm 
                item={editingItem} 
                onSuccess={() => {
                  setIsModalOpen(false);
                  fetchPortfolio();
                  showStatus('success', editingItem ? 'Updated successfully' : 'Added successfully');
                }}
                onError={(msg) => showStatus('error', msg)}
              />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

function PortfolioForm({ item, onSuccess, onError }: { item: PortfolioItem | null, onSuccess: () => void, onError: (msg: string) => void }) {
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState(item?.image_url || '');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    
    const formData = new FormData(e.currentTarget);
    const title = formData.get('title') as string;
    const category = formData.get('category') as string;

    try {
      let imageUrl = item?.image_url || '';

      if (file) {
        const fileExt = file.name.split('.').pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const { error: uploadError } = await supabase.storage
          .from('portfolio')
          .upload(fileName, file);

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
          .from('portfolio')
          .getPublicUrl(fileName);
        
        // Cleanup old image if it exists and we are updating
        if (item && item.image_url && item.image_url.includes('supabase.co')) {
          const oldFileName = item.image_url.split('/').pop();
          if (oldFileName) {
            await supabase.storage.from('portfolio').remove([oldFileName]);
          }
        }

        imageUrl = publicUrl;
      }

      if (item) {
        const { error } = await supabase
          .from('portfolio')
          .update({ title, category, image_url: imageUrl })
          .eq('id', item.id);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('portfolio')
          .insert([{ title, category, image_url: imageUrl }]);
        if (error) throw error;
      }

      onSuccess();
    } catch (err: any) {
      onError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <label className="text-xs uppercase tracking-widest text-white/40 ml-1">Title</label>
        <input
          name="title"
          defaultValue={item?.title}
          required
          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-gold transition-colors"
          placeholder="Wedding in Udaipur"
        />
      </div>

      <div className="space-y-2">
        <label className="text-xs uppercase tracking-widest text-white/40 ml-1">Category</label>
        <select
          name="category"
          defaultValue={item?.category || 'Wedding'}
          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-gold transition-colors appearance-none"
        >
          <option value="Wedding" className="bg-charcoal">Wedding</option>
          <option value="Portrait" className="bg-charcoal">Portrait</option>
          <option value="Event" className="bg-charcoal">Event</option>
          <option value="Outdoor" className="bg-charcoal">Outdoor</option>
          <option value="Studio" className="bg-charcoal">Studio</option>
        </select>
      </div>

      <div className="space-y-2">
        <label className="text-xs uppercase tracking-widest text-white/40 ml-1">Image</label>
        <div className="relative group aspect-video rounded-2xl overflow-hidden glass border-2 border-dashed border-white/10 hover:border-gold/50 transition-colors cursor-pointer">
          {preview ? (
            <img src={preview} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-white/20">
              <Upload className="w-8 h-8" />
              <span className="text-xs uppercase tracking-widest">Upload Image</span>
            </div>
          )}
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) {
                setFile(f);
                setPreview(URL.createObjectURL(f));
              }
            }}
            className="absolute inset-0 opacity-0 cursor-pointer"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-gold hover:bg-gold-light text-charcoal font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all transform active:scale-[0.98] disabled:opacity-50"
      >
        {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : (item ? 'Update Work' : 'Add to Portfolio')}
      </button>
    </form>
  );
}
