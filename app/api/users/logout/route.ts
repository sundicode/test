import { errorCodes } from "@/utils/errorCode";
import { userLogoutToken } from "@/utils/generateToken";
import { NextRequest, NextResponse as res } from "next/server";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS() {
  return res.json({}, { headers: corsHeaders });
}
export async function GET(req: NextRequest) {
  try {
    const response = new res(JSON.stringify({ message: "Login successfull" }), {
      status: 200,
    });
    userLogoutToken(response);
    return response;
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
