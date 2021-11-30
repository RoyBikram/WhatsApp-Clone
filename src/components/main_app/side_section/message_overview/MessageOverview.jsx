import React from "react";
import "./MessageOverview.scss";
import Avatar from "../../../commons/Avatar/Avatar";
import {connect} from 'react-redux';

function MessageOverview({ FromSearch = false, uid,SearchData }) {
    const UserData = SearchData[uid]

    return (
        <div className="MessageOverview">
            <div className="ProfileContainer">
                <Avatar ImgUrl={UserData?.ProfileImg} className="Avatar"></Avatar>
            </div>
            <div className="TextContainer">
                <div className="NameContainer">
                    <div className="Name">{UserData?.Name}</div>
                    <div className={`Time ${FromSearch ? "DisplayNone" : ""}`}>
                        Monday
                    </div>
                </div>
                <div className={`LastMessage`}>
                    {FromSearch ? UserData?.Email : "Last Message"}
                </div>
            </div>
        </div>
    );
}

const mapStateToProps = (state) => ({
    SearchData: state.SearchData.SearchData
})

export default connect(mapStateToProps)(MessageOverview);
