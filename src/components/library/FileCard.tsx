import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PDFViewer } from "./PDFViewer";
import { FileText, Eye, Download } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface FileCardProps {
  id: string;
  title: string;
  description?: string | null;
  fileUrl: string;
  fileType: string;
}

export const FileCard = ({ id, title, description, fileUrl, fileType }: FileCardProps) => {
  const [isViewerOpen, setIsViewerOpen] = useState(false);

  const handleView = () => {
    setIsViewerOpen(true);
  };

  const getFileIcon = () => {
    switch (fileType.toLowerCase()) {
      case "pdf":
        return "📄";
      case "doc":
      case "docx":
        return "📝";
      case "xls":
      case "xlsx":
        return "📊";
      default:
        return "📁";
    }
  };

  return (
    <>
      <Card className="group hover:shadow-lg transition-all duration-300 border-border/50 hover:border-primary/30 bg-card">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center text-2xl shrink-0 group-hover:scale-110 transition-transform">
              {getFileIcon()}
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-foreground text-lg mb-1 line-clamp-2">
                {title}
              </h3>
              {description && (
                <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                  {description}
                </p>
              )}
              <div className="flex items-center gap-2">
                <span className="text-xs bg-muted px-2 py-1 rounded-full text-muted-foreground uppercase">
                  {fileType}
                </span>
              </div>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-border flex gap-2">
            <Button
              variant="default"
              size="sm"
              className="flex-1 gap-2"
              onClick={handleView}
            >
              <Eye className="w-4 h-4" />
              عرض
            </Button>
          </div>
        </CardContent>
      </Card>

      <PDFViewer
        url={fileUrl}
        title={title}
        isOpen={isViewerOpen}
        onClose={() => setIsViewerOpen(false)}
      />
    </>
  );
};
