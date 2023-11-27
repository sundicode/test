import { errorCodes } from "@/utils/errorCode";
import { NextRequest, NextResponse as res } from "next/server";
import prisma from "@/prisma/prisma";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS() {
  return res.json({}, { headers: corsHeaders });
}

export async function POST(req: NextRequest) {
  const origin = req.headers.get("origin");
  try {
    const data = await req.formData();
    const medicalReceipt: File | null = data.get(
      "medicalReciept"
    ) as unknown as File;
    const schoolfeeReceipt: File | null = data.get(
      "schoolfeeReceipt"
    ) as unknown as File;

    const medicalByte = await medicalReceipt.arrayBuffer();
    const schoolfeeByte = await schoolfeeReceipt.arrayBuffer();

    const schoolfeeBuffer = Buffer.from(schoolfeeByte);
    const medicalsBuffer = Buffer.from(medicalByte);

    return res.json({});
  } catch (error: any) {
    return res.json(
      { error: error?.message },
      { status: errorCodes.serverError }
    );
  }
}
