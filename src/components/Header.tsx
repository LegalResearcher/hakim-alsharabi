import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, Book } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import logo from "@/assets/logo.jpg";

const navLinks = [
  { href: "#about", label: "عن المكتب", isHash: true },
  { href: "#services", label: "خدماتنا", isHash: true },
  { href: "#values", label: "قيمنا", isHash: true },
  { href: "/library", label: "المكتبة القانونية", isHash: false, icon: Book },
  { href: "#contact", label: "تواصل معنا", isHash: true }
];

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href: string, isHash: boolean) => {
    if (isHash && !isHomePage) {
      window.location.href = "/" + href;
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-background/95 backdrop-blur-md shadow-lg py-2"
          : "bg-transparent py-4"
      }`}
    >
      <div className="container-legal">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 sm:gap-3">
            <img 
              src={logo} 
              alt="شعار مكتب الشرعبي" 
              className={`transition-all duration-300 rounded-lg object-contain ${
                isScrolled || !isHomePage ? "w-10 h-10 sm:w-12 sm:h-12" : "w-12 h-12 sm:w-14 sm:h-14"
              }`}
            />
            <span className={`text-sm sm:text-base md:text-lg font-bold ${isScrolled || !isHomePage ? "text-foreground" : "text-primary-foreground"}`}>
              الشرعبي للخدمات القانونية
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8">
            {navLinks.map((link) => (
              link.isHash ? (
                <a
                  key={link.href}
                  href={isHomePage ? link.href : "/" + link.href}
                  className={`font-medium transition-colors hover:text-gold ${
                    isScrolled || !isHomePage ? "text-foreground" : "text-primary-foreground"
                  }`}
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`font-medium transition-colors hover:text-gold flex items-center gap-1.5 ${
                    isScrolled || !isHomePage ? "text-foreground" : "text-primary-foreground"
                  } ${location.pathname.startsWith(link.href) ? "text-gold" : ""}`}
                >
                  {link.icon && <link.icon className="w-4 h-4" />}
                  {link.label}
                </Link>
              )
            ))}
            <a
              href={isHomePage ? "#contact" : "/#contact"}
              className="px-6 py-2.5 bg-gold text-accent-foreground font-semibold rounded-lg shadow-gold hover:bg-gold-light transition-all duration-300"
            >
              استشارة مجانية
            </a>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2"
            aria-label="القائمة"
          >
            {isMobileMenuOpen ? (
              <X className={`w-6 h-6 ${isScrolled || !isHomePage ? "text-foreground" : "text-primary-foreground"}`} />
            ) : (
              <Menu className={`w-6 h-6 ${isScrolled || !isHomePage ? "text-foreground" : "text-primary-foreground"}`} />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden overflow-hidden bg-background/95 backdrop-blur-md rounded-b-xl"
            >
              <nav className="flex flex-col gap-4 pt-6 pb-4 px-4">
                {navLinks.map((link) => (
                  link.isHash ? (
                    <a
                      key={link.href}
                      href={isHomePage ? link.href : "/" + link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="font-medium py-2 transition-colors hover:text-gold text-foreground"
                    >
                      {link.label}
                    </a>
                  ) : (
                    <Link
                      key={link.href}
                      to={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`font-medium py-2 transition-colors hover:text-gold text-foreground flex items-center gap-2 ${
                        location.pathname.startsWith(link.href) ? "text-gold" : ""
                      }`}
                    >
                      {link.icon && <link.icon className="w-4 h-4" />}
                      {link.label}
                    </Link>
                  )
                ))}
                <a
                  href={isHomePage ? "#contact" : "/#contact"}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="px-6 py-3 bg-gold text-accent-foreground font-semibold rounded-lg text-center shadow-gold hover:bg-gold-light transition-all duration-300"
                >
                  استشارة مجانية
                </a>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default Header;
