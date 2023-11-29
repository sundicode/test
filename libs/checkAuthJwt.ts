import jwt from "jsonwebtoken";
type PayloadJwt = {
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
const checkUserAuth = (token: string) => {
  const result: PayloadJwt = {
    status: null,
    data: null,
    err: null,
  };
  if (token) {
    jwt.verify(
      token,
      process.env.JWT_USER_TOKEN as string,
      (err: any, decodedToken: any) => {
        console.log(decodedToken);

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
  if (token) {
    jwt.verify(
      token,
      process.env.JWT_ADMIN_TOKEN as string,
      (err: any, decodedToken: any) => {
        if (err) {
          return { status: false, err: err, data: null };
        } else {
          if (decodedToken?.role !== "ADMIN") {
            return { status: false, err: "Admin only action" };
          } else {
            return { status: true, err: null, data: decodedToken };
          }
        }
      }
    );
  } else {
    return { status: false, err: "No auth token login to get one", data: null };
  }
};

export { checkAdminAuth, checkUserAuth };
