import React, { useState } from 'react';
import logo from "../assets/images/primary-Logo.png";
import axios from "axios";
import useNotifications from "../hooks/useNotifications";
import { v4 } from "uuid";

function ForgotPassword() {
  
    const { notifDispatch } = useNotifications();

    const [details, setDetails] = useState({
        username: ""
    });

    const resetPassword = (e) => {
        e.preventDefault();
        console.log("calling resetPassword");
        const axiosInstance = axios.create({baseURL: "https://email-auth.vtsxcode.xyz"});
        axiosInstance.post("/reset", {}, {
            headers: {
                "Content-Type": "application/json",
                "username": details.username
            }
        }).then(()=> {
            notifDispatch({
                type: "ADD_NOTIFICATION",
                payload: {
                    id: v4(),
                    code: "success",
                    message: "Password reset successfully sent"
                }
            });
        }).catch((err) => {
            notifDispatch({
                type: "ADD_NOTIFICATION",
                payload: {
                    id: v4(),
                    code: "error",
                    message: "Error sending reset request"
                }
            });
        });
    }
    return (
        <div>
            <div>
                <img src={logo} alt="Primary Logo" className="primaryLogo" />;
                <form className="form" onSubmit={resetPassword}>
                    <label htmlFor="username">Username</label>
                    <input type="text" name="username" id="username" onChange={(e) =>
                        setDetails({...details, username: e.target.value})}/>
                    <input type="submit" value="Submit"/>
                </form>
            </div>
        </div>
    )
}

export default ForgotPassword;
