import React, { useState, useEffect } from "react";

function SettingsOptions({set_state, curr_state}) {
    return (
        <div className="settingsOptions">
            <SettingsOptionBtn button_text={"Account"} state_name={"Account"} set_state={set_state} curr_state={curr_state}/>
            <SettingsOptionBtn button_text={"Profile"} state_name={"Profile"} set_state={set_state} curr_state={curr_state}/>
            <SettingsOptionBtn button_text={"Wallets"} state_name={"Wallets"} set_state={set_state} curr_state={curr_state}/>
            <SettingsOptionBtn button_text={"Inventory"} state_name={"Inventory"} set_state={set_state} curr_state={curr_state}/>
        </div>
    );
}

const SettingsOptionBtn = ({button_text, state_name, set_state, curr_state}) => {
    const [active, setActive] = useState(false);

    useEffect(() => {
        if (curr_state === state_name) {
            setActive(true);
        }
        else {
            setActive(false);
        }
    }, [curr_state])
    
    const func = (state) => {
        set_state(state);
    }
    return (
        <>
            <button className={active ? "settingsOptionbtn active" : "settingsOptionbtn" } onClick={() => func(state_name)}>{button_text}</button>
        </>
    );
}

export default SettingsOptions;
