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
    if (
      !body.name ||
      !body.email ||
      !body.password ||
      !body.matricule ||
      !body.department
    )
      return new res(JSON.stringify({ message: "All fields are required" }), {
        status: errorCodes.badRequest,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      });
    const { error, value } = registerSchema.validate(body);
    const existingMatricule = await prisma.users.findUnique({
      where: { matricule: value.matricule },
    });

    const existingEmail = await prisma.users.findUnique({
      where: { matricule: value.email },
    });
    if (error)
      return new res(JSON.stringify({ message: error.message }), {
        status: errorCodes.badRequest,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      });
    if (existingMatricule || existingEmail)
    return new res(JSON.stringify({ message: "User already exist" }), {
      status: errorCodes.badRequest,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    });
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
      return new res(JSON.stringify({ message: "User created successfully" }), {
        status: errorCodes.serverError,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      });
    return new res(JSON.stringify({ message: "User created successfully" }), {
      status: 201,
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
