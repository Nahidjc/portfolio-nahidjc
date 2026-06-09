import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';

export function FloatingContact() {
  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <motion.button
      onClick={scrollToContact}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 2, type: 'spring', stiffness: 260, damping: 20 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-6 right-6 z-40 flex items-center gap-2 px-4 py-2.5 rounded-full bg-primary text-primary-foreground text-sm font-medium shadow-lg shadow-primary/25 hover:bg-primary/90 transition-colors"
      data-testid="floating-contact"
      aria-label="Contact me"
    >
      <MessageCircle size={16} />
      <span className="hidden sm:inline">Let's Talk</span>
    </motion.button>
  );
}
