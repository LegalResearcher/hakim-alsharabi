import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Scale, FileText, BookOpen, Handshake, ChevronRight, Download } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

const legislationCategories = [
  {
    id: "constitution",
    title: "الدستور اليمني",
    icon: BookOpen,
    items: [
      { title: "دستور الجمهورية اليمنية", year: "2001" },
      { title: "التعديلات الدستورية", year: "2015" }
    ]
  },
  {
    id: "laws",
    title: "القوانين",
    icon: Scale,
    items: [
      { title: "القانون المدني اليمني", year: "2002" },
      { title: "قانون الإجراءات الجزائية", year: "1994" },
      { title: "قانون المرافعات والتنفيذ المدني", year: "2002" },
      { title: "قانون التحكيم", year: "1992" },
      { title: "قانون الشركات التجارية", year: "1997" },
      { title: "قانون العمل", year: "1995" }
    ]
  },
  {
    id: "regulations",
    title: "اللوائح التنفيذية",
    icon: FileText,
    items: [
      { title: "اللائحة التنفيذية لقانون الشركات", year: "1998" },
      { title: "اللائحة التنفيذية لقانون العمل", year: "1996" },
      { title: "لائحة المحاكم التجارية", year: "2010" }
    ]
  },
  {
    id: "agreements",
    title: "الاتفاقيات الدولية",
    icon: Handshake,
    items: [
      { title: "اتفاقية نيويورك للتحكيم", year: "1958" },
      { title: "اتفاقية الرياض للتعاون القضائي", year: "1983" },
      { title: "اتفاقيات الاستثمار الثنائية", year: "متعدد" }
    ]
  }
];

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
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground"
          >
            التشريعات والقوانين اليمنية
          </motion.h1>
          <p className="mt-4 text-primary-foreground/80 max-w-2xl">
            مجموعة شاملة من الدستور والقوانين واللوائح والاتفاقيات الدولية المصادق عليها
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 md:py-20">
        <div className="container-legal">
          <div className="space-y-12">
            {legislationCategories.map((category, catIndex) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: catIndex * 0.1 }}
                className="bg-card rounded-2xl border border-border p-6 md:p-8"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <category.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h2 className="text-2xl font-bold text-foreground">{category.title}</h2>
                </div>
                
                <div className="grid gap-4">
                  {category.items.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 rounded-xl bg-muted/50 hover:bg-muted transition-colors group"
                    >
                      <div className="flex items-center gap-3">
                        <FileText className="w-5 h-5 text-muted-foreground" />
                        <span className="font-medium text-foreground">{item.title}</span>
                        <span className="text-sm text-muted-foreground">({item.year})</span>
                      </div>
                      <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gold/10 text-gold hover:bg-gold hover:text-accent-foreground transition-all opacity-0 group-hover:opacity-100">
                        <Download className="w-4 h-4" />
                        <span className="text-sm font-medium">تحميل</span>
                      </button>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="mt-12 p-6 rounded-2xl bg-gold/10 border border-gold/20 text-center">
            <p className="text-foreground">
              هذا القسم قيد التطوير. سيتم إضافة المزيد من التشريعات والوثائق قريباً.
            </p>
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Legislation;
