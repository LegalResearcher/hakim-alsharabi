import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ChevronRight, Gavel } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { LibraryFilesGrid } from "@/components/library/LibraryFilesGrid";

const Rulings = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero */}
      <section className="pt-32 pb-12 bg-gradient-to-br from-gold to-gold-light">
        <div className="container-legal">
          <Link to="/library" className="inline-flex items-center text-accent-foreground/80 hover:text-accent-foreground mb-6 transition-colors">
            <ChevronRight className="w-5 h-5 ml-1" />
            العودة للمكتبة
          </Link>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-4 mb-4"
          >
            <div className="w-16 h-16 rounded-2xl bg-accent-foreground/10 flex items-center justify-center">
              <Gavel className="w-8 h-8 text-accent-foreground" />
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-accent-foreground">
              قواعد وأحكام قانونية وقضائية
            </h1>
          </motion.div>
          <p className="mt-4 text-accent-foreground/80 max-w-2xl">
            مجموعة من المبادئ القانونية والأحكام القضائية المهمة
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 md:py-20">
        <div className="container-legal">
          <LibraryFilesGrid categorySlug="rulings" />
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Rulings;
