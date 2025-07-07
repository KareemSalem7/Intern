import React from "react";
import Image from "next/image";
import { Button } from "../components/button";
import { ChevronRight, Trophy, Users, BarChart2, Repeat, Shield, Target, Handshake, Ban, Scale, Sparkles } from "lucide-react";

import landingPageGraphic from "../assets/landingPageGraphic.png";
import FootballFantasyFCLogo from "../assets/FootballFantasyFCLogo.png";

export default function Home() {
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
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
          <nav className="hidden md:flex items-center gap-6">
            <button onClick={() => scrollToSection('features')} className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
              Features
            </button>
            <button onClick={() => scrollToSection('how-it-works')} className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
              How It Works
            </button>
            <button onClick={() => scrollToSection('stats')} className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
              Stats
            </button>
            <button onClick={() => scrollToSection('testimonials')} className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
              Testimonials
            </button>
          </nav>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">smoothie master</span>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full h-screen flex items-center justify-center bg-gradient-to-b from-background to-muted">
          <div className="container px-4 md:px-6">
            <div className="grid gap-12 lg:grid-cols-2 items-center">
              <div className="flex flex-col justify-center space-y-8">
                <div className="space-y-6">
                  <h1 className="text-5xl font-bold tracking-tighter sm:text-6xl xl:text-7xl/none">
                    Become the Ultimate <span className="text-primary">Fantasy Football</span> Manager
                  </h1>
                  <p className="text-xl text-muted-foreground md:text-2xl max-w-[600px]">
                    Build your dream Premier League team, compete against AI managers, and prove your tactical genius in
                    Fantasy Football FC.
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="relative h-[600px] w-[800px] overflow-hidden rounded-xl border bg-background shadow-xl">
                  <Image
                    src={landingPageGraphic}
                    alt="Fantasy Football FC App Screenshot"
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="w-full border-t bg-background py-6">
        <div className="container flex items-center justify-center px-4 md:px-6">
          <p className="text-sm text-muted-foreground">
            2025 Fantasy Football FC • All rights reserved
          </p>
        </div>
      </footer>
    </div>
  );
}