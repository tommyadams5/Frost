import jwt from "jsonwebtoken";

const cookieJWT = (req, res, next) => {
  const token = req.cookies.token;
  try {
    req.user = jwt.verify(token, "excalibur");
    next();
  } catch (err) {
    console.log("invalid token");
    next();
    // res.clearCookie("token").send("invalid token");
    // res.clearCookie("token").redirect("/login");
  }
};

export default cookieJWT;
