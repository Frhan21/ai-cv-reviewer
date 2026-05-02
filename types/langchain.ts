import z from 'zod';

export const cvReviewInputSchema = z.object({
  cvText: z.string().min(100, 'CV text is too short to analyze.'),
  targetRole: z.string().trim().min(2).max(120).optional(),
  jobDescription: z.string().trim().min(20).max(8_000).optional(),
  language: z.string().trim().min(2).max(50).default('English').optional(),
  seniority: z.string().trim().min(2).max(50).optional(),
});

export const cvReviewSchema = z.object({
  summary: z.string(),
  overallScore: z.number().min(0).max(100),
  atsScore: z.number().min(0).max(100),
  strengths: z.array(z.string()),
  weaknesses: z.array(z.string()),
  keywordMatch: z.object({
    present: z.array(z.string()),
    missing: z.array(z.string()),
  }),
  sectionFeedback: z.array(
    z.object({
      section: z.string(),
      score: z.number().min(0).max(100),
      issues: z.array(z.string()),
      suggestions: z.array(z.string()),
    }),
  ),
  rewrittenBullets: z.array(
    z.object({
      original: z.string(),
      improved: z.string(),
      reason: z.string(),
    }),
  ),
  finalVerdict: z.string(),
});

export type CvReviewInput = z.infer<typeof cvReviewInputSchema>;
export type CvReviewResult = z.infer<typeof cvReviewSchema>;
