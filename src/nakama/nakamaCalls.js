const serverKey = "defaultkey";
const nakamaURL = "server.vtsxcode.xyz";

export const nakamaFetch = async(token, refresh_token, created) => {
    // get nakama data...
    try {
        let nakamaClient = await new window.nakamajs.Client(serverKey, nakamaURL, "", true);
        let nakamaSession = await new window.nakamajs.Session(token, refresh_token, created);
        let nakamaAccount = await nakamaClient.getAccount(nakamaSession);
        let nakamaSocket = await nakamaClient.createSocket(true);
        nakamaSession = await nakamaSocket.connect(nakamaSession);

        // store nakama data...
        let userData = {nakamaAccount: nakamaAccount, nakamaSession: nakamaSession, nakamaClient:nakamaClient, nakamaSocket: nakamaSocket};

        return userData;
    }
    catch(err) {
        console.log(err);
        return null;
    }
};
