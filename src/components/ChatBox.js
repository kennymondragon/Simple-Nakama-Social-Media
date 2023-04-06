import react, { useState, useEffect, useRef } from 'react';
import useAuth from "../hooks/useAuth";
import { AiOutlineSend } from 'react-icons/ai';
import { RiArrowUpSLine, RiArrowDownSLine} from "react-icons/ri";
import audio from '../assets/audio/chime.mp3';

function ChatBox({channelId}) {
    const { user } = useAuth();
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState("");
    const [openedState, setOpenState] = useState(true);
    const chatmessages = useRef();

    const toggleOpenState = () => {
        setOpenState(!openedState);
    }

    useEffect(() => {
        getMessageHistory();
        onMessage();
    }, []);

    useEffect(() => {
        chatmessages.current?.scrollIntoView({ behavior: 'smooth'});
    }, [messages]);

    const onMessage = () => {
        user.nakamaSocket.onchannelmessage = (message) => {
            new Audio(audio).play();
            getMessageHistory();
        };
    }
    const getMessageHistory = async () => {
        const limit = 100;
        const forward = true;

        const result = await user.nakamaClient.listChannelMessages(user.nakamaSession, channelId, limit, forward);
        setMessages(result.messages);
        console.log(result.messages);
    };

    const sendMessage = async () => {
        let data = {message: message};
        const messageAck = await user.nakamaSocket.writeChatMessage(channelId, data);
        setMessage("");
        console.log(messageAck);
        await getMessageHistory();
    };
    return (
        <div className='chatboxes-container'>
            <div className='contactsBoxHeader' onClick={toggleOpenState}>
                {openedState ? <RiArrowDownSLine size={32}/> : <RiArrowUpSLine size={32}/>}
            </div>
            {openedState ? <>
                <div className='chatBoxMessageContainer'>
                    {messages.map(message => {return <ChatMessage key={message.message_id} {...message} this_id={user.nakamaAccount.user.id} />})}
                    <div ref={chatmessages} />
                </div>
                <div className='chatBoxInput'>
                    <input type='text' onChange={(e) => setMessage(e.target.value)}></input>
                    <button onClick={sendMessage}><AiOutlineSend size={20}/></button>
                </div>
            </>
            : <></>}
        </div>
    );
};

export default ChatBox;

function ChatMessage({this_id, sender_id, username, content, create_time}) {
    const compareIds = (this_id == sender_id);
    return (
        <div className={compareIds ? "chatMessage fromMe" : "chatMessage fromThem"}>
            <p>{content.message}</p>
        </div>
    );
}