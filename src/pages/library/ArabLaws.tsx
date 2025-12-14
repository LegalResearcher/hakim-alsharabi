import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ChevronRight, Globe, FileText, ExternalLink } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

const arabCountries = [
  {
    id: "saudi",
    name: "المملكة العربية السعودية",
    flag: "🇸🇦",
    laws: [
      "نظام الشركات السعودي",
      "نظام التحكيم",
      "نظام العمل",
      "نظام المرافعات الشرعية"
    ]
  },
  {
    id: "uae",
    name: "الإمارات العربية المتحدة",
    flag: "🇦🇪",
    laws: [
      "قانون المعاملات المدنية",
      "قانون الشركات التجارية",
      "قانون التحكيم",
      "قانون العمل"
    ]
  },
  {
    id: "egypt",
    name: "جمهورية مصر العربية",
    flag: "🇪🇬",
    laws: [
      "القانون المدني المصري",
      "قانون التجارة",
      "قانون التحكيم",
      "قانون الشركات"
    ]
  },
  {
    id: "jordan",
    name: "المملكة الأردنية الهاشمية",
    flag: "🇯🇴",
    laws: [
      "القانون المدني الأردني",
      "قانون التجارة",
      "قانون التحكيم",
      "قانون الشركات"
    ]
  },
  {
    id: "kuwait",
    name: "دولة الكويت",
    flag: "🇰🇼",
    laws: [
      "القانون المدني الكويتي",
      "قانون التجارة",
      "قانون الشركات",
      "قانون العمل"
    ]
  },
  {
    id: "qatar",
    name: "دولة قطر",
    flag: "🇶🇦",
    laws: [
      "القانون المدني القطري",
      "قانون التجارة",
      "قانون التحكيم",
      "قانون الشركات"
    ]
  }
];

const ArabLaws = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero */}
      <section className="pt-32 pb-12 bg-gradient-to-br from-blue-600 to-blue-500">
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
            تشريعات وقوانين عربية
          </motion.h1>
          <p className="mt-4 text-white/80 max-w-2xl">
            مجموعة من أهم التشريعات والقوانين في الدول العربية الشقيقة
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 md:py-20">
        <div className="container-legal">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {arabCountries.map((country, index) => (
              <motion.div
                key={country.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-card rounded-2xl border border-border p-6 hover:border-blue-500/50 transition-all"
              >
                <div className="flex items-center gap-4 mb-6">
                  <span className="text-4xl">{country.flag}</span>
                  <h3 className="text-xl font-bold text-foreground">{country.name}</h3>
                </div>
                
                <div className="space-y-3">
                  {country.laws.map((law, lawIndex) => (
                    <div
                      key={lawIndex}
                      className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors group"
                    >
                      <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4 text-muted-foreground" />
                        <span className="text-foreground">{law}</span>
                      </div>
                      <ExternalLink className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="mt-12 p-6 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-center">
            <p className="text-foreground">
              سيتم إضافة المزيد من التشريعات العربية قريباً. ترقبوا التحديثات.
            </p>
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default ArabLaws;
