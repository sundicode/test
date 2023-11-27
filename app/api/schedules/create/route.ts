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
  try {
    const { time, date, maxNumber } = await req.json();

    if (!date || !time)
      return res.json(
        { error: "All Feilds are required" },
        { status: errorCodes.badRequest }
      );

    const existingSchedule = await prisma.schedules.findUnique({
      where: {
        time: time,
      },
    });
    if (existingSchedule)
      return res.json(
        { error: "Schedule already Exist" },
        { status: errorCodes.badRequest }
      );

    const numberOfPatients = Number(maxNumber);
    const schedule = await prisma.schedules.create({
      data: {
        time,
        date,
        numberOfPatients,
        adminId: "65643f81be877c2651a13250",
      },
      include: {
        patient: true,
      },
    });
    if (!schedule)
      return res.json(
        { error: "Schedule could not be created" },
        { status: errorCodes.serverError }
      );
    return res.json(
      { message: "Schedule created successfully", schedule },
      { status: 201 }
    );
  } catch (error: any) {
    return res.json(
      { error: error?.message },
      { status: errorCodes.serverError }
    );
  }
}
