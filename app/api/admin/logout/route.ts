import { errorCodes } from "@/utils/errorCode";
import { adminLogoutToken } from "@/utils/generateToken";
import { NextResponse as res } from "next/server";
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS() {
  return res.json({}, { headers: corsHeaders });
}
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
