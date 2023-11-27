import prisma from "@/prisma/prisma";
import { errorCodes } from "@/utils/errorCode";
import { NextRequest, NextResponse as res } from "next/server";

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
  { params }: { params: { scheduleId: string } }
) {
  try {
    const id = params.scheduleId;
    const body = await req.json();
    const schedule = await prisma.schedules.findUnique({ where: { id } });

    if (!schedule || schedule === null)
      return res.json(
        { message: "Schedule not found" },
        { status: 404, statusText: "Not Found" }
      );

    const updateSchedule = await prisma.schedules.update({
      where: { id },
      data: { ...body },
    });

    if (updateSchedule) {
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
    const schedule = await prisma.schedules.findUnique({
      where: { id },
      include: { patient: true },
    });

    const schedulePatients = schedule?.patient;
    if (!schedule || schedule === null)
      return res.json(
        { message: "Schedule not found" },
        { status: 404, statusText: "Not Found" }
      );

    if ((schedulePatients?.length as number) > 0)
      return res.json(
        {
          message: "docunments already submited can only update time add date",
        },
        { status: 400, statusText: "Bad request" }
      );

    const deleteSchedule = await prisma.schedules.delete({ where: { id } });
    if (deleteSchedule) {
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
    const schedule = await prisma.schedules.findUnique({
      where: { id },
    });
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
        id: schedule.id,
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
