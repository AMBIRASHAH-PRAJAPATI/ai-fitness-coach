'use client';

import { Button } from "@/components/ui/button";
import { Image as ImageIcon } from "lucide-react";
import { motion } from "framer-motion";

interface PlanItemCardProps {
  index: number;
  title: string;
  description: string;
  details?: string;
  onImageClick: () => void;
}

export default function PlanItemCard({
  index,
  title,
  description,
  details,
  onImageClick
}: PlanItemCardProps) {
  return (
    <motion.div
      key={title + index}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05 }}
      className="flex items-start justify-between p-4 rounded-lg border bg-card"
    >
      <div className="flex-1">
        <div className="flex items-center justify-between mb-1">
          <h4 className="font-semibold">{title}</h4>
          <Button
            variant="ghost"
            size="icon"
            onClick={onImageClick}
          >
            <ImageIcon className="h-4 w-4" />
          </Button>
        </div>
        <p className="text-sm text-muted-foreground">{description}</p>
        {details && (
          <p className="text-xs font-medium mt-1">{details}</p>
        )}
      </div>
    </motion.div>
  );
}