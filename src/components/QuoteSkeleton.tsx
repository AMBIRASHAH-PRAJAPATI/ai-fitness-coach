// components/QuoteSkeleton.tsx
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Quote } from "lucide-react";

export default function QuoteSkeleton() {
  return (
    <Card className="mb-8">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Quote className="h-5 w-5" />
          <Skeleton className="h-6 w-32" />
        </div>
      </CardHeader>
    </Card>
  );
}