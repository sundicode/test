import { NextRequest, NextResponse as res } from "next/server";
import prisma from "@/prisma/prisma";
import { errorCodes } from "@/utils/errorCode";

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
    const date = new Date().toISOString().split("-");
    const year = date[0];
    const month = date[1];
    const day = date[2].split("T")[0];
    const currentDate = `${year}-${month}-${day}`;
    const todaysSchedule = await prisma.schedules.findMany({
      where: {
        date: {
          gte: currentDate,
        },
      },
    });
    if (!todaysSchedule) return res.json({ schedule: null }, { status: 200 });
    return res.json({ todaysSchedule }, { status: 200 });
  } catch (error: any) {
    return res.json(
      { error: error?.message },
      { status: errorCodes.serverError }
    );
  }
}
