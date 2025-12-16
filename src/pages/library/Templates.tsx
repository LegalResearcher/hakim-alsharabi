import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ChevronRight, FileText } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { LibraryFilesGrid } from "@/components/library/LibraryFilesGrid";

const Templates = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero */}
      <section className="pt-32 pb-12 bg-gradient-to-br from-rose-600 to-rose-500">
        <div className="container-legal">
          <Link to="/library" className="inline-flex items-center text-white/80 hover:text-white mb-6 transition-colors">
            <ChevronRight className="w-5 h-5 ml-1" />
            العودة للمكتبة
          </Link>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-4 mb-4"
          >
            <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center">
              <FileText className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">
              النماذج القانونية
            </h1>
          </motion.div>
          <p className="mt-4 text-white/80 max-w-2xl">
            مجموعة شاملة من العقود والمذكرات والنماذج القانونية الجاهزة للتحميل والاستخدام
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 md:py-20">
        <div className="container-legal">
          <LibraryFilesGrid categorySlug="templates" />
          
          <div className="mt-12 p-6 rounded-2xl bg-rose-500/10 border border-rose-500/20">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-bold text-foreground mb-2">تحتاج نموذجاً مخصصاً؟</h3>
                <p className="text-muted-foreground">
                  يمكننا إعداد عقود ومذكرات مخصصة وفقاً لاحتياجاتك الخاصة
                </p>
              </div>
              <Link
                to="/#contact"
                className="px-6 py-3 bg-rose-600 text-white rounded-lg hover:bg-rose-700 transition-colors font-medium whitespace-nowrap"
              >
                تواصل معنا
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Templates;
