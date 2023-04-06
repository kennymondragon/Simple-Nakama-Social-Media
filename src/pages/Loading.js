import React from 'react';
import logo from "../assets/images/primary-Logo.png";
import { IoSyncCircleSharp } from "react-icons/io5";

function Loading() {
  return (
    <div>
       <div>
           <img src={logo} alt="Primary Logo" className="primaryLogo" />;
            <div className="loading-div">
                <button className="loading-btn" disabled>
                    <IoSyncCircleSharp size={150} className="loading-logo"/>
                </button>
            </div>
       </div>
   </div>
  )
}

export default Loading;
