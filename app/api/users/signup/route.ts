import { connect } from "@/utils/connectDb";
import { NextRequest, NextResponse as res } from "next/server";
import Users from "@/models/User";
import bcrypt from "bcrypt";
import { errorCodes } from "@/utils/errorCode";
import { registerSchema } from "@/utils/usersValidate";
connect();
export async function POST(req: NextRequest) {
  const origin = req.headers.get("origin");
  try {
    const body = await req.json();
    const existingUser = await Users.findOne({ matricule: body.matricule });
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
    const newUser = new Users({
      matricule: value.matricule,
      username: value.name,
      email: value.email,
      password: savePassword,
      department: value.department,
    });
    const user = await newUser.save();
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
