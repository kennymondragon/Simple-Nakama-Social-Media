import react, { useState } from 'react';
import ContactsBox from './ContactsBox';
import ChatBox from './ChatBox';
import { v4 } from 'uuid';

function ChatOverlay() {
    const [channels, setChannels] = useState([]);

    return (
        <div className='chatOverlay'>
            <div className="chatboxes-container">
                {channels.map(ch => { return <ChatBox key={v4()} channelId={ch}/>})}
            </div>
            <div className='contacts'>
                <ContactsBox addChannel={setChannels}/>
            </div>
        </div>
    );
};

export default ChatOverlay;