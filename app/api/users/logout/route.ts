import { errorCodes } from "@/utils/errorCode";
import { userLogoutToken } from "@/utils/generateToken";
import { NextResponse as res } from "next/server";
export async function GET() {
  try {
    const response = res.json(
      { message: "user logged out sucessfully" },
      { status: 200 }
    );
    userLogoutToken(response);
    return response;
  } catch (error:any) {
    return res.json(
      { error: error?.message },
      { status: errorCodes.serverError }
    );
  }
}
