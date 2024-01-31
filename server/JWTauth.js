import jwt from "jsonwebtoken";

const cookieJWT = (req, res, next) => {
  const token = req.cookies.token;
  try {
    req.user = jwt.verify(token, "excalibur");
    next();
  } catch (err) {
    res.clearCookie("token");
    console.log("cleared cookie");
  }
};

export default cookieJWT;
