import assert from 'node:assert/strict';
import { cvReviewSchema } from '../types/langchain';
import { invokeValidatedReview } from '../lib/review-validation';

async function main() {
  const output = {
    summary: 'Example',
    overallScore: 74,
    atsScore: 78,
    strengths: [],
    weaknesses: [],
    keywordMatch: { present: [], missing: [] },
    sectionFeedback: [
      {
        score: 70,
        issues: ['Missing outcomes'],
        suggestions: ['Add evidence'],
      },
    ],
    rewrittenBullets: [],
    finalVerdict: 'Revise',
  };
  assert.equal(
    cvReviewSchema.safeParse(output).success,
    false,
    'Missing section must not silently pass',
  );
  let attempts = 0;
  const result = await invokeValidatedReview(async (correction) => {
    attempts++;
    if (attempts === 1) return output;
    assert.match(correction, /sectionFeedback\.0\.section/);
    return {
      ...output,
      sectionFeedback: [
        { ...output.sectionFeedback[0], section: 'Experience' },
      ],
    };
  });
  assert.equal(attempts, 2);
  assert.equal(result.sectionFeedback[0].section, 'Experience');
  let failures = 0;
  await assert.rejects(
    () =>
      invokeValidatedReview(async () => {
        failures++;
        return output;
      }),
    /could not produce a complete review/,
  );
  assert.equal(failures, 2);
  console.log(
    'PASS: missing section triggers one corrective retry; invalid retries fail safely.',
  );
}
void main();
