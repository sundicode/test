import { checkAdminAuth } from "@/libs/checkAuthJwt";
import { errorCodes } from "@/utils/errorCode";
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
    const adminToken = req.cookies.get("AdminToken")?.value;
  //  const {status,err,data} = checkAdminAuth(adminToken!)

    //  if () {

    //  }else{

    //  }
    return res.json({});
  } catch (error: any) {
    return res.json(
      { error: error?.message },
      { status: errorCodes.serverError }
    );
  }
}
