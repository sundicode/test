import { NextRequest, NextResponse as res } from "next/server";
import { errorCodes } from "@/utils/errorCode";
import { adminSignupSchema } from "@/utils/usersValidate";
import bcrypt from "bcrypt";
import prisma from "@/prisma/prisma";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS() {
  return res.json({}, { headers: corsHeaders });
}

interface AdminSignup {
  name: string;
  email: string;
  phone: string;
  password: string;
}
export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as AdminSignup;
    const existingAdmin = await prisma.admins.findUnique({
      where: {
        email: body.email,
      },
    });
    if (!body.name || !body.email || !body.password || !body.phone)
      return res.json(
        { error: "All Feilds are required" },
        { status: errorCodes.badRequest }
      );
    const { error, value } = adminSignupSchema.validate(body);
    if (error)
      return res.json(
        { error: error.message },
        { status: errorCodes.badRequest }
      );
    if (existingAdmin)
      return res.json(
        { error: "User already exist" },
        { status: errorCodes.badRequest }
      );
    const savePassword = await bcrypt.hash(body.password, 10);
    const admin = await prisma.admins.create({
      data: {
        adminname: value.name,
        email: value.email,
        password: savePassword,
        phone: value.phone,
      },
    });
    if (!admin)
      return res.json(
        { error: "Error creating admin" },
        { status: errorCodes.serverError }
      );
    return res.json({ message: "Admin created successfully" }, { status: 201 });
  } catch (error: any) {
    return res.json(
      { error: error?.message },
      { status: errorCodes.serverError }
    );
  }
}
