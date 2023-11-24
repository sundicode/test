import { NextRequest, NextResponse as res } from "next/server";

export async function POST(req: NextRequest) {
    const body = await req.json();
    console.log(body);
    return res.json({
        message: "hello",
    });
}
export async function GET() {}
