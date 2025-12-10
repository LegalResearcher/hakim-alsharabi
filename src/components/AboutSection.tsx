import { motion } from "framer-motion";
import { Award, Users, Briefcase } from "lucide-react";

const AboutSection = () => {
  return (
    <section id="about" className="section-padding bg-background">
      <div className="container-legal">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-gold font-semibold text-sm tracking-wider mb-4 block">
              نبذة عن المكتب
            </span>
            <h2 className="heading-secondary text-foreground mb-6">
              مكتب الشرعبي: خبرة رصينة والتزام بالعدالة
            </h2>
            <p className="text-body text-muted-foreground mb-8 leading-relaxed">
              مؤسس المكتب، الأستاذ <span className="text-gold font-semibold">حكيم الشرعبي</span>، مستشار قانوني ومستشار في التحكيم الدولي وفض المنازعات الدولية، بخبرة تمتد لأكثر من 15 سنة. ملتزمون بتقديم حلول قانونية دقيقة وموثوقة تحمي مصالح عملائنا وتضمن حقوقهم.
            </p>

            {/* Features */}
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Award className="w-6 h-6 text-gold" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">خبرة معتمدة</h4>
                  <p className="text-sm text-muted-foreground">أكثر من 15 عامًا في المجال القانوني</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Users className="w-6 h-6 text-gold" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">فريق متخصص</h4>
                  <p className="text-sm text-muted-foreground">نخبة من المستشارين القانونيين</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Briefcase className="w-6 h-6 text-gold" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">حلول شاملة</h4>
                  <p className="text-sm text-muted-foreground">خدمات قانونية متكاملة لجميع القطاعات</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Founder Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="bg-navy-gradient rounded-2xl p-8 md:p-10 shadow-elevated gold-border">
              {/* Decorative element */}
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-gold/20 rounded-full blur-2xl" />
              
              <div className="relative">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-gold to-gold-light flex items-center justify-center mx-auto mb-6">
                  <span className="text-3xl font-bold text-accent-foreground">ح</span>
                </div>
                
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-primary-foreground mb-2">
                    الأستاذ / حكيم الشرعبي
                  </h3>
                  <p className="text-gold font-medium mb-4">مؤسس المكتب</p>
                  <p className="text-primary-foreground/70 text-sm leading-relaxed">
                    مستشار قانوني ومستشار في التحكيم الدولي وفض المنازعات الدولية
                  </p>
                </div>

                <div className="mt-8 pt-6 border-t border-gold/20">
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-gold">+15</div>
                      <div className="text-xs text-primary-foreground/60">سنة خبرة</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-gold">+1500</div>
                      <div className="text-xs text-primary-foreground/60">استشارة</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-gold">+16</div>
                      <div className="text-xs text-primary-foreground/60">شركة</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
