import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Book, Scale, FileText, Globe, Calculator, FileDown, ChevronLeft } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

const libraryCategories = [
  {
    id: "legislation",
    title: "التشريعات والقوانين اليمنية",
    description: "الدستور، القوانين، اللوائح، والاتفاقيات",
    icon: Scale,
    path: "/library/legislation",
    color: "from-primary to-primary/80"
  },
  {
    id: "rulings",
    title: "قواعد وأحكام قانونية وقضائية",
    description: "مبادئ قانونية وأحكام قضائية هامة",
    icon: FileText,
    path: "/library/rulings",
    color: "from-gold to-gold-light"
  },
  {
    id: "research",
    title: "بحوث ومراجع",
    description: "دراسات وأبحاث قانونية متخصصة",
    icon: Book,
    path: "/library/research",
    color: "from-emerald-600 to-emerald-500"
  },
  {
    id: "arab-laws",
    title: "تشريعات وقوانين عربية",
    description: "قوانين وتشريعات الدول العربية",
    icon: Globe,
    path: "/library/arab-laws",
    color: "from-blue-600 to-blue-500"
  },
  {
    id: "inheritance",
    title: "حاسبة المواريث",
    description: "أداة تفاعلية لحساب الميراث الشرعي",
    icon: Calculator,
    path: "/library/inheritance-calculator",
    color: "from-purple-600 to-purple-500"
  },
  {
    id: "templates",
    title: "النماذج القانونية",
    description: "عقود، مذكرات، ونماذج قانونية جاهزة للتحميل",
    icon: FileDown,
    path: "/library/templates",
    color: "from-rose-600 to-rose-500"
  }
];

const Library = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-primary via-primary/95 to-primary/90 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-gradient-to-br from-white/5 to-transparent" />
        
        <div className="container-legal relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-6">
              المكتبة القانونية
            </h1>
            <p className="text-xl md:text-2xl text-primary-foreground/90 font-medium">
              كنوز المعرفة والتشريع
            </p>
            <p className="mt-4 text-primary-foreground/80 max-w-2xl mx-auto">
              مرجعكم الشامل للتشريعات والقوانين والأبحاث القانونية، نضعها بين أيديكم لتعزيز ثقافتكم القانونية
            </p>
          </motion.div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-16 md:py-24">
        <div className="container-legal">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {libraryCategories.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link
                  to={category.path}
                  className="group block h-full"
                >
                  <div className="h-full p-6 md:p-8 rounded-2xl bg-card border border-border hover:border-gold/50 shadow-lg hover:shadow-xl transition-all duration-300 group-hover:-translate-y-1">
                    <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${category.color} flex items-center justify-center mb-6 shadow-lg`}>
                      <category.icon className="w-8 h-8 text-white" />
                    </div>
                    
                    <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-gold transition-colors">
                      {category.title}
                    </h3>
                    
                    <p className="text-muted-foreground mb-4">
                      {category.description}
                    </p>
                    
                    <div className="flex items-center text-gold font-medium">
                      <span>استكشف</span>
                      <ChevronLeft className="w-5 h-5 mr-1 group-hover:-translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Library;
