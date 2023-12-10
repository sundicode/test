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

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    const tips = await prisma.healthTip.findUnique({
      where: { id },
    });

    if (!tips === null)
      return res.json(
        { message: "Schedule not found" },
        { status: 404, statusText: "Not Found" }
      );
    const deleteSchedule = await prisma.healthTip.delete({ where: { id } });
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
  } catch (error) {
    
  }
}
