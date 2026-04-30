"use client";

import axios from "axios";
import { AnimatePresence, motion } from "framer-motion";
import { AlertCircle, BarChart3, Briefcase, CheckCircle, FileText, Loader2, UploadCloud } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { LensyAssistant } from "@/components/ui/LensyAssistant";

export function AnalyzeForm() {
  const [file, setFile] = useState<File | null>(null);
  const [targetRole, setTargetRole] = useState("");
  const [seniority, setSeniority] = useState("junior");
  const [jobDescription, setJobDescription] = useState("");
  // Language is strictly English now
  const language = "en";

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && droppedFile.type === "application/pdf") {
      setFile(droppedFile);
    } else {
      setError("Only PDF files are supported.");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      setError("Please upload your CV (PDF).");
      return;
    }
    if (!targetRole) {
      setError("Please enter a Target Role.");
      return;
    }

    setIsLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("targetRole", targetRole);
    formData.append("seniority", seniority);
    formData.append("jobDescription", jobDescription);
    formData.append("language", language);

    try {
      const response = await axios.post("/api/analyze", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const data = response.data;
      sessionStorage.setItem("cvAnalysisResult", JSON.stringify({ ...data.data, targetRole, seniority }));
      router.push("/results");
    } catch (err: any) {
      if (err.response && err.response.data && err.response.data.error) {
        setError(err.response.data.error);
      } else {
        setError(err.message || "An error occurred while analyzing the CV.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-input">
        <div className="flex flex-col md:flex-row">
          {/* Left Col: Info */}
          <div className="md:w-1/3 bg-primary p-8 text-primary-foreground flex flex-col justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-4">Analyze Your CV.</h2>
              <p className="text-primary-foreground/80 text-sm leading-relaxed mb-8">
                Get valuable insights to optimize your CV, pass ATS systems, and catch the recruiter&apos;s eye.
              </p>

              <div className="space-y-6 mt-8">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm"><BarChart3 size={18} /></div>
                  <div className="text-sm">Accurate ATS Score</div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm"><FileText size={18} /></div>
                  <div className="text-sm">Section-by-Section Critique</div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm"><Briefcase size={18} /></div>
                  <div className="text-sm">Target Role Focused</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Col: Form */}
          <div className="md:w-2/3 p-8 md:p-12 bg-background">
            <form onSubmit={handleSubmit} className="space-y-6">

              {/* Upload Area */}
              <div>
                <label className="block text-sm font-semibold mb-2">Upload CV (PDF)</label>
                <div
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={handleDrop}
                  className={`relative border-2 border-dashed rounded-2xl p-10 text-center transition-all ${file ? 'border-primary bg-primary/5' : 'border-border hover:border-primary hover:bg-muted/50'}`}
                >
                  <input
                    type="file"
                    accept="application/pdf"
                    onChange={(e) => {
                      const selected = e.target.files?.[0];
                      if (selected) setFile(selected);
                    }}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <div className="flex flex-col items-center justify-center gap-3">
                    {file ? (
                      <>
                        <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-primary-foreground"><CheckCircle size={24} /></div>
                        <div className="text-primary font-medium">{file.name}</div>
                        <div className="text-xs text-muted-foreground">{(file.size / 1024 / 1024).toFixed(2)} MB</div>
                      </>
                    ) : (
                      <>
                        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary"><UploadCloud size={24} /></div>
                        <div className="text-muted-foreground"><span className="font-semibold text-primary">Click to upload</span> or drag and drop</div>
                        <div className="text-xs text-muted-foreground">Max size 5MB</div>
                      </>
                    )}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold mb-2">Target Role</label>
                  <Input
                    type="text"
                    value={targetRole}
                    onChange={(e) => setTargetRole(e.target.value)}
                    placeholder="e.g. Frontend Developer"
                    className="h-12 bg-muted/50"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Seniority Level</label>
                  <select
                    value={seniority}
                    onChange={(e) => setSeniority(e.target.value)}
                    className="w-full h-12 px-3 rounded-md border border-input bg-muted/50 text-sm outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
                  >
                    <option value="intern">Internship</option>
                    <option value="junior">Junior / Entry Level</option>
                    <option value="mid">Mid Level</option>
                    <option value="senior">Senior Level</option>
                    <option value="lead">Lead / Manager</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Job Description (Optional but recommended)</label>
                <Textarea
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  placeholder="Paste the job description here for more accurate analysis..."
                  rows={4}
                  className="resize-none bg-muted/50"
                />
              </div>



              {error && (
                <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="p-4 bg-destructive/10 text-destructive text-sm rounded-lg flex items-start gap-3 border border-destructive/20">
                  <AlertCircle size={18} className="mt-0.5 shrink-0" />
                  <p>{error}</p>
                </motion.div>
              )}

              <Button
                type="submit"
                disabled={isLoading || !file || !targetRole}
                className="w-full h-14 text-lg font-bold"
              >
                {isLoading ? (
                  <><Loader2 className="animate-spin mr-2" /> Analyzing CV...</>
                ) : (
                  "Start CV Analysis"
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>

      {/* Loading Overlay digantikan dengan Lensy Thinking */}
      <AnimatePresence>
        {isLoading && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-background/80 backdrop-blur-sm flex flex-col items-center justify-center"
          >
            <div className="relative mb-8 flex justify-center">
               <LensyAssistant 
                 state="thinking" 
                 message="Analyzing your resume... Please wait a moment! ⏳" 
                 position="relative" 
                 className="z-50"
               />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Lensy Idle state saat tidak loading */}
      {!isLoading && (
        <LensyAssistant 
          state="idle" 
          message="Upload your resume here! I'll help analyze it deeply. 🚀" 
          position="fixed" 
          className="bottom-4 right-4 md:bottom-8 md:right-8 z-50"
        />
      )}
    </>
  );
}
