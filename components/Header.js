import React from "react";
import Image from "next/image";
import { Button } from "./button";
import { supabase } from "../supabaseClient";
import { useUser } from "../lib/UserContext";
import FootballFantasyFCLogo from "../assets/FootballFantasyFCLogo.png";

export default function Header() {
  const { userData, setUserData } = useUser();

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (!error) {
      setUserData(null);
      localStorage.removeItem('userData');
      window.location.href = '/';
    }
  };

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
          {userData ? (
            <>
              <span className="text-sm text-muted-foreground">{userData.email}</span>
              <Button onClick={signOut} variant="outline">Sign out</Button>
            </>
          ) : (
            <span className="text-sm text-muted-foreground">Loading...</span>
          )}
        </div>
      </div>
    </header>
  );
} 