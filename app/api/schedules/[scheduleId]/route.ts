import schedules from "@/models/Schedule";
import { connect } from "@/utils/connectDb";
import { errorCodes } from "@/utils/errorCode";
import { NextRequest, NextResponse as res } from "next/server";
connect();
export async function PATCH(
  req: NextRequest,
  { params }: { params: { scheduleId: string } }
) {
  try {
    const id = params.scheduleId;
    const body = await req.json();
    const schedule = await schedules.findById({ _id: id });

    if (!schedule || schedule === null)
      return res.json(
        { message: "Schedule not found" },
        { status: 404, statusText: "Not Found" }
      );

    const updateSchedule = await schedule.updateOne(
      { _id: id },
      { $set: { ...body } }
    );

    if (updateSchedule.updatedCount > 0) {
      return res.json(
        { message: "Schedule updated" },
        { status: 200, statusText: "Success" }
      );
    }
    return res.json(
      { message: "error occured updating schedule" },
      { status: 500, statusText: "server error" }
    );
  } catch (error: any) {
    return res.json(
      { error: error?.message },
      { status: errorCodes.serverError }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { scheduleId: string } }
) {
  try {
    const id = params.scheduleId;
    const schedule = await schedules.findById({ _id: id });
    const schedulePatients = schedule.patient;
    if (!schedule || schedule === null)
      return res.json(
        { message: "Schedule not found" },
        { status: 404, statusText: "Not Found" }
      );

    if (schedulePatients.length > 0)
      return res.json(
        {
          message: "docunments already submited can only update time add date",
        },
        { status: 400, statusText: "Bad request" }
      );

    const deleteSchedule = await schedule.deleteOne({ _id: id });
    if (deleteSchedule.deletedCount > 0) {
      return res.json(
        { message: "Schedule deleted" },
        { status: 200, statusText: "Success" }
      );
    }
    return res.json(
      { message: "error occured deleting schedule" },
      { status: 500, statusText: "server error" }
    );
  } catch (error: any) {
    return res.json(
      { error: error?.message },
      { status: errorCodes.serverError }
    );
  }
}

export async function GET(
  req: NextRequest,
  { params }: { params: { scheduleId: string } }
) {
  try {
    const id = params.scheduleId;
    const schedule = await schedules.findById({ _id: id });

    if (!schedule || schedule === null)
      return res.json(
        { message: "Schedule not found" },
        { status: 404, statusText: "Not Found" }
      );
    return res.json(
      {
        time: schedule.time,
        date: schedule.date,
        numberOfPatients: schedule.numberOfPatients,
        id: schedule._id,
      },
      { status: 200 }
    );
  } catch (error: any) {
    return res.json(
      { error: error?.message },
      { status: errorCodes.serverError }
    );
  }
}
