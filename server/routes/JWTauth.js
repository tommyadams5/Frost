import jwt from "jsonwebtoken";

// Confirm user ID via JWT cookie
const cookieJWT = (req, res, next) => {
  const token = req.cookies.token;
  try {
    req.user = jwt.verify(token, "excalibur");
    next();
  } catch (err) {
    console.log("invalid token");
    res.clearCookie("token").sendStatus(403);
  }
};

export default cookieJWT;
