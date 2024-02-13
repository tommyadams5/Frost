import db from "../logic/firestore.js";
import jwt from "jsonwebtoken";

// Checks username and password, and sends a JWT cookie if correct.
const Login = async (req, res) => {
  try {
    const doc = await db.collection("users").doc(req.body.username).get();
    if (doc.data().password === req.body.password) {
      const token = jwt.sign({ username: req.body.username }, "excalibur", {
        expiresIn: "1h",
      });
      res.cookie("token", token, { httpOnly: true });
      res.send("Password match");
    } else {
      res.send("Wrong password");
    }
  } catch (err) {
    res.send("Username does not exist");
  }
};

export default Login;
