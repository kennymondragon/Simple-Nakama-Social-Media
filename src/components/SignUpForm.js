import React, { useState } from "react";
import "../App.css";

function SignUpForm({ SignUpProp, ErrorProp }) {
  const [details, setDetails] = useState({
    email: "",
    username: "",
    password: "",
  });

  const submitHander = (e) => {
    e.preventDefault();
    SignUpProp(details);
  };
  return (
    <form onSubmit={submitHander}>
      <div className="form">
        <h2>SignUp</h2>
        {/* ERROR */}
        <div className="infoForm">
          <label htmlFor="email">Email </label>
          <input
            type="text"
            name="email"
            id="email"
            onChange={(e) => setDetails({ ...details, email: e.target.value })}
            value={details.email}
          />
        </div>
        <div className="infoForm">
          <label htmlFor="username">Username </label>
          <input
            type="text"
            name="username"
            id="username"
            onChange={(e) =>
              setDetails({ ...details, username: e.target.value })
            }
            value={details.username}
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
        <input type="submit" value="Signup" />
      </div>
    </form>
  );
}

export default SignUpForm;
