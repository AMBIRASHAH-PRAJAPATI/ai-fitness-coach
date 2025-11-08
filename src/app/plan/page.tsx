'use client';

import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { RefreshCw, Download, Volume2, Image as ImageIcon } from "lucide-react";
import WorkoutDayCard from "./WorkoutDayCard";
import DietDayCard from "./DietDayCard";
import DaySelector from "./DaySelector";
import ImageModal from "./ImageModal";
import { exportToPDF } from "@/lib/pdf";
import { Day, FitnessPlan } from "@/lib/types";

const days: Day[] = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];

export default function PlanPage() {
  const [plan, setPlan] = useState<FitnessPlan | null>(null);
  const [activeDay, setActiveDay] = useState<Day>("monday");
  const [imageModal, setImageModal] = useState<{ open: boolean; title: string; url?: string }>({
    open: false,
    title: "",
  });

  useEffect(() => {
    const saved = localStorage.getItem("fitnessPlan");
    if (saved) setPlan(JSON.parse(saved));
  }, []);

  if (!plan) return null;

  const regenerate = () => {
    localStorage.removeItem("fitnessPlan");
    window.location.href = "/";
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Your Personalized Fitness Plan</h1>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={regenerate}>
            <RefreshCw className="mr-2 h-4 w-4" />
            Regenerate
          </Button>
          <Button variant="outline" size="sm" onClick={() => exportToPDF(plan, JSON.parse(localStorage.getItem("formData") || "{}").name)}>
            <Download className="mr-2 h-4 w-4" />
            Export PDF
          </Button>
        </div>
      </div>

      <Tabs defaultValue="workout" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="workout">Workout Plan</TabsTrigger>
          <TabsTrigger value="diet">Diet Plan</TabsTrigger>
        </TabsList>

        <TabsContent value="workout">
          <DaySelector days={days} active={activeDay} onSelect={setActiveDay} />
          <WorkoutDayCard
            day={activeDay}
            data={plan.workoutPlan[activeDay]}
            onImageClick={(title) => setImageModal({ open: true, title })}
            onSpeak={(text) => speak(text)}
          />
        </TabsContent>

        <TabsContent value="diet">
          <DaySelector days={days} active={activeDay} onSelect={setActiveDay} />
          <DietDayCard
            day={activeDay}
            data={plan.dietPlan[activeDay]}
            onImageClick={(title) => setImageModal({ open: true, title })}
            onSpeak={(text) => speak(text)}
          />
        </TabsContent>
      </Tabs>

      <ImageModal
        open={imageModal.open}
        title={imageModal.title}
        onClose={() => setImageModal({ ...imageModal, open: false })}
      />
    </div>
  );
}

async function speak(text: string) {
  const res = await fetch("/api/generate-speech", {
    method: "POST",
    body: JSON.stringify({ text }),
  });
  const audio = new Audio(URL.createObjectURL(await res.blob()));
  audio.play();
}