import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Maximize2, Minimize2, Download, X } from "lucide-react";

interface PDFViewerProps {
  url: string;
  title: string;
  isOpen: boolean;
  onClose: () => void;
}

export const PDFViewer = ({ url, title, isOpen, onClose }: PDFViewerProps) => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

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
        <div className="flex-1 bg-muted">
          <iframe
            src={url}
            className="w-full h-full border-0"
            style={{ minHeight: isFullscreen ? "calc(100vh - 65px)" : "calc(90vh - 65px)" }}
            allow="autoplay"
            title={title}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};
