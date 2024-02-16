import { useState } from "react";
import sendData from "../../components/sendData.tsx";
import title from "../../assets/Frost.png";
import "./CreateUser.css";

// Create a new user and password, and then login the user
function CreateUser() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [warning, setWarning] = useState<string>("");

  const submit = async (event: any) => {
    event.preventDefault();
    if (!/^[a-zA-Z0-9]+$/.test(username)) {
      setWarning("Username must be alphanumeric");
    } else if (!/^[a-zA-Z0-9]+$/.test(password)) {
      setWarning("Password must be alphanumeric");
    } else if (username.length > 20 || password.length > 20) {
      setWarning("Username and password must be 20 characters or less");
    } else if (username.length > 0 && password.length > 0) {
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
    }
  };

  return (
    <div className="create_user_wrapper">
      <div></div>
      <form className="create_user_form" onSubmit={submit}>
        <img className="create_user_logo" src={title} alt="" />
        <input
          className="create_user_input"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          type="text"
          placeholder="Username"
          id="un"
        />
        <input
          className="create_user_input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          type="text"
          id="pass"
        />
        <div>
          <button className="create_user_buttons" type="submit">
            Create Account
          </button>
        </div>
        {warning && <div className="create_user_warning">{warning}</div>}
      </form>
    </div>
  );
}

export default CreateUser;
