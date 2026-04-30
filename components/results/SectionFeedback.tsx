"use client";

import { motion } from "framer-motion";
import { FileText } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function SectionFeedback({ sectionFeedback }: { sectionFeedback: any[] }) {
  if (!sectionFeedback || sectionFeedback.length === 0) return null;

  return (
    <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
      <Card className="h-full">
        <CardHeader>
          <CardTitle className="text-2xl font-bold flex items-center gap-2"><FileText className="text-primary"/> Detailed Feedback</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {sectionFeedback.map((section: any, idx: number) => (
            <div key={idx} className="pb-6 border-b border-border last:border-0 last:pb-0">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-semibold text-lg capitalize">{section.section}</h4>
                <Badge variant={section.score >= 80 ? "default" : section.score >= 60 ? "secondary" : "destructive"} className={section.score >= 80 ? "bg-green-100 text-green-800 hover:bg-green-100" : section.score >= 60 ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-100" : ""}>
                  Score: {section.score}/100
                </Badge>
              </div>
              
              {section.issues && section.issues.length > 0 && (
                <div className="mt-3">
                  <p className="text-sm font-semibold text-destructive mb-1">Issues:</p>
                  <ul className="space-y-1">
                    {section.issues.map((issue: string, i: number) => (
                      <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                        <span className="text-destructive mt-0.5">•</span> {issue}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              
              {section.suggestions && section.suggestions.length > 0 && (
                <div className="mt-3">
                  <p className="text-sm font-semibold text-primary mb-1">Actionable Suggestions:</p>
                  <ul className="space-y-1">
                    {section.suggestions.map((sug: string, i: number) => (
                      <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                        <span className="text-primary mt-0.5">•</span> {sug}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </CardContent>
      </Card>
    </motion.div>
  );
}
