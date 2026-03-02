import { useForm } from 'react-hook-form';
import { motion } from 'motion/react';
import { Send, MessageSquare } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { CONTACT_DETAILS } from '@/src/constants';

type FormData = {
  name: string;
  phone: string;
  email: string;
  service: string;
  message: string;
};

export default function ContactForm() {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    const phoneNumber = CONTACT_DETAILS.whatsappNumber;
    const text = `*New Inquiry from Mulla Photography Website*%0A%0A*Name:* ${data.name}%0A*Phone:* ${data.phone}%0A*Email:* ${data.email}%0A*Service:* ${data.service}%0A*Message:* ${data.message}`;
    
    window.open(`https://wa.me/${phoneNumber}?text=${text}`, '_blank');
  };

  return (
    <section id="contact" className="py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-4xl md:text-5xl font-serif font-bold">Let's Create <span className="text-gold">Magic</span> Together</h2>
              <p className="text-white/60 leading-relaxed">
                Ready to capture your story? Fill out the form below or reach out directly via WhatsApp. 
                We'll get back to you within 24 hours to discuss your vision.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-center gap-4 p-4 glass rounded-2xl group hover:glass-gold transition-all">
                <div className="w-12 h-12 bg-gold/10 rounded-xl flex items-center justify-center text-gold group-hover:bg-gold group-hover:text-charcoal transition-all">
                  <MessageSquare className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-medium">Quick Chat</h4>
                  <p className="text-sm text-white/40">Available on WhatsApp 10AM - 8PM</p>
                </div>
              </div>
            </div>
          </div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass p-8 rounded-3xl"
          >
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest text-white/40 ml-1">Name</label>
                  <input
                    {...register('name', { required: true })}
                    className={cn(
                      "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-gold transition-colors",
                      errors.name && "border-red-500/50"
                    )}
                    placeholder="John Doe"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest text-white/40 ml-1">Phone</label>
                  <input
                    {...register('phone', { required: true })}
                    className={cn(
                      "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-gold transition-colors",
                      errors.phone && "border-red-500/50"
                    )}
                    placeholder="+91 00000 00000"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest text-white/40 ml-1">Email</label>
                <input
                  {...register('email', { required: true, pattern: /^\S+@\S+$/i })}
                  className={cn(
                    "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-gold transition-colors",
                    errors.email && "border-red-500/50"
                  )}
                  placeholder="john@example.com"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest text-white/40 ml-1">Service</label>
                <select
                  {...register('service', { required: true })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-gold transition-colors appearance-none"
                >
                  <option value="" className="bg-charcoal">Select a service</option>
                  <option value="Wedding" className="bg-charcoal">Wedding Photography</option>
                  <option value="Portrait" className="bg-charcoal">Portrait Session</option>
                  <option value="Event" className="bg-charcoal">Event Coverage</option>
                  <option value="Studio" className="bg-charcoal">Studio Shoot</option>
                  <option value="Printing" className="bg-charcoal">Custom Printing</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest text-white/40 ml-1">Message</label>
                <textarea
                  {...register('message', { required: true })}
                  rows={4}
                  className={cn(
                    "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-gold transition-colors resize-none",
                    errors.message && "border-red-500/50"
                  )}
                  placeholder="Tell us about your event..."
                />
              </div>

              <button
                type="submit"
                className="w-full bg-gold hover:bg-gold-light text-charcoal font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all transform active:scale-[0.98]"
              >
                <Send className="w-5 h-5" />
                Send Inquiry
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
