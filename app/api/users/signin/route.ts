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
    const user = await prisma.users.findUnique({
      where: { matricule: body.matricule },
    });
    if (!body.matricule || !body.password)
      return res.json(
        { error: "All Feilds are required" },
        { status: errorCodes.badRequest }
      );
    const { error, value } = loginSchema.validate(body);
    if (!user)
      return res.json(
        { error: "Wrong email or password" },
        { status: errorCodes.badRequest }
      );
    if (error)
      return res.json(
        { message: error.message },
        { status: errorCodes.badRequest }
      );
    const decryptedPassword = bcrypt.compare(body.password, user?.password);
    if (!decryptedPassword)
      return res.json(
        { error: "Wrong email or password" },
        { status: errorCodes.badRequest }
      );
    const response = res.json(
      { message: "Log in sucessfull" },
      { status: 200 }
    );
    const token = signAccessToken(user.id, user.email, user.role, response);
    return response;
  } catch (error: any) {
    return res.json(
      { error: error?.message },
      { status: errorCodes.serverError }
    );
  }
}
