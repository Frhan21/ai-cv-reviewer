'use client';

import { useEffect, useMemo, useSyncExternalStore } from 'react';
import { z } from 'zod';
import { cvReviewSchema } from '@/types/langchain';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { ScoreCards } from '@/components/results/ScoreCards';
import { SectionFeedback } from '@/components/results/SectionFeedback';
import { StrengthsWeaknesses } from '@/components/results/StrengthsWeaknesses';
import { LensyAssistant } from '@/components/ui/LensyAssistant';

const storedReviewSchema = cvReviewSchema.extend({
  targetRole: z.string(),
  seniority: z.string(),
});

function subscribeToStorage(callback: () => void) {
  window.addEventListener('storage', callback);
  return () => window.removeEventListener('storage', callback);
}

function getStoredReview() {
  try {
    return sessionStorage.getItem('cvAnalysisResult');
  } catch {
    return null;
  }
}

export default function ResultsPage() {
  const storedData = useSyncExternalStore(
    subscribeToStorage,
    getStoredReview,
    () => undefined,
  );
  const result = useMemo(() => {
    try {
      const parsed = storedReviewSchema.safeParse(
        JSON.parse(storedData ?? 'null'),
      );
      return parsed.success ? parsed.data : null;
    } catch {
      return null;
    }
  }, [storedData]);
  const router = useRouter();

  useEffect(() => {
    if (storedData !== undefined && !result) router.replace('/analyze');
  }, [storedData, result, router]);

  if (!result) {
    return (
      <div className="min-h-screen bg-muted/30 flex items-center justify-center">
        <div className="animate-pulse text-primary font-medium">
          Loading Results...
        </div>
      </div>
    );
  }

  return (
    <main className="results-page text-foreground">
      <div className="max-w-7xl mx-auto">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6 md:mb-10">
          <div>
            <Link
              href="/analyze"
              className="inline-flex items-center text-muted-foreground hover:text-primary transition-colors mb-2"
            >
              <ArrowLeft size={16} className="mr-2" /> Back to Upload CV
            </Link>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-primary">
              CV Analysis Results
            </h1>
            <p className="text-sm md:text-base text-muted-foreground">
              Target: {result.targetRole} ({result.seniority})
            </p>
          </div>
          <Button
            variant="outline"
            onClick={() => {
              sessionStorage.removeItem('cvAnalysisResult');
              router.push('/analyze');
            }}
          >
            New CV Analysis
          </Button>
        </header>

        {/* Reusable Components untuk merender bagian Dashboard */}
        <ScoreCards result={result} />

        <div className="grid md:grid-cols-2 gap-8">
          <SectionFeedback sectionFeedback={result.sectionFeedback} />
          <StrengthsWeaknesses
            strengths={result.strengths}
            weaknesses={result.weaknesses}
          />
        </div>
      </div>

      <LensyAssistant
        state="celebrating"
        message="Yay! Analysis complete! 🎉 Let's check out the insights from your resume."
        position="fixed"
        className="bottom-4 right-4 md:bottom-8 md:right-8 z-50"
      />
    </main>
  );
}
