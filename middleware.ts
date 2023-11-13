import { NextRequest, NextResponse } from "next/server";

export const middleware = (req: NextRequest) => {
  const parth = req.nextUrl.pathname;
  const cookie = req.cookies.get("AdminToken")?.value || "";
  const isPublic = parth === "/signin" || parth === "/signup";
  if (isPublic && cookie) {
    return NextResponse.redirect(
      new URL("/dashboard/all-schedule", req.nextUrl)
    );
  }
  if (!isPublic && !cookie) {
    return NextResponse.redirect(new URL("/signin", req.nextUrl));
  }
};

export const config = {
  matcher: ["/signin", "/dashboard/:path*", "/signup"],
};
