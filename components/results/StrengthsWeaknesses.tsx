"use client";

import { motion } from "framer-motion";
import { CheckCircle, AlertCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function StrengthsWeaknesses({ strengths, weaknesses }: { strengths: string[], weaknesses: string[] }) {
  return (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }} className="space-y-6">
      <Card className="bg-gradient-to-br from-primary to-blue-700 text-primary-foreground border-none shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl font-bold flex items-center gap-2 text-white"><CheckCircle /> Kekuatan CV Anda</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            {strengths?.map((s: string, i: number) => (
              <li key={i} className="flex items-start gap-3 bg-white/10 p-3 rounded-lg backdrop-blur-sm">
                <span className="mt-1 text-green-300"><CheckCircle size={16}/></span>
                <span className="text-sm leading-relaxed text-white">{s}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <Card className="border-destructive/20 shadow-sm">
        <CardHeader>
          <CardTitle className="text-xl font-bold flex items-center gap-2 text-destructive"><AlertCircle /> Area Perbaikan</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            {weaknesses?.map((w: string, i: number) => (
              <li key={i} className="flex items-start gap-3 p-3 rounded-lg bg-destructive/10 text-destructive">
                <span className="mt-1"><AlertCircle size={16}/></span>
                <span className="text-sm leading-relaxed">{w}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </motion.div>
  );
}
