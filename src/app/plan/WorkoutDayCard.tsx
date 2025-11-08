import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Volume2, Image as ImageIcon } from "lucide-react";
import { motion } from "framer-motion";
import { Day, WorkoutDay } from "@/lib/types";

interface Exercise {
  name: string;
  sets: string;
  reps: string;
  rest: string;
}

interface WorkoutDayCardProps {
  day: Day;
  data: WorkoutDay;
  onImageClick: (title: string) => void;
  onSpeak: (text: string) => void;
}

export default function WorkoutDayCard({ day, data, onImageClick, onSpeak }: WorkoutDayCardProps) {
  return (
    <div className="grid md:grid-cols-3 gap-6">
      <motion.div
        className="md:col-span-2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>{`${day} Workout`}</CardTitle>
              <p className="text-sm text-muted-foreground">Focus: {data.focus}</p>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onSpeak(data.exercises.map(e => `${e.name}: ${e.sets} sets of ${e.reps}, rest ${e.rest}`).join(". "))}
              >
                <Volume2 className="h-4 w-4" />
              </Button>
            </div>
            {data.focus && <p className="text-sm text-muted-foreground">Focus: {data.focus}</p>}
          </CardHeader>
          <CardContent className="space-y-4">
            {data.exercises.map((ex, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="flex items-center justify-between p-4 rounded-lg border bg-card"
              >
                <div>
                  <h4 className="font-semibold">{ex.name}</h4>
                  <p className="text-sm text-muted-foreground">
                    {ex.sets} × {ex.reps} | Rest: {ex.rest}
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onImageClick(`${ex.name} exercise form`)}
                >
                  <ImageIcon className="h-4 w-4" />
                </Button>
              </motion.div>
            ))}
          </CardContent>
        </Card>
      </motion.div>

      <div className="space-y-4">
        {data.motivation && (
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Motivation</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm italic">"{data.motivation}"</p>
            </CardContent>
          </Card>
        )}

        {data.tips && data.tips.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Tips</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="text-sm space-y-1">
                {data.tips.map((tip, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    {tip}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}