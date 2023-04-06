import React, { useState } from "react";
import "../App.css";

function LoginForm({ LoginProp, ErrorProp }) {
  const [details, setDetails] = useState({
    email: "",
    username: "",
    password: "",
  });

  const submitLoginHander = (e) => {
    e.preventDefault();
    LoginProp(details);
  };
  return (
    <form onSubmit={submitLoginHander}>
      <div className="form">
        <h2>Login</h2>
        <div className="infoForm">
          <label htmlFor="email">Email </label>
          <input
            type="text"
            name="email"
            id="email"
            onChange={(e) =>
              setDetails({ ...details, email: e.target.value })
            }
            value={details.email}
          />
        </div>
        <div className="infoForm">
          <label htmlFor="password">Password </label>
          <input
            type="password"
            name="password"
            id="password"
            onChange={(e) =>
              setDetails({ ...details, password: e.target.value })
            }
            value={details.password}
          />
        </div>
        <input type="submit" value="Login" />
        <p>Forget your <a href="/forgot">password</a>? or <a href="/signup">Signup</a></p>
      </div>
    </form>
  );
}

export default LoginForm;
