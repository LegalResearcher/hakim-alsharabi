import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Plus, Edit, Trash2, GripVertical } from "lucide-react";

interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  icon: string | null;
  sort_order: number;
}

const Categories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    const { data, error } = await supabase
      .from("library_categories")
      .select("*")
      .order("sort_order");

    if (data) setCategories(data);
    setLoading(false);
  };

  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      toast({ title: "خطأ", description: "الاسم مطلوب", variant: "destructive" });
      return;
    }

    const categoryData = {
      name: name.trim(),
      slug: generateSlug(name),
      description: description.trim() || null,
    };

    let error;
    if (editingCategory) {
      ({ error } = await supabase
        .from("library_categories")
        .update(categoryData)
        .eq("id", editingCategory.id));
    } else {
      ({ error } = await supabase.from("library_categories").insert({
        ...categoryData,
        sort_order: categories.length,
      }));
    }

    if (error) {
      toast({ title: "خطأ", description: error.message, variant: "destructive" });
    } else {
      toast({
        title: editingCategory ? "تم التحديث" : "تمت الإضافة",
        description: editingCategory ? "تم تحديث القسم بنجاح" : "تمت إضافة القسم بنجاح",
      });
      resetForm();
      fetchCategories();
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("هل أنت متأكد من حذف هذا القسم؟")) return;

    const { error } = await supabase.from("library_categories").delete().eq("id", id);

    if (error) {
      toast({ title: "خطأ", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "تم الحذف", description: "تم حذف القسم بنجاح" });
      fetchCategories();
    }
  };

  const resetForm = () => {
    setName("");
    setDescription("");
    setEditingCategory(null);
    setIsDialogOpen(false);
  };

  const openEditDialog = (category: Category) => {
    setEditingCategory(category);
    setName(category.name);
    setDescription(category.description || "");
    setIsDialogOpen(true);
  };

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">الأقسام</h1>
            <p className="text-muted-foreground mt-2">إدارة أقسام المكتبة القانونية</p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => resetForm()} className="gap-2">
                <Plus className="w-4 h-4" />
                قسم جديد
              </Button>
            </DialogTrigger>
            <DialogContent dir="rtl">
              <DialogHeader>
                <DialogTitle>{editingCategory ? "تعديل القسم" : "إضافة قسم جديد"}</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">اسم القسم *</Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="مثال: التشريعات والقوانين"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">الوصف</Label>
                  <Textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="وصف مختصر للقسم..."
                    rows={3}
                  />
                </div>
                <div className="flex gap-3 pt-4">
                  <Button type="submit" className="flex-1">
                    {editingCategory ? "تحديث" : "إضافة"}
                  </Button>
                  <Button type="button" variant="outline" onClick={resetForm}>
                    إلغاء
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <Card className="border-0 shadow-lg">
          <CardContent className="p-0">
            {loading ? (
              <div className="p-8 text-center text-muted-foreground">جاري التحميل...</div>
            ) : categories.length === 0 ? (
              <div className="p-8 text-center text-muted-foreground">
                لا توجد أقسام. أضف قسماً جديداً!
              </div>
            ) : (
              <div className="divide-y divide-border">
                {categories.map((category) => (
                  <div
                    key={category.id}
                    className="flex items-center gap-4 p-4 hover:bg-muted/50 transition-colors"
                  >
                    <GripVertical className="w-5 h-5 text-muted-foreground cursor-grab" />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-foreground truncate">{category.name}</h3>
                      {category.description && (
                        <p className="text-sm text-muted-foreground truncate">
                          {category.description}
                        </p>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => openEditDialog(category)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-destructive hover:text-destructive"
                        onClick={() => handleDelete(category.id)}
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

export default Categories;
