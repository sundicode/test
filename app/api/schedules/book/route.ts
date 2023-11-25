import { errorCodes } from "@/utils/errorCode";
import { NextRequest, NextResponse as res } from "next/server";
export async function POST(req: NextRequest) {
  const origin = req.headers.get("origin");
  try {
    return res.json({});
  } catch (error: any) {
    return res.json(
      { error: error?.message },
      { status: errorCodes.serverError }
    );
  }
}
