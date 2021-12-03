import React from 'react'
import SearchResultItem from "./../search_result_item/SearchResultItem.jsx";
import MessageOverview from "./../message_overview/MessageOverview";
import { useEffect } from 'react';
import { connect } from 'react-redux';
import { db } from "../../../../firebase/firebase";
import { collection, onSnapshot } from "firebase/firestore";
import { useState } from 'react';
import {SetFriendsData} from '../../../../redux/Friends/FriendsAction'






function MessageOverviewList({ SearchState, FilteredArray, HandelSearchResultItemClick, HandelMessageOverviewClick, UserUid,SetFriendsData, FriendsData }) {
     
    // const [FriendsData, SetFriendsData] = useState({})
    useEffect(() => {
        if (SearchState === false) {
            
            let UnsubscribeFromFriendsData = null;
            let colRef = collection(
                db,
                `Users/${UserUid}/Friends`
            );
            // let q = query(colRef, orderBy("Time"));
            UnsubscribeFromFriendsData = onSnapshot(colRef, (querySnapshot) => {
                const Data = {};
                querySnapshot.forEach((doc) => {
                    Data[doc.id] = doc.data();
                });
                SetFriendsData(Data)
                // console.log(FriendsData)
                // SetMessageArray(Data);
            });
            return () => {
                UnsubscribeFromFriendsData();
            };
        }
    }, [SearchState]);

   

    return (
        <div className="MessageOverviewList">
                {  (SearchState)?FilteredArray.map((uid,index) => {
                        return <SearchResultItem HandelClick={HandelSearchResultItemClick} uid={uid} key={index}></SearchResultItem>
                    }):Object.keys(FriendsData).map((uid,index) => {
                        return <MessageOverview HandelClick={HandelMessageOverviewClick} uid={uid} key={index}></MessageOverview>
                    })
                }
            </div>
    )
}


const mapDispatchToProps = (dispatch) => ({
    SetFriendsData: (FriendsData) => {
        dispatch(SetFriendsData(FriendsData));
    },
});


const mapStateToProps = (state) => ({
    FriendsData: state.FriendsData?.FriendsData,
    UserUid: state.User.CurrentUser?.uid,
})
export default connect(mapStateToProps,mapDispatchToProps)(MessageOverviewList);