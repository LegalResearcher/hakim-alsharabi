import { AdminLayout } from "@/components/admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { User, Shield, Info } from "lucide-react";

const Settings = () => {
  const { user } = useAuth();

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground">الإعدادات</h1>
          <p className="text-muted-foreground mt-2">إعدادات لوحة التحكم</p>
        </div>

        {/* Account Info */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="w-5 h-5" />
              معلومات الحساب
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
              <span className="text-muted-foreground">البريد الإلكتروني</span>
              <span className="font-medium text-foreground" dir="ltr">{user?.email}</span>
            </div>
            <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
              <span className="text-muted-foreground">الدور</span>
              <span className="flex items-center gap-2 font-medium text-primary">
                <Shield className="w-4 h-4" />
                مدير
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Instructions */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Info className="w-5 h-5" />
              تعليمات الاستخدام
            </CardTitle>
            <CardDescription>
              كيفية إضافة الملفات من Google Drive
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3 text-muted-foreground">
              <p className="font-medium text-foreground">لتضمين ملف من Google Drive:</p>
              <ol className="list-decimal list-inside space-y-2 mr-4">
                <li>افتح الملف في Google Drive</li>
                <li>اضغط على زر "مشاركة" (Share)</li>
                <li>اختر "أي شخص لديه الرابط" (Anyone with the link)</li>
                <li>انسخ الرابط والصقه في نموذج إضافة الملف</li>
              </ol>
              <p className="text-sm bg-primary/10 p-4 rounded-lg">
                💡 النظام سيحول الرابط تلقائياً إلى رابط تضمين يعمل داخل الموقع
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default Settings;
