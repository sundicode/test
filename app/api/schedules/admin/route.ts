import { NextResponse as res, NextRequest } from "next/server";
import { errorCodes } from "@/utils/errorCode";
import prisma from "@/prisma/prisma";
import { checkAdminAuth } from "@/libs/checkAuthJwt";

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
    const adminToken = req.cookies.get("AdminToken")?.value;
    const { status, err, data } = checkAdminAuth(adminToken!);
    if (status) {
      const date = new Date().toISOString().split("-");
      const year = date[0];
      const month = date[1];
      const day = date[2].split("T")[0];
      const currentDate = `${year}-${month}-${day}`;
      const todaysSchedule = await prisma.schedules.findMany({
        where: { date: currentDate, adminId: data?.adminId },
        include: {
          patient: {
            include: {
              userInfo: true,
            },
          },
        },
      });
      return res.json(todaysSchedule, { status: 200 });
    } else {
      return new res(JSON.stringify({ err: err }), {
        status: errorCodes.unAuthorized,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      });
    }
  } catch (error: any) {
    return res.json(
      { error: error?.message },
      { status: errorCodes.serverError }
    );
  }
}
