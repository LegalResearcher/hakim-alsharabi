import { motion } from "framer-motion";
import { Quote } from "lucide-react";

const testimonials = [
  {
    name: "محمد العريقي",
    role: "رجل أعمال",
    content: "تعاملت مع مكتب الشرعبي في تأسيس شركتي وكانت التجربة ممتازة. احترافية عالية ودقة في المواعيد.",
    initials: "م"
  },
  {
    name: "شركة الأمل للتجارة",
    role: "قطاع الأعمال",
    content: "نثق بمكتب الشرعبي في جميع شؤوننا القانونية منذ سنوات. خبرة واسعة وحلول فعّالة.",
    initials: "أ"
  },
  {
    name: "أحمد الصريمي",
    role: "مستثمر",
    content: "الاستشارات القانونية من مكتب الشرعبي ساعدتني في اتخاذ قرارات استثمارية صائبة. شكراً لهم.",
    initials: "أ"
  }
];

const TestimonialsSection = () => {
  return (
    <section className="section-padding bg-secondary/20">
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
            آراء عملائنا
          </span>
          <h2 className="heading-secondary text-foreground mb-4">
            شهادات العملاء
          </h2>
          <p className="text-body text-muted-foreground max-w-2xl mx-auto">
            نفتخر بثقة عملائنا ونسعى دائماً لتجاوز توقعاتهم
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="group"
            >
              <div className="bg-card rounded-xl p-8 shadow-card-elegant gold-border h-full relative hover:shadow-elevated transition-all duration-500">
                <Quote className="w-10 h-10 text-gold/30 absolute top-6 left-6" />
                
                <p className="text-foreground/80 leading-relaxed mb-6 relative z-10">
                  "{testimonial.content}"
                </p>
                
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gold to-gold-light flex items-center justify-center">
                    <span className="text-lg font-bold text-accent-foreground">
                      {testimonial.initials}
                    </span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">{testimonial.name}</h4>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
