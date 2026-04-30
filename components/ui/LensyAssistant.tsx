"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import Image from "next/image";

type LensyState = "idle" | "thinking" | "celebrating";

interface LensyAssistantProps {
  state?: LensyState;
  message?: string;
  position?: "fixed" | "absolute" | "relative";
  className?: string;
}

export function LensyAssistant({ 
  state = "idle", 
  message = "Halo! Aku Lensy, AI Assistant pribadimu.",
  position = "fixed",
  className = "bottom-8 right-8 z-50"
}: LensyAssistantProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Memberikan sedikit delay sebelum Lensy muncul agar animasinya terlihat natural
    const timer = setTimeout(() => setIsVisible(true), 500);
    return () => clearTimeout(timer);
  }, []);

  const getImagePath = () => {
    switch (state) {
      case "thinking": return "/images/lensy_thinking.png";
      case "celebrating": return "/images/lensy_celebrating.png";
      case "idle":
      default: return "/images/lensy_idle.png";
    }
  };

  const floatingAnimation = {
    y: ["-5%", "5%"],
    transition: {
      y: {
        duration: 2,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut"
      }
    }
  };

  const getAnimationConfig = () => {
    if (state === "celebrating") {
      return {
        y: ["0%", "-15%", "0%"],
        transition: { duration: 0.6, repeat: Infinity, repeatType: "reverse" as const, ease: "easeOut" }
      };
    }
    return floatingAnimation;
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 50 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className={`${position} ${className} flex flex-col items-end pointer-events-none`}
        >
          {message && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, x: 20 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ delay: 0.8, type: "spring", stiffness: 200, damping: 20 }}
              className="bg-[#1D4ED8] text-white p-3 md:p-4 rounded-2xl rounded-br-none shadow-xl mb-4 max-w-[200px] md:max-w-[250px] pointer-events-auto border-2 border-[#7C3AED]/30 backdrop-blur-md"
            >
              <p className="text-xs md:text-sm font-medium leading-relaxed">{message}</p>
              {state === "thinking" && (
                <div className="flex gap-1 mt-2">
                  <motion.div className="w-1.5 h-1.5 bg-white rounded-full" animate={{ y: [0, -4, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: 0 }} />
                  <motion.div className="w-1.5 h-1.5 bg-white rounded-full" animate={{ y: [0, -4, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }} />
                  <motion.div className="w-1.5 h-1.5 bg-white rounded-full" animate={{ y: [0, -4, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }} />
                </div>
              )}
            </motion.div>
          )}

          <motion.div 
            animate={getAnimationConfig()}
            className="relative w-32 h-32 md:w-40 md:h-40 drop-shadow-2xl pointer-events-auto cursor-pointer hover:scale-105 transition-transform"
            onClick={() => {
              const el = document.activeElement as HTMLElement;
              if (el) el.blur();
            }}
          >
            {/* Efek glow di belakang */}
            <div className="absolute inset-0 bg-[#7C3AED]/20 blur-3xl rounded-full" />
            
            {/* Container bulat warna putih untuk menyamarkan background gambar */}
            <div className="absolute inset-0 bg-white rounded-full shadow-inner overflow-hidden border-4 border-[#1D4ED8]/20 flex items-center justify-center">
              <Image
                src={getImagePath()}
                alt={`Lensy ${state}`}
                fill
                className="object-cover scale-110" // scale-110 untuk sedikit memotong tepi putih gambar jika ada
                priority
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
