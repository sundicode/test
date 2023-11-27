import { errorCodes } from "@/utils/errorCode";
import { NextRequest, NextResponse as res } from "next/server";
import prisma from "@/prisma/prisma";
import { uploadToS3Bucket } from "@/utils/uploadToS3";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS() {
  return res.json({}, { headers: corsHeaders });
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.formData();
    const medicalReceipt: File | null = data.get("medical") as unknown as File;
    const schoolfeeReceipt: File | null = data.get(
      "schoolfee"
    ) as unknown as File;

    const sceduleId = data.get("id") as string;
    if (!sceduleId || sceduleId === null)
      return res.json({ message: "Please choose a schedule" }, { status: 400 });
    if (!medicalReceipt || !schoolfeeReceipt) {
      return new res(JSON.stringify({ message: "all feilds are required" }), {
        status: errorCodes.badRequest,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      });
    }

    const medicalByte = await medicalReceipt.arrayBuffer();
    const schoolfeeByte = await schoolfeeReceipt.arrayBuffer();

    const schoolfeeBuffer = Buffer.from(schoolfeeByte);
    const medicalsBuffer = Buffer.from(medicalByte);

    const results = await uploadToS3Bucket(
      [medicalsBuffer, schoolfeeBuffer],
      [medicalReceipt.name, schoolfeeReceipt.name]
    );

    // await prisma.userinfos.create({
    //   data: {

    //   },
    // });
    return res.json({ results });
  } catch (error: any) {
    return new res(JSON.stringify({ message: error.message }), {
      status: errorCodes.badRequest,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    });
  }
}
