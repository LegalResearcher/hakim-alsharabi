import { motion } from "framer-motion";
import { 
  FileText, 
  Scale, 
  Stamp, 
  Building2, 
  ScrollText, 
  Gavel 
} from "lucide-react";

const services = [
  {
    icon: FileText,
    title: "تأسيس الشركات وصياغة العقود",
    description: "تأسيس جميع أنواع الشركات وصياغة العقود التجارية والاستثمارية بدقة قانونية عالية"
  },
  {
    icon: Scale,
    title: "التحكيم الدولي وفض المنازعات",
    description: "تمثيل العملاء في قضايا التحكيم الدولي وفض النزاعات التجارية والاستثمارية"
  },
  {
    icon: Stamp,
    title: "تسجيل وحماية العلامات التجارية",
    description: "تسجيل العلامات التجارية وحماية الملكية الفكرية محلياً ودولياً"
  },
  {
    icon: Building2,
    title: "إعادة هيكلة وحوكمة الشركات",
    description: "إعادة هيكلة الشركات وتطبيق معايير الحوكمة المؤسسية الفعّالة"
  },
  {
    icon: ScrollText,
    title: "قسمة التركات والعقود الدولية",
    description: "تنظيم قسمة التركات وصياغة العقود الدولية وفق الأنظمة المعمول بها"
  },
  {
    icon: Gavel,
    title: "المحاماة والاستشارات القانونية",
    description: "الترافع أمام المحاكم وتقديم الاستشارات القانونية الشاملة"
  }
];

const ServicesSection = () => {
  return (
    <section id="services" className="section-padding bg-secondary/30">
      <div className="container-legal">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-gold font-semibold text-sm tracking-wider mb-4 block">
            خدماتنا القانونية
          </span>
          <h2 className="heading-secondary text-foreground mb-4">
            حلول قانونية متكاملة
          </h2>
          <p className="text-body text-muted-foreground max-w-2xl mx-auto">
            نقدم مجموعة شاملة من الخدمات القانونية المتخصصة لتلبية احتياجات عملائنا
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group"
            >
              <div className="h-full bg-card rounded-xl p-8 shadow-card-elegant gold-border gold-border-hover transition-all duration-500 hover:shadow-elevated hover:-translate-y-1">
                <div className="w-14 h-14 rounded-xl bg-primary/5 group-hover:bg-gold/10 flex items-center justify-center mb-6 transition-colors duration-300">
                  <service.icon className="w-7 h-7 text-gold" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3 group-hover:text-gold transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {service.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
