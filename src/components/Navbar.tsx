'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowLeft, Dumbbell } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  const pathname = usePathname();
  const isPlanPage = pathname === "/plan";

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl">
          <Dumbbell className="h-6 w-6" />
          <span>AI Fitness Coach</span>
        </Link>
        <div className="flex items-center gap-4">
          {isPlanPage && (
            <Button variant="ghost" size="sm" asChild>
              <Link href="/">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Create New Plan
              </Link>
            </Button>
          )}
          <ThemeToggle />
        </div>
      </div>
    </header>

  );
}