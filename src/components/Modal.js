import React from "react";
import Backdrop from "./Backdrop";

const Modal = ({ handleClose, children }) => {
    //const showHideClassName = show ? "modal display-block" : " modal display-none";
    return (
        <Backdrop onClick={handleClose}>
            <div onClick={(e) => e.stopPropagation()} className="modal">
                <button onClick={handleClose}>Close</button>
                {children}
            </div>
        </Backdrop>
    );
};

export default Modal;
