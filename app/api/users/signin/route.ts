import Users from "@/models/User";
import { errorCodes } from "@/utils/errorCode";
import { signAdminToken } from "@/utils/generateToken";
import { adminSigninSchema, registerSchema } from "@/utils/usersValidate";
import bcrypt from "bcrypt";
import { NextRequest, NextResponse as res } from "next/server";
export async function POST(req: NextRequest) {
  const origin = req.headers.get("origin");
  try {
    const body = await req.json();
    const user = await Users.findOne({ matricule: body.matricule });
    if (!body.matricule || !body.password)
      return res.json(
        { error: "All Feilds are required" },
        { status: errorCodes.badRequest }
      );
    const { error, value } = registerSchema.validate(body);
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
    const response = new res(null, {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": origin || "*",
      },
    });
    const token = signAdminToken(user._id, user.email, user.role, response);
    return response;
  } catch (error: any) {
    return res.json(
      { error: error?.message },
      { status: errorCodes.serverError }
    );
  }
}
