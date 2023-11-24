import { NextRequest, NextResponse as res } from "next/server";
export async function PATCH(
  req: NextRequest,
  { params }: { params: { scheduleId: string } }
) {
  console.log(req.nextUrl.basePath);

  return res.json({ id: params.scheduleId }, { status: 200 });
}
export async function DELETE(
  req: NextRequest,
  { params }: { params: { scheduleId: string } }
) {
  console.log(req.nextUrl.basePath);
  return res.json({ id: params.scheduleId }, { status: 200 });
}
