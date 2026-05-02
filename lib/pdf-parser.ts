import { ParsedPdfResult } from '@/types/pdf-parser';
import { extractText, getDocumentProxy } from 'unpdf';

function normalizeExtractedText(text: string) {
  return text
    .replace(/\r\n/g, '\n')
    .replace(/\u0000/g, '')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

export async function extractTextFromPdfBuffer(
  buffer: Buffer | Uint8Array,
): Promise<ParsedPdfResult> {
  const pdf = await getDocumentProxy(new Uint8Array(buffer));
  const { totalPages, text } = await extractText(pdf, { mergePages: true });

  const normalizedText = normalizeExtractedText(text as string);

  if (!normalizedText) {
    throw new Error('PDF text extraction returned an empty result.');
  }

  return {
    pageCount: totalPages,
    text: normalizedText,
    pages: [
      {
        pageNumber: 1,
        text: normalizedText,
      },
    ],
  };
}

export async function extractTextFromPdfFile(file: File) {
  const arrayBuffer = await file.arrayBuffer();
  const bytes = Buffer.from(arrayBuffer);

  return extractTextFromPdfBuffer(bytes);
}

export function isPdfFile(file: File) {
  return (
    file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf')
  );
}
