import { analyzeCv } from "@/lib/langchain";
import { extractTextFromPdfFile } from "@/lib/pdf-parser";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const res = await req.formData();

  const file = res.get("file") as File;
  if (!file) {
    throw new Error("File tidak ada");
  }

  if (file.type !== "application/pdf") {
    throw new Error("File harus berupa PDF");
  }

  try {
    const extractedText = await extractTextFromPdfFile(file);

    const results = await analyzeCv({
      cvText: extractedText.text,
      targetRole: res.get("targetRole") as string,
      seniority: res.get("seniority") as string,
      jobDescription: res.get("jobDescription") as string,
      language: res.get("language") as string,
    });

    return NextResponse.json({
      message: "AI Success Review",
      data: {
        ...results,
      },
    });
  } catch (error) {
    console.error("Error in analyze API:", error);
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: "Gagal memproses CV" }, { status: 500 });
  }
}
