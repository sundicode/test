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
    params: { matricule: string };
  }
) {
  try {
    const id = params.matricule;
    const user = await prisma.users.findUnique({
      where: { matricule: id },
      include: { userInfo: true },
    });

    return new res(JSON.stringify({ user }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    });
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
