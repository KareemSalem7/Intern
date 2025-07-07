import React, { useState, useEffect } from "react";
import Image from "next/image";
import { supabase } from "../supabaseClient";
import { apiClient } from "../lib/api-client";
import { Button } from "../components/button";
import { ChevronRight, Trophy, Users, BarChart2, Repeat, Shield, Target, Handshake, Ban, Scale, Sparkles } from "lucide-react";
import SigningInLoading from "../components/SigningInLoading";

import landingPageGraphic from "../assets/landingPageGraphic.png";
import FootballFantasyFCLogo from "../assets/FootballFantasyFCLogo.png";

export default function Home() {
  const [session, setSession] = useState(null);
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const checkUserDetails = async () => {
      if (session?.user?.id) {
        setIsLoading(true);
        try {
          // First, try to get existing user by UID
          console.log("session.user.id", session.user.id)
          const existingUser = await apiClient.getUser(session.user.id);
          
          let userDetails;
          
          if (existingUser) {
            // User exists, use their data
            userDetails = existingUser;
            console.log("Existing user found:", userDetails);
          } else {
            // User doesn't exist, create new user
            console.log("Creating new user...");
            
            // Get the maximum user ID and increment by 1
            const maxUserId = await apiClient.getMaxUserId();
            const newUserId = maxUserId ? maxUserId + 1 : 1;
            
            // Create new user
            const newUser = await apiClient.createUser({
              user_id: newUserId,
              email: session.user.email,
              uid: session.user.id
            });
            
            userDetails = newUser;
            console.log("New user created:", userDetails);
          }

          const userContextData = {
            email: userDetails.email,
            uid: userDetails.uid,
            user_id: userDetails.user_id,
          };
          setUserData(userContextData);
          localStorage.setItem('userData', JSON.stringify(userContextData));

          window.location.href = '/thingpage';
          
        } catch (error) {
          console.error("Error checking user existence:", error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    checkUserDetails();
  }, [session]);

  useEffect(() => {
    const initializeSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);
      setUser(session?.user ?? null);
    };

    initializeSession();
  }, []);

  useEffect(() => {
    // Check for access token in URL
    const hash = window.location.hash;
    if (hash) {
      const params = new URLSearchParams(hash.substring(1));
      const accessToken = params.get('access_token');
      if (accessToken) {
        // Remove the hash from URL
        window.history.replaceState({}, document.title, window.location.pathname);
      }
    }
  }, []);

  const handleSignIn = async () => {
    try {
      const getURL = () => {
        let url = process?.env?.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000/'
        url = url.startsWith('http') ? url : `https://${url}`
        url = url.endsWith('/') ? url : `${url}/`
        console.log({url})
        return url
      }

      const { error, data } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${getURL()}auth/callback`,
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
          },
        }
      });
      
      if (error) {
        console.error("Error signing in:", error);
      }
    } catch (error) {
      console.error("Error signing in:", error);
    }
  };

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user) {
        setIsLoading(true);
        try {
          // First, try to get existing user by UID
          const existingUser = await apiClient.getUser(session.user.id);
          
          let userDetails;
          
          if (existingUser) {
            // User exists, use their data
            userDetails = existingUser;
            console.log("Existing user found:", userDetails);
          } else {
            // User doesn't exist, create new user
            console.log("Creating new user...");
            
            // Get the maximum user ID and increment by 1
            const maxUserId = await apiClient.getMaxUserId();
            const newUserId = maxUserId ? maxUserId + 1 : 1;
            
            // Create new user
            const newUser = await apiClient.createUser({
              user_id: newUserId,
              email: session.user.email,
              uid: session.user.id
            });
            
            userDetails = newUser;
            console.log("New user created:", userDetails);
          }

          const userContextData = {
            email: userDetails.email,
            uid: userDetails.uid,
            user_id: userDetails.user_id
          };
          setUserData(userContextData);
          // Store in localStorage for persistence
          localStorage.setItem('userData', JSON.stringify(userContextData));
          
          try {
            // Redirect to draft page if user has a league
            window.location.href = '/thingpage';
          } catch (error) {
            console.error("Error fetching available players:", error);
          }
          
        } catch (error) {
          console.error("Error checking user existence:", error);
        } finally {
          setIsLoading(false);
        }
      } else {
        setSession(null);
        setUserData(null);
        localStorage.removeItem('userData');
      }
    });

    return () => subscription.unsubscribe();
  }, [setUserData]);

  // Add a new effect to check user data on mount
  useEffect(() => {
    const checkUserData = async () => {
      if (user && !userData) {
        setIsLoading(true);
        try {
          // First, try to get existing user by UID
          const existingUser = await apiClient.getUser(user.id);
          
          let userDetails;
          
          if (existingUser) {
            // User exists, use their data
            userDetails = existingUser;
            console.log("Existing user found:", userDetails);
          } else {
            // User doesn't exist, create new user
            console.log("Creating new user...");
            
            // Get the maximum user ID and increment by 1
            const maxUserId = await apiClient.getMaxUserId();
            const newUserId = maxUserId ? maxUserId + 1 : 1;
            
            // Create new user
            const newUser = await apiClient.createUser({
              user_id: newUserId,
              email: user.email,
              uid: user.id
            });
            
            userDetails = newUser;
            console.log("New user created:", userDetails);
          }

          const userContextData = {
            email: userDetails.email,
            uid: userDetails.uid,
            user_id: userDetails.user_id
          };
          setUserData(userContextData);
          localStorage.setItem('userData', JSON.stringify(userContextData));
          
          window.location.href = '/thingpage';
        } catch (error) {
          console.error("Error checking user data:", error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    checkUserData();
  }, [user, userData, setUserData]);

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (!error) {
      setUser(null);
      setSession(null);
      setUserData(null);
    }
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Show loading component while processing user authentication
  if (isLoading) {
    return <SigningInLoading />;
  }

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
            {!user ? (
              <Button onClick={handleSignIn} variant="outline" className="hidden md:flex">
                Sign in with Google
              </Button>
            ) : (
              <>
                <span className="text-sm text-muted-foreground">{user.email}</span>
                <Button onClick={signOut} variant="outline">Sign out</Button>
              </>
            )}
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