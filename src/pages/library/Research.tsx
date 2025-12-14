import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ChevronRight, Book, Download, User, Calendar } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

const researchData = [
  {
    id: 1,
    title: "التحكيم التجاري الدولي في التشريع اليمني",
    author: "د. محمد أحمد السعيدي",
    year: "2023",
    pages: 45,
    category: "التحكيم",
    abstract: "دراسة تحليلية لنظام التحكيم التجاري الدولي في ضوء القانون اليمني والاتفاقيات الدولية."
  },
  {
    id: 2,
    title: "حماية المستثمر الأجنبي في القانون اليمني",
    author: "أ. علي عبدالله الحميري",
    year: "2022",
    pages: 38,
    category: "الاستثمار",
    abstract: "بحث في الضمانات القانونية المقررة للمستثمر الأجنبي وآليات تسوية النزاعات الاستثمارية."
  },
  {
    id: 3,
    title: "الشركات ذات المسؤولية المحدودة - دراسة مقارنة",
    author: "د. فاطمة محمد العريقي",
    year: "2023",
    pages: 52,
    category: "الشركات",
    abstract: "مقارنة بين أحكام الشركات ذات المسؤولية المحدودة في القانون اليمني والتشريعات العربية."
  },
  {
    id: 4,
    title: "العقود الإلكترونية في ظل التحول الرقمي",
    author: "أ. أحمد سالم باعباد",
    year: "2024",
    pages: 34,
    category: "التجارة الإلكترونية",
    abstract: "دراسة للإطار القانوني للعقود الإلكترونية وتحديات إثباتها."
  }
];

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
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-white"
          >
            بحوث ومراجع قانونية
          </motion.h1>
          <p className="mt-4 text-white/80 max-w-2xl">
            أبحاث ودراسات قانونية متخصصة من نخبة من الباحثين والأكاديميين
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 md:py-20">
        <div className="container-legal">
          <div className="grid gap-6">
            {researchData.map((research, index) => (
              <motion.div
                key={research.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-card rounded-2xl border border-border p-6 hover:border-emerald-500/50 transition-all group"
              >
                <div className="flex flex-col lg:flex-row gap-6">
                  <div className="lg:w-24 lg:h-32 w-full h-24 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center flex-shrink-0">
                    <Book className="w-10 h-10 text-white" />
                  </div>
                  
                  <div className="flex-1">
                    <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 text-sm font-medium">
                      {research.category}
                    </span>
                    
                    <h3 className="text-xl font-bold text-foreground mt-3 mb-2 group-hover:text-emerald-600 transition-colors">
                      {research.title}
                    </h3>
                    
                    <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-3">
                      <span className="flex items-center gap-1">
                        <User className="w-4 h-4" />
                        {research.author}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {research.year}
                      </span>
                      <span>{research.pages} صفحة</span>
                    </div>
                    
                    <p className="text-muted-foreground leading-relaxed">
                      {research.abstract}
                    </p>
                  </div>
                  
                  <button className="flex items-center gap-2 px-6 py-3 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 transition-all whitespace-nowrap self-start">
                    <Download className="w-4 h-4" />
                    <span className="font-medium">تحميل PDF</span>
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="mt-12 p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-center">
            <p className="text-foreground">
              نرحب بمساهماتكم البحثية. للنشر في المكتبة تواصلوا معنا.
            </p>
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Research;
