import React from "react";
import "./Login.css";
import sendData from "./sendData.tsx";

function LoginUser() {
  const [username, setUsername] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const [warning, setWarning] = React.useState<string>("");
  const submit = async (event: any) => {
    event.preventDefault();
    const query = await sendData({ username: username }, "/server/login");
    console.log(query);
    if (query.pass_word) {
      if (query.pass_word === password) {
        setWarning("Password match");
      } else {
        setWarning("Wrong password");
      }
    } else {
      setWarning("Username does not exist");
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
