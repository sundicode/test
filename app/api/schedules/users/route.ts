import { NextRequest, NextResponse as res } from "next/server";
import Schedules from "@/models/Schedule";
import { errorCodes } from "@/utils/errorCode";
export async function GET(req: NextRequest) {
  const origin = req.headers.get("origin");
  try {
    const date = new Date().toISOString().split("-");
    const year = date[0];
    const month = date[1];
    const day = date[2].split("T")[0];
    const currentDate = `${year}-${month}-${day}`;
    const todaysSchedule = await Schedules.find({ date: currentDate }).select(
      "_id time date"
    );
    if (!todaysSchedule) return res.json({ schedule: null }, { status: 200 });
    return new res(JSON.stringify(todaysSchedule), {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": origin || "*",
      },
    });
  } catch (error: any) {
    return res.json(
      { error: error?.message },
      { status: errorCodes.serverError }
    );
  }
}
