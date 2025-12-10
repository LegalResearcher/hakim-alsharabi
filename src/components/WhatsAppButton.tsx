import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";

const WhatsAppButton = () => {
  const phoneNumber = "967775238375";
  const message = "مرحباً، أرغب في الاستفسار عن خدماتكم القانونية";
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <motion.a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1.5, type: "spring", stiffness: 200 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-6 left-6 z-50 w-16 h-16 bg-[#25D366] rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow animate-pulse-gold"
      aria-label="تواصل عبر واتساب"
    >
      <MessageCircle className="w-8 h-8 text-white" fill="white" />
      
      {/* Tooltip */}
      <span className="absolute right-20 bg-foreground text-background text-sm px-4 py-2 rounded-lg whitespace-nowrap opacity-0 hover:opacity-100 pointer-events-none transition-opacity">
        استشارة قانونية فورية
      </span>
    </motion.a>
  );
};

export default WhatsAppButton;
