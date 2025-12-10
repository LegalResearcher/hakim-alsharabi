import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

const ContactSection = () => {
  return (
    <section id="contact" className="section-padding bg-background">
      <div className="container-legal">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-20">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-gold font-semibold text-sm tracking-wider mb-4 block">
              تواصل معنا
            </span>
            <h2 className="heading-secondary text-foreground mb-6">
              نحن هنا لحماية مصالحك
            </h2>
            <p className="text-body text-muted-foreground mb-10 leading-relaxed">
              تواصل معنا اليوم للحصول على استشارة قانونية متخصصة. فريقنا جاهز لخدمتك على مدار الساعة.
            </p>

            <div className="space-y-4 sm:space-y-6">
              <div className="flex items-start gap-3 sm:gap-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-gold/10 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-gold" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground text-sm sm:text-base mb-1">العنوان</h4>
                  <p className="text-muted-foreground text-sm sm:text-base">صنعاء، الجمهورية اليمنية</p>
                </div>
              </div>

              <div className="flex items-start gap-3 sm:gap-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-gold/10 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5 sm:w-6 sm:h-6 text-gold" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground text-sm sm:text-base mb-1">رقم الجوال</h4>
                  <a 
                    href="tel:+967775238375" 
                    className="text-muted-foreground text-sm sm:text-base hover:text-gold transition-colors"
                    dir="ltr"
                  >
                    +967 775 238 375
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3 sm:gap-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-gold/10 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-gold" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground text-sm sm:text-base mb-1">البريد الإلكتروني</h4>
                  <a 
                    href="mailto:Lawer2hakim@gmail.com" 
                    className="text-muted-foreground text-sm sm:text-base hover:text-gold transition-colors break-all"
                  >
                    Lawer2hakim@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3 sm:gap-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-gold/10 flex items-center justify-center flex-shrink-0">
                  <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-gold" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground text-sm sm:text-base mb-1">ساعات العمل</h4>
                  <p className="text-muted-foreground text-sm sm:text-base">السبت - الخميس: 8:00 صباحاً - 5:00 مساءً</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="bg-card rounded-xl sm:rounded-2xl p-5 sm:p-8 md:p-10 shadow-elevated gold-border">
              <h3 className="text-lg sm:text-xl font-semibold text-foreground mb-4 sm:mb-6">
                اطلب استشارة قانونية
              </h3>
              <form className="space-y-4 sm:space-y-5">
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-foreground mb-1.5 sm:mb-2">
                    الاسم الكامل
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base rounded-lg border border-border bg-background focus:border-gold focus:ring-1 focus:ring-gold outline-none transition-all"
                    placeholder="أدخل اسمك الكامل"
                  />
                </div>
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-foreground mb-1.5 sm:mb-2">
                    رقم الجوال
                  </label>
                  <input
                    type="tel"
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base rounded-lg border border-border bg-background focus:border-gold focus:ring-1 focus:ring-gold outline-none transition-all"
                    placeholder="+967 XXX XXX XXX"
                    dir="ltr"
                  />
                </div>
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-foreground mb-1.5 sm:mb-2">
                    نوع الخدمة المطلوبة
                  </label>
                  <select className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base rounded-lg border border-border bg-background focus:border-gold focus:ring-1 focus:ring-gold outline-none transition-all">
                    <option value="">اختر الخدمة</option>
                    <option value="company">تأسيس شركة</option>
                    <option value="arbitration">التحكيم الدولي</option>
                    <option value="trademark">تسجيل علامة تجارية</option>
                    <option value="consultation">استشارة قانونية</option>
                    <option value="other">أخرى</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-foreground mb-1.5 sm:mb-2">
                    تفاصيل الاستشارة
                  </label>
                  <textarea
                    rows={4}
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base rounded-lg border border-border bg-background focus:border-gold focus:ring-1 focus:ring-gold outline-none transition-all resize-none"
                    placeholder="اكتب تفاصيل استفسارك هنا..."
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-3 sm:py-4 bg-gold text-accent-foreground font-semibold text-sm sm:text-base rounded-lg shadow-gold hover:bg-gold-light transition-all duration-300 transform hover:scale-[1.02]"
                >
                  إرسال الطلب
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
