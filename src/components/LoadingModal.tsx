'use client';

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { motion } from "framer-motion";

export default function LoadingModal({ open }: { open: boolean }) {
  return (
    <Dialog open={open}>
      <DialogContent className="sm:max-w-md">
        <div className="flex flex-col items-center space-y-6 py-8">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full"
          />
          <div className="space-y-2 text-center">
            <h3 className="font-semibold">Generating Your Plan...</h3>
            <p className="text-sm text-muted-foreground">
              Our AI is crafting your personalized fitness journey.
            </p>
          </div>
          <Progress value={75} className="w-full" />
        </div>
      </DialogContent>
    </Dialog>
  );
}