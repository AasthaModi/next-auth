"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import "./styles/globals.css"

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    console.log("[HomePage] Loaded");
  }, []);

  return (
    <div className="min-h-screen gradient-bg relative overflow-hidden">
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="absolute top-20 left-20 w-72 h-72 bg-blue-400/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl"></div>

      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4">
        <div className="w-full max-w-4xl text-center">
          <div className="mx-auto w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mb-8 shadow-glow animate-bounce-in">
            <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </div>

          <h1 className="text-6xl md:text-7xl font-extrabold mb-6 animate-fade-in">
            <span className="gradient-text">Job Tracker</span>
          </h1>

          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed animate-slide-up">
            Track your job applications, interviews, and offers in one place.
            <br className="hidden md:block" />
            Stay organized and land your dream job!
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            {/* Get Started button routes to /login */}
            <Link href="/login">
              <Button className="h-12 px-8 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-lg shadow-glow transition-all-smooth transform hover:scale-[1.05]">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                </svg>
                Get Started
              </Button>
            </Link>

            <Link href="/register">
              <Button variant="outline" className="h-12 px-8 bg-white/10 border-white/30 text-white hover:bg-white/20 transition-all-smooth">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                </svg>
                Create Account
              </Button>
            </Link>
          </div>
        </div>

        <footer className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center">
          <p className="text-white/60 text-sm">
            Built with <span className="font-semibold text-white/80">Next.js</span>, <span className="font-semibold text-white/80">Tailwind CSS</span>, and <span className="font-semibold text-white/80">MongoDB</span>
          </p>
          <p className="text-white/40 text-xs mt-1">© {new Date().getFullYear()} Job Tracker. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
} 