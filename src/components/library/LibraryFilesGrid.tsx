import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DocumentViewer } from "./DocumentViewer";
import { FileText, Eye, Loader2, FolderOpen, Image as ImageIcon, Download, Search, Filter, X } from "lucide-react";
import { motion } from "framer-motion";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
  download_count: number | null;
  allow_download: boolean | null;
}

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

const FILE_TYPES = [
  { value: "all", label: "جميع الأنواع" },
  { value: "pdf", label: "PDF" },
  { value: "doc", label: "Word" },
  { value: "image", label: "صور" },
];

export const LibraryFilesGrid = ({ categorySlug }: LibraryFilesGridProps) => {
  const [selectedFile, setSelectedFile] = useState<LibraryFile | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("all");

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

  const filteredFiles = useMemo(() => {
    if (!files) return [];
    
    return files.filter((file) => {
      const matchesSearch = file.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (file.description?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false);
      
      let matchesType = true;
      if (filterType !== "all") {
        const type = file.file_type.toLowerCase();
        if (filterType === "pdf") {
          matchesType = type === "pdf";
        } else if (filterType === "doc") {
          matchesType = type === "doc" || type === "docx";
        } else if (filterType === "image") {
          matchesType = ["jpg", "jpeg", "png", "gif", "webp", "bmp", "svg"].includes(type);
        }
      }
      
      return matchesSearch && matchesType;
    });
  }, [files, searchQuery, filterType]);

  const clearFilters = () => {
    setSearchQuery("");
    setFilterType("all");
  };

  const hasActiveFilters = searchQuery || filterType !== "all";

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

  return (
    <>
      {/* Search and Filter Bar */}
      <div className="mb-6 space-y-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="ابحث عن ملف..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pr-10"
            />
          </div>
          <div className="flex gap-2">
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-full sm:w-[160px]">
                <Filter className="w-4 h-4 ml-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {FILE_TYPES.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {hasActiveFilters && (
              <Button variant="outline" size="icon" onClick={clearFilters}>
                <X className="w-4 h-4" />
              </Button>
            )}
          </div>
        </div>
        
        {hasActiveFilters && (
          <p className="text-sm text-muted-foreground">
            عرض {filteredFiles.length} من {files?.length || 0} ملف
          </p>
        )}
      </div>

      {filteredFiles.length === 0 ? (
        <div className="text-center py-20">
          <FolderOpen className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
          <p className="text-muted-foreground text-lg">
            {hasActiveFilters ? "لا توجد نتائج مطابقة للبحث" : "لا توجد ملفات في هذا القسم حالياً"}
          </p>
          {hasActiveFilters && (
            <Button variant="link" onClick={clearFilters} className="mt-2">
              مسح البحث والفلاتر
            </Button>
          )}
        </div>
      ) : (
        <div className="grid gap-3 sm:gap-4 md:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {filteredFiles.map((file, index) => (
            <motion.div
              key={file.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card className="group hover:shadow-lg transition-all duration-300 border-border/50 hover:border-primary/30 bg-card h-full">
                <CardContent className="p-4 sm:p-6 flex flex-col h-full">
                  <div className="flex items-start gap-3 sm:gap-4 flex-1">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 bg-primary/10 rounded-xl flex items-center justify-center text-xl sm:text-2xl shrink-0 group-hover:scale-110 transition-transform">
                      {getFileEmoji(file.file_type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-foreground text-base sm:text-lg mb-1 line-clamp-2">
                        {file.title}
                      </h3>
                      {file.description && (
                        <p className="text-sm text-muted-foreground line-clamp-2 mb-2 sm:mb-3">
                          {file.description}
                        </p>
                      )}
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-xs bg-muted px-2 py-1 rounded-full text-muted-foreground uppercase">
                          {file.file_type}
                        </span>
                        {(file.download_count ?? 0) > 0 && (
                          <span className="text-xs text-muted-foreground flex items-center gap-1">
                            <Download className="w-3 h-3" />
                            {file.download_count}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-border">
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
      )}

      {selectedFile && (
        <DocumentViewer
          url={selectedFile.file_url}
          title={selectedFile.title}
          fileType={selectedFile.file_type}
          isOpen={!!selectedFile}
          onClose={() => setSelectedFile(null)}
          allowDownload={selectedFile.allow_download ?? true}
          fileId={selectedFile.id}
        />
      )}
    </>
  );
};