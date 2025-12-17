import { NavLink, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, 
  FolderOpen, 
  FileText, 
  Settings, 
  LogOut,
  Menu,
  X,
  Scale,
  Users
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface AdminSidebarProps {
  onSignOut: () => void;
}

const menuItems = [
  { icon: LayoutDashboard, label: "الرئيسية", path: "/admin" },
  { icon: FolderOpen, label: "الأقسام", path: "/admin/categories" },
  { icon: FileText, label: "الملفات", path: "/admin/files" },
  { icon: Users, label: "المستخدمون", path: "/admin/users" },
  { icon: Settings, label: "الإعدادات", path: "/admin/settings" },
];

export const AdminSidebar = ({ onSignOut }: AdminSidebarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  return (
    <>
      {/* Mobile Menu Button */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-4 right-4 z-50 md:hidden bg-background shadow-lg"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>

      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed top-0 right-0 h-full w-64 bg-card border-l border-border z-40 transform transition-transform duration-300 md:translate-x-0",
          isOpen ? "translate-x-0" : "translate-x-full md:translate-x-0"
        )}
        dir="rtl"
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6 border-b border-border">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                <Scale className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h1 className="font-bold text-foreground">لوحة التحكم</h1>
                <p className="text-xs text-muted-foreground">المكتبة القانونية</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2">
            {menuItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === "/admin"}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  cn(
                    "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200",
                    isActive
                      ? "bg-primary text-primary-foreground shadow-lg"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )
                }
              >
                <item.icon className="w-5 h-5" />
                <span>{item.label}</span>
              </NavLink>
            ))}
          </nav>

          {/* Sign Out */}
          <div className="p-4 border-t border-border">
            <Button
              variant="ghost"
              className="w-full justify-start gap-3 text-destructive hover:text-destructive hover:bg-destructive/10"
              onClick={onSignOut}
            >
              <LogOut className="w-5 h-5" />
              <span>تسجيل الخروج</span>
            </Button>
          </div>
        </div>
      </aside>
    </>
  );
};
