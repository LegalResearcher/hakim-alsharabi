import { useState, useEffect, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Link as LinkIcon, Upload, FileText, X } from "lucide-react";
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
    is_external: boolean | null;
  } | null;
}

const fileSchema = z.object({
  title: z.string().min(1, "العنوان مطلوب"),
  category_id: z.string().min(1, "القسم مطلوب"),
});

export const FileUploadForm = ({ onSuccess, onCancel, editingFile }: FileUploadFormProps) => {
  const [title, setTitle] = useState(editingFile?.title || "");
  const [description, setDescription] = useState(editingFile?.description || "");
  const [fileUrl, setFileUrl] = useState(editingFile?.file_url || "");
  const [fileType, setFileType] = useState(editingFile?.file_type || "pdf");
  const [categoryId, setCategoryId] = useState(editingFile?.category_id || "");
  const [isPublished, setIsPublished] = useState(editingFile?.is_published ?? true);
  const [isExternal, setIsExternal] = useState(editingFile?.is_external ?? true);
  const [allowDownload, setAllowDownload] = useState((editingFile as any)?.allow_download ?? true);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const fileInputRef = useRef<HTMLInputElement>(null);
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
    const driveMatch = url.match(/\/d\/([a-zA-Z0-9_-]+)/);
    if (driveMatch) {
      return `https://drive.google.com/file/d/${driveMatch[1]}/preview`;
    }
    
    if (url.includes("dropbox.com")) {
      return url.replace("www.dropbox.com", "dl.dropboxusercontent.com").replace("?dl=0", "");
    }

    return url;
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const allowedTypes = [
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
      ];
      
      if (!allowedTypes.includes(file.type)) {
        toast({
          title: "نوع ملف غير مدعوم",
          description: "يُسمح فقط بملفات PDF و Word",
          variant: "destructive",
        });
        return;
      }

      if (file.size > 50 * 1024 * 1024) {
        toast({
          title: "حجم الملف كبير",
          description: "الحد الأقصى لحجم الملف 50 ميجابايت",
          variant: "destructive",
        });
        return;
      }

      setSelectedFile(file);
      
      if (file.type === 'application/pdf') {
        setFileType('pdf');
      } else {
        setFileType('doc');
      }

      if (!title) {
        setTitle(file.name.replace(/\.[^/.]+$/, ""));
      }
    }
  };

  const uploadFile = async (file: File): Promise<string | null> => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
    const filePath = `${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('library-files')
      .upload(filePath, file);

    if (uploadError) {
      throw uploadError;
    }

    const { data: { publicUrl } } = supabase.storage
      .from('library-files')
      .getPublicUrl(filePath);

    return publicUrl;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validation = fileSchema.safeParse({ title, category_id: categoryId });
    if (!validation.success) {
      const fieldErrors: Record<string, string> = {};
      validation.error.errors.forEach((err) => {
        fieldErrors[err.path[0] as string] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    if (!isExternal && !selectedFile && !editingFile) {
      setErrors({ file: "يرجى اختيار ملف للرفع" });
      return;
    }

    if (isExternal && !fileUrl) {
      setErrors({ file_url: "رابط الملف مطلوب" });
      return;
    }

    setErrors({});
    setLoading(true);

    try {
      let finalUrl = fileUrl;
      
      if (!isExternal && selectedFile) {
        setUploading(true);
        finalUrl = await uploadFile(selectedFile) || "";
        setUploading(false);
      } else if (isExternal) {
        finalUrl = convertToEmbedUrl(fileUrl);
      }

      const fileData = {
        title: title.trim(),
        description: description.trim() || null,
        file_url: finalUrl,
        file_type: fileType,
        category_id: categoryId,
        is_published: isPublished,
        is_external: isExternal,
        allow_download: allowDownload,
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

      if (error) throw error;

      toast({
        title: editingFile ? "تم التحديث" : "تمت الإضافة",
        description: editingFile ? "تم تحديث الملف بنجاح" : "تمت إضافة الملف بنجاح",
      });
      onSuccess();
    } catch (error: any) {
      toast({
        title: "خطأ",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
      setUploading(false);
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

      {/* Upload Type Toggle */}
      <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
        <Label className="cursor-pointer">
          {isExternal ? "رابط خارجي" : "رفع ملف مباشر"}
        </Label>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">رابط</span>
          <Switch
            checked={!isExternal}
            onCheckedChange={(checked) => {
              setIsExternal(!checked);
              setSelectedFile(null);
              setFileUrl("");
            }}
          />
          <span className="text-sm text-muted-foreground">رفع</span>
        </div>
      </div>

      {isExternal ? (
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
      ) : (
        <div className="space-y-2">
          <Label className="flex items-center gap-2">
            <Upload className="w-4 h-4" />
            رفع ملف *
          </Label>
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={handleFileSelect}
            className="hidden"
          />
          
          {selectedFile ? (
            <div className="flex items-center gap-3 p-4 bg-muted rounded-lg">
              <FileText className="w-8 h-8 text-primary" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{selectedFile.name}</p>
                <p className="text-xs text-muted-foreground">
                  {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => setSelectedFile(null)}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          ) : (
            <Button
              type="button"
              variant="outline"
              className="w-full h-24 border-dashed"
              onClick={() => fileInputRef.current?.click()}
            >
              <div className="flex flex-col items-center gap-2">
                <Upload className="w-6 h-6" />
                <span>اضغط لاختيار ملف (PDF أو Word)</span>
                <span className="text-xs text-muted-foreground">الحد الأقصى: 50 ميجابايت</span>
              </div>
            </Button>
          )}
          {errors.file && <p className="text-sm text-destructive">{errors.file}</p>}
        </div>
      )}

      <div className="space-y-2">
        <Label htmlFor="fileType">نوع الملف</Label>
        <Select value={fileType} onValueChange={setFileType}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="pdf">PDF</SelectItem>
            <SelectItem value="doc">Word</SelectItem>
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

      <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
        <Label htmlFor="allowDownload" className="cursor-pointer">
          السماح بالتحميل
        </Label>
        <Switch
          id="allowDownload"
          checked={allowDownload}
          onCheckedChange={setAllowDownload}
        />
      </div>

      <div className="flex gap-3 pt-4">
        <Button type="submit" disabled={loading || uploading} className="flex-1">
          {(loading || uploading) && <Loader2 className="w-4 h-4 ml-2 animate-spin" />}
          {uploading ? "جارِ الرفع..." : editingFile ? "تحديث" : "إضافة"}
        </Button>
        <Button type="button" variant="outline" onClick={onCancel}>
          إلغاء
        </Button>
      </div>
    </form>
  );
};
