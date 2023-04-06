import axios from "axios";
import useNotifications from "../hooks/useNotifications";
import { v4 } from "uuid";
import useAuth from "../hooks/useAuth";

function WalletButton({ icon, name, enable, isEnabled, setModalState }) {
    const { notifDispatch } = useNotifications();
    const { user } = useAuth();

    const clickFunc = async (e) => {
        e.preventDefault();
        // Retrieve wallet addres and prompt user to connect wallet to site if not already...
        let addr = await window.getWalletAddress({ enable, isEnabled });
        axios({
            method: 'post', url: 'https://wallet-auth.vtsxcode.xyz/init',
            data: { "address": addr }
        }).then(async (res) => {
            // Prompt user to sign data with wallet...
            let signed = await window.signData({ enable, isEnabled }, "Verify wallet: " + res.data.data);
            let session = user.nakamaSession;

            // Send signed data, wallet name and session data to enpoint for wallet verification...
            axios({ method: 'post', url: 'https://wallet-auth.vtsxcode.xyz/sign', data: { signedData: signed, wallet: name, session: session } }).then(async (res) => {
                notifDispatch({
                    type: "ADD_NOTIFICATION",
                    payload: {
                        id: v4(),
                        code: "success",
                        message: "Wallet successfully verified"
                    }
                });
                // Disable modal...
                setModalState(false);
            }).catch((err) => {
                notifDispatch({
                    type: "ADD_NOTIFICATION",
                    payload: {
                        id: v4(),
                        code: "error",
                        message: "Error wallet not verified"
                    }
                });
                // Disable modal...
                setModalState(false);
            });
        }).catch((err) => {
            notifDispatch({
                type: "ADD_NOTIFICATION",
                payload: {
                    id: v4(),
                    code: "error",
                    message: "Error verification could not be initiated"
                }
            });
            // Disable modal...
            setModalState(false);
        });
    }

    return (
        <button className="walletbtn" onClick={(e) => clickFunc(e)}>
            <img src={icon} className="walleticon" alt=""></img>
        </button>
    );
}

export default WalletButton;
