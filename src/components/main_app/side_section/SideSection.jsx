import React from "react";
import "./SideSectionStyle.scss";
import Avatar from "../../commons/Avatar/Avatar";
import { ReactComponent as StatusIcon } from "../../../assets/icons/status.svg";
import { ReactComponent as MessageIcon } from "../../../assets/icons/message.svg";
// import { ReactComponent as DotsIcon } from "../../../assets/icons/dots.svg";
import { ReactComponent as SearchIcon } from "../../../assets/icons/search.svg";
import { ReactComponent as LogoutIcon } from "../../../assets/icons/logout.svg";
import MessageOverview from "./message_overview/MessageOverview";
import { connect } from "react-redux";
import {SignOutFromApp} from '../../../firebase/firebase'

const HandelDotsIconClick = () => {
    SignOutFromApp()
}
function SideSection({ ImgUrl }) {


    return (
        <div className="SideSection">
            <div className="Header">
                <Avatar ImgUrl={ImgUrl} Small={true}></Avatar>
                <div className="HeaderButtonsContainer">
                    <div className="IconContainer">
                        <StatusIcon className="StatusIcon"></StatusIcon>
                    </div>
                    <div className="IconContainer">
                        <MessageIcon className="MessageIcon"></MessageIcon>
                    </div>
                    <div className="IconContainer">
                        <button onClick={HandelDotsIconClick}>
                            <LogoutIcon className="LogoutIcon"></LogoutIcon>
                        </button>
                    </div>
                </div>
            </div>
            <div className="Search">
                <div className="SearchContainer">
                    <SearchIcon className="SearchIcon"></SearchIcon>
                    <input
                        type="text"
                        className="SearchInput"
                        placeholder="Search freands"
                    />
                </div>
            </div>
            <div className="MessageOverviewList">
                <MessageOverview></MessageOverview>
            </div>
        </div>
    );
}

const mapStateToProps = (state) => ({
    ImgUrl: state.User.CurrentUser?.photoURL,
});
export default connect(mapStateToProps)(SideSection);
