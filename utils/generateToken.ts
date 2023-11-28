import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
const signAccessToken = (userId: string, matricule: string, role: string) => {
  const payload = {
    matricule,
    userId,
    role,
  };
  const options = {
    expiresIn: "7d",
  };
  const secret = process.env.JWT_USER_TOKEN!;
  const token = jwt.sign(payload, secret, options);
  return token;
};

const signAdminToken = (
  adminId: string,
  email: string,
  role: string,
  res: NextResponse
) => {
  const payload = {
    email,
    adminId,
    role,
  };
  const options = {
    expiresIn: "8d",
  };
  const secret = process.env.JWT_ADMIN_TOKEN!;
  const token = jwt.sign(payload, secret, options);
  res.cookies.set("AdminToken", token, {
    httpOnly: process.env.NODE_ENV === "production" ? false : true,
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    secure: process.env.NODE_ENV === "production" ? true : false,
    maxAge: 1000 * 60 * 60 * 24 * 8,
  });
};
const userLogoutToken = (res: NextResponse) => {
  res.cookies.delete("UserToken");
};

const adminLogoutToken = (res: NextResponse) => {
  res.cookies.delete("AdminToken");
};

export { signAccessToken, userLogoutToken, adminLogoutToken, signAdminToken };
