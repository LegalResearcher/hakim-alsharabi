import { Phone, Mail, MapPin } from "lucide-react";
import logo from "@/assets/logo.jpg";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-navy-gradient text-primary-foreground">
      <div className="container-legal py-10 sm:py-12 md:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10">
          {/* Logo & About */}
          <div className="sm:col-span-2">
            <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
              <img 
                src={logo} 
                alt="شعار مكتب الشرعبي" 
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg object-contain"
              />
              <span className="text-lg sm:text-xl font-bold">الشرعبي للخدمات القانونية</span>
            </div>
            <p className="text-primary-foreground/70 text-sm sm:text-base leading-relaxed mb-4 sm:mb-6 max-w-md">
              مكتب محاماة واستشارات قانونية متخصص في تأسيس الشركات، التحكيم الدولي، وحماية الحقوق. نلتزم بتقديم أفضل الخدمات القانونية لعملائنا.
            </p>
            <p className="text-gold font-medium">
              قانونياً، أنت في أيدٍ أمينة
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-gold">روابط سريعة</h4>
            <ul className="space-y-2 sm:space-y-3">
              <li>
                <a href="#about" className="text-primary-foreground/70 text-sm sm:text-base hover:text-gold transition-colors">
                  عن المكتب
                </a>
              </li>
              <li>
                <a href="#services" className="text-primary-foreground/70 text-sm sm:text-base hover:text-gold transition-colors">
                  خدماتنا
                </a>
              </li>
              <li>
                <a href="#values" className="text-primary-foreground/70 text-sm sm:text-base hover:text-gold transition-colors">
                  قيمنا
                </a>
              </li>
              <li>
                <a href="#contact" className="text-primary-foreground/70 text-sm sm:text-base hover:text-gold transition-colors">
                  تواصل معنا
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-gold">معلومات التواصل</h4>
            <ul className="space-y-3 sm:space-y-4">
              <li className="flex items-center gap-2 sm:gap-3">
                <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-gold flex-shrink-0" />
                <span className="text-primary-foreground/70 text-sm sm:text-base">صنعاء، اليمن</span>
              </li>
              <li className="flex items-center gap-2 sm:gap-3">
                <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-gold flex-shrink-0" />
                <a 
                  href="tel:+967775238375" 
                  className="text-primary-foreground/70 text-sm sm:text-base hover:text-gold transition-colors"
                  dir="ltr"
                >
                  +967 775 238 375
                </a>
              </li>
              <li className="flex items-center gap-2 sm:gap-3">
                <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-gold flex-shrink-0" />
                <a 
                  href="mailto:Lawer2hakim@gmail.com" 
                  className="text-primary-foreground/70 text-sm sm:text-base hover:text-gold transition-colors break-all"
                >
                  Lawer2hakim@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-gold/10">
        <div className="container-legal py-4 sm:py-6 text-center">
          <p className="text-primary-foreground/50 text-xs sm:text-sm">
            © {currentYear} مكتب الشرعبي للخدمات القانونية. جميع الحقوق محفوظة.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
