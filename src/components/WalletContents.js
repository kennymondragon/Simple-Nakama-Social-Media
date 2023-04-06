import React, { useState, useEffect } from 'react';
import useAuth from  "../hooks/useAuth";
import axios from "axios";
import { v4 } from "uuid";

function WalletContents() {
    const { user } = useAuth();
    const [assets, setAssets] = useState([]);
    const [totalAda, setTotalAda] = useState(0);
    const [totalUsd, setTotalUsd] = useState(0);

    useEffect(() => {
        renderAssets();
    }, []);
    useEffect(() => {
        adaToUSD();
    }, [assets]);
    const adaToUSD = async () => {
        axios({method: 'get', url: 'https://api.coingecko.com/api/v3/simple/price?ids=cardano&vs_currencies=usd'}).then((res) => {
            console.log(res.data);
            setTotalUsd(res.data.cardano.usd * totalAda);
        });
    }
    const renderAssets = async () => {
        let session = user.nakamaSession;
        axios({method: 'post', url: 'https://wallet-auth.vtsxcode.xyz/getcontents', data: { session: session }}).then((result) => {
            let returnAssetsComponents = [];
            if (result.status === 200) {
                // Iterate through each wallet user has listed...
                for (let wallet in result.data) {
                    // Iterae through each asset in user wallet...
                    for (let asset in result.data[wallet]) {
                        console.log(result.data[wallet][asset]);
                        // Test to ensure this asset is has a IPFS link and is not just an empty token or native currency...
                        if (result.data[wallet][asset].image !== undefined && result.data[wallet][asset].image.includes('ipfs://')) {
                            // Replace the normal ipfs link with our own public gateway...
                            result.data[wallet][asset].image = result.data[wallet][asset].image.replace('ipfs://', 'https://ipfs.vtsxcode.xyz/ipfs/');
                            returnAssetsComponents.push(result.data[wallet][asset]);
                        }
                        // If asset failed previous test and is not undefined then this most likely has a base64 encoding...
                        else if (result.data[wallet][asset].image !== undefined) {
                            // Attach prefix to notify browser to decode image...
                            result.data[wallet][asset].image = 'data:image/gif;base64,'+result.data[wallet][asset].image;
                            returnAssetsComponents.push(result.data[wallet][asset]);
                        }
                        else if (result.data[wallet][asset].name == "ADA"){
                            setTotalAda((totalAda+result.data[wallet][asset].quantity));
                        }
                    }
                }
            }
            // Write to state variables...
            setAssets(returnAssetsComponents);
        });
    }

    return (
        <>
            <div>
                <p>{totalAda} ADA - {totalUsd} USD</p>
            </div>
            <div className="assetcontainer">
                { assets.map(asset => { return <AssetCard key={v4()} {...asset}/>}) }
            </div>
        </>
    );
}

function AssetCard({name, image, quantity, floor}) {
    return (
        <div className="assetcard">
            <img className="assetimage" src={image} alt=""/>
            <p className="assetname">{name}</p>
            <p className="assetquantity">{quantity}</p>
            <p className="assetquantity">{floor}</p>
        </div>
    );
}

export default WalletContents;
