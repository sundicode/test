import { checkAdminAuth } from "@/libs/checkAuthJwt";
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
export async function GET(req: NextRequest) {
  try {
    const adminToken = req.cookies.get("AdminToken")?.value;
    const { status, err, data } = checkAdminAuth(adminToken!);
    if (status) {
      console.log(data?.adminId);
      if (data) {
        const adminProfile = await prisma.admins.findUnique({
          where: {
            id: data?.adminId,
          },
        });

        return new res(JSON.stringify({ admin: adminProfile }), {
          status: 200,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        });
      }
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
