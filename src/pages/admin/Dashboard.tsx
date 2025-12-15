import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FolderOpen, FileText, Eye, TrendingUp } from "lucide-react";

interface Stats {
  totalCategories: number;
  totalFiles: number;
  publishedFiles: number;
  totalDownloads: number;
}

const Dashboard = () => {
  const [stats, setStats] = useState<Stats>({
    totalCategories: 0,
    totalFiles: 0,
    publishedFiles: 0,
    totalDownloads: 0,
  });
  const [recentFiles, setRecentFiles] = useState<any[]>([]);

  useEffect(() => {
    fetchStats();
    fetchRecentFiles();
  }, []);

  const fetchStats = async () => {
    const [categoriesRes, filesRes] = await Promise.all([
      supabase.from("library_categories").select("id", { count: "exact" }),
      supabase.from("library_files").select("id, is_published, download_count"),
    ]);

    const files = filesRes.data || [];
    setStats({
      totalCategories: categoriesRes.count || 0,
      totalFiles: files.length,
      publishedFiles: files.filter((f) => f.is_published).length,
      totalDownloads: files.reduce((acc, f) => acc + (f.download_count || 0), 0),
    });
  };

  const fetchRecentFiles = async () => {
    const { data } = await supabase
      .from("library_files")
      .select(`
        id,
        title,
        created_at,
        is_published,
        library_categories (name)
      `)
      .order("created_at", { ascending: false })
      .limit(5);

    if (data) setRecentFiles(data);
  };

  const statCards = [
    { title: "الأقسام", value: stats.totalCategories, icon: FolderOpen, color: "bg-blue-500" },
    { title: "الملفات", value: stats.totalFiles, icon: FileText, color: "bg-green-500" },
    { title: "منشور", value: stats.publishedFiles, icon: Eye, color: "bg-purple-500" },
    { title: "التحميلات", value: stats.totalDownloads, icon: TrendingUp, color: "bg-orange-500" },
  ];

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground">لوحة التحكم</h1>
          <p className="text-muted-foreground mt-2">مرحباً بك في لوحة إدارة المكتبة القانونية</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {statCards.map((stat) => (
            <Card key={stat.title} className="border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 ${stat.color} rounded-xl flex items-center justify-center`}>
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                    <p className="text-sm text-muted-foreground">{stat.title}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Recent Files */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl">آخر الملفات المضافة</CardTitle>
          </CardHeader>
          <CardContent>
            {recentFiles.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">
                لا توجد ملفات بعد. ابدأ بإضافة ملفات جديدة!
              </p>
            ) : (
              <div className="space-y-4">
                {recentFiles.map((file) => (
                  <div
                    key={file.id}
                    className="flex items-center justify-between p-4 bg-muted/50 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <FileText className="w-5 h-5 text-primary" />
                      <div>
                        <p className="font-medium text-foreground">{file.title}</p>
                        <p className="text-sm text-muted-foreground">
                          {file.library_categories?.name}
                        </p>
                      </div>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        file.is_published
                          ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                          : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
                      }`}
                    >
                      {file.is_published ? "منشور" : "مسودة"}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default Dashboard;
