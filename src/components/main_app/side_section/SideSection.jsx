import React, { useState } from "react";
import "./SideSectionStyle.scss";
import Avatar from "../../commons/Avatar/Avatar";
import { ReactComponent as StatusIcon } from "../../../assets/icons/status.svg";
import { ReactComponent as MessageIcon } from "../../../assets/icons/message.svg";
import { ReactComponent as SearchIcon } from "../../../assets/icons/search.svg";
import { ReactComponent as LogoutIcon } from "../../../assets/icons/logout.svg";
import { ReactComponent as CloseIcon } from "../../../assets/icons/close.svg";
import { connect } from "react-redux";
import { SetActiveFriend } from "../../../redux/Friends/FriendsAction";
import {
    SignOutFromApp,
    CreateMessageStore,
    AddToYourFriend,
} from "../../../firebase/firebase";
import SearchResultItem from "./search_result_item/SearchResultItem.jsx";
import MessageOverview from "./message_overview/MessageOverview";
import { useRef } from "react";
import { useEffect } from "react";
import {ImgUrlSelector} from '../../../redux/User/UserSelector'
import {UserUidSelector} from '../../../redux/User/UserSelector'
import {SearchDataSelector} from '../../../redux/Search/SearchSelector'
import {FriendsUidSelector} from '../../../redux/Friends/FriendsSelector'
import { useCallback } from "react";

// *Function for logout

const HandelDotsIconClick = () => {
    SignOutFromApp();
};

function SideSection({
    ImgUrl,
    SearchData,
    UserUid,
    FriendsData,
    SetActiveFriend,
}) {
    const [SearchState, SetSearchState] = useState(false);
    const [FilteredArray, SetFilterArray] = useState([]);
    const [Friends, SetFriends] = useState(null)
    const SearchInput = useRef({});

    // * Function to track the search input value and change the FilteredArray

    const HandelInputValueChange = (e) => {
        e.preventDefault();
        let ResultArray = [];
        if (e.target.value !== "") {
            Object.values(SearchData).forEach((each) => {
                if (
                    each.Name.toLowerCase().includes(
                        e.target.value.toLowerCase()
                    )
                ) {
                    if (each.Uid !== UserUid) {
                        ResultArray.push(each.Uid);
                    }
                }
            });
        } else {
            ResultArray = [];
        }
        SetFilterArray(ResultArray);
    };

    const HandelInputFocus = (e) => {
        SetSearchState(true);
    };

    const HandelSearchClose = () => {
        SetSearchState(false);
        SearchInput.current.value = "";

        // * Set the FilterArray value to the initial value
        SetFilterArray([]);
    };

    const CallbackHandelMessageOverviewClick = useCallback(
        (Uid) => {
            SetActiveFriend(Uid);
            // const HandelMessageOverviewClick = (Uid) => {
            // }
            
        },
        [],
    )
    // const HandelMessageOverviewClick = (Uid) => {
    //     SetActiveFriend(Uid);
    // };

    const HandelSearchResultItemClick = async (Uid) => {
        if (Object.keys(FriendsData).includes(Uid)) {
            // * If the user is in my friend
            SetActiveFriend(Uid);
        } else {
            // * If the user is not in my friend the add him to my friend
            const MessageLocationId = await CreateMessageStore(UserUid);
            AddToYourFriend(UserUid, Uid, MessageLocationId);
            SetActiveFriend(Uid);
        }
        HandelSearchClose();
    };


    // useEffect(() => {
    //     SetFriends(Object.keys(FriendsData))
    //     // console.log('Frienddata')
    //     return () => {
    //     }
    // }, [FriendsData])

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
                        ref={SearchInput}
                        onFocus={HandelInputFocus}
                        onChange={HandelInputValueChange}
                        required="required"
                        type="text"
                        className="SearchInput"
                        placeholder="Search friends"
                    />
                    <CloseIcon
                        onClick={HandelSearchClose}
                        className={`CloseIcon ${SearchState ? "Opacity" : ""}`}
                    ></CloseIcon>
                    <button type="submit"></button>
                </div>
            </div>
            <div className="MessageOverviewList">
                {SearchState
                    ? FilteredArray.map((uid, index) => {
                          return (
                              <SearchResultItem
                                  HandelClick={HandelSearchResultItemClick}
                                  uid={uid}
                                  key={index}
                              ></SearchResultItem>
                          );
                      })
                    : FriendsData?.map((uid, index) => {
                          return (
                              <MessageOverview
                                  HandelClick={CallbackHandelMessageOverviewClick}
                                  uid={uid}
                                  key={index}
                              ></MessageOverview>
                          );
                      })}
            </div>
        </div>
    );
}

const mapStateToProps = (state) => ({
    // ImgUrl: state.User.CurrentUser?.photoURL,
    // SearchData: state.SearchData.SearchData,
    // UserUid: state.User.CurrentUser?.uid,
    // FriendsData: state.FriendsData?.FriendsData,
    ImgUrl: ImgUrlSelector(state),
    SearchData: SearchDataSelector(state),
    UserUid: UserUidSelector(state),
    FriendsData: FriendsUidSelector(state)
});
const mapDispatchToProps = (dispatch) => ({
    SetActiveFriend: (Uid) => {
        dispatch(SetActiveFriend(Uid));
    },
});
export default connect(mapStateToProps, mapDispatchToProps)(SideSection);
