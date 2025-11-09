'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Volume2, VolumeX } from "lucide-react";
import { motion } from "framer-motion";
import { Day, DietDay, Meal } from "@/lib/types";
import PlanItemCard from "./PlanItemCard";

interface DietDayCardProps {
  day: Day;
  data: DietDay;
  onImageClick: (title: string) => void;
  onSpeak: (text: string, id: string) => void;
  isPlaying: boolean;
  audioId: string;
  stopAudio: () => void;
}

const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

export default function DietDayCard({ day, data, onImageClick, onSpeak, isPlaying, audioId, stopAudio }: DietDayCardProps) {
  const mealOrder: Array<Meal['name']> = ["Breakfast", "Lunch", "Dinner", "Snacks"];

  const orderedMeals = mealOrder
    .map(name => data.meals.find(m => m.name === name))
    .filter(Boolean) as Meal[];

  const speakText = `Today we will focus on ${data.summary} start with` +  orderedMeals
    .map(m => `the meal for ${m.name} is ${m.description} that will give ${m.calories} kcal to you`)
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
              onClick={() => onSpeak(speakText, audioId)}
            >
              {isPlaying ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" /> }
            </Button>
          </div>
          {data.summary && (
            <p className="text-sm text-muted-foreground mt-1">{data.summary}</p>
          )}
        </CardHeader>

        <CardContent className="space-y-4">
          {orderedMeals.map((meal, i) => (
            <PlanItemCard
              key={meal.name}
              index={i}
              title={meal.name}
              description={meal.description}
              details={`${meal.calories} kcal`}
              onImageClick={() => {
                stopAudio()
                onImageClick(`${meal.name}: ${meal.description}`)
              }}
            />
          ))}
        </CardContent>
      </Card>
    </motion.div>
  );
}