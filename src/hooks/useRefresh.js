import useAuth from "./useAuth";
import { nakamaFetch } from "../nakama/nakamaCalls";

const useRefresh = () => {
    const { setAuth, setUserData } = useAuth();

    const refresh = async () => {
        const loggedInUser = JSON.parse(localStorage.getItem("user"));
        console.log("session");
        console.log(loggedInUser.nakamaSession);
        const response = await nakamaFetch(loggedInUser.nakamaSession.token, loggedInUser.nakamaSession.refresh_token, loggedInUser.nakamaSession.created_at);
        
        console.log("nakamaFetch");
        console.log(response);
        
        setAuth({username:response.nakamaSession.username, authToken:response.nakamaSession.token});
        // store nakama data...
        //let userData = {nakamaAccount: response.nakamaAccount, nakamaSession: response.nakamaSession, nakamaClient: response.nakamaClient};
        setUserData(response);
        //localStorage.setItem("user", JSON.stringify(userData));

        console.log("useRefresh called");
        console.log(response);
    }
    return refresh;
}

export default useRefresh;
