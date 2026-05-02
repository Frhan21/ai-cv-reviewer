export type ParsedPdfResult = {
  pageCount: number;
  text: string;
  pages: Array<{
    pageNumber: number;
    text: string;
  }>;
};
