import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Scale, ChevronRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { LibraryFilesGrid } from "@/components/library/LibraryFilesGrid";

const Legislation = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero */}
      <section className="pt-32 pb-12 bg-gradient-to-br from-primary to-primary/90">
        <div className="container-legal">
          <Link to="/library" className="inline-flex items-center text-primary-foreground/80 hover:text-primary-foreground mb-6 transition-colors">
            <ChevronRight className="w-5 h-5 ml-1" />
            العودة للمكتبة
          </Link>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-4 mb-4"
          >
            <div className="w-16 h-16 rounded-2xl bg-primary-foreground/10 flex items-center justify-center">
              <Scale className="w-8 h-8 text-primary-foreground" />
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground">
              التشريعات والقوانين اليمنية
            </h1>
          </motion.div>
          <p className="mt-4 text-primary-foreground/80 max-w-2xl">
            مجموعة شاملة من الدستور والقوانين واللوائح والاتفاقيات الدولية المصادق عليها
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 md:py-20">
        <div className="container-legal">
          <LibraryFilesGrid categorySlug="legislation" />
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Legislation;
