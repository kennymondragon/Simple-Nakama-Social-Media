import React, { useState, useEffect, useRef } from "react";
import { Outlet } from "react-router-dom";
import useRefresh from "../hooks/useRefresh";
import useAuth from  "../hooks/useAuth";
import Loading from "../pages/Loading.js";

const PersistantLogin = () => {
    // temp fix to prevent effect from running twice...
    const ranEffect = useRef(false);
    const [isLoading, setIsLoading] = useState(true);
    const refresh = useRefresh();
    const { user } = useAuth();

    useEffect(() => {
        // Temp fix to prevent the useEffect from running twice...
        if (ranEffect.current === false) {
            // verify refresh  
            const verifyRefresh = async () => {
                try {
                    await refresh();
                    console.log("Persistant Login called");
                    console.log(user);
                }
                catch (err) {
                    console.error(err);
                }
                finally {
                    setIsLoading(false);
                }
            }
            !user?.nakamaSession ? verifyRefresh() : setIsLoading(false);
            ranEffect.current = true;
        }
    }, []);

    return (
        <>
            { isLoading ? <Loading/> : <Outlet/> }
        </>
    );
}

export default PersistantLogin;
