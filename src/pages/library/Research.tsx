import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ChevronRight, BookOpen } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { LibraryFilesGrid } from "@/components/library/LibraryFilesGrid";

const Research = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero */}
      <section className="pt-32 pb-12 bg-gradient-to-br from-emerald-600 to-emerald-500">
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
              <BookOpen className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">
              بحوث ومراجع قانونية
            </h1>
          </motion.div>
          <p className="mt-4 text-white/80 max-w-2xl">
            أبحاث ودراسات قانونية متخصصة من نخبة من الباحثين والأكاديميين
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 md:py-20">
        <div className="container-legal">
          <LibraryFilesGrid categorySlug="research" />
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Research;
