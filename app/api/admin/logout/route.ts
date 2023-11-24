import { errorCodes } from "@/utils/errorCode";
import { adminLogoutToken } from "@/utils/generateToken";
import { NextResponse as res } from "next/server";
export async function GET() {
  try {
    const response = res.json(
      { message: "admin logged out sucessfully" },
      { status: 200 }
    );
    adminLogoutToken(response);
    return response;
  } catch (error: any) {
    return res.json(
      { error: error?.message },
      { status: errorCodes.serverError }
    );
  }
}
