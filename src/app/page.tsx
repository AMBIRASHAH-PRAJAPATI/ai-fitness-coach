import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen space-y-4">
    <h1 className="text-2xl font-semibold underline">Welcome!</h1>
    <Button className="bg-blue-600 hover:bg-blue-700">Click Me</Button>
  </div>
  );
}
