import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import "./MainAppStyle.scss";
import MessageSection from "./message_section/MessageSection";
import SideSection from "./side_section/SideSection";
import { connect } from "react-redux";
import HomeSection from "./home_section/HomeSection";
import { ActiveFriendUidSelector } from "../../redux/Friends/FriendsSelector";

function MainApp({ User, ActiveFriendUid }) {
    const navigate = useNavigate();

    useEffect(() => {
        if (!User) {
            navigate("/start_page");
        }
    }, [User, navigate]);

    // const SideRef = useRef(null);
    const getWidth = () => (window.innerWidth ? window.innerWidth : 0);

    let [WindowWidth, setWindowWidth] = useState(null);

    useEffect(() => {
        const resizeListener = () => {
            // console.log(getWidth())
            setWindowWidth(getWidth());
        };
        // console.log(getWidth())
        setWindowWidth(getWidth());
        window.addEventListener("resize", resizeListener);
        return () => {
            window.removeEventListener("resize", resizeListener);
        };
    }, []);

    return WindowWidth > 670 ? (
        <div className="MainApp">
            <SideSection></SideSection>
            {ActiveFriendUid ? (
                <MessageSection></MessageSection>
            ) : (
                <HomeSection></HomeSection>
            )}
        </div>
    ) : (
        <div className="MainApp">
            {ActiveFriendUid ? (
                <MessageSection></MessageSection>
            ) : (
                <SideSection></SideSection>
            )}
        </div>
    );
}

const mapStateToProps = (state) => ({
    User: state.User.CurrentUser,
    ActiveFriendUid: ActiveFriendUidSelector(state),
});

export default connect(mapStateToProps)(MainApp);
