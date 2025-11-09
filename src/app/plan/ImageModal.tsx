import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
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
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (open) {
      setImageUrl(null);
      setIsLoading(true);
      fetch("/api/generate-image", {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: title }),
      })
        .then((res) => res.json()) 
        .then((data) => {
          if (data.image) {
            setImageUrl(data.image); 
          } else {
            console.error("No image data in API response");
          }
        })
        .catch(err => console.error("Error fetching image:", err))
        .finally(() => setIsLoading(false));
    }
  }, [open, title]);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription className="sr-only">
            Generated image for {title}
          </DialogDescription>
          <button
            onClick={onClose}
            className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100"
          >
            <X className="h-4 w-4" />
          </button>
        </DialogHeader>
        <div className="flex justify-center p-4 min-h-[24rem] items-center">
          {isLoading ? (
            <div className="h-64 w-full bg-muted animate-pulse rounded-lg" />
          ) : imageUrl ? (
            <img src={imageUrl} alt={title} className="max-h-96 rounded-lg" />
          ) : (
            <p className="text-muted-foreground">Image could not be loaded.</p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}