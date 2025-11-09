'use client';

import { useState, useEffect, useRef } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { RefreshCw, Download } from "lucide-react";
import WorkoutDayCard from "./WorkoutDayCard";
import DietDayCard from "./DietDayCard";
import DaySelector from "./DaySelector";
import ImageModal from "./ImageModal";
import { exportToPDF } from "@/lib/pdf";
import { Day, FitnessPlan } from "@/lib/types";
import { useRouter } from "next/navigation";

const days: Day[] = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];

export default function PlanPage() {
  const [plan, setPlan] = useState<FitnessPlan | null>(null);
  const [activeDay, setActiveDay] = useState<Day>("monday");
  const [isLoading, setIsLoading] = useState(true); 
  const [imageModal, setImageModal] = useState<{ open: boolean; title: string; url?: string }>({
    open: false,
    title: "",
  });
  const router = useRouter(); 
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playingAudioId, setPlayingAudioId] = useState<string | null>(null);

  const stopAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
    setPlayingAudioId(null);
  }
  const handleSpeak = async (text: string, id: string) => {
    if (audioRef.current && playingAudioId === id) {
      stopAudio();
      return;
    }
    stopAudio();
    try {
      setPlayingAudioId(id);
      const res = await fetch("/api/generate-speech", {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }),
      });
      if (!res.ok) throw new Error("Speech API failed");
      const audio = new Audio(URL.createObjectURL(await res.blob()));
      audioRef.current = audio;
      audio.play();
      audio.onended = () => {
        setPlayingAudioId(null);
        audioRef.current = null;
      };
    } catch (error) {
      console.error("Failed to play speech:", error);
      alert("Sorry, could not play audio.");
      stopAudio();
    }
  }

  useEffect(() => {
    return () => stopAudio();
  }, []);

  useEffect(() => {
    stopAudio();
  }, [activeDay]);

  useEffect(() => {
    const saved = localStorage.getItem("fitnessPlan");
    if (saved) {
      try {
        setPlan(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse fitness plan:", e);
        router.push("/");
      }
    } else {
      router.push("/");
    }
    setIsLoading(false);
  }, [router]);

  const regenerate = () => {
    stopAudio();
    localStorage.removeItem("fitnessPlan");
    localStorage.removeItem("fitnessUserName"); 
    router.push("/");
  };

  if (isLoading || !plan) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

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
          <Button variant="outline" size="sm" onClick={() => exportToPDF(plan, localStorage.getItem("fitnessUserName") || undefined)}>
            <Download className="mr-2 h-4 w-4" />
            Export PDF
          </Button>
        </div>
      </div>
      <Tabs defaultValue="workout" className="w-full" onValueChange={stopAudio}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="workout">Workout Plan</TabsTrigger>
          <TabsTrigger value="diet">Diet Plan</TabsTrigger>
        </TabsList>
        <TabsContent value="workout">
          <DaySelector days={days} active={activeDay} onSelect={setActiveDay}/>
          {plan.workoutPlan && plan.workoutPlan[activeDay] ? (
            <WorkoutDayCard
              day={activeDay}
              data={plan.workoutPlan[activeDay]}
              onImageClick={(title) => setImageModal({ open: true, title })}
              onSpeak={handleSpeak}
              audioId={`workout-${activeDay}`}
              isPlaying={playingAudioId === `workout-${activeDay}`}
              stopAudio={stopAudio}
            />
          ) : (
            <p className="text-center text-muted-foreground">No workout plan available for this day.</p>
          )}
        </TabsContent>
        <TabsContent value="diet">
          <DaySelector days={days} active={activeDay} onSelect={setActiveDay}/>
          {plan.dietPlan && plan.dietPlan[activeDay] ? (
            <DietDayCard
              day={activeDay}
              data={plan.dietPlan[activeDay]}
              onImageClick={(title) => setImageModal({ open: true, title })}
              onSpeak={handleSpeak}
              audioId={`diet-${activeDay}`}
              isPlaying={playingAudioId === `diet-${activeDay}`}
              stopAudio={stopAudio}
            />
          ) : (
            <p className="text-center text-muted-foreground">No diet plan available for this day.</p>
          )}
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