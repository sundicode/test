import { NextResponse as res } from "next/server";
import Schedules from "@/models/Schedule";
import { errorCodes } from "@/utils/errorCode";
import { connect } from "@/utils/connectDb";
connect();
export async function GET() {
  try {
    const date = new Date().toISOString().split("-");
    const year = date[0];
    const month = date[1];
    const day = date[2].split("T")[0];
    const currentDate = `${year}-${month}-${day}`;
    const popObj = {
      path: "patient",
      populate: {
        path: "user",
        select: "username  matricule department email",
      },
    };
    const todaysSchedule = await Schedules.find({ date: currentDate }).populate(
      popObj
    );
    return res.json({ schedule: todaysSchedule }, { status: 200 });
  } catch (error: any) {
    return res.json(
      { error: error?.message },
      { status: errorCodes.serverError }
    );
  }
}
