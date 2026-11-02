import { cvReviewSchema, type CvReviewResult } from '../types/langchain';

/** Retry schema failures once without inventing missing review content. */
export async function invokeValidatedReview(
  invoke: (correction: string) => Promise<unknown>,
): Promise<CvReviewResult> {
  let correction = '';
  for (let attempt = 0; attempt < 2; attempt++) {
    const output = await invoke(correction);
    const parsed = cvReviewSchema.safeParse(output);
    if (parsed.success) return parsed.data;
    const fields = parsed.error.issues
      .map((issue) => `${issue.path.join('.')}: ${issue.message}`)
      .join('; ');
    correction = `Your previous response failed validation: ${fields}. Return a complete review matching the schema. Every sectionFeedback item MUST contain a non-empty section name from the CV, score, issues, and suggestions. Do not omit required properties.`;
  }
  throw new Error(
    'The AI could not produce a complete review. Please try again.',
  );
}
