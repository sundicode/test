import prisma from "@/prisma/prisma";
import { errorCodes } from "@/utils/errorCode";
import { signAdminToken } from "@/utils/generateToken";
import { adminSigninSchema } from "@/utils/usersValidate";
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
    const admin = await prisma.admins.findUnique({
      where: { email: body.email },
    });
    if (!body.email || !body.password)
      return res.json(
        { error: "All Feilds are required" },
        { status: errorCodes.badRequest }
      );
    const { error, value } = adminSigninSchema.validate(body);
    if (!admin)
      return res.json(
        { error: "Wrong email or password" },
        { status: errorCodes.badRequest }
      );
    if (error)
      return res.json(
        { message: error.message },
        { status: errorCodes.badRequest }
      );
    const decryptedPassword = bcrypt.compare(body.password, admin?.password);
    if (!decryptedPassword)
      return res.json(
        { error: "Wrong email or password" },
        { status: errorCodes.badRequest }
      );
    const response = res.json(
      { message: "user logged in sucessfully" },
      { status: 200 }
    );
    const token = signAdminToken(admin.id, admin.email, admin.role, response);
    return response;
  } catch (error: any) {
    return res.json(
      { error: error?.message },
      { status: errorCodes.serverError }
    );
  }
}
