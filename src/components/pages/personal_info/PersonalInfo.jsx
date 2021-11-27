import React from "react";
import "./PersonalInfoStyle.scss";
// import Profile from "../../../assets/img/message_body_bg.png";
import { useNavigate } from "react-router-dom";

export default function PersonalInfo() {

    let navigate = useNavigate();

    const HandelSubmit = (e) => {
        e.preventDefault();
        navigate("/");
    };

    return (
        <div className="PersonalInfo">
            <form onSubmit={HandelSubmit} className="Container">
                <div className="Heading">Personal Info</div>
                <div className="ProfileContainer">
                    <button className="HoverButton">Upload</button>
                    <img
                        className="Profile"
                        src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=464&q=80"
                        alt=""
                    />
                </div>
                <div className="Description">Upload your profile</div>
                <input
                    required="required"
                    type="text"
                    className="InputName"
                    placeholder="Enter your name"
                />
                    <button type="submit" className="FinishedButton">
                        Finished
                    </button>
            </form>
        </div>
    );
}
