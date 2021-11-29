import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import "./MainAppStyle.scss";
import MessageSection from "./message_section/MessageSection";
import SideSection from "./side_section/SideSection";
import {connect} from 'react-redux'

function MainApp({User}) {
    const navigate = useNavigate();
    
    useEffect(() => {
        if (!User) {
            navigate("/start_page");
        }
    }, [User,navigate]);
    return (
        <div className="MainApp">
            <SideSection></SideSection>
            <MessageSection></MessageSection>
        </div>
    );
}


const mapStateToProps = (state) => ({
    User:state.User.CurrentUser
})

export default connect(mapStateToProps)(MainApp);

