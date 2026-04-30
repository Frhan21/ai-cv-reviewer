"use client";

import { LensyAssistant } from "@/components/ui/LensyAssistant";
import { motion } from "framer-motion";
import { ArrowRight, FileSearch, ShieldCheck, Zap } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#f8f9ff] text-[#0b1c30] font-sans selection:bg-[#0037b0] selection:text-white">
      {/* Navbar */}
      <nav className="fixed w-full z-50 top-0 transition-all duration-300 bg-white/70 backdrop-blur-md border-b border-[#c4c5d7]/30">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="text-xl font-bold tracking-tighter text-[#0037b0] flex items-center gap-2">
            <div className="relative w-8 h-8">
              <Image src="/logo-removebg-preview.png" alt="HireLens AI Logo" fill className="object-contain drop-shadow" />
            </div>
            HireLens AI
          </div>
          <div className="flex items-center gap-4 md:gap-8 text-sm font-medium text-[#434655]">
            <Link href="#features" className="hidden md:block hover:text-[#0037b0] transition-colors">Fitur</Link>
            <Link href="#how-it-works" className="hidden md:block hover:text-[#0037b0]">Cara Kerja</Link>
            <Link href="/analyze" className="px-4 py-2 text-xs md:text-sm md:px-5 md:py-2.5 rounded-md bg-[#0037b0] text-white hover:bg-[#1d4ed8] transition-all shadow-lg shadow-[#1d4ed8]/20">
              Coba Sekarang
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-to-b from-[#e5eeff] to-transparent opacity-50 blur-3xl -z-10" />
        <div className="absolute top-40 -right-20 w-72 h-72 bg-[#712ae2] rounded-full mix-blend-multiply filter blur-[100px] opacity-20 animate-blob" />
        <div className="absolute top-40 -left-20 w-72 h-72 bg-[#0037b0] rounded-full mix-blend-multiply filter blur-[100px] opacity-20 animate-blob animation-delay-2000" />

        <div className="max-w-7xl mx-auto px-6 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-5xl md:text-7xl font-bold tracking-tight mb-8"
          >
            Review CV dengan <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0037b0] to-[#712ae2]">
              Kecerdasan Buatan.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-lg md:text-xl text-[#434655] max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Dapatkan feedback jujur, skor ATS, dan pemetaan skill secara instan.
            Tingkatkan peluang Anda mendapatkan pekerjaan impian.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              href="/analyze"
              className="group relative inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold text-white bg-[#0037b0] rounded-lg overflow-hidden transition-all hover:scale-105 hover:shadow-xl hover:shadow-[#0037b0]/20"
            >
              <span className="absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 bg-gradient-to-b from-transparent via-transparent to-black" />
              Upload CV Anda <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* 3D Interactive Feature Cards */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Analisis Mendalam</h2>
            <p className="text-[#434655]">Sistem kami mengevaluasi CV Anda dari berbagai sudut pandang.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "ATS Compatibility", icon: ShieldCheck, desc: "Pastikan format dan keyword Anda lolos sistem tracking otomatis." },
              { title: "Actionable Feedback", icon: Zap, desc: "Saran perbaikan per-section untuk kalimat yang lebih berdampak." },
              { title: "Skill Mapping", icon: FileSearch, desc: "Mendeteksi skill yang hilang berdasarkan Job Description incaran Anda." }
            ].map((feature, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -10, rotateX: 5, rotateY: 5 }}
                className="p-8 rounded-2xl bg-[#f8f9ff] border border-[#dce9ff] shadow-sm hover:shadow-xl transition-all duration-300 preserve-3d cursor-pointer"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#0037b0] to-[#712ae2] flex items-center justify-center text-white mb-6">
                  <feature.icon size={24} />
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-[#434655] leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <LensyAssistant
        state="idle"
        message="Hai! Aku Lensy, AI Assistant pribadimu untuk review resume. Yuk mulai analisis CV kamu!"
        position="fixed"
        className="bottom-4 right-4 md:bottom-8 md:right-8 z-50"
      />
    </div>
  );
}
