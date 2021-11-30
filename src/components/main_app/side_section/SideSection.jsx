import React, {useState} from "react";
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



// const 

function SideSection({ ImgUrl, SearchData,UserUid }) {
    const [FilteredArray, SetFilterArray] = useState([])
    // console.log(SearchData)

    const HandelInputValueChange = (e) => {
        e.preventDefault();
        let ResultArray = []

        if (e.target.value !== '') {
            Object.values(SearchData).forEach((each) => {
                if (each.Name.toLowerCase().includes(e.target.value.toLowerCase())) {
                    if (each.Uid !== UserUid) {
                        
                        ResultArray.push(each.Uid);
                    }
                }
            })
        }
        SetFilterArray(ResultArray)
        
    }

    const HandelSearchSubmit = (e) => {
        e.preventDefault();
        console.log(FilteredArray)
    }

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
                <form onSubmit={HandelSearchSubmit} className="SearchContainer">
                    <SearchIcon className="SearchIcon"></SearchIcon>
                    <input
                        onChange={HandelInputValueChange}
                        required="required"
                        type="text"
                        className="SearchInput"
                        placeholder="Search friends"
                    />
                    <button type='submit'></button>
                </form>
            </div>
            <div className="MessageOverviewList">
                {
                    FilteredArray.map((uid,index) => {
                        return <MessageOverview FromSearch={true} uid={uid} key={index}></MessageOverview>
                    })

                }
            </div>
        </div>
    );
}

const mapStateToProps = (state) => ({
    ImgUrl: state.User.CurrentUser?.photoURL,
    SearchData: state.SearchData.SearchData,
    UserUid: state.User.CurrentUser?.uid
});
export default connect(mapStateToProps)(SideSection);
