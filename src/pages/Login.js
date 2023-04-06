import React, { useState } from 'react';
import LoginForm from '../components/LoginForm';
import axios from 'axios';
import {useNavigate, useLocation} from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import logo from "../assets/images/primary-Logo.png";
import useNotifications from "../hooks/useNotifications";
import { v4 } from "uuid";

import useRefresh from "../hooks/useRefresh";

function Login() {
    const refresh = useRefresh();
    const { notifDispatch } = useNotifications();
    const [error, setError] = useState("");
    const nav = useNavigate();
    const loc = useLocation();
    const from = loc.state?.from?.pathname || "/";
    const {setAuth, setUserData} = useAuth();

    const LoginFunc = async(details) => {
        const axiosInstance = axios.create({baseURL: 'https://email-auth.vtsxcode.xyz'});
        await axiosInstance.post('/login', {}, {headers: {'Content-Type': 'application/json', email: details.email, payload: details.password}}).then(async(result) => {
          setAuth({username: result.data.username, authToken: result.data.token});

          refresh();
          // get nakama data...
          let nakamaClient = await new window.nakamajs.Client("defaultkey", "server.vtsxcode.xyz", "", true);
          let nakamaSession = await new window.nakamajs.Session(result.data.token, result.data.refresh_token, result.data.created);
          let nakamaAccount = await nakamaClient.getAccount(nakamaSession);
          let nakamaSocket = await nakamaClient.createSocket(true);
          nakamaSession = await nakamaSocket.connect(nakamaSession);

          // store nakama data...
          let userData = {nakamaAccount: nakamaAccount, nakamaSession: nakamaSession, nakamaClient:nakamaClient, nakamaSocket: nakamaSocket};
          setUserData(userData);
          localStorage.setItem("user", JSON.stringify(userData));
          // go back to desired page...
          nav(from, {replace: true});
          
        }).catch(err => {
            console.log(err);
            notifDispatch({
                type: "ADD_NOTIFICATION",
                payload: {
                    id: v4(),
                    code: "error",
                    message: "Invalid email or password"
                }
            });
        });
    }

  return (
    <div>
      <div>
        <img src={logo} alt="Primary Logo" className="primaryLogo" />;
        <LoginForm LoginProp={LoginFunc} ErrorProp={error} />
      </div>
    </div>
  );
}

export default Login;
