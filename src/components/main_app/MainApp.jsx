import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import "./MainAppStyle.scss";
import MessageSection from "./message_section/MessageSection";
import SideSection from "./side_section/SideSection";
import { connect } from 'react-redux'
import HomeSection from './home_section/HomeSection'

function MainApp({User,ActiveFriendUid}) {
    const navigate = useNavigate();
    
    useEffect(() => {
        if (!User) {
            navigate("/start_page");
        }
    }, [User,navigate]);
    return (
        <div className="MainApp">
            <SideSection></SideSection>
            {
                (ActiveFriendUid)?<MessageSection></MessageSection>:<HomeSection></HomeSection>
            }
            
        </div>
    );
}


const mapStateToProps = (state) => ({
    User: state.User.CurrentUser,
    ActiveFriendUid: state.FriendsData.ActiveFriend
})

export default connect(mapStateToProps)(MainApp);

