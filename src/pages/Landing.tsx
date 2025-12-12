import { Phone, MessageCircle, Scale, Award, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.jpg";

const Landing = () => {
  const phoneNumber = "+967775238375";
  const whatsappUrl = `https://wa.me/${phoneNumber.replace(/\+/g, "")}`;

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary via-primary to-primary-foreground/10 flex flex-col items-center justify-center p-4 sm:p-6" dir="rtl">
      {/* Logo & Title */}
      <div className="text-center mb-8">
        <div className="w-24 h-24 sm:w-32 sm:h-32 mx-auto mb-6 rounded-full overflow-hidden border-4 border-gold shadow-gold">
          <img 
            src={logo} 
            alt="مكتب المحامي حكيم الشرعبي" 
            className="w-full h-full object-cover"
          />
        </div>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gold mb-2">
          مكتب المحامي حكيم الشرعبي
        </h1>
        <p className="text-primary-foreground/80 text-lg sm:text-xl">
          للمحاماة والاستشارات القانونية
        </p>
      </div>

      {/* Features */}
      <div className="grid grid-cols-2 gap-4 mb-8 max-w-md w-full">
        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 text-center border border-gold/20">
          <Scale className="w-8 h-8 text-gold mx-auto mb-2" />
          <p className="text-primary-foreground/90 text-sm">تأسيس الشركات</p>
        </div>
        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 text-center border border-gold/20">
          <Award className="w-8 h-8 text-gold mx-auto mb-2" />
          <p className="text-primary-foreground/90 text-sm">التحكيم الدولي</p>
        </div>
        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 text-center border border-gold/20">
          <Users className="w-8 h-8 text-gold mx-auto mb-2" />
          <p className="text-primary-foreground/90 text-sm">قضايا العمل</p>
        </div>
        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 text-center border border-gold/20">
          <Scale className="w-8 h-8 text-gold mx-auto mb-2" />
          <p className="text-primary-foreground/90 text-sm">العقود التجارية</p>
        </div>
      </div>

      {/* Tagline */}
      <p className="text-gold text-lg sm:text-xl font-medium mb-8 text-center">
        قانونياً، أنت في أيدٍ أمينة
      </p>

      {/* CTA Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
        <Button 
          asChild
          className="flex-1 bg-green-600 hover:bg-green-700 text-white py-6 text-lg rounded-xl shadow-lg"
        >
          <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
            <MessageCircle className="w-5 h-5 ml-2" />
            تواصل عبر واتساب
          </a>
        </Button>
        <Button 
          asChild
          variant="outline"
          className="flex-1 border-gold text-gold hover:bg-gold hover:text-primary-foreground py-6 text-lg rounded-xl"
        >
          <a href={`tel:${phoneNumber}`}>
            <Phone className="w-5 h-5 ml-2" />
            اتصل الآن
          </a>
        </Button>
      </div>

      {/* View Website Link */}
      <a 
        href="/" 
        className="mt-8 text-primary-foreground/60 hover:text-gold transition-colors underline"
      >
        زيارة الموقع الكامل
      </a>

      {/* Footer */}
      <p className="mt-12 text-primary-foreground/40 text-sm">
        © {new Date().getFullYear()} مكتب المحامي حكيم الشرعبي
      </p>
    </div>
  );
};

export default Landing;
