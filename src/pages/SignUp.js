import React, { useState } from "react";
import SignUpForm from "../components/SignUpForm";
import axios from "axios";
import logo from "../assets/images/primary-Logo.png";

function SignUp() {
  const [error, setError] = useState("");
  const [code, setCode] = useState(0);

  const SignUpFunc = (details) => {
    const axiosInstance = axios.create({
      baseURL: "https://email-auth.vtsxcode.xyz",
    });
    console.log(
      `email: ${details.email}, username: ${details.username}, payload: ${details.password}`
    );
    axiosInstance
      .post(
        "/signup",
        {},
        {
          headers: {
            "Content-Type": "application/json",
            email: details.email,
            username: details.username,
            payload: details.password,
          },
        }
      )
      .then((result) => {
        console.log(result);
        setCode(result.status);
      });
  };

  return (
    <div>
      <div>
        <img src={logo} alt="Primary Logo" className="primaryLogo" />;
        <SignUpForm SignUpProp={SignUpFunc} ErrorProp={error} /> 
      </div>
    </div>
  );
}

export default SignUp;
