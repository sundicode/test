import jwt from "jsonwebtoken";
type UserPayloadJwt = {
  status: boolean | null;
  data: {
    matricule: string;
    userId: string;
    role: string;
    iat: number;
    exp: number;
  } | null;
  err: string | null;
};

type AdminPayloadJwt = {
  status: boolean | null;
  data: {
    email: string;
    adminId: string;
    role: string;
    iat: number;
    exp: number;
  } | null;
  err: string | null;
};
const checkUserAuth = (token: string) => {
  const result: UserPayloadJwt = {
    status: null,
    data: null,
    err: null,
  };
  if (token) {
    jwt.verify(
      token,
      process.env.JWT_ADMIN_TOKEN as string,
      (err: any, decodedToken: any) => {
        if (err) {
          result.data = null;
          result.status = false;
          result.err = err;
        } else {
          if (decodedToken?.role === "USER") {
            result.data = decodedToken;
            result.status = true;
            result.err = null;
          } else {
            result.data = null;
            result.status = false;
            result.err = "User only Action";
          }
        }
      }
    );
  } else {
    result.data = null;
    result.status = false;
    result.err = "No auth token login to get one";
  }
  return result;
};
const checkAdminAuth = (token: string) => {
  const result: AdminPayloadJwt = {
    status: null,
    data: null,
    err: null,
  };
  if (token) {
    jwt.verify(
      token,
      process.env.JWT_ADMIN_TOKEN as string,
      (err: any, decodedToken: any) => {
        if (err) {
          result.data = null;
          result.status = false;
          result.err = err;
        } else {
          if (decodedToken?.role !== "ADMIN") {
            result.data = null;
            result.status = false;
            result.err = "Admin only action";
          } else {
            result.data = decodedToken;
            result.status = true;
            result.err = null;
          }
        }
      }
    );
  } else {
    result.data = null;
    result.status = false;
    result.err = "No auth token login to get one";
  }

  return result;
};

export { checkAdminAuth, checkUserAuth };
