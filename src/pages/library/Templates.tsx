import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ChevronRight, FileDown, FileText, Briefcase, Home, Users, Building, Car } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

const templateCategories = [
  {
    id: "contracts",
    title: "العقود",
    icon: Briefcase,
    templates: [
      { name: "عقد بيع عقار", downloads: 1250 },
      { name: "عقد إيجار سكني", downloads: 980 },
      { name: "عقد إيجار تجاري", downloads: 756 },
      { name: "عقد شراكة", downloads: 543 },
      { name: "عقد مقاولة", downloads: 432 },
      { name: "عقد توريد", downloads: 321 }
    ]
  },
  {
    id: "memos",
    title: "المذكرات القانونية",
    icon: FileText,
    templates: [
      { name: "مذكرة دفاع جنائية", downloads: 654 },
      { name: "مذكرة جوابية مدنية", downloads: 543 },
      { name: "مذكرة طعن بالاستئناف", downloads: 432 },
      { name: "مذكرة رد على الدعوى", downloads: 321 }
    ]
  },
  {
    id: "corporate",
    title: "وثائق الشركات",
    icon: Building,
    templates: [
      { name: "عقد تأسيس شركة ذ.م.م", downloads: 876 },
      { name: "النظام الأساسي للشركة", downloads: 654 },
      { name: "محضر اجتماع مجلس الإدارة", downloads: 432 },
      { name: "قرار الجمعية العمومية", downloads: 321 },
      { name: "تفويض إداري", downloads: 210 }
    ]
  },
  {
    id: "labor",
    title: "عقود العمل",
    icon: Users,
    templates: [
      { name: "عقد عمل محدد المدة", downloads: 1100 },
      { name: "عقد عمل غير محدد المدة", downloads: 890 },
      { name: "عقد تدريب", downloads: 345 },
      { name: "اتفاقية عدم منافسة", downloads: 234 },
      { name: "إنذار فصل", downloads: 198 }
    ]
  },
  {
    id: "realestate",
    title: "وثائق عقارية",
    icon: Home,
    templates: [
      { name: "وكالة بيع عقار", downloads: 567 },
      { name: "عقد رهن عقاري", downloads: 345 },
      { name: "عقد قسمة رضائية", downloads: 234 },
      { name: "إخلاء طرف", downloads: 189 }
    ]
  },
  {
    id: "vehicles",
    title: "وثائق المركبات",
    icon: Car,
    templates: [
      { name: "عقد بيع سيارة", downloads: 876 },
      { name: "توكيل بيع مركبة", downloads: 432 },
      { name: "عقد تأجير سيارة", downloads: 321 }
    ]
  }
];

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
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-white"
          >
            النماذج القانونية
          </motion.h1>
          <p className="mt-4 text-white/80 max-w-2xl">
            مجموعة شاملة من العقود والمذكرات والنماذج القانونية الجاهزة للتحميل والاستخدام
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 md:py-20">
        <div className="container-legal">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {templateCategories.map((category, catIndex) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: catIndex * 0.1 }}
                className="bg-card rounded-2xl border border-border p-6 hover:border-rose-500/50 transition-all"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-rose-500/10 flex items-center justify-center">
                    <category.icon className="w-6 h-6 text-rose-600" />
                  </div>
                  <h2 className="text-xl font-bold text-foreground">{category.title}</h2>
                </div>
                
                <div className="space-y-3">
                  {category.templates.map((template, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors group"
                    >
                      <div className="flex items-center gap-3">
                        <FileText className="w-4 h-4 text-muted-foreground" />
                        <span className="text-foreground">{template.name}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-xs text-muted-foreground hidden sm:block">
                          {template.downloads.toLocaleString()} تحميل
                        </span>
                        <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-500/10 text-rose-600 hover:bg-rose-600 hover:text-white transition-all text-sm font-medium">
                          <FileDown className="w-3.5 h-3.5" />
                          تحميل
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
          
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
