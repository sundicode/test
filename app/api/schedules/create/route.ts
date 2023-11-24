import { errorCodes } from "@/utils/errorCode";
import Schedule from "@/models/Schedule";
import { NextRequest, NextResponse as res } from "next/server";
export async function POST(req: NextRequest) {
  try {
    const { time, date, maxNumber } = await req.json();
    const existingSchedule = await Schedule.findOne({ time: time });
    if (existingSchedule)
      return res.json(
        { error: "Schedule already Exist" },
        { status: errorCodes.badRequest }
      );

    if (!date || !time)
      return res.json(
        { error: "All Feilds are required" },
        { status: errorCodes.badRequest }
      );
    const newSchedule = new Schedule({
      date: date,
      time,
      numberOfPatients: maxNumber,
    });
    const schedule = await newSchedule.save();
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
