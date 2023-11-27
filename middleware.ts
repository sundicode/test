import {
  // NextFetchEvent,
  // NextMiddleware,
  NextRequest,
  NextResponse,
} from "next/server";
// const allEviroment =
//   process.env.NODE_ENV !== "production"
//     ? [
//         "http://localhost:3000",
//         "https://mediks-project.vercel.app/",
//         "https://www.mediks-project.vercel.app/",
//         "mediks.link",
//         "https://mediks-admin-dashboard.vercel.app/",
//         "https://www.mediks-admin-dashboard.vercel.app/",
//       ]
//     : [
//         "http://localhost:3000",
//         "https://mediks-project.vercel.app/",
//         "https://www.mediks-project.vercel.app/",
//         "mediks.link",
//         "https://mediks-admin-dashboard.vercel.app/",
//         "https://www.mediks-admin-dashboard.vercel.app/",
//       ];

export const middleware = (req: NextRequest) => {
  const origin = req.headers.get("origin");
  console.log(origin);

  // if (origin && !allEviroment.includes(origin))
  //   return new NextResponse(null, { status: 400, statusText: "bad request" });

  const parth = req.nextUrl.pathname;
  const cookie = req.cookies.get("AdminToken")?.value || "";
  const isPublic = parth === "/signin";

  if (isPublic && cookie) {
    return NextResponse.redirect(new URL("/", req.nextUrl));
  }
  if (!isPublic && !cookie) {
    return NextResponse.redirect(new URL("/signin", req.nextUrl));
  }
};

// function withMiddleware(middleware: NextMiddleware) {
//   return async (req: NextRequest, event: NextFetchEvent) => {
//     return middleware(req, event);
//   };
// }

export const config = {
  matcher: [
    "/signin",
    "/dashboard/:path*",
    "/",
    "/add-admin",
    // "/api/users/:path*",
    // "/api/schedules/book",
    // "/api/schedules/users"
  ],
};
