import prisma from "@/prisma/prisma";
import { errorCodes } from "@/utils/errorCode";
import { signAccessToken } from "@/utils/generateToken";
import { loginSchema } from "@/utils/usersValidate";
import bcrypt from "bcrypt";
import { NextRequest, NextResponse as res } from "next/server";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS() {
  return res.json({}, { headers: corsHeaders });
}
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    if (!body.matricule || !body.password)
      return new res(JSON.stringify({ message: "All fields are required" }), {
        status: errorCodes.badRequest,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      });
    const { error, value } = loginSchema.validate(body);
    const user = await prisma.users.findUnique({
      where: { matricule: value.matricule },
    });  
    if (error)
      return new res(JSON.stringify({ message: error.message }), {
        status: errorCodes.badRequest,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      });

    if (!user)
      return new res(JSON.stringify({ error: "Wrong Matricule or password" }), {
        status: errorCodes.badRequest,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      });
    const decryptedPassword = await bcrypt.compare(
      value.password,
      user.password
    );
    if (!decryptedPassword)
      return new res(JSON.stringify({ error: "Wrong Matricule or password" }), {
        status: errorCodes.badRequest,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      });

    const token = signAccessToken(user.id, user.matricule, user.role);
    const usersData = { ...user, token };
    return new res(
      JSON.stringify({ message: "Log in sucessfull", usersData }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
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
