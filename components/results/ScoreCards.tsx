"use client";

import { motion } from "framer-motion";
import { CheckCircle, Target, Award } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function ScoreCards({ result }: { result: any }) {
  return (
    <div className="grid md:grid-cols-3 gap-6 mb-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg font-semibold text-muted-foreground">Skor Keseluruhan</CardTitle>
            <Award className="text-primary" size={24} />
          </CardHeader>
          <CardContent>
            <div className="text-5xl font-bold text-primary mb-2">{result.overallScore}<span className="text-xl text-muted-foreground">/100</span></div>
            <p className="text-sm text-muted-foreground">{result.summary}</p>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg font-semibold text-muted-foreground">Skor ATS</CardTitle>
            <Target className="text-secondary" size={24} />
          </CardHeader>
          <CardContent>
            <div className="text-5xl font-bold text-secondary mb-2">{result.atsScore}<span className="text-xl text-muted-foreground">/100</span></div>
            <div className="mt-4 pt-4 border-t border-border">
              <p className="text-sm font-medium mb-2">Keyword Cocok:</p>
              <div className="flex flex-wrap gap-2">
                {result.keywordMatch?.present?.map((k: string, i: number) => (
                  <Badge key={i} variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/20">{k}</Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
        <Card className="h-full flex flex-col justify-center">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-semibold text-muted-foreground">Keyword yang Hilang</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {result.keywordMatch?.missing?.length > 0 ? result.keywordMatch.missing.map((k: string, i: number) => (
                <Badge key={i} variant="destructive" className="bg-destructive/10 text-destructive hover:bg-destructive/20">{k}</Badge>
              )) : <span className="text-sm text-green-600 flex items-center gap-1"><CheckCircle size={14}/> Semua keyword penting ada!</span>}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
