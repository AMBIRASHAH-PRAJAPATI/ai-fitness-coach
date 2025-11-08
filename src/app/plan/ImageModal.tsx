import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { X } from "lucide-react";
import { useState, useEffect } from "react";

export default function ImageModal({
  open,
  title,
  onClose,
}: {
  open: boolean;
  title: string;
  onClose: () => void;
}) {
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  useEffect(() => {
    if (open) {
      fetch("/api/generate-image", {
        method: "POST",
        body: JSON.stringify({ text: title }),
      })
        .then((res) => res.blob())
        .then((blob) => setImageUrl(URL.createObjectURL(blob)));
    }
  }, [open, title]);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <button
            onClick={onClose}
            className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100"
          >
            <X className="h-4 w-4" />
          </button>
        </DialogHeader>
        <div className="flex justify-center p-4">
          {imageUrl ? (
            <img src={imageUrl} alt={title} className="max-h-96 rounded-lg" />
          ) : (
            <div className="h-64 w-full bg-muted animate-pulse rounded-lg" />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}