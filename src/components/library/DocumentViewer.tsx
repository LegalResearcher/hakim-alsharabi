import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Maximize2, Minimize2, X, ChevronLeft, ChevronRight } from "lucide-react";
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
  images?: string[]; // For image galleries
}

// Convert Google Drive links to preview/embed format
const convertGoogleDriveUrl = (url: string): string => {
  if (!url) return url;
  
  // Check if it's a Google Drive link
  if (url.includes("drive.google.com")) {
    // Extract file ID from various Google Drive URL formats
    let fileId = "";
    
    // Format: /file/d/FILE_ID/view or /file/d/FILE_ID/preview
    const fileMatch = url.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
    if (fileMatch) {
      fileId = fileMatch[1];
    }
    
    // Format: ?id=FILE_ID
    const idMatch = url.match(/[?&]id=([a-zA-Z0-9_-]+)/);
    if (idMatch) {
      fileId = idMatch[1];
    }
    
    // Format: /open?id=FILE_ID
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

// Check if URL is an image
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
  images 
}: DocumentViewerProps) => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const processedUrl = convertGoogleDriveUrl(url);
  const isImage = isImageUrl(url) || fileType?.toLowerCase().match(/^(jpg|jpeg|png|gif|webp|bmp|svg)$/);
  const hasMultipleImages = images && images.length > 1;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent 
        className={`${isFullscreen ? "max-w-[100vw] h-[100vh] m-0 rounded-none" : "max-w-5xl h-[90vh]"} p-0 gap-0`}
        dir="rtl"
      >
        <DialogHeader className="p-4 border-b border-border flex-row items-center justify-between space-y-0">
          <DialogTitle className="text-lg font-semibold truncate flex-1">{title}</DialogTitle>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleFullscreen}
              title={isFullscreen ? "تصغير" : "تكبير"}
            >
              {isFullscreen ? (
                <Minimize2 className="w-5 h-5" />
              ) : (
                <Maximize2 className="w-5 h-5" />
              )}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
        </DialogHeader>
        
        <div className="flex-1 bg-muted overflow-hidden">
          {hasMultipleImages ? (
            // Image Gallery Carousel
            <div className="h-full flex items-center justify-center p-4">
              <Carousel className="w-full max-w-4xl" dir="ltr">
                <CarouselContent>
                  {images.map((imgUrl, index) => (
                    <CarouselItem key={index}>
                      <div className="flex items-center justify-center h-full">
                        <img
                          src={imgUrl}
                          alt={`${title} - صفحة ${index + 1}`}
                          className="max-w-full max-h-[calc(90vh-100px)] object-contain rounded-lg"
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
            // Single Image View
            <div className="h-full flex items-center justify-center p-4">
              <img
                src={processedUrl}
                alt={title}
                className="max-w-full max-h-full object-contain rounded-lg"
              />
            </div>
          ) : (
            // Document/PDF iframe
            <iframe
              src={processedUrl}
              className="w-full h-full border-0"
              style={{ minHeight: isFullscreen ? "calc(100vh - 65px)" : "calc(90vh - 65px)" }}
              allow="autoplay"
              title={title}
            />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
