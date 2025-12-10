import { motion } from "framer-motion";
import heroBg from "@/assets/hero-bg.jpg";
import { Scale } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroBg})` }}
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-hero-overlay" />
      
      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-32 h-32 border border-gold/20 rounded-full animate-float opacity-30" />
      <div className="absolute bottom-32 right-20 w-24 h-24 border border-gold/10 rounded-full animate-float opacity-20" style={{ animationDelay: "1s" }} />
      
      {/* Content */}
      <div className="relative z-10 container-legal text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-6"
        >
          <Scale className="w-16 h-16 md:w-20 md:h-20 mx-auto text-gold mb-6" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="heading-primary text-primary-foreground mb-6 max-w-4xl mx-auto"
        >
          الشرعبي للخدمات القانونية
          <span className="block text-gradient-gold mt-2">شريككم نحو حماية الحقوق وتحقيق العدالة</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="text-body text-primary-foreground/80 max-w-2xl mx-auto mb-10"
        >
          خبرة مؤسسية تتجاوز 15 عامًا في تأسيس الشركات، التحكيم الدولي، وإعادة الهيكلة والحوكمة
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <a
            href="#services"
            className="px-8 py-4 bg-gold text-accent-foreground font-semibold rounded-lg shadow-gold hover:bg-gold-light transition-all duration-300 transform hover:scale-105"
          >
            استكشف خدماتنا
          </a>
          <a
            href="#contact"
            className="px-8 py-4 border-2 border-gold/50 text-primary-foreground font-semibold rounded-lg hover:border-gold hover:bg-gold/10 transition-all duration-300"
          >
            تواصل معنا
          </a>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <div className="w-6 h-10 border-2 border-gold/40 rounded-full flex justify-center">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1.5 h-3 bg-gold rounded-full mt-2"
          />
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
