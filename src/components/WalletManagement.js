import react, { useState, useEffect } from "react";
import useAuth from "../hooks/useAuth";
import axios from "axios";
import WalletManagementButton from "../components/WalletManagementButton";
import { v4 } from "uuid";

function WalletManagement() {
    const { user } = useAuth();
    const [addresses, setAddresses] = useState([]);

    const getwallets = async () => {
        let session = user.nakamaSession;
        axios({ method: 'post', url: 'https://wallet-auth.vtsxcode.xyz/getwallets', data: { session: session } }).then((response) => {
            if (response.status === 200) {
                setAddresses(response.data);
            }
        });
    }
    
    useEffect(() => {
        getwallets();
    }, []);

    return (
        <div className="test">
            <p> Wallet Management </p>
            {addresses.map(el => {return <WalletManagementButton key={v4()} address={el}/>})}
        </div>
    );
}

export default WalletManagement;
