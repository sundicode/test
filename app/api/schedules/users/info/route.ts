import prisma from "@/prisma/prisma";
import { errorCodes } from "@/utils/errorCode";
import { NextRequest, NextResponse as res } from "next/server";

export async function GET(
  req: NextRequest,
  {
    params,
  }: {
    params: { matricule: string };
  }
) {
  try {
    const matricule = params.matricule;
    const userInfo = await prisma.users.findUnique({
      where: { matricule: matricule },
      include: {
        userInfo: true,
      },
    });

    if (!userInfo)
      return new res(JSON.stringify({ message: "no user info found" }), {
        status: 404,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      });

    return new res(JSON.stringify({ user: userInfo }), {
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
