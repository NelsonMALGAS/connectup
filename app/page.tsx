"use client"

import { Button } from "@/components/ui/button";



export default function Home() {
  return (
    <div className="font-poppins items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <div className="flex gap-2">
        <Button
          variant="outline"

        >
          Show Success
        </Button>

        <Button
          variant="outline"

        >
          Show Error
        </Button>
      </div>
    </div>
  );
}
