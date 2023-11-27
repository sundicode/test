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
    const admin = req.cookies.get("AdminToken")?.value;
    console.log(admin);

    const date = new Date().toISOString().split("-");
    const year = date[0];
    const month = date[1];
    const day = date[2].split("T")[0];
    const currentDate = `${year}-${month}-${day}`;
  
    const todaysSchedule = prisma.schedules.findMany({
      where: { date: currentDate },
    });

    return res.json({ schedule: todaysSchedule }, { status: 200 });
  } catch (error: any) {
    console.log(error);

    return res.json(
      { error: error?.message },
      { status: errorCodes.serverError }
    );
  }
}
