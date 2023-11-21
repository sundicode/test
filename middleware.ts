import { NextRequest, NextResponse } from "next/server";

export const middleware = (req: NextRequest) => {
  const parth = req.nextUrl.pathname;
  const cookie = req.cookies.get("AdminToken")?.value || "";
  const isPublic = parth === "/signin";
  console.log("cookies", req.cookies);
  console.log("creadential",req.credentials);

  if (isPublic && cookie) {
    return NextResponse.redirect(
      new URL("/dashboard/schedules/all-schedule", req.nextUrl)
    );
  }
  if (!isPublic && !cookie) {
    return NextResponse.redirect(new URL("/signin", req.nextUrl));
  }
  
};

export const config = {
  matcher: ["/signin", "/dashboard/:path*"],
};
