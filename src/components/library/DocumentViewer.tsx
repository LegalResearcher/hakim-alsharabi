import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Maximize2, Minimize2, X, Download, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface DocumentViewerProps {
  url: string;
  title: string;
  isOpen: boolean;
  onClose: () => void;
  fileType?: string;
  images?: string[];
  allowDownload?: boolean;
  fileId?: string;
}

// Convert Google Drive links to preview/embed format
const convertGoogleDriveUrl = (url: string): string => {
  if (!url) return url;
  
  if (url.includes("drive.google.com")) {
    let fileId = "";
    
    const fileMatch = url.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
    if (fileMatch) {
      fileId = fileMatch[1];
    }
    
    const idMatch = url.match(/[?&]id=([a-zA-Z0-9_-]+)/);
    if (idMatch) {
      fileId = idMatch[1];
    }
    
    const openMatch = url.match(/\/open\?id=([a-zA-Z0-9_-]+)/);
    if (openMatch) {
      fileId = openMatch[1];
    }
    
    if (fileId) {
      return `https://drive.google.com/file/d/${fileId}/preview`;
    }
  }
  
  return url;
};

// Get download URL for Google Drive
const getDownloadUrl = (url: string): string => {
  if (!url) return url;
  
  if (url.includes("drive.google.com")) {
    let fileId = "";
    
    const fileMatch = url.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
    if (fileMatch) fileId = fileMatch[1];
    
    const idMatch = url.match(/[?&]id=([a-zA-Z0-9_-]+)/);
    if (idMatch) fileId = idMatch[1];
    
    if (fileId) {
      return `https://drive.google.com/uc?export=download&id=${fileId}`;
    }
  }
  
  return url;
};

const isImageUrl = (url: string): boolean => {
  const imageExtensions = [".jpg", ".jpeg", ".png", ".gif", ".webp", ".bmp", ".svg"];
  const lowercaseUrl = url.toLowerCase();
  return imageExtensions.some(ext => lowercaseUrl.includes(ext));
};

export const DocumentViewer = ({ 
  url, 
  title, 
  isOpen, 
  onClose, 
  fileType,
  images,
  allowDownload = true,
  fileId
}: DocumentViewerProps) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [downloading, setDownloading] = useState(false);

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const handleDownload = async () => {
    setDownloading(true);
    try {
      // Increment download count if fileId is provided
      if (fileId) {
        const { data: currentFile } = await supabase
          .from('library_files')
          .select('download_count')
          .eq('id', fileId)
          .single();
        
        if (currentFile) {
          await supabase
            .from('library_files')
            .update({ download_count: (currentFile.download_count || 0) + 1 })
            .eq('id', fileId);
        }
      }

      const downloadUrl = getDownloadUrl(url);
      window.open(downloadUrl, '_blank');
    } finally {
      setDownloading(false);
    }
  };

  const processedUrl = convertGoogleDriveUrl(url);
  const isImage = isImageUrl(url) || fileType?.toLowerCase().match(/^(jpg|jpeg|png|gif|webp|bmp|svg)$/);
  const hasMultipleImages = images && images.length > 1;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent 
        className={`${isFullscreen ? "max-w-[100vw] w-full h-[100vh] m-0 rounded-none" : "max-w-[95vw] md:max-w-5xl w-full h-[95vh] md:h-[90vh]"} p-0 gap-0`}
        dir="rtl"
      >
        <DialogHeader className="p-3 md:p-4 border-b border-border flex-row items-center justify-between space-y-0">
          <DialogTitle className="text-base md:text-lg font-semibold truncate flex-1 pl-2">{title}</DialogTitle>
          <div className="flex items-center gap-1 md:gap-2">
            {allowDownload && (
              <Button
                variant="ghost"
                size="icon"
                onClick={handleDownload}
                disabled={downloading}
                title="تحميل"
                className="h-8 w-8 md:h-10 md:w-10"
              >
                {downloading ? (
                  <Loader2 className="w-4 h-4 md:w-5 md:h-5 animate-spin" />
                ) : (
                  <Download className="w-4 h-4 md:w-5 md:h-5" />
                )}
              </Button>
            )}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleFullscreen}
              title={isFullscreen ? "تصغير" : "تكبير"}
              className="h-8 w-8 md:h-10 md:w-10 hidden md:flex"
            >
              {isFullscreen ? (
                <Minimize2 className="w-4 h-4 md:w-5 md:h-5" />
              ) : (
                <Maximize2 className="w-4 h-4 md:w-5 md:h-5" />
              )}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="h-8 w-8 md:h-10 md:w-10"
            >
              <X className="w-4 h-4 md:w-5 md:h-5" />
            </Button>
          </div>
        </DialogHeader>
        
        <div className="flex-1 bg-muted overflow-hidden">
          {hasMultipleImages ? (
            <div className="h-full flex items-center justify-center p-2 md:p-4">
              <Carousel className="w-full max-w-4xl" dir="ltr">
                <CarouselContent>
                  {images.map((imgUrl, index) => (
                    <CarouselItem key={index}>
                      <div className="flex items-center justify-center h-full">
                        <img
                          src={imgUrl}
                          alt={`${title} - صفحة ${index + 1}`}
                          className="max-w-full max-h-[calc(95vh-120px)] md:max-h-[calc(90vh-100px)] object-contain rounded-lg"
                        />
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="left-2" />
                <CarouselNext className="right-2" />
              </Carousel>
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-background/80 backdrop-blur px-3 py-1 rounded-full text-sm">
                {images.length} صفحات
              </div>
            </div>
          ) : isImage ? (
            <div className="h-full flex items-center justify-center p-2 md:p-4">
              <img
                src={processedUrl}
                alt={title}
                className="max-w-full max-h-full object-contain rounded-lg"
              />
            </div>
          ) : (
            <iframe
              src={processedUrl}
              className="w-full h-full border-0"
              style={{ minHeight: isFullscreen ? "calc(100vh - 65px)" : "calc(95vh - 65px)" }}
              allow="autoplay"
              title={title}
            />
          )}
        </div>

        {/* Mobile Download Button */}
        {allowDownload && (
          <div className="p-3 border-t border-border md:hidden">
            <Button
              onClick={handleDownload}
              disabled={downloading}
              className="w-full gap-2"
            >
              {downloading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Download className="w-4 h-4" />
              )}
              تحميل الملف
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};