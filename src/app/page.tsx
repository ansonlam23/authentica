"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function LandingPage() {
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }

        @keyframes pulse-glow {
          0%, 100% {
            box-shadow: 0 0 20px rgba(6, 182, 212, 0.5),
                        0 0 40px rgba(6, 182, 212, 0.3),
                        0 0 60px rgba(6, 182, 212, 0.1);
          }
          50% {
            box-shadow: 0 0 30px rgba(6, 182, 212, 0.7),
                        0 0 60px rgba(6, 182, 212, 0.5),
                        0 0 90px rgba(6, 182, 212, 0.3);
          }
        }

        @keyframes gradient-shift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(100px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .gradient-text {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #06b6d4 75%, #667eea 100%);
          background-size: 300% 300%;
          animation: gradient-shift 5s ease infinite;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .floating {
          animation: float 6s ease-in-out infinite;
        }

        .pulse-glow {
          animation: pulse-glow 3s ease-in-out infinite;
        }

        .slide-up {
          animation: slide-up 0.8s ease-out;
        }

        .glass-morphism {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .neon-border {
          position: relative;
          border: 2px solid transparent;
          background: linear-gradient(#000, #000) padding-box,
                      linear-gradient(135deg, #06b6d4, #8b5cf6, #ec4899) border-box;
        }
      `}</style>

      {/* Animated Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-teal-900/20" />

        {/* Floating orbs */}
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full mix-blend-screen filter blur-xl opacity-30 animate-pulse"
            style={{
              background: `radial-gradient(circle, ${
                i % 3 === 0 ? '#06b6d4' : i % 3 === 1 ? '#8b5cf6' : '#ec4899'
              }, transparent)`,
              width: `${300 + i * 50}px`,
              height: `${300 + i * 50}px`,
              left: `${i * 20}%`,
              top: `${i * 15}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${4 + i}s`
            }}
          />
        ))}

        {/* Mouse follower gradient */}
        <div
          className="absolute rounded-full mix-blend-screen filter blur-3xl opacity-20 pointer-events-none transition-all duration-300 ease-out"
          style={{
            background: 'radial-gradient(circle, #06b6d4, transparent)',
            width: '400px',
            height: '400px',
            left: `${mousePosition.x - 200}px`,
            top: `${mousePosition.y - 200}px`,
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen">
        <div className={`text-center transition-all duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          <h1 className="text-5xl md:text-7xl font-bold mb-16 slide-up" style={{ animationDelay: '0.1s' }}>
            <span className="gradient-text">Authentica</span>
          </h1>

          <div className="slide-up" style={{ animationDelay: '0.3s' }}>
            <Link
              href="/browse"
              className="group relative inline-block"
            >
              <span className="relative text-2xl font-light tracking-widest text-white/60 hover:text-white transition-all duration-500 group-hover:tracking-[0.3em]">
                ENTER
              </span>
              <div className="absolute -bottom-2 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute -bottom-1 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-white to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}