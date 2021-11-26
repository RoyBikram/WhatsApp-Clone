import React from 'react';
import './MessageStyle.scss';

function Message({OwnMessage, MessageText}) {
    return (
        <div className={`Message ${OwnMessage?'OwnMessage':''}`} >
            <div className="Arrow"></div>
             {MessageText}
            <div className="Time">7:20 pm</div>
        </div>
     );
}

export default Message;