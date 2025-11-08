'use client';

import { Button } from "@/components/ui/button";
import { Day } from "@/lib/types";
import { motion } from "framer-motion";

interface DaySelectorProps {
  days: Day[];
  active: Day;
  onSelect: (day: Day) => void;
}

const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

export default function DaySelector({ days, active, onSelect }: DaySelectorProps) {
  return (
    <div className="flex flex-wrap gap-2 mb-6 justify-center">
      {days.map((day) => (
        <motion.div
          key={day}
          whileTap={{ scale: 0.95 }}
        >
          <Button
            variant={active === day ? "default" : "outline"}
            size="sm"
            onClick={() => onSelect(day)}
            className="min-w-[80px]"
          >
            {capitalize(day)}
          </Button>
        </motion.div>
      ))}
    </div>
  );
}