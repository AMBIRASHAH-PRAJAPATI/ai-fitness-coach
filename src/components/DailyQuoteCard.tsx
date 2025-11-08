'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Quote } from "lucide-react";

export default async function DailyQuoteCard() {
  const res = await fetch(`/api/generate-quote`, {
    cache: "no-store",
  });
  const { quote } = await res.json();

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Quote className="h-5 w-5" />
          Daily Motivation
        </CardTitle>
      </CardHeader>
      <CardContent>
        <blockquote className="text-lg italic">"{quote}"</blockquote>
      </CardContent>
    </Card>
  );
}