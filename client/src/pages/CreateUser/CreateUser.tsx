import { useState } from "react";
import sendData from "../../components/sendData.tsx";
import title from "../../assets/Frost.png";

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
    <div className="login_wrapper">
      <div></div>
      <form className="login_form" onSubmit={submit}>
        <img className="login_logo" src={title} alt="" />
        <input
          className="login_input"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          type="text"
          placeholder="Username"
          id="un"
        />
        <input
          className="login_input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          type="text"
          id="pass"
        />
        <div>
          <button className="login_buttons" type="submit">
            Create Account
          </button>
        </div>
        {warning && <div className="login_warning">{warning}</div>}
      </form>
    </div>
  );
}

export default CreateUser;
