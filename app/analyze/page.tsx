import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

import { AnalyzeForm } from '@/components/analyze/AnalyzeForm';

export default function AnalyzePage() {
  return (
    <main className="form-page">
      <Link href="/" className="app-back">
        <ArrowLeft aria-hidden="true" size={17} /> HireLens AI
      </Link>
      <AnalyzeForm />
    </main>
  );
}
