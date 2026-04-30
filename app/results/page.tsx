"use client";

import { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { ScoreCards } from "@/components/results/ScoreCards";
import { SectionFeedback } from "@/components/results/SectionFeedback";
import { StrengthsWeaknesses } from "@/components/results/StrengthsWeaknesses";
import { LensyAssistant } from "@/components/ui/LensyAssistant";

export default function ResultsPage() {
  const [result, setResult] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const storedData = sessionStorage.getItem("cvAnalysisResult");
    if (storedData) {
      setResult(JSON.parse(storedData));
    } else {
      router.push("/analyze");
    }
  }, [router]);

  if (!result) {
    return (
      <div className="min-h-screen bg-muted/30 flex items-center justify-center">
        <div className="animate-pulse text-primary font-medium">Memuat Hasil...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/30 p-6 text-foreground">
      <div className="max-w-6xl mx-auto">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6 md:mb-10">
          <div>
            <Link href="/analyze" className="inline-flex items-center text-muted-foreground hover:text-primary transition-colors mb-2">
              <ArrowLeft size={16} className="mr-2" /> Kembali ke Upload CV
            </Link>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-primary">Hasil Analisis CV</h1>
            <p className="text-sm md:text-base text-muted-foreground">Target: {result.targetRole} ({result.seniority})</p>
          </div>
          <Button 
            variant="outline"
            onClick={() => { 
              sessionStorage.removeItem("cvAnalysisResult");
              router.push("/analyze"); 
            }}
          >
            Analisis CV Baru
          </Button>
        </header>

        {/* Reusable Components untuk merender bagian Dashboard */}
        <ScoreCards result={result} />

        <div className="grid md:grid-cols-2 gap-8">
          <SectionFeedback sectionFeedback={result.sectionFeedback} />
          <StrengthsWeaknesses strengths={result.strengths} weaknesses={result.weaknesses} />
        </div>
      </div>
      
      <LensyAssistant 
        state="celebrating" 
        message="Yay! Analisis selesai! 🎉 Yuk lihat insight menarik dari resume kamu." 
        position="fixed" 
        className="bottom-4 right-4 md:bottom-8 md:right-8 z-50"
      />
    </div>
  );
}
