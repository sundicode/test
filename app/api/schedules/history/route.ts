import { NextResponse as res, NextRequest } from "next/server";
import { errorCodes } from "@/utils/errorCode";
import prisma from "@/prisma/prisma";
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS() {
  return res.json({}, { headers: corsHeaders });
}
export async function GET(req: NextRequest) {
  try {
    const todaysSchedule = await prisma.schedules.findMany({
      include: {
        patient: {
          include: {
            userInfo: true,
          },
        },
      },
    });
    return res.json(todaysSchedule, { status: 200 });
  } catch (error: any) {
    return res.json(
      { error: error?.message },
      { status: errorCodes.serverError }
    );
  }
}
