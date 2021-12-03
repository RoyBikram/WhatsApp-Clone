import React, {useState, useEffect} from "react";
import "./SideSectionStyle.scss";
import Avatar from "../../commons/Avatar/Avatar";
import { ReactComponent as StatusIcon } from "../../../assets/icons/status.svg";
import { ReactComponent as MessageIcon } from "../../../assets/icons/message.svg";
// import { ReactComponent as DotsIcon } from "../../../assets/icons/dots.svg";
import { ReactComponent as SearchIcon } from "../../../assets/icons/search.svg";
import { ReactComponent as LogoutIcon } from "../../../assets/icons/logout.svg";
import MessageOverview from "./message_overview/MessageOverview";
import MessageOverviewList from './message_overview_list/MessageOverviewList'
import SearchResultItem from "./search_result_item/SearchResultItem.jsx";
import { connect } from "react-redux";
import {SetActiveFriend} from '../../../redux/Friends/FriendsAction'
import { SignOutFromApp,CreateMessageStore,AddToYourFriend } from '../../../firebase/firebase'
import Search from './search_bar/Search'

const HandelDotsIconClick = () => {
    SignOutFromApp()
}



// const 

function SideSection({ ImgUrl, SearchData, UserUid, FriendsData, SetActiveFriend }) {
    // console.log(FriendsData)
    const [SearchState, SetSearchState] = useState(false)
    const [FilteredArray, SetFilterArray] = useState([])
    // const [FriendList, SetFriendList] = useState(Object.keys(FriendsData))
    // console.log(SearchData)

    // useEffect(() => {
    //     SetFriendList(Object.keys(FriendsData))
    // }, [FriendsData])


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
        } else {
            ResultArray = []
        }
        SetFilterArray(ResultArray)
        
    }

    const HandelSearchSubmit = (e) => {
        e.preventDefault();
        // console.log(FilteredArray)
        // SetSearchState()
    }

    const HandelInputFocus = (e) => {
        SetSearchState(true)
    }

    // !TODO Need to implement a close button
    const HandelInputBlur = (e) => {
        setTimeout(() => {
            SetSearchState(false)
            e.target.value = '';
            HandelInputValueChange(e)
        },300);
    }

    const HandelMessageOverviewClick = (Uid) => {
        SetActiveFriend(Uid)
    }

    const HandelSearchResultItemClick = async (Uid) => {
        if (Object.keys(FriendsData).includes(Uid)) {
            SetActiveFriend(Uid)
        } else {
            const MessageLocationId = await CreateMessageStore(UserUid)
            AddToYourFriend(UserUid,Uid,MessageLocationId)
            // SetFriendList(Object.keys(FriendsData))
            SetActiveFriend(Uid)
        }
        // console.log('work')
        
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
            <Search HandelSearchSubmit={HandelSearchSubmit} HandelInputFocus={HandelInputFocus} HandelInputBlur={HandelInputBlur} HandelInputValueChange={HandelInputValueChange} SearchState={SearchState} ></Search>
            {/* <div className="MessageOverviewList">
                {  (SearchState)?FilteredArray.map((uid,index) => {
                        return <SearchResultItem HandelClick={HandelSearchResultItemClick} uid={uid} key={index}></SearchResultItem>
                    }):FriendList.map((uid,index) => {
                        return <MessageOverview HandelClick={HandelMessageOverviewClick} uid={uid} key={index}></MessageOverview>
                    })
                }
            </div> */}
            <MessageOverviewList
                SearchState={SearchState}
                FilteredArray={FilteredArray}
                // SearchResultItem={SearchResultItem}
                HandelSearchResultItemClick={HandelSearchResultItemClick}
                // FriendList={FriendList}
                // MessageOverview={MessageOverview}
                HandelMessageOverviewClick={HandelMessageOverviewClick}
            ></MessageOverviewList>
        </div>
    );
}

const mapStateToProps = (state) => ({
    ImgUrl: state.User.CurrentUser?.photoURL,
    SearchData: state.SearchData.SearchData,
    UserUid: state.User.CurrentUser?.uid,
    FriendsData: state.FriendsData?.FriendsData
});
const mapDispatchToProps = (dispatch) => ({
    SetActiveFriend: (Uid) => {
        dispatch(SetActiveFriend(Uid)) 
    }
})
export default connect(mapStateToProps,mapDispatchToProps)(SideSection);
