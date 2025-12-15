import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Link as LinkIcon } from "lucide-react";
import { z } from "zod";

interface Category {
  id: string;
  name: string;
  slug: string;
}

interface FileUploadFormProps {
  onSuccess: () => void;
  onCancel: () => void;
  editingFile?: {
    id: string;
    title: string;
    description: string | null;
    file_url: string;
    file_type: string;
    category_id: string;
    is_published: boolean;
  } | null;
}

const fileSchema = z.object({
  title: z.string().min(1, "العنوان مطلوب"),
  file_url: z.string().url("الرابط غير صالح"),
  category_id: z.string().min(1, "القسم مطلوب"),
});

export const FileUploadForm = ({ onSuccess, onCancel, editingFile }: FileUploadFormProps) => {
  const [title, setTitle] = useState(editingFile?.title || "");
  const [description, setDescription] = useState(editingFile?.description || "");
  const [fileUrl, setFileUrl] = useState(editingFile?.file_url || "");
  const [fileType, setFileType] = useState(editingFile?.file_type || "pdf");
  const [categoryId, setCategoryId] = useState(editingFile?.category_id || "");
  const [isPublished, setIsPublished] = useState(editingFile?.is_published ?? true);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { toast } = useToast();

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    const { data } = await supabase
      .from("library_categories")
      .select("id, name, slug")
      .order("sort_order");
    
    if (data) setCategories(data);
  };

  const convertToEmbedUrl = (url: string): string => {
    // Convert Google Drive sharing link to embed link
    const driveMatch = url.match(/\/d\/([a-zA-Z0-9_-]+)/);
    if (driveMatch) {
      return `https://drive.google.com/file/d/${driveMatch[1]}/preview`;
    }
    
    // Convert Dropbox link
    if (url.includes("dropbox.com")) {
      return url.replace("www.dropbox.com", "dl.dropboxusercontent.com").replace("?dl=0", "");
    }

    return url;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validation = fileSchema.safeParse({ title, file_url: fileUrl, category_id: categoryId });
    if (!validation.success) {
      const fieldErrors: Record<string, string> = {};
      validation.error.errors.forEach((err) => {
        fieldErrors[err.path[0] as string] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setErrors({});
    setLoading(true);

    const embedUrl = convertToEmbedUrl(fileUrl);
    
    const fileData = {
      title: title.trim(),
      description: description.trim() || null,
      file_url: embedUrl,
      file_type: fileType,
      category_id: categoryId,
      is_published: isPublished,
      is_external: true,
    };

    let error;
    if (editingFile) {
      ({ error } = await supabase
        .from("library_files")
        .update(fileData)
        .eq("id", editingFile.id));
    } else {
      ({ error } = await supabase.from("library_files").insert(fileData));
    }

    setLoading(false);

    if (error) {
      toast({
        title: "خطأ",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: editingFile ? "تم التحديث" : "تمت الإضافة",
        description: editingFile ? "تم تحديث الملف بنجاح" : "تمت إضافة الملف بنجاح",
      });
      onSuccess();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6" dir="rtl">
      <div className="space-y-2">
        <Label htmlFor="title">عنوان الملف *</Label>
        <Input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="مثال: قانون العمل اليمني"
          className={errors.title ? "border-destructive" : ""}
        />
        {errors.title && <p className="text-sm text-destructive">{errors.title}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">الوصف</Label>
        <Textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="وصف مختصر للملف..."
          rows={3}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="category">القسم *</Label>
        <Select value={categoryId} onValueChange={setCategoryId}>
          <SelectTrigger className={errors.category_id ? "border-destructive" : ""}>
            <SelectValue placeholder="اختر القسم" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((cat) => (
              <SelectItem key={cat.id} value={cat.id}>
                {cat.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.category_id && <p className="text-sm text-destructive">{errors.category_id}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="fileUrl" className="flex items-center gap-2">
          <LinkIcon className="w-4 h-4" />
          رابط الملف *
        </Label>
        <Input
          id="fileUrl"
          value={fileUrl}
          onChange={(e) => setFileUrl(e.target.value)}
          placeholder="https://drive.google.com/file/d/..."
          className={errors.file_url ? "border-destructive" : ""}
          dir="ltr"
        />
        {errors.file_url && <p className="text-sm text-destructive">{errors.file_url}</p>}
        <p className="text-xs text-muted-foreground">
          يدعم روابط Google Drive و Dropbox والروابط المباشرة
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="fileType">نوع الملف</Label>
        <Select value={fileType} onValueChange={setFileType}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="pdf">PDF</SelectItem>
            <SelectItem value="doc">Word</SelectItem>
            <SelectItem value="xls">Excel</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
        <Label htmlFor="published" className="cursor-pointer">
          نشر الملف للزوار
        </Label>
        <Switch
          id="published"
          checked={isPublished}
          onCheckedChange={setIsPublished}
        />
      </div>

      <div className="flex gap-3 pt-4">
        <Button type="submit" disabled={loading} className="flex-1">
          {loading && <Loader2 className="w-4 h-4 ml-2 animate-spin" />}
          {editingFile ? "تحديث" : "إضافة"}
        </Button>
        <Button type="button" variant="outline" onClick={onCancel}>
          إلغاء
        </Button>
      </div>
    </form>
  );
};
