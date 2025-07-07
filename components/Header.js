import React from "react";
import Image from "next/image";
import FootballFantasyFCLogo from "../assets/FootballFantasyFCLogo.png";

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between py-4">
        <div className="flex items-center gap-2">
          <Image
            src={FootballFantasyFCLogo}
            alt="Fantasy Football FC Logo"
            width={200}
            height={50}
            className="h-8 w-auto"
          />
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm text-muted-foreground">smoothie master</span>
        </div>
      </div>
    </header>
  );
} 