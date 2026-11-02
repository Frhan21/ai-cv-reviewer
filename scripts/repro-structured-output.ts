import { cvReviewSchema } from '../types/langchain';

const modelOutput = {
  summary: 'Summary',
  overallScore: 72,
  atsScore: 78,
  strengths: ['Relevant stack'],
  weaknesses: ['No metrics'],
  keywordMatch: { present: ['Next.js'], missing: ['Testing'] },
  sectionFeedback: [],
  rewrittenBullets: {
    original: 'Developed APIs.',
    improved: 'Developed 10 APIs.',
    reason: 'Adds scope.',
  },
  finalVerdict: 'Good candidate.',
};

const parsed = cvReviewSchema.parse(modelOutput);

if (!Array.isArray(parsed.rewrittenBullets)) {
  throw new Error('rewrittenBullets was not normalized to an array');
}

console.log(
  `PASS: normalized ${parsed.rewrittenBullets.length} rewritten bullet`,
);
