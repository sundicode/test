import { NextResponse as res, NextRequest } from "next/server";
import Schedules from "@/models/Schedule";
import UserInfoSchema from "@/models/UserInfo";
import { errorCodes } from "@/utils/errorCode";
import { connect } from "@/utils/connectDb";
connect();
export async function GET(req: NextRequest) {
  try {
    const admin = req.cookies.get("AdminToken")?.value;
    console.log(admin);

    const date = new Date().toISOString().split("-");
    const year = date[0];
    const month = date[1];
    const day = date[2].split("T")[0];
    const currentDate = `${year}-${month}-${day}`;
    // const popObj = {
    //   path: "patient",
    //   populate: {
    //     path: "user",
    //     select: "username  matricule department email",
    //   },
    // };
    const todaysSchedule = await Schedules.find({ date: currentDate })

    return res.json({ schedule: todaysSchedule }, { status: 200 });
  } catch (error: any) {
    console.log(error);

    return res.json(
      { error: error?.message },
      { status: errorCodes.serverError }
    );
  }
}
