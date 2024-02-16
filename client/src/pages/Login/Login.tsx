import React from "react";
import "./Login.css";
import sendData from "../../components/sendData.tsx";
import title from "../../assets/Frost.png";

function LoginUser() {
  const [username, setUsername] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const [warning, setWarning] = React.useState<string>("");
  const submit = async (event: any) => {
    event.preventDefault();
    const query = await sendData(
      { username: username, password: password },
      "/server/login"
    );
    if (query === "Password match") {
      window.location.href = "/";
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
            Login
          </button>
          <a className="login_buttons" href="/newuser">
            Create Account
          </a>
        </div>
        {warning && <div className="login_warning">{warning}</div>}
      </form>
    </div>
  );
}

export default LoginUser;
