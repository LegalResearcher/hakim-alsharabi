import { Scale, Phone, Mail, MapPin } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-navy-gradient text-primary-foreground">
      <div className="container-legal py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Logo & About */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <Scale className="w-8 h-8 text-gold" />
              <span className="text-xl font-bold">الشرعبي للخدمات القانونية</span>
            </div>
            <p className="text-primary-foreground/70 leading-relaxed mb-6 max-w-md">
              مكتب محاماة واستشارات قانونية متخصص في تأسيس الشركات، التحكيم الدولي، وحماية الحقوق. نلتزم بتقديم أفضل الخدمات القانونية لعملائنا.
            </p>
            <p className="text-gold font-medium">
              قانونياً، أنت في أيدٍ أمينة
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-gold">روابط سريعة</h4>
            <ul className="space-y-3">
              <li>
                <a href="#about" className="text-primary-foreground/70 hover:text-gold transition-colors">
                  عن المكتب
                </a>
              </li>
              <li>
                <a href="#services" className="text-primary-foreground/70 hover:text-gold transition-colors">
                  خدماتنا
                </a>
              </li>
              <li>
                <a href="#values" className="text-primary-foreground/70 hover:text-gold transition-colors">
                  قيمنا
                </a>
              </li>
              <li>
                <a href="#contact" className="text-primary-foreground/70 hover:text-gold transition-colors">
                  تواصل معنا
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-gold">معلومات التواصل</h4>
            <ul className="space-y-4">
              <li className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-gold flex-shrink-0" />
                <span className="text-primary-foreground/70">صنعاء، اليمن</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-gold flex-shrink-0" />
                <a 
                  href="tel:+967775238375" 
                  className="text-primary-foreground/70 hover:text-gold transition-colors"
                  dir="ltr"
                >
                  +967 775 238 375
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-gold flex-shrink-0" />
                <a 
                  href="mailto:Lawer2hakim@gmail.com" 
                  className="text-primary-foreground/70 hover:text-gold transition-colors"
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
        <div className="container-legal py-6 text-center">
          <p className="text-primary-foreground/50 text-sm">
            © {currentYear} مكتب الشرعبي للخدمات القانونية. جميع الحقوق محفوظة.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
