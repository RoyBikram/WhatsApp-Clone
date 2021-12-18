import React from "react";
import "./MessageSectionStyle.scss";
import Avatar from "../../commons/Avatar/Avatar";
import Message from "./Message/Message";
import { SetActiveFriend } from "../../../redux/Friends/FriendsAction";

import { ReactComponent as SearchIcon } from "../../../assets/icons/search.svg";
import { ReactComponent as DotsIcon } from "../../../assets/icons/dots.svg";
import { ReactComponent as EmojiIcon } from "../../../assets/icons/emoji.svg";
import { ReactComponent as DocumentIcon } from "../../../assets/icons/document.svg";
import { ReactComponent as MicIcon } from "../../../assets/icons/mic.svg";
import { ReactComponent as BackArrowIcon } from "../../../assets/icons/back_arrow.svg";
import { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";

import {
    collection,
    addDoc,
    doc,
    serverTimestamp,
    updateDoc,
} from "firebase/firestore";
import { db } from "../../../firebase/firebase";

//* To scroll into view the message

const AlwaysScrollToBottom = () => {
    const elementRef = useRef();
    useEffect(() => elementRef.current.scrollIntoView());
    return <div ref={elementRef} />;
};

function MessageSection({
    UserUid,
    ActiveFriendUid,
    FriendsData,
    MessagesData,
    SearchData,
    SetActiveFriend
}) {
    const Input = useRef("");
    const [MessageArray, SetMessageArray] = useState(null);
    const [MessageLocationId, SetMessageLocationId] = useState(null);
    const [ActiveUserData, SetActiveUserData] = useState(null);
    // const [LastMessage, SetLastMessage] = useState('')
    let RenderUser = null;
    let DisplayArrow = null;

    const MessageContainerRef = useRef(null);
    const getWidth = () =>
        MessageContainerRef.current
            ? MessageContainerRef.current.clientWidth
            : 0;

    let [MessageMaxWidth, setMessageMaxWidth] = useState(null);

    useEffect(() => {
        const resizeListener = () => {
            setMessageMaxWidth(getWidth());
        };
        setMessageMaxWidth(getWidth());
        window.addEventListener("resize", resizeListener);
        return () => {
            window.removeEventListener("resize", resizeListener);
        };
    }, []);

    useEffect(() => {
        if (Object.keys(FriendsData).length !== 0) {
            SetMessageLocationId(FriendsData[ActiveFriendUid]?.MessageLocation);
        }
        GetActiveUserData();
    }, [ActiveFriendUid, FriendsData]);

    useEffect(() => {
        SetMessageArray(MessagesData);
        return () => {};
    }, [MessagesData, ActiveFriendUid]);

    const HandelSubmit = async (e) => {
        e.preventDefault();
        const value = Input.current.value;
        Input.current.value = "";
        await addDoc(
            collection(db, `MessagesStore/${MessageLocationId}/Messages`),
            {
                MessageBody: value,
                Owner: UserUid,
                Time: serverTimestamp(),
            }
        );

        const refTimeStampUser = doc(
            db,
            `Users/${UserUid}/Friends/${ActiveFriendUid}`
        );

        // Set the "capital" field of the city 'DC'
        await updateDoc(refTimeStampUser, {
            LastActive: serverTimestamp(),
        });
        const refTimeStampFriend = doc(
            db,
            `Users/${ActiveFriendUid}/Friends/${UserUid}`
        );

        // Set the "capital" field of the city 'DC'
        await updateDoc(refTimeStampFriend, {
            LastActive: serverTimestamp(),
        });
        Input.current.value = "";
    };

    const GetActiveUserData = async (params) => {
        let Data = null;
        Data = SearchData[ActiveFriendUid];
        SetActiveUserData(Data);
    };

    const HandelBackButtonClick = () => {
        SetActiveFriend(null)
    }


    return (
        <div className="MessageSection">
            <div className="Header">
                <div className="IconContainer">
                    <BackArrowIcon onClick={HandelBackButtonClick} className="BackArrowIcon"></BackArrowIcon>
                </div>
                <Avatar
                    Small={true}
                    ImgUrl={ActiveUserData?.ProfileImg}
                ></Avatar>
                <div className="Container">
                    <div className="TextContainer">
                        <div className="Name">{ActiveUserData?.Name}</div>
                        {/*//! Needs to implement */}
                        {/* <div className="LastSeen"></div> */}
                    </div>
                    <div className="ButtonsContainer">
                        <div className="IconContainer">
                            <SearchIcon className="SearchIcon"></SearchIcon>
                        </div>
                        <div className="IconContainer">
                            <DotsIcon className="DotsIcon"></DotsIcon>
                        </div>
                    </div>
                </div>
            </div>
            <div className="MessageBody">
                <div ref={MessageContainerRef} className="MessageContainer">
                    {MessageArray == null ? (
                        <div></div>
                    ) : (
                        MessageArray.map((each, index) => {
                            let OwnMessage = null;
                            if (each.Owner === UserUid) {
                                OwnMessage = true;
                            } else {
                                OwnMessage = false;
                            }
                            if (RenderUser === each.Owner) {
                                DisplayArrow = false;
                            } else {
                                RenderUser = each.Owner;
                                DisplayArrow = true;
                            }
                            return (
                                <Message
                                    MessageMaxWidth={MessageMaxWidth}
                                    Timestamp={each.Time}
                                    key={index}
                                    OwnMessage={OwnMessage}
                                    MessageText={each.MessageBody}
                                    DisplayArrow={DisplayArrow}
                                ></Message>
                            );
                        })
                    )}
                    <AlwaysScrollToBottom></AlwaysScrollToBottom>
                </div>
            </div>
            <div className="Footer">
                <div className="LeftButtonsContainer">
                    <div className="IconContainer">
                        <EmojiIcon className="EmojiIcon"></EmojiIcon>
                    </div>
                    <div className="IconContainer">
                        <DocumentIcon className="DocumentIcon"></DocumentIcon>
                    </div>
                </div>

                <form onSubmit={HandelSubmit} action="">
                    <input
                        // value={Input}
                        ref={Input}
                        // onChange={(e) => {
                        //     // setInput(e.target.value);
                        // }}
                        required="required"
                        placeholder="Type a message"
                        type="text"
                        className="TypingAria"
                    />
                    <button className="SubmitButton" type="submit"></button>
                </form>

                <div className="RightButtonsContainer">
                    <div className="IconContainer">
                        <MicIcon className="MicIcon"></MicIcon>
                    </div>
                </div>
            </div>
        </div>
    );
}

const mapStateToProps = (state) => ({
    UserUid: state.User.CurrentUser?.uid,
    ActiveFriendUid: state.FriendsData.ActiveFriend,
    FriendsData: state.FriendsData?.FriendsData,
    SearchData: state.SearchData.SearchData,
    MessagesData:
        state.Messages?.Messages[state.FriendsData.ActiveFriend]?.Message,
});

const mapDispatchToProps = (dispatch) => ({
    SetActiveFriend: (Uid) => {
        dispatch(SetActiveFriend(Uid));
    },
});

export default connect(mapStateToProps,mapDispatchToProps)(MessageSection);
