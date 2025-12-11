import { motion } from "framer-motion";
import heroBg from "@/assets/hero-bg.jpg";
import logo from "@/assets/logo.jpg";

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
      <div className="absolute top-20 left-4 sm:left-10 w-16 sm:w-32 h-16 sm:h-32 border border-gold/20 rounded-full animate-float opacity-30" />
      <div className="absolute bottom-32 right-4 sm:right-20 w-12 sm:w-24 h-12 sm:h-24 border border-gold/10 rounded-full animate-float opacity-20" style={{ animationDelay: "1s" }} />
      
      {/* Content */}
      <div className="relative z-10 container-legal text-center px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-4 sm:mb-6"
        >
          <img 
            src={logo} 
            alt="شعار مكتب الشرعبي" 
            className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 mx-auto mb-4 sm:mb-6 rounded-xl shadow-lg object-contain"
          />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="heading-primary text-primary-foreground mb-4 sm:mb-6 max-w-4xl mx-auto"
        >
          الشرعبي للخدمات القانونية
          <span className="block text-gradient-gold mt-1 sm:mt-2 text-lg sm:text-xl md:text-2xl lg:text-3xl">شريككم نحو حماية الحقوق وتحقيق العدالة</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="text-body text-primary-foreground/80 max-w-2xl mx-auto mb-6 sm:mb-10 px-2"
        >
          خبرة مؤسسية تتجاوز 15 عامًا في تأسيس الشركات، التحكيم الدولي، وإعادة الهيكلة والحوكمة
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
          className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center px-4"
        >
          <a
            href="#services"
            className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-gold text-accent-foreground font-semibold rounded-lg shadow-gold hover:bg-gold-light transition-all duration-300 transform hover:scale-105 text-center"
          >
            استكشف خدماتنا
          </a>
          <a
            href="#contact"
            className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 border-2 border-gold/50 text-primary-foreground font-semibold rounded-lg hover:border-gold hover:bg-gold/10 transition-all duration-300 text-center"
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
