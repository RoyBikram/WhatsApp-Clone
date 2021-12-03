import React, {useEffect, useState} from "react";
import './SearchResultItem.scss';
import Avatar from "../../../commons/Avatar/Avatar";
import { connect } from 'react-redux';

function SearchResultItem({uid,SearchData,HandelClick }) {
    // let UserData = {};
    const [UserData, SetUserData] = useState({});

    // const GetUserData = (params) => {
    //     let Data = null;
    // }

    useEffect(() => {
        SetUserData(SearchData[uid])   
    },[uid])
    
    

    return (
        <div onClick={() => {
            HandelClick(uid)
        }} className="MessageOverview">
            <div className="ProfileContainer">
                <Avatar ImgUrl={UserData?.ProfileImg} className="Avatar"></Avatar>
            </div>
            <div className="TextContainer">
                <div className="NameContainer">
                    <div className="Name">{UserData?.Name}</div>
                </div>
                <div className={'Email'}>
                    {UserData?.Email}
                </div>
            </div>
        </div>
    );
}

const mapStateToProps = (state) => ({
    SearchData: state.SearchData.SearchData
})

export default connect(mapStateToProps)(SearchResultItem);
