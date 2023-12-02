import { NextRequest, NextResponse as res } from "next/server";
import prisma from "@/prisma/prisma";
import { errorCodes } from "@/utils/errorCode";
import { checkUserAuth } from "@/libs/checkAuthJwt";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS() {
  return res.json({}, { headers: corsHeaders });
}
export async function GET(
  req: NextRequest,
  {
    params,
  }: {
    params: { id: string };
  }
) {
  try {
    const id = params.id;
    const token = req.headers.get("authorization");
    const jwtToken = token?.split(" ")[1];
    const { data, status, err } = checkUserAuth(jwtToken!);
    if (status) {
      const userSchedule = await prisma.schedules.findUnique({
        where: { id },
        select: { time: true, date: true },
      });

      return new res(JSON.stringify({ userSchedule }), {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      });
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
    return new res(JSON.stringify({ message: error.message }), {
      status: errorCodes.badRequest,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    });
  }
}
