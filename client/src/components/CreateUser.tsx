import { useState } from "react";
import sendData from "./sendData.tsx";

function CreateUser() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [warning, setWarning] = useState<string>("");

  const submit = async (event: any) => {
    event.preventDefault();
    const query = await sendData(
      { username: username, password: password },
      "/server/newuser"
    );
    setWarning(query);
    // window.location.href = "/";
  };

  return (
    <div className="wrapper">
      <div></div>
      <form onSubmit={submit}>
        <div>Username</div>
        <input
          value={username}
          type="text"
          onChange={(e) => setUsername(e.target.value)}
        />
        <div>Password</div>
        <input
          value={password}
          type="text"
          onChange={(e) => setPassword(e.target.value)}
        />
        <div></div>
        <button type="submit">Create Account</button>
        <div>{warning}</div>
      </form>
    </div>
  );
}

export default CreateUser;
