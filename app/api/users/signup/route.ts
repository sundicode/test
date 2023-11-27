import { NextRequest, NextResponse as res } from "next/server";
import bcrypt from "bcrypt";
import { errorCodes } from "@/utils/errorCode";
import { registerSchema } from "@/utils/usersValidate";
import prisma from "@/prisma/prisma";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS() {
  return res.json({}, { headers: corsHeaders });
}
interface UserSignup {
  name: string;
  email: string;
  matricule: string;
  password: string;
  department: string;
}
export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as UserSignup;
    const existingUser = await prisma.users.findUnique({
      where: { matricule: body.matricule },
    });
    if (
      !body.name ||
      !body.email ||
      !body.password ||
      !body.matricule ||
      !body.department
    )
      return res.json(
        { error: "All Feilds are required" },
        { status: errorCodes.badRequest }
      );
    const { error, value } = registerSchema.validate(body);
    if (error)
      return res.json(
        { error: error.message },
        { status: errorCodes.badRequest }
      );
    if (existingUser)
      return res.json(
        { error: "User already exist" },
        { status: errorCodes.badRequest }
      );
    const savePassword = await bcrypt.hash(body.password, 10);
    const user = await prisma.users.create({
      data: {
        matricule: value.matricule,
        username: value.name,
        email: value.email,
        password: savePassword,
        department: value.department,
      },
    });
    if (!user)
      return res.json(
        { error: "Error creating admin" },
        { status: errorCodes.serverError }
      );
    return res.json({ message: "User created successfully" }, { status: 201 });
  } catch (error: any) {
    return res.json(
      { error: error?.message },
      { status: errorCodes.serverError }
    );
  }
}
