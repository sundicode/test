import { NextResponse as res } from "next/server";
export async function PATCH({ params }: { params: { scheduleId: string } }) {
  return res.json({ id: params.scheduleId }, { status: 200 });
}
export async function DELETE({ params }: { params: { scheduleId: string } }) {
  return res.json({ id: params.scheduleId }, { status: 200 });
}
