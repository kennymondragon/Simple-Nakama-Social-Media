import React, { useState } from "react";
import useAuth from "../hooks/useAuth";
import SettingsOptions from "../components/SettingsOptions";
import useNotifications from "../hooks/useNotifications";
import { v4 } from "uuid";
import axios from "axios";
import Modal from "../components/Modal";
import AddWallets from "../components/AddWallets";
import WalletContents from "../components/WalletContents";
import WalletManagement from "../components/WalletManagement";


function Settings() {
    const { auth, user} = useAuth();
    const [ settingState, setSettingState ] = useState("Account");
    const { notifDispatch } = useNotifications();
    const [ showModal, setShowModal] = useState(false);

    const toggleModalOn = (e) => {
        e.preventDefault();
        setShowModal(true);
    }
    const toggleModalOff = (e) => {
        e.preventDefault();
        setShowModal(false);
    }

  const resetPassword = () => {
    const axiosInstance = axios.create({
      baseURL: "https://email-auth.vtsxcode.xyz",
    });
    axiosInstance
      .post(
        "/reset",
        {},
        {
          headers: {
            "Content-Type": "application/json",
            username: auth.username,
          },
        }
      )
      .then(() => {
        notifDispatch({
          type: "ADD_NOTIFICATION",
          payload: {
            id: v4(),
            code: "success",
            message: "Password reset successfully sent",
          },
        });
      })
      .catch((err) => {
        notifDispatch({
          type: "ADD_NOTIFICATION",
          payload: {
            id: v4(),
            code: "error",
            message: "Error sending reset request",
          },
        });
      });
  };
  // TODO: need to add nakama request to apply changes to nakama account for users...
  // HACK: Reset Password and Update Account are using addFriendButton css class and will probably need refactoring...
  const renderSettings = () => {
    switch (settingState) {
      case "Account":
        console.log(user);
        return (
          <div className="accountOptionsContainer">
            <h2>{auth.username}</h2>

            <label>Username: </label>
            <input
              type="text"
              name="username"
              id="username"
              defaultValue={auth.username}
            ></input>
            <label>Avatar URL: </label>
            <input
              type="text"
              name="avatarurl"
              id="avatarurl"
              defaultValue={user.nakamaAccount.user.avatar_url}
            ></input>
            <label>Timezone: </label>
            <select id="timezone" name="timezone">
              <option value="CST">CST</option>
              <option value="EST">EST</option>
              <option value="PST">PST</option>
              <option value="PHT">PHT</option>
            </select>
            <button
              className="addFriendButton"
              onClick={() => {
                resetPassword();
              }}
            >
              Reset Password
            </button>
            <button className="addFriendButton">Update Account</button>
          </div>
        );
      case "Profile":
        // NOTE: IDK what to add here :/
        return <p>Profile</p>;
      case "Wallets":
        // TODO: add feature to add cardano wallets via wallet auth system...
        return (
          <div>
            <p>Wallets</p>
        
            <button className="addFriendButton" onClick={toggleModalOn}>Add Wallet</button>
            { showModal ? <Modal handleClose={toggleModalOff} children={<AddWallets setModalState={setShowModal}/>}/> : <></> }
            <WalletManagement />
          </div>
        );
      case "Inventory":
        return (
            <div>
              <WalletContents/>
            </div>
        );
      default:
        break;
    }
  };

  return (
    <div className="wholeSettings">
      <div className="leftSettings">
        <SettingsOptions set_state={setSettingState} curr_state={settingState} />
      </div>
      <div className="rightSettings">
        <div className="rightSettingsContainer">{renderSettings()}</div>
      </div>
    </div>
  );
}

export default Settings;
