import { motion } from "framer-motion";
import { Award, Users, Briefcase } from "lucide-react";
import hakimImage from "@/assets/hakim-alsharaabi.jpg";

const AboutSection = () => {
  return (
    <section id="about" className="section-padding bg-background">
      <div className="container-legal">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-20 items-center">
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
              مكتب الشرعبي: خبرة والتزام 
            </h2>
            <p className="text-body text-muted-foreground mb-8 leading-relaxed">
              مؤسس المكتب، الأستاذ <span className="text-gold font-semibold">عبدالحكيم الشرعبي</span>، مستشار قانوني ومستشار في التحكيم الدولي وفض المنازعات الدولية، بخبرة تمتد لأكثر من 15 سنة. ملتزمون بتقديم حلول قانونية دقيقة وموثوقة تحمي مصالح عملائنا وتضمن حقوقهم.
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
            className="relative order-first lg:order-last"
          >
            <div className="bg-navy-gradient rounded-xl sm:rounded-2xl overflow-hidden shadow-elevated gold-border max-w-sm mx-auto lg:max-w-none">
              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-16 sm:w-24 h-16 sm:h-24 bg-gold/20 rounded-full blur-3xl" />
              <div className="absolute -bottom-4 -left-4 w-14 sm:w-20 h-14 sm:h-20 bg-gold/10 rounded-full blur-2xl" />
              
              {/* Header Banner */}
              <div className="bg-gradient-to-l from-gold/20 to-transparent px-4 sm:px-8 py-3 sm:py-4 border-b border-gold/20">
                <span className="text-gold text-xs sm:text-sm font-semibold tracking-wider">FOUNDER & CEO</span>
              </div>
              
              <div className="relative p-5 sm:p-8 md:p-10">
                {/* Profile Image */}
                <div className="relative w-28 h-28 sm:w-36 sm:h-36 mx-auto mb-4 sm:mb-6">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-gold via-gold-light to-gold animate-pulse opacity-50" />
                  <div className="relative w-full h-full rounded-full bg-gradient-to-br from-gold to-gold-light p-1 overflow-hidden">
                    <img 
                      src={hakimImage} 
                      alt="الأستاذ عبدالحكيم الشرعبي"
                      className="w-full h-full rounded-full object-cover object-top"
                    />
                  </div>
                </div>
                
                {/* Name & Title */}
                <div className="text-center">
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-primary-foreground mb-2 sm:mb-3">
                    أ. عبدالحكيم الشرعبي
                  </h3>
                  <div className="inline-flex items-center gap-2 bg-gold/10 border border-gold/30 rounded-full px-3 sm:px-4 py-1.5 sm:py-2 mb-3 sm:mb-4">
                    <div className="w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full bg-gold animate-pulse" />
                    <span className="text-gold font-semibold text-xs sm:text-sm">المؤسس والمدير التنفيذي</span>
                  </div>
                  <p className="text-primary-foreground/80 text-xs sm:text-sm leading-relaxed max-w-xs mx-auto">
                    مستشار قانوني ومستشار في التحكيم الدولي وفض المنازعات الدولية
                  </p>
                </div>

                {/* Stats */}
                <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-gold/20">
                  <div className="grid grid-cols-3 gap-2 sm:gap-4 text-center">
                    <div className="group">
                      <div className="text-xl sm:text-2xl md:text-3xl font-bold text-gold group-hover:scale-110 transition-transform">+15</div>
                      <div className="text-[10px] sm:text-xs text-primary-foreground/60 mt-1">سنة خبرة</div>
                    </div>
                    <div className="group border-x border-gold/20">
                      <div className="text-xl sm:text-2xl md:text-3xl font-bold text-gold group-hover:scale-110 transition-transform">+1500</div>
                      <div className="text-[10px] sm:text-xs text-primary-foreground/60 mt-1">استشارة</div>
                    </div>
                    <div className="group">
                      <div className="text-xl sm:text-2xl md:text-3xl font-bold text-gold group-hover:scale-110 transition-transform">+16</div>
                      <div className="text-[10px] sm:text-xs text-primary-foreground/60 mt-1">شركة</div>
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
