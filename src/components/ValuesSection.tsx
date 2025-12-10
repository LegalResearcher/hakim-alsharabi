import { motion } from "framer-motion";
import { Shield, Clock, Lock, Eye } from "lucide-react";

const values = [
  {
    icon: Shield,
    title: "المسؤولية",
    description: "التزام تام تجاه قضايا العميل"
  },
  {
    icon: Clock,
    title: "الالتزام",
    description: "الدقة في المواعيد والوفاء بالعهود"
  },
  {
    icon: Lock,
    title: "السرية",
    description: "حفظ كافة بيانات ومعلومات العميل"
  },
  {
    icon: Eye,
    title: "النزاهة",
    description: "العمل وفق أعلى درجات الشفافية الأخلاقية"
  }
];

const ValuesSection = () => {
  return (
    <section id="values" className="section-padding bg-navy-gradient relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-gold/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gold/5 rounded-full blur-3xl" />
      
      <div className="container-legal relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-gold font-semibold text-sm tracking-wider mb-4 block">
            رسالتنا وقيمنا
          </span>
          <h2 className="heading-secondary text-primary-foreground mb-6">
            قيمنا الجوهرية
          </h2>
          <p className="text-body text-primary-foreground/70 max-w-3xl mx-auto leading-relaxed">
            تقديم خدمات قانونية متكاملة وفق أرقى المعايير العالمية، وترسيخ مبدأ العدالة وحفظ الحقوق بمهنية مطلقة، لتمكين عملائنا من النمو بأمان قانوني تام
          </p>
        </motion.div>

        {/* Values Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((value, index) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="group"
            >
              <div className="text-center p-8 rounded-xl border border-gold/20 bg-primary/20 backdrop-blur-sm hover:bg-gold/10 hover:border-gold/40 transition-all duration-500">
                <div className="w-16 h-16 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-5 group-hover:bg-gold/20 transition-colors duration-300">
                  <value.icon className="w-8 h-8 text-gold" />
                </div>
                <h3 className="text-xl font-semibold text-primary-foreground mb-2">
                  {value.title}
                </h3>
                <p className="text-primary-foreground/60 text-sm">
                  {value.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Trust Banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <div className="inline-block px-8 py-4 rounded-full border border-gold/30 bg-gold/5">
            <p className="text-lg md:text-xl font-medium text-gold">
              ✨ قانونياً، أنت في أيدٍ أمينة ✨
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ValuesSection;
