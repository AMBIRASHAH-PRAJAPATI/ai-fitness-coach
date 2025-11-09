import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Volume2, VolumeX } from "lucide-react";
import { motion } from "framer-motion";
import { Day, WorkoutDay } from "@/lib/types";
import PlanItemCard from "./PlanItemCard";

interface WorkoutDayCardProps {
  day: Day;
  data: WorkoutDay;
  onImageClick: (title: string) => void;
  onSpeak: (text: string, id: string) => void;
  isPlaying: boolean;
  audioId: string;
  stopAudio: () => void;
}

const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

export default function WorkoutDayCard({ day, data, onImageClick, onSpeak, isPlaying, audioId, stopAudio }: WorkoutDayCardProps) {
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
              <CardTitle>{`${capitalize(day)} Workout`}</CardTitle>
              {data.focus && <p className="text-sm text-muted-foreground">Focus: {data.focus}</p>}
              <div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => {
                    const speakText = `Today we focus on ${data.focus} lets start with` + data.exercises.map(e => ` the ${e.name} exercise do ${e.sets} sets of ${e.reps} and rest for ${e.rest} seconds`).join(". ");
                    onSpeak(speakText, audioId);
                  }}
                >
                  {isPlaying ?<Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {data.exercises.map((ex, i) => (
              <PlanItemCard
                key={ex.name + i}
                index={i}
                title={ex.name}
                description={`Sets: ${ex.sets} Reps: ${ex.reps} Rest: ${ex.rest}`}
                onImageClick={() => {
                  stopAudio()
                  onImageClick(`${ex.name} exercise form`)
                }}
              />
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
              <ul className="text-sm space-y-1 pl-4 list-disc">
                {data.tips.map((tip, i) => (
                  <li key={i}>
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