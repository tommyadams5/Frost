import { useState } from "react";
import sendData from "../../components/sendData.tsx";

// Create a new user and password, and then login the user.
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
    if (query === "User created") {
      const query2 = await sendData(
        { username: username, password: password },
        "/server/login"
      );
      if (query2 === "Password match") {
        window.location.href = "/";
      } else {
        setWarning(query2);
      }
    } else {
      setWarning(query);
    }
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
