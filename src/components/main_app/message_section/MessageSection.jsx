import React from "react";
import "./MessageSectionStyle.scss";
import Avatar from "../../commons/Avatar/Avatar";
import Message from "./Message/Message";
import { ReactComponent as SearchIcon } from "../../../assets/icons/search.svg";
import { ReactComponent as DotsIcon } from "../../../assets/icons/dots.svg";
import { ReactComponent as EmojiIcon } from "../../../assets/icons/emoji.svg";
import { ReactComponent as DocumentIcon } from "../../../assets/icons/document.svg";
import { ReactComponent as MicIcon } from "../../../assets/icons/mic.svg";
import { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";

import {
    collection,
    onSnapshot,
    query,
    orderBy,
    addDoc,
    doc,
    getDoc,
    serverTimestamp,
} from "firebase/firestore";
import { db, GetDataFromUid } from "../../../firebase/firebase";

// To scroll into view the message

const AlwaysScrollToBottom = () => {
    const elementRef = useRef();
    useEffect(() => elementRef.current.scrollIntoView());
    return <div ref={elementRef} />;
};

function MessageSection({ UserUid, ActiveFriendUid,FriendsData }) {
    const [Input, setInput] = useState("");
    const [MessageArray, SetMessageArray] = useState([]);
    const [MessageLocationId, SetMessageLocationId] = useState(null);
    const [ActiveUserData, SetActiveUserData] = useState(null);
    const [LastMessage, SetLastMessage] = useState('')
    useEffect(() => {
        // setTimeout(() => {
        // console.log(FriendsData)
        // console.log(ActiveFriendUid)
        // }, 5000);
        if (Object.keys(FriendsData).length !== 0) {
            
            SetMessageLocationId(FriendsData[ActiveFriendUid].MessageLocation)
        }
        GetActiveUserData();
        // if (MessageLocationId !== null) {
        //     let colRef = collection(
        //         db,
        //         `MessagesStore/${MessageLocationId}/Messages`
        //     );
        //     let q = query(colRef, orderBy("Time"));
        //     UnsubscribeFromMessageData = onSnapshot(q, (querySnapshot) => {
        //         const Data = [];
        //         querySnapshot.forEach((doc) => {
        //             Data.push(doc.data());
        //         });
        //         SetMessageArray(Data);
        //     });
        //     return () => {
        //         UnsubscribeFromMessageData();
        //     };
        // }
    }, [ActiveFriendUid,FriendsData]);

    useEffect(() => {
    let UnsubscribeFromMessageData = null;

        if (MessageLocationId !== null) {
            let colRef = collection(
                db,
                `MessagesStore/${MessageLocationId}/Messages`
            );
            let q = query(colRef, orderBy("Time"));
            UnsubscribeFromMessageData = onSnapshot(q, (querySnapshot) => {
                const Data = [];
                querySnapshot.forEach((doc) => {
                    Data.push(doc.data());
                });
                SetMessageArray(Data);
                SetLastMessage(Data.at(-1))
            });
            return () => {
                //! need to call inside app js
                // UnsubscribeFromMessageData();
            };
        }
        // setTimeout(() => {
        //     console.log(MessageArray)
        // }, 3000)
        // console.log(ActiveUserData)
    }, [MessageLocationId]);


    useEffect(() => {
        console.log(LastMessage.MessageBody)
        return () => {
        }
    }, [LastMessage])

    const GetMessageLocation = async () => {
        if (ActiveFriendUid != null) {
            const docRef = doc(
                db,
                `Users/${UserUid}/Friends/${ActiveFriendUid}`
            );
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                SetMessageLocationId(docSnap.data().MessageLocation);
            } else {
                console.log("No such document!");
            }
        }

        // Added
        
        // let colRef = collection(
        //     db,
        //     `MessagesStore/${MessageLocationId}/Messages`
        // );
        // let q = query(colRef, orderBy("Time"));
        // UnsubscribeFromMessageData = onSnapshot(q, (querySnapshot) => {
        //     const Data = [];
        //     querySnapshot.forEach((doc) => {
        //         Data.push(doc.data());
        //     });
        //     SetMessageArray(Data);
        // });
        // return () => {
        //     UnsubscribeFromMessageData();
        // };
    };

    const HandelSubmit = async (e) => {
        e.preventDefault();
        setInput("");
        await addDoc(
            collection(db, `MessagesStore/${MessageLocationId}/Messages`),
            {
                MessageBody: Input,
                Owner: UserUid,
                Time: serverTimestamp(),
            }
        );
    };

    const GetActiveUserData = async (params) => {
        let Data = null;
        Data = await GetDataFromUid(ActiveFriendUid);
        SetActiveUserData(Data);
    };

    return (
        <div className="MessageSection">
            <div className="Header">
                <Avatar
                    Small={true}
                    ImgUrl={ActiveUserData?.ProfileImg}
                ></Avatar>
                <div className="Container">
                    <div className="TextContainer">
                        <div className="Name">{ActiveUserData?.Name}</div>
                        <div className="LastSeen">7:20pm</div>
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
                <div className="MessageContainer">
                    {
                        
                        MessageArray.map((each, index) => {
                        let OwnMessage = null;
                        if (each.Owner === UserUid) {
                            OwnMessage = true;
                        } else {
                            OwnMessage = false;
                        }
                        return (
                            <Message
                            Timestamp={
                                    each.Time
                                }
                                key={index}
                                OwnMessage={OwnMessage}
                                MessageText={each.MessageBody}
                            ></Message>
                        );
                    })}
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
                        value={Input}
                        onChange={(e) => {
                            setInput(e.target.value);
                        }}
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
    FriendsData:state.FriendsData?.FriendsData
});

export default connect(mapStateToProps)(MessageSection);
