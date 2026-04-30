import { PDFParse } from "pdf-parse";

const DEFAULT_PAGE_JOINER = "\n\n--- Page {page_number} of {total_number} ---\n\n";

export type ParsedPdfResult = {
  pageCount: number;
  text: string;
  pages: Array<{
    pageNumber: number;
    text: string;
  }>;
};

function normalizeExtractedText(text: string) {
  return text
    .replace(/\r\n/g, "\n")
    .replace(/\u0000/g, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

export async function extractTextFromPdfBuffer(
  buffer: Buffer | Uint8Array,
): Promise<ParsedPdfResult> {
  const parser = new PDFParse({ data: buffer });

  try {
    const result = await parser.getText({
      cellSeparator: " | ",
      lineEnforce: true,
      pageJoiner: DEFAULT_PAGE_JOINER,
      parseHyperlinks: true,
    });

    const pages = result.pages.map((page) => ({
      pageNumber: page.num,
      text: normalizeExtractedText(page.text),
    }));

    const text = normalizeExtractedText(result.text);

    if (!text) {
      throw new Error("PDF text extraction returned an empty result.");
    }

    return {
      pageCount: result.total,
      text,
      pages,
    };
  } finally {
    await parser.destroy();
  }
}

export async function extractTextFromPdfFile(file: File) {
  const arrayBuffer = await file.arrayBuffer();
  const bytes = Buffer.from(arrayBuffer);

  return extractTextFromPdfBuffer(bytes);
}

export function isPdfFile(file: File) {
  return (
    file.type === "application/pdf" ||
    file.name.toLowerCase().endsWith(".pdf")
  );
}
