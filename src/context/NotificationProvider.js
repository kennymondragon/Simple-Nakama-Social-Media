import React, { createContext, useReducer } from "react";
import { v4 } from "uuid";
import Notification from "../components/Notification";

const notificationContext = createContext({});

export const NotificationProvider = ({children}) => {
    const notifications = [];
    const [notifState, notifDispatch] = useReducer((state, action) => {
        switch(action.type) {
            case "ADD_NOTIFICATION":
                console.log("adding notification");
                return [...state, {...action.payload}];
            case "REMOVE_NOTIFICATION":
                return state.filter((element) => element.id !== action.id);
            default:
                return state;
        }
    }, notifications);

    return (
        <notificationContext.Provider value={{notifDispatch}}>
             <div className="notification-section">
                {
                    notifState.map(element => {
                        return <Notification key={v4()} notifDispatch={notifDispatch} {...element}/>
                    })
                }
            </div>
            {children}
        </notificationContext.Provider>
    );
}

export default notificationContext;
