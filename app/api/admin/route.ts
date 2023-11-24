import { NextResponse as res } from "next/server";
export async function GET() {
  return res.json({
    message: "hello",
  });
}
export async function POST() {}
