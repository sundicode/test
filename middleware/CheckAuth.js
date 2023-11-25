import jwt from "jsonwebtoken";
const checkAdminAuth = (token) => {
  const token = req.cookies.AdminToken;
  try {
    if (token) {
      jwt.verify(token, process.env.JWT_ADMIN_TOKEN, (err, decodedToken) => {});
    } else {
    }
  } catch (error) {}
};

const checkUserAuth = (req, res, next) => {
  const token = req.cookies.UserToken;
  if (token) {
    jwt.verify(token, process.env.JWT_USER_TOKEN, (err, decodedToken) => {
      if (err) {
        return res.status(401).json({ message: "Not authorized" });
      } else {
        if (decodedToken.role !== "user") {
          return res.status(401).json({ message: "Not authorized" });
        } else {
          req.user = decodedToken;
          next();
        }
      }
    });
  } else {
    return res
      .status(401)
      .json({ message: "Not authorized, token not available" });
  }
};

export { checkAdminAuth, checkUserAuth };
