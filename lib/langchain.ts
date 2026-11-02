import { AIMessage } from '@langchain/core/messages';
import { ChatPromptTemplate } from '@langchain/core/prompts';

import {
  CvReviewInput,
  cvReviewInputSchema,
  CvReviewResult,
  cvReviewSchema,
} from '@/types/langchain';

import llm from './openai';
import { invokeValidatedReview } from './review-validation';

const MAX_CV_TEXT_LENGTH = 20_000;

export function normalizeCvText(rawText: string) {
  return rawText
    .replace(/\r\n/g, '\n')
    .replace(/\u0000/g, '')
    .replace(/[ \t]+\n/g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim()
    .slice(0, MAX_CV_TEXT_LENGTH);
}

export const cvReviewPrompt = ChatPromptTemplate.fromMessages([
  [
    'system',
    [
      'You are an expert CV reviewer, recruiter, and ATS evaluator.',
      'Analyze the CV critically and return concise, useful, honest feedback in JSON format.',
      'Focus on clarity, impact, measurable achievements, ATS compatibility, keyword coverage, and section completeness.',
      'CRITICAL RULE: You MUST output all feedback and responses entirely in English, regardless of the language of the provided CV or inputs.',
      'Do not invent experiences or qualifications that are not present in the CV.',
      'If the CV lacks evidence for a claim, call it out as a weakness or uncertainty.',
      'The rewrittenBullets field must always be a JSON array, even when there is only one rewritten bullet.',
      'Every sectionFeedback object MUST include section (the actual section name), score, issues, and suggestions. Never omit section.',
      'Today is {currentDate}. Evaluate dates against this date, not a remembered training date. A role that ended before today is not future-dated.',
      'Do not fabricate numbers in rewritten bullets. Use clearly marked placeholders only when the CV provides no measurement.',
      '{correction}',
    ].join(' '),
  ],
  [
    'human',
    [
      'Review this CV and return a structured assessment.',
      'Language: {language}',
      'Target role: {targetRole}',
      'Target seniority: {seniority}',
      'Job description or hiring context: {jobDescription}',
      '',
      'CV text:',
      '{cvText}',
    ].join('\n'),
  ],
]);

// export function buildCvReviewChain() {
//   return cvReviewPrompt.pipe(
//     groq.withStructuredOutput(cvReviewSchema, {
//       name: 'cv_review',
//       method: 'functionCalling',
//     }),
//   );
// }

export function buildCvReviewChain() {
  return cvReviewPrompt.pipe(
    llm.withStructuredOutput(cvReviewSchema, {
      name: 'cv_review',
      method: 'functionCalling',
      includeRaw: true,
    }),
  );
}

export async function analyzeCv(input: CvReviewInput): Promise<CvReviewResult> {
  const parsedInput = cvReviewInputSchema.parse({
    ...input,
    cvText: normalizeCvText(input.cvText),
    targetRole: input.targetRole?.trim() || 'Not specified',
    seniority: input.seniority?.trim() || 'Not specified',
    jobDescription: input.jobDescription?.trim() || 'Not specified',
  });

  const chain = buildCvReviewChain();
  const currentDate = new Date().toISOString().slice(0, 10);
  return invokeValidatedReview(async (correction) => {
    const response = await chain.invoke({
      ...parsedInput,
      currentDate,
      correction,
    });
    if (response.parsed !== null) return response.parsed;
    // includeRaw preserves tool arguments when the structured parser rejects them.
    const call = AIMessage.isInstance(response.raw)
      ? response.raw.tool_calls?.find((tool) => tool.name === 'cv_review')
      : undefined;
    return call?.args ?? null;
  });
}
