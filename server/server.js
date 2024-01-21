const express = require("express");
const app = express();

app.get("/api", (req, res) => {
  res.json({ users: ["Tommy", "Jack", "Julia", "Stella"] });
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
