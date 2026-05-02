'use client';

import { Navbar } from '@/components/landing/navbar';
import { LensyAssistant } from '@/components/ui/LensyAssistant';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  CheckCircle,
  Cpu,
  Eye,
  FileSearch,
  PenTool,
  Send,
  ShieldCheck,
  Star,
  UploadCloud,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#f8f9ff] text-[#0b1c30] font-sans selection:bg-[#0037b0] selection:text-white">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-24 overflow-hidden">
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
            Get Your CV Reviewed by <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0037b0] to-[#712ae2]">
              Artificial Intelligence.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-lg md:text-xl text-[#434655] max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Instant ATS score, recruiter insights, and career improvement
            suggestions. Land more interviews with data-backed resume
            optimization.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="flex flex-col items-center justify-center gap-6"
          >
            <Link
              href="/analyze"
              className="group relative inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold text-white bg-[#0037b0] rounded-lg overflow-hidden transition-all hover:scale-105 hover:shadow-xl hover:shadow-[#0037b0]/20"
            >
              <span className="absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 bg-gradient-to-b from-transparent via-transparent to-black" />
              Upload Your CV{' '}
              <ArrowRight
                size={18}
                className="group-hover:translate-x-1 transition-transform"
              />
            </Link>
            <p className="text-sm font-medium text-[#434655] flex items-center gap-2">
              <span className="flex -space-x-2">
                {[
                  'https://randomuser.me/api/portraits/men/32.jpg',
                  'https://randomuser.me/api/portraits/women/44.jpg',
                  'https://randomuser.me/api/portraits/men/46.jpg',
                  'https://randomuser.me/api/portraits/women/68.jpg',
                ].map((src, i) => (
                  <div
                    key={i}
                    className="relative w-7 h-7 rounded-full border-2 border-white z-10 shadow-sm overflow-hidden bg-gray-200"
                  >
                    <Image
                      src={src}
                      alt={`User ${i + 1}`}
                      fill
                      sizes="xl"
                      className="object-cover"
                    />
                  </div>
                ))}
              </span>
              Joined by 12,000+ job seekers this month
            </p>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Deep Analysis
            </h2>
            <p className="text-[#434655] max-w-2xl mx-auto text-lg">
              Our AI doesn&apos;t just read your resume; it understands what top
              recruiters are looking for today.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: 'Smart ATS Scanning',
                icon: ShieldCheck,
                desc: 'We use the same parsing algorithms as Workday, Greenhouse, and Lever to ensure your resume never gets lost.',
              },
              {
                title: 'Skills Gap Analysis',
                icon: FileSearch,
                desc: "Compare your profile against specific job descriptions to find exactly what certifications or skills you're missing.",
              },
              {
                title: 'Resume Rewrite',
                icon: PenTool,
                desc: "Don't just get feedback—get the words. Our AI provides rewritten bullet points that highlight your impact using the STAR method.",
              },
              {
                title: 'Recruiter Insights',
                icon: Eye,
                desc: "Get a 'Recruiter POV' report that shows exactly how a human hiring manager will scan your resume in those first 6 seconds.",
              },
            ].map((feature, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -10, rotateX: 5, rotateY: 5 }}
                className="p-8 rounded-2xl bg-[#f8f9ff] border border-[#dce9ff] shadow-sm hover:shadow-xl transition-all duration-300 preserve-3d cursor-pointer flex flex-col h-full"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#0037b0] to-[#712ae2] flex items-center justify-center text-white mb-6">
                  <feature.icon size={24} />
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-[#434655] leading-relaxed flex-grow">
                  {feature.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section
        id="how-it-works"
        className="py-24 bg-[#0b1c30] text-white relative overflow-hidden"
      >
        {/* Background elements */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#0037b0] rounded-full mix-blend-screen filter blur-[120px] opacity-20" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#712ae2] rounded-full mix-blend-screen filter blur-[120px] opacity-20" />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              From Upload to Interview in Minutes
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg">
              A simple, streamlined process to optimize your career profile.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12 relative">
            <div className="hidden md:block absolute top-12 left-[15%] right-[15%] h-0.5 bg-gradient-to-r from-transparent via-[#0037b0] to-transparent opacity-50" />

            {[
              {
                step: '01',
                title: 'Upload Your CV',
                icon: UploadCloud,
                desc: 'Drop your PDF file into our secure portal. We support all major ATS formats.',
              },
              {
                step: '02',
                title: 'Deep AI Analysis',
                icon: Cpu,
                desc: 'Our engine cross-references your experience against 50k+ successful hires and top-tier job descriptions.',
              },
              {
                step: '03',
                title: 'Apply with Confidence',
                icon: Send,
                desc: 'Download your optimized resume and a personalized cover letter generated for your target role.',
              },
            ].map((item, i) => (
              <div
                key={i}
                className="relative flex flex-col items-center text-center"
              >
                <div className="w-24 h-24 rounded-full bg-[#12284c] border border-[#1e3a6a] flex items-center justify-center mb-6 relative z-10 shadow-2xl shadow-[#0037b0]/20">
                  <item.icon size={36} className="text-[#3b82f6]" />
                  <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-[#712ae2] flex items-center justify-center text-xs font-bold border-2 border-[#0b1c30]">
                    {item.step}
                  </div>
                </div>
                <h3 className="text-2xl font-bold mb-3">{item.title}</h3>
                <p className="text-gray-400 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-[#f8f9ff]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Hired by the Best
            </h2>
            <p className="text-[#434655] max-w-2xl mx-auto text-lg">
              Real stories from job seekers who unlocked their potential.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: 'Sarah J.',
                role: 'Senior PM',
                quote:
                  "I was applying for months with no luck. HireLens showed me that my resume wasn't even getting past the ATS. Two weeks after optimizing, I had 4 interviews scheduled.",
              },
              {
                name: 'David T.',
                role: 'Software Engineer',
                quote:
                  "The recruiter insights panel was a game changer. Seeing exactly what parts of my background were 'invisible' to the AI allowed me to highlight my true value.",
              },
              {
                name: 'Elena M.',
                role: 'Data Scientist',
                quote:
                  "The skills gap analysis identified exactly what I needed to learn to pivot into data science. It's more than a resume checker—it's a career map.",
              },
            ].map((testimonial, i) => (
              <div
                key={i}
                className="bg-white p-8 rounded-2xl shadow-sm border border-[#dce9ff] relative hover:shadow-lg transition-shadow"
              >
                <div className="flex gap-1 text-[#ffc107] mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} size={16} fill="currentColor" />
                  ))}
                </div>
                <p className="text-[#434655] leading-relaxed mb-6 italic">
                  &quot;{testimonial.quote}&quot;
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#0037b0] to-[#712ae2] flex items-center justify-center text-white font-bold">
                    {testimonial.name[0]}
                  </div>
                  <div>
                    <h4 className="font-bold text-[#0b1c30]">
                      {testimonial.name}
                    </h4>
                    <p className="text-sm text-[#434655]">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden bg-white">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#e5eeff]/50" />
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
            Ready to Land Your Dream Job?
          </h2>
          <p className="text-xl text-[#434655] mb-10">
            Join thousands of professionals using HireLens AI to beat the
            algorithms and impress the recruiters.
          </p>
          <div className="flex flex-col items-center gap-4">
            <Link
              href="/analyze"
              className="px-10 py-5 text-lg font-bold text-white bg-gradient-to-r from-[#0037b0] to-[#712ae2] rounded-xl hover:shadow-2xl hover:shadow-[#712ae2]/30 transition-all hover:-translate-y-1"
            >
              Start Free Analysis
            </Link>
            <p className="text-sm text-[#434655] flex items-center gap-2">
              <CheckCircle size={14} className="text-green-500" /> No credit
              card required. Free analysis for first-time users.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0b1c30] text-gray-400 py-12 border-t border-[#1e3a6a]">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-2 text-white font-bold text-xl">
            <div className="relative w-6 h-6 grayscale brightness-200">
              <Image
                src="/logo-removebg-preview.png"
                alt="Logo"
                fill
                className="object-contain"
              />
            </div>
            HireLens AI
          </div>
          <div className="flex flex-wrap justify-center md:justify-end gap-6 text-sm">
            <Link href="#" className="hover:text-white transition-colors">
              Product
            </Link>
            <Link href="#" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:text-white transition-colors">
              Terms of Service
            </Link>
            <Link href="#" className="hover:text-white transition-colors">
              Contact Us
            </Link>
          </div>
          <p className="text-sm w-full md:w-auto text-center">
            © 2024 HireLens AI. Precision recruitment.
          </p>
        </div>
      </footer>

      <LensyAssistant
        state="idle"
        message="Hi! I'm Lensy, your personal AI Resume Assistant. Let's start analyzing your CV!"
        position="fixed"
        className="bottom-4 right-4 md:bottom-8 md:right-8 z-50"
      />
    </div>
  );
}
