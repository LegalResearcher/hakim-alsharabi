import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { FileUploadForm } from "@/components/admin/FileUploadForm";
import { useToast } from "@/hooks/use-toast";
import { Plus, Search, Edit, Trash2, Eye, EyeOff, FileText, Filter } from "lucide-react";

interface LibraryFile {
  id: string;
  title: string;
  description: string | null;
  file_url: string;
  file_type: string;
  category_id: string;
  is_published: boolean;
  is_external: boolean | null;
  created_at: string;
  library_categories: { name: string } | null;
}

interface Category {
  id: string;
  name: string;
}

const Files = () => {
  const [files, setFiles] = useState<LibraryFile[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingFile, setEditingFile] = useState<LibraryFile | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState<string>("all");
  const { toast } = useToast();

  useEffect(() => {
    fetchFiles();
    fetchCategories();
  }, []);

  const fetchFiles = async () => {
    const { data } = await supabase
      .from("library_files")
      .select(`
        *,
        library_categories (name)
      `)
      .order("created_at", { ascending: false });

    if (data) setFiles(data);
    setLoading(false);
  };

  const fetchCategories = async () => {
    const { data } = await supabase
      .from("library_categories")
      .select("id, name")
      .order("sort_order");

    if (data) setCategories(data);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("هل أنت متأكد من حذف هذا الملف؟")) return;

    const { error } = await supabase.from("library_files").delete().eq("id", id);

    if (error) {
      toast({ title: "خطأ", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "تم الحذف", description: "تم حذف الملف بنجاح" });
      fetchFiles();
    }
  };

  const togglePublish = async (id: string, currentStatus: boolean) => {
    const { error } = await supabase
      .from("library_files")
      .update({ is_published: !currentStatus })
      .eq("id", id);

    if (error) {
      toast({ title: "خطأ", description: error.message, variant: "destructive" });
    } else {
      toast({
        title: currentStatus ? "تم الإخفاء" : "تم النشر",
        description: currentStatus ? "تم إخفاء الملف عن الزوار" : "تم نشر الملف للزوار",
      });
      fetchFiles();
    }
  };

  const resetForm = () => {
    setEditingFile(null);
    setIsDialogOpen(false);
  };

  const openEditDialog = (file: LibraryFile) => {
    setEditingFile(file);
    setIsDialogOpen(true);
  };

  const filteredFiles = files.filter((file) => {
    const matchesSearch = file.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = filterCategory === "all" || file.category_id === filterCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">الملفات</h1>
            <p className="text-muted-foreground mt-2">إدارة ملفات المكتبة القانونية</p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => setEditingFile(null)} className="gap-2">
                <Plus className="w-4 h-4" />
                ملف جديد
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto" dir="rtl">
              <DialogHeader>
                <DialogTitle>{editingFile ? "تعديل الملف" : "إضافة ملف جديد"}</DialogTitle>
              </DialogHeader>
              <FileUploadForm
                onSuccess={() => {
                  resetForm();
                  fetchFiles();
                }}
                onCancel={resetForm}
                editingFile={editingFile}
              />
            </DialogContent>
          </Dialog>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="بحث عن ملف..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pr-10"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-muted-foreground" />
            <Select value={filterCategory} onValueChange={setFilterCategory}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="كل الأقسام" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">كل الأقسام</SelectItem>
                {categories.map((cat) => (
                  <SelectItem key={cat.id} value={cat.id}>
                    {cat.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Files List */}
        <Card className="border-0 shadow-lg">
          <CardContent className="p-0">
            {loading ? (
              <div className="p-8 text-center text-muted-foreground">جاري التحميل...</div>
            ) : filteredFiles.length === 0 ? (
              <div className="p-8 text-center text-muted-foreground">
                {searchQuery || filterCategory !== "all"
                  ? "لا توجد نتائج مطابقة"
                  : "لا توجد ملفات. أضف ملفاً جديداً!"}
              </div>
            ) : (
              <div className="divide-y divide-border">
                {filteredFiles.map((file) => (
                  <div
                    key={file.id}
                    className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 hover:bg-muted/50 transition-colors"
                  >
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
                      <FileText className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-foreground">{file.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        {file.library_categories?.name} • {file.file_type.toUpperCase()}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => togglePublish(file.id, file.is_published)}
                        title={file.is_published ? "إخفاء" : "نشر"}
                      >
                        {file.is_published ? (
                          <Eye className="w-4 h-4 text-green-600" />
                        ) : (
                          <EyeOff className="w-4 h-4 text-muted-foreground" />
                        )}
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => openEditDialog(file)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-destructive hover:text-destructive"
                        onClick={() => handleDelete(file.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
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

export default Files;
