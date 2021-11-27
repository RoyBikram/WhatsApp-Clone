import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import "./MainAppStyle.scss";
import MessageSection from "./message_section/MessageSection";
import SideSection from "./side_section/SideSection";

function MainApp() {
    const [userState, setUserState ] = useState(false)
    const navigate = useNavigate();
    
    useEffect(() => {
        if (!userState) {
            navigate("/start_page");
        }
    }, [userState,navigate]);
    return (
        <div className="MainApp">
            <SideSection></SideSection>
            <MessageSection></MessageSection>
        </div>
    );
}

export default MainApp;
