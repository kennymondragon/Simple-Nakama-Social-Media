import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const RequireAuth = () => {
    const { auth } = useAuth();
    const loc = useLocation();
    return (
        (auth?.username && auth?.authToken) ? <Outlet/> : <Navigate to="/login" state={{from: loc}} replace/>
    );
};

export default RequireAuth;