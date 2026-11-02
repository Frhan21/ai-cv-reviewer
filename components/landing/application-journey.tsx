'use client';

import { useMotionValueEvent, useScroll } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { ReviewScene } from './review-scene';

const chapters = [
  {
    label: 'Your CV',
    title: 'Start with the document you have.',
    body: 'HireLens reads the CV you plan to send, keeping its layout, sections, dates, and wording in view.',
  },
  {
    label: 'The role',
    title: 'Give your experience a benchmark.',
    body: 'The role, seniority, and vacancy text set the standard. The same CV can land differently for another opening.',
  },
  {
    label: 'The screen',
    title: 'Look closer before a recruiter does.',
    body: 'Check parsing, keyword coverage, role relevance, and evidence of impact before the hiring team sees your CV.',
  },
  {
    label: 'Your edits',
    title: 'Leave with a clearer next draft.',
    body: 'Find missing skills and vague bullets. Add project outcomes, show design-system ownership, and keep every edit true to your experience.',
  },
];

export function ApplicationJourney() {
  const section = useRef<HTMLElement>(null);
  const [chapter, setChapter] = useState(0);
  const [simplified, setSimplified] = useState(false);
  const { scrollYProgress } = useScroll({
    target: section,
    offset: ['start start', 'end end'],
  });
  useEffect(() => {
    const query = window.matchMedia(
      '(prefers-reduced-motion: reduce), (max-width: 760px)',
    );
    const sync = () => setSimplified(query.matches);
    sync();
    query.addEventListener('change', sync);
    return () => query.removeEventListener('change', sync);
  }, []);
  useMotionValueEvent(scrollYProgress, 'change', (value) =>
    setChapter(
      Math.min(chapters.length - 1, Math.floor(value * chapters.length)),
    ),
  );

  return (
    <section
      ref={section}
      id="application-journey"
      className="journey journey-review"
      aria-labelledby="journey-title"
    >
      <div className="journey-sticky">
        <div className="journey-copy">
          <h2 id="journey-title">
            A closer look.
            <br />A clearer CV.
          </h2>
          <div className="journey-chapter">
            <h3>{chapters[chapter].title}</h3>
            <p>{chapters[chapter].body}</p>
          </div>
          <ol className="review-progress" aria-label="CV review stages">
            {chapters.map((item, index) => (
              <li
                key={item.label}
                aria-current={index === chapter ? 'step' : undefined}
                className={index <= chapter ? 'is-active' : ''}
              >
                <span aria-hidden="true" />
                <span>{item.label}</span>
              </li>
            ))}
          </ol>
        </div>
        <div className="review-visual">
          <ReviewScene progress={scrollYProgress} reduced={simplified} />
          <p className="review-visual-caption">
            An illustrative review of a product designer’s CV.
          </p>
        </div>
        <div className="review-static-chapters">
          {chapters.map((item) => (
            <div key={item.label}>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
