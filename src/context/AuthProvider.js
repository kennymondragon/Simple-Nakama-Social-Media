import { createContext, useState, useReducer, useEffect } from 'react';

// create authentication contect to be shared across all sub components...
const authContext = createContext({});

// authProvider will accept children and pass auth, setAuth, persist, and setPersist to them...
export const AuthProvider = ({children}) => {
    let [auth, setAuth] = useState({});
    const userData = {
        user: undefined,
        nakamaClient: undefined,
        nakamaAccount: undefined,
        nakamaSession: undefined,
        nakamaSocket: undefined
    }
    const [user, setUserData] = useReducer((user, newUserData) => ({ ...user, ...newUserData}), userData); 
    
    let [persist, setPersist] = useState(JSON.parse(localStorage.getItem('persist')) || true);

    // check to see if user has logged in before...
    useEffect(() => {
        const loggedInUser = localStorage.getItem("user");
        console.log("Logged In User");
        console.log(loggedInUser);
    }, []);

    return (
        <authContext.Provider value={{auth, setAuth, persist, setPersist, user, setUserData}}>
            {children}
        </authContext.Provider>
    );
}

export default authContext;
