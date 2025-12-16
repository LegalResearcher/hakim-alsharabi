import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DocumentViewer } from "./DocumentViewer";
import { FileText, Eye, Loader2, FolderOpen, Image as ImageIcon } from "lucide-react";
import { motion } from "framer-motion";

interface LibraryFilesGridProps {
  categorySlug: string;
}

interface LibraryFile {
  id: string;
  title: string;
  description: string | null;
  file_url: string;
  file_type: string;
  is_external: boolean | null;
}

const getFileIcon = (fileType: string) => {
  const type = fileType.toLowerCase();
  if (["jpg", "jpeg", "png", "gif", "webp", "bmp", "svg"].includes(type)) {
    return <ImageIcon className="w-6 h-6 text-primary" />;
  }
  return <FileText className="w-6 h-6 text-primary" />;
};

const getFileEmoji = (fileType: string) => {
  const type = fileType.toLowerCase();
  switch (type) {
    case "pdf":
      return "📄";
    case "doc":
    case "docx":
      return "📝";
    case "xls":
    case "xlsx":
      return "📊";
    case "jpg":
    case "jpeg":
    case "png":
    case "gif":
    case "webp":
      return "🖼️";
    default:
      return "📁";
  }
};

export const LibraryFilesGrid = ({ categorySlug }: LibraryFilesGridProps) => {
  const [selectedFile, setSelectedFile] = useState<LibraryFile | null>(null);

  // Fetch category by slug
  const { data: category } = useQuery({
    queryKey: ["library-category", categorySlug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("library_categories")
        .select("*")
        .eq("slug", categorySlug)
        .single();
      
      if (error) throw error;
      return data;
    },
  });

  // Fetch files for this category
  const { data: files, isLoading, error } = useQuery({
    queryKey: ["library-files", category?.id],
    queryFn: async () => {
      if (!category?.id) return [];
      
      const { data, error } = await supabase
        .from("library_files")
        .select("*")
        .eq("category_id", category.id)
        .eq("is_published", true)
        .order("sort_order", { ascending: true });
      
      if (error) throw error;
      return data as LibraryFile[];
    },
    enabled: !!category?.id,
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
        <span className="mr-2 text-muted-foreground">جاري تحميل الملفات...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-20">
        <p className="text-destructive">حدث خطأ في تحميل الملفات</p>
      </div>
    );
  }

  if (!files || files.length === 0) {
    return (
      <div className="text-center py-20">
        <FolderOpen className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
        <p className="text-muted-foreground text-lg">لا توجد ملفات في هذا القسم حالياً</p>
        <p className="text-muted-foreground text-sm mt-2">سيتم إضافة المحتوى قريباً</p>
      </div>
    );
  }

  return (
    <>
      <div className="grid gap-4 md:gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {files.map((file, index) => (
          <motion.div
            key={file.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <Card className="group hover:shadow-lg transition-all duration-300 border-border/50 hover:border-primary/30 bg-card h-full">
              <CardContent className="p-6 flex flex-col h-full">
                <div className="flex items-start gap-4 flex-1">
                  <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center text-2xl shrink-0 group-hover:scale-110 transition-transform">
                    {getFileEmoji(file.file_type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-foreground text-lg mb-1 line-clamp-2">
                      {file.title}
                    </h3>
                    {file.description && (
                      <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                        {file.description}
                      </p>
                    )}
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs bg-muted px-2 py-1 rounded-full text-muted-foreground uppercase">
                        {file.file_type}
                      </span>
                      {file.is_external && (
                        <span className="text-xs bg-gold/20 px-2 py-1 rounded-full text-gold">
                          رابط خارجي
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-border">
                  <Button
                    variant="default"
                    size="sm"
                    className="w-full gap-2"
                    onClick={() => setSelectedFile(file)}
                  >
                    <Eye className="w-4 h-4" />
                    عرض الملف
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {selectedFile && (
        <DocumentViewer
          url={selectedFile.file_url}
          title={selectedFile.title}
          fileType={selectedFile.file_type}
          isOpen={!!selectedFile}
          onClose={() => setSelectedFile(null)}
        />
      )}
    </>
  );
};
