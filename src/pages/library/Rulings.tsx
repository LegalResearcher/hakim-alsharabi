import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ChevronRight, Gavel, FileText, Download } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

const rulingsData = [
  {
    id: 1,
    title: "مبدأ حسن النية في تنفيذ العقود",
    category: "القانون المدني",
    court: "المحكمة العليا",
    year: "2020",
    summary: "يجب على المتعاقدين تنفيذ العقد طبقاً لما اشتمل عليه وبطريقة تتفق مع ما يوجبه حسن النية."
  },
  {
    id: 2,
    title: "قواعد التحكيم التجاري الدولي",
    category: "التحكيم",
    court: "محكمة الاستئناف التجارية",
    year: "2019",
    summary: "الحكم التحكيمي الأجنبي يُنفذ في اليمن وفقاً لاتفاقية نيويورك 1958."
  },
  {
    id: 3,
    title: "مسؤولية الشركات عن أعمال مديريها",
    category: "قانون الشركات",
    court: "المحكمة التجارية",
    year: "2021",
    summary: "الشركة مسؤولة عن الأعمال التي يقوم بها مديروها في حدود صلاحياتهم."
  },
  {
    id: 4,
    title: "حجية الحكم الجزائي أمام القضاء المدني",
    category: "الإجراءات",
    court: "المحكمة العليا",
    year: "2018",
    summary: "الحكم الجزائي البات له حجية أمام المحاكم المدنية فيما فصل فيه."
  },
  {
    id: 5,
    title: "التعويض عن الفصل التعسفي",
    category: "قانون العمل",
    court: "محكمة العمل",
    year: "2022",
    summary: "للعامل المفصول تعسفياً الحق في تعويض لا يقل عن أجر شهرين عن كل سنة خدمة."
  }
];

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
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-accent-foreground"
          >
            قواعد وأحكام قانونية وقضائية
          </motion.h1>
          <p className="mt-4 text-accent-foreground/80 max-w-2xl">
            مجموعة من المبادئ القانونية والأحكام القضائية المهمة
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 md:py-20">
        <div className="container-legal">
          <div className="grid gap-6">
            {rulingsData.map((ruling, index) => (
              <motion.div
                key={ruling.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-card rounded-2xl border border-border p-6 hover:border-gold/50 transition-all group"
              >
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <Gavel className="w-5 h-5 text-gold" />
                      <span className="px-3 py-1 rounded-full bg-gold/10 text-gold text-sm font-medium">
                        {ruling.category}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        {ruling.court} • {ruling.year}
                      </span>
                    </div>
                    
                    <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-gold transition-colors">
                      {ruling.title}
                    </h3>
                    
                    <p className="text-muted-foreground leading-relaxed">
                      {ruling.summary}
                    </p>
                  </div>
                  
                  <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-all whitespace-nowrap">
                    <FileText className="w-4 h-4" />
                    <span className="text-sm font-medium">عرض التفاصيل</span>
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="mt-12 p-6 rounded-2xl bg-gold/10 border border-gold/20 text-center">
            <p className="text-foreground">
              يتم تحديث هذا القسم باستمرار بأحدث الأحكام والمبادئ القانونية.
            </p>
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Rulings;
