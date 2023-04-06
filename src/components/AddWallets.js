import { useState, useEffect } from "react";
import WalletButton from "../components/WalletButton";
import { v4 } from "uuid";

function AddWallets({setModalState}) {
    const [wallets, setWallets] = useState([]);
    useEffect(() => {
        const walletsJson = window.returnWallets();
        let walletArr = [];
        for (const key in walletsJson) {
            walletArr.push(walletsJson[key]);
        }
        
        setWallets(walletArr);
        console.log(walletArr);
    }, []);

    return (
        <div className="walletbtncontainer">
            {wallets.map((wallet) => { return <WalletButton key={v4()} {...wallet} setModalState={setModalState}/>})}
        </div>
    );
};

export default AddWallets;