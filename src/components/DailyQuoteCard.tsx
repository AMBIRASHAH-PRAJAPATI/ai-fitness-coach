'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Quote } from "lucide-react";
import { useEffect, useState } from "react";
import QuoteSkeleton from "./QuoteSkeleton";

export default function DailyQuoteCard() {
  const [quote, setQuote] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/generate-quote`)
      .then((res) => res.json())
      .then((data) => {
        setQuote(data.quote);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch quote:", err);
        setQuote("The only bad workout is the one that didn't happen.");
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <QuoteSkeleton />;
  }

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Quote className="h-5 w-5" />
          Daily Motivation
        </CardTitle>
      </CardHeader>
      <CardContent>
        <blockquote className="text-lg italic">{quote}</blockquote>
      </CardContent>
    </Card>
  );
}