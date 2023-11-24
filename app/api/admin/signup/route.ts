import { NextRequest, NextResponse as res } from "next/server";
import Admin from "@/models/Admin";
import { errorCodes } from "@/utils/errorCode";
import { adminSignupSchema } from "@/utils/usersValidate";
import bcrypt from "bcrypt";
import { connect } from "@/utils/connectDb";
connect();
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const existingAdmin = await Admin.findOne({ email: body.email });
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
    const newAdmin = new Admin({
      adminname: value.name,
      email: value.email,
      password: savePassword,
      phone: value.phone,
    });
    const admin = newAdmin.save();
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
