'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Check, Send } from 'lucide-react';

import { ApplicationJourney } from '@/components/landing/application-journey';
import { ApplicationStory } from '@/components/landing/application-story';
import { Navbar } from '@/components/landing/navbar';

const ease = [0.16, 1, 0.3, 1] as const;

export default function LandingPage() {
  return (
    <main className="site-shell">
      <Navbar />

      <section className="hero-studio" aria-labelledby="hero-title">
        <motion.div
          className="hero-copy"
          initial={false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease }}
        >
          <h1 id="hero-title">
            Your next CV.
            <br />
            More clarity.
          </h1>
          <p>
            A rejection tells you little. HireLens helps you find what to
            improve.
          </p>
          <div className="hero-actions">
            <Link href="/analyze" className="primary-action">
              Test my CV <ArrowRight aria-hidden="true" size={18} />
            </Link>
            <a href="#application-journey" className="text-action">
              Follow the application
            </a>
          </div>
          <p className="hero-note">
            PDF up to 5 MB
            <br />
            Role-specific review, no credit card
          </p>
        </motion.div>

        <ApplicationStory />
      </section>

      <section
        id="inside-review"
        className="stakes"
        aria-labelledby="stakes-title"
      >
        <h2 id="stakes-title">
          A recruiter cannot fix what your CV leaves unclear.
        </h2>
        <div className="stakes-list">
          <p>
            <strong>Six seconds</strong>
            <span>
              A quick scan needs a clear role, credible dates, and visible
              outcomes.
            </span>
          </p>
          <p>
            <strong>One vacancy</strong>
            <span>
              The right keywords and evidence change with each job description.
            </span>
          </p>
          <p>
            <strong>One chance</strong>
            <span>
              Find rejection risks while you can still edit the document.
            </span>
          </p>
        </div>
      </section>

      <ApplicationJourney />

      <section
        id="how-it-works"
        className="outcome"
        aria-labelledby="outcome-title"
      >
        <div className="outcome-copy">
          <h2 id="outcome-title">The edits move the application.</h2>
          <p>
            Every warning points to the CV line that caused it. You decide which
            suggestion belongs in the final document.
          </p>
        </div>
        <div className="outcome-board" data-ui>
          <div className="outcome-summary">
            <span>Application readiness</span>
            <strong>78</strong>
            <small>/100</small>
            <p>Strong match after three focused revisions.</p>
          </div>
          <div className="outcome-action">
            <span>Highest-impact edit</span>
            <strong>Add evidence to recent experience</strong>
            <p>
              “Built payroll APIs” names the work. Add endpoint count, latency
              change, or the business process supported.
            </p>
          </div>
          <div className="outcome-compare">
            <span>Before</span>
            <p>Developed REST APIs for payroll operations.</p>
            <ArrowRight aria-hidden="true" />
            <span>After</span>
            <p>
              Developed 10+ payroll APIs used across multi-country employee
              workflows.
            </p>
          </div>
        </div>
      </section>

      <section className="send-state" aria-labelledby="send-title">
        <div className="send-copy">
          <h2 id="send-title">Send when the evidence is ready.</h2>
          <p>
            HireLens does not promise an interview. It helps remove avoidable
            screening risks.
          </p>
        </div>
        <div className="send-animation" aria-hidden="true">
          <div className="send-document">
            <span>CV</span>
          </div>
          <div className="send-path" />
          <div className="send-destination">
            <Send />
            <span>Application submitted</span>
          </div>
        </div>
        <Link href="/analyze" className="primary-action">
          Review the next application{' '}
          <ArrowRight aria-hidden="true" size={18} />
        </Link>
      </section>

      <section className="social-proof" aria-labelledby="stories-title">
        <div className="section-heading">
          <h2 id="stories-title">What job seekers reported.</h2>
          <p>Examples carried from the current HireLens site.</p>
        </div>
        <div className="quote-grid">
          <blockquote>
            “Two weeks after optimizing, I had four interviews scheduled.”
            <cite>
              Sarah J.
              <br />
              Senior PM
            </cite>
          </blockquote>
          <blockquote>
            “The recruiter view showed which parts of my background were
            invisible.”
            <cite>
              David T.
              <br />
              Software Engineer
            </cite>
          </blockquote>
          <blockquote>
            “The skills gap gave me a practical path into data science.”
            <cite>
              Elena M.
              <br />
              Data Scientist
            </cite>
          </blockquote>
        </div>
      </section>

      <section className="closing-cta">
        <h2>Check the application before the company does.</h2>
        <Link href="/analyze" className="primary-action">
          Upload my CV <ArrowRight aria-hidden="true" size={18} />
        </Link>
        <p>
          <Check aria-hidden="true" /> Start with the PDF you already have.
        </p>
      </section>
      <footer className="site-footer">
        <strong>HireLens AI</strong>
        <p>Role-specific CV review before you apply.</p>
        <span>© 2026 HireLens AI</span>
      </footer>
    </main>
  );
}
