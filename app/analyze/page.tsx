import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { AnalyzeForm } from "@/components/analyze/AnalyzeForm";

export default function AnalyzePage() {
  return (
    <div className="min-h-screen bg-muted/30 py-12 px-6">
      <div className="max-w-4xl mx-auto">
        <Link href="/" className="inline-flex items-center text-muted-foreground hover:text-primary transition-colors mb-8">
          <ArrowLeft size={16} className="mr-2" /> Kembali ke Home
        </Link>
        
        <AnalyzeForm />
      </div>
    </div>
  );
}
