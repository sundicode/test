import { errorCodes } from "@/utils/errorCode";
import { userLogoutToken } from "@/utils/generateToken";
import { NextRequest, NextResponse as res } from "next/server";
export async function GET(req: NextRequest) {
  const origin = req.headers.get("origin");
  try {
    const response = new res(null, {
      status:200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": origin || "*",
      },
    });
    userLogoutToken(response);
    return response;
  } catch (error: any) {
    return res.json(
      { error: error?.message },
      { status: errorCodes.serverError }
    );
  }
}
