import React from "react";
import { useState, useEffect } from "react";
import "./MessageStyle.scss";

function Message({ OwnMessage, MessageText, Timestamp, DisplayArrow,MessageMaxWidth }) {
    const [ArrTime ,SetArrTime] = useState(null)
    useEffect(() => {
        if (Timestamp) {
            const Time = new Date(Timestamp?.toDate()).toLocaleTimeString("en-US").split(" ");
    
            const ArrTime = `${Time[0].substring(
                0,
                Time[0].length - 3
            )} ${Time[1].toLowerCase()}`;
            SetArrTime(ArrTime)
        }
    }, [Timestamp]);

    return (
        <div style={{maxWidth:`${(MessageMaxWidth-100)<500?(MessageMaxWidth-100):500}px`}} className={`Message ${OwnMessage ? "OwnMessage" : ""}`}>
            <div className={`Arrow ${DisplayArrow?'':'ArrowNone'}`}></div>
            {MessageText}
            <div className="Time">{ArrTime}</div>
        </div>
    );
}

export default Message;
