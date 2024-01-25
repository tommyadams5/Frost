import { doc, getDoc } from "firebase/firestore";
import React from "react";
import db from "./firebase.tsx";
import axios from "axios";

async function postLogin(user: string, pass_word: string) {
  const formData = new FormData();
  formData.append("user", user);
  formData.append("pass_word", pass_word);
  formData.append("test", "testing");
  console.log(formData.get("user"));
  const result = await axios.post("/server/login", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return result.data;
}

function LoginUser() {
  const [username, setUsername] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const [warning, setWarning] = React.useState<string>("");
  const submit = async (event: any) => {
    event.preventDefault();
    const query = await getDoc(doc(db, "users", username));
    if (query.exists()) {
      if (query.data().pass_word === password) {
        setWarning("Password match");
      } else {
        setWarning("Wrong password");
      }
    } else {
      setWarning("Username does not exist");
      const response = await postLogin(username, password);
      console.log(response);
    }
  };

  return (
    <div className="wrapper">
      <div></div>
      <form onSubmit={submit}>
        <div>Username</div>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          type="text"
          id="un"
        />
        <div>Password</div>

        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="text"
          id="pass"
        />
        <div></div>
        <button type="submit">Login</button>
        <div>{warning}</div>
      </form>
    </div>
  );
}

export default LoginUser;
