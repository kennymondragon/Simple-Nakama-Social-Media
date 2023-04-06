import react from "react";
import { FiTrash2 } from "react-icons/fi";

function WalletManagementButton({wallet, address}) {

    return(
        <div className="walletmanagementbtn">
            <label>{address}</label>
            <button><FiTrash2 size={32} /></button>
        </div>
    );
}

export default WalletManagementButton;
