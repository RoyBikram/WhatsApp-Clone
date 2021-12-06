import React, { useEffect, useState } from "react";
import "./MessageOverview.scss";
import Avatar from "../../../commons/Avatar/Avatar";
import { connect } from "react-redux";

function MessageOverview({
    uid,
    HandelClick,
    ActiveFriendUid,
    SearchData,
    Messages
}) {
    // console.log(Messages)
    const [UserData, SetUserData] = useState(null);
    const [LastMessage, SetLastMessage] = useState('');
    const [LastTime ,SetLastTime] = useState(null)
    useEffect(() => {
        if (Messages?.length > 0) {
            const Time = new Date(Messages.at(-1)?.Time?.toDate()).toLocaleTimeString("en-US").split(" ");
            const ArrTime = `${Time[0].substring(
                0,
                Time[0].length - 3
            )} ${Time[1].toLowerCase()}`;
            SetLastTime(ArrTime)
        } else {
            SetLastTime('')

        }
    }, [Messages?.length]);

    useEffect(() => {
        console.log('p')
        SetUserData(SearchData[uid]);
    }, [uid]);
    

    useEffect(() => {
        if (Messages?.length > 0) {
            if (Messages.at(-1)?.Owner === uid) {
                SetLastMessage(Messages.at(-1)?.MessageBody)
            } else {
                SetLastMessage(`You: ${Messages.at(-1)?.MessageBody}`)
            }
        } else {
            SetLastMessage('')
        }
    },[Messages?.length,uid])
    return (
        <div
            onClick={() => {
                HandelClick(uid);
            }}
            className={`MessageOverview ${
                ActiveFriendUid === uid ? "Active" : ""
            }`}
        >
            <div className="ProfileContainer">
                <Avatar
                    ImgUrl={UserData?.ProfileImg}
                    className="Avatar"
                ></Avatar>
            </div>
            <div className="TextContainer">
                <div className="NameContainer">
                    <div className="Name">{UserData?.Name}</div>
                    <div className={`Time`}>{LastTime}</div>
                </div>
                <div className={`LastMessage`}>{LastMessage}</div>
            </div>
        </div>
    );
}

const mapStateToProps = (state,props) => ({
    SearchData: state.SearchData.SearchData,
    ActiveFriendUid: state.FriendsData.ActiveFriend,
    Messages: state.Messages.Messages[props.uid]?.Message
});

export default connect(mapStateToProps)(MessageOverview);
