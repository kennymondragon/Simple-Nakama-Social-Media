import react, { useState, useEffect } from "react";
import useAuth from "../hooks/useAuth";
import { RiArrowUpSLine, RiArrowDownSLine} from "react-icons/ri";
import stupid from "../assets/images/stupid.png";
import { BsFillCircleFill } from "react-icons/bs";

function ContactsBox({addChannel}) {
    const { user } = useAuth();
    const [openedState, setOpenState] = useState(false);
    const [contacts, setContacts] = useState([]); 
    const toggleOpenState = () => {
        setOpenState(!openedState);
    }

    const fetchContacts = async () => {
        let limit = 100;
        let friendshipState = 0;
        let result = await user.nakamaClient.listFriends(user.nakamaSession, friendshipState, limit);
        console.log(result.friends);
        setContacts(result.friends);
    }
    
    useEffect(() => {
        fetchContacts();
    }, [user.nakamaSession]);

    return (
        <>
        {
            user.nakamaSocket ? 
            (
                <div className="contactsbox">
                    <div className="contactsBoxHeader" onClick={toggleOpenState}>
                        {openedState ? <RiArrowDownSLine size={32}/> : <RiArrowUpSLine size={32}/>}
                    </div>
                    {openedState ? <div className="contactsBoxContent">{contacts.map(friend => {return <ChatBoxFriend addChannel={addChannel} userId={friend.user.id} imageURL={friend.user.avatar_url} username={friend.user.username}/>})}</div> : <></>}
                </div>
            )
            : (
                <>
                </>
            )
        }
        </>
    );
}

export default ContactsBox;


function ChatBoxFriend({ addChannel, userId, imageURL, username, online}) {
    const { user } = useAuth();

    const joinChat = async () =>{
        const persistance = true;
        const hidden = false;
        await user.nakamaSocket.joinChat(userId, 2, persistance, hidden).then((res) => {
            console.log(res);
            addChannel([`${res.id}`]);
        }).catch((err) =>{
            console.log(err);
        });
    }
    return (
        <div className="contactsBoxFriendCard" onClick={joinChat}>
            <img className="contactsBoxFriendImg" src={imageURL ? imageURL : stupid} alt=""/>
            <p>{username}</p>
            <BsFillCircleFill/> 
        </div>
    );
}
