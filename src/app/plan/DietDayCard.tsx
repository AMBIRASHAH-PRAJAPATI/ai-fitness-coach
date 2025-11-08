'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Volume2, Image as ImageIcon } from "lucide-react";
import { motion } from "framer-motion";
import { Day, DietDay, Meal } from "@/lib/types";

interface DietDayCardProps {
  day: Day;
  data: DietDay;
  onImageClick: (title: string) => void;
  onSpeak: (text: string) => void;
}

const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

export default function DietDayCard({ day, data, onImageClick, onSpeak }: DietDayCardProps) {
  const mealOrder: Array<Meal['name']> = ["Breakfast", "Lunch", "Dinner", "Snacks"];

  const orderedMeals = mealOrder
    .map(name => data.meals.find(m => m.name === name))
    .filter(Boolean) as Meal[];

  const speakText = orderedMeals
    .map(m => `${m.name}: ${m.description} (${m.calories} kcal)`)
    .join(". ");

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>{capitalize(day)} Diet</CardTitle>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onSpeak(speakText)}
            >
              <Volume2 className="h-4 w-4" />
            </Button>
          </div>
          {data.summary && (
            <p className="text-sm text-muted-foreground mt-1">{data.summary}</p>
          )}
        </CardHeader>

        <CardContent className="space-y-4">
          {orderedMeals.map((meal, i) => (
            <motion.div
              key={meal.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              className="flex items-start justify-between p-4 rounded-lg border bg-card"
            >
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="font-semibold">{meal.name}</h4>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onImageClick(`${meal.name}: ${meal.description}`)}
                  >
                    <ImageIcon className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground">{meal.description}</p>
                <p className="text-xs font-medium mt-1">{meal.calories} kcal</p>
              </div>
            </motion.div>
          ))}
        </CardContent>
      </Card>
    </motion.div>
  );
}