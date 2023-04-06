import React, { useState, useEffect } from "react";
import "../App.css";

function Notification({notifDispatch, id, code, message}) {
    const [exit, setExit] = useState(false);
    const [width, setWidth] = useState(0);
    const [intervalID, setIntervalID] = useState(undefined);

    const startTimer = () => {
        const id = setInterval(() => {
            setWidth((prev) => {
                if (prev < 100) return prev + 0.5;
                closeNotification();
                return prev;
            })
        }, 20);
        setIntervalID(id);
    };
    
    const closeNotification = () => {
        pauseTimer();
        setExit(true);
        setTimeout(() => {
            notifDispatch({
                type: "REMOVE_NOTIFICATION",
                id: id
            });
        }, 400);
    }

    const pauseTimer = () => {
        clearInterval(intervalID);
    };

    useEffect(() => {
        console.log("starting timer");
        startTimer();
    }, []);

    return ( 
        <div onMouseEnter={pauseTimer} onMouseLeave={startTimer} className={`notification-card ${code} ${exit ? 'exit' : ''}`}>
            <p>{message}</p>
            <div className="time-bar" style={{width: `${width}%`}}/>
        </div>
    );
};

export default Notification;
