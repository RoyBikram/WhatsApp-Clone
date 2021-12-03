import React from "react";
import { useState, useEffect } from "react";
import "./MessageStyle.scss";

function Message({ OwnMessage, MessageText, Timestamp }) {
    const [ArrTime ,SetArrTime] = useState(null)
    useEffect(() => {
        const Time = new Date(Timestamp?.toDate()).toLocaleTimeString("en-US").split(" ");

        const ArrTime = `${Time[0].substring(
            0,
            Time[0].length - 3
        )} ${Time[1].toLowerCase()}`;
        SetArrTime(ArrTime)
    }, [Timestamp]);

    return (
        <div className={`Message ${OwnMessage ? "OwnMessage" : ""}`}>
            <div className="Arrow"></div>
            {MessageText}
            <div className="Time">{ArrTime}</div>
        </div>
    );
}

export default Message;
