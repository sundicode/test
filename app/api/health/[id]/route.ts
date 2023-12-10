import { NextRequest, NextResponse as res } from "next/server";
import prisma from "@/prisma/prisma";
import { errorCodes } from "@/utils/errorCode";
import { checkAdminAuth } from "@/libs/checkAuthJwt";
import { uploadToS3Bucket } from "@/utils/uploadToS3";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS() {
  return res.json({}, { headers: corsHeaders });
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    const adminToken = req.cookies.get("AdminToken")?.value;
  } catch (error) {
    
  }
}
