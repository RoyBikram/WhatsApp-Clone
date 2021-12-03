import React, {useEffect, useState} from "react";
import "./MessageOverview.scss";
import Avatar from "../../../commons/Avatar/Avatar";
import { connect } from 'react-redux';
import {GetDataFromUid} from '../../../../firebase/firebase'

function MessageOverview({ uid,HandelClick,ActiveFriendUid }) {
    // let UserData = {};
    const [UserData, SetUserData] = useState({});

    const GetUserData = async (params) => {
        let Data = null;
        Data = await GetDataFromUid(uid)
            SetUserData(Data)
    }

    useEffect(() => {
        GetUserData()
    },[uid])
    
    

    return (
        <div onClick={() => {
            HandelClick(uid)
        }} className={`MessageOverview ${(ActiveFriendUid===uid)?'Active':''}`}>
            <div className="ProfileContainer">
                <Avatar ImgUrl={UserData?.ProfileImg} className="Avatar"></Avatar>
            </div>
            <div className="TextContainer">
                <div className="NameContainer">
                    <div className="Name">{UserData?.Name}</div>
                    <div className={`Time`}>
                        Monday
                    </div>
                </div>
                <div className={`LastMessage`}>
                    Last Message
                </div>
            </div>
        </div>
    );
}

const mapStateToProps = (state) => ({
    SearchData: state.SearchData.SearchData,
    ActiveFriendUid: state.FriendsData.ActiveFriend,
})

export default connect(mapStateToProps)(MessageOverview);
