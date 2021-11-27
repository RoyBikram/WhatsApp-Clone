import React from "react";
import "./EnterNumberStyle.scss";
import WhatsAppIcon from "../../../assets/img/whatsapp.png";
import { useNavigate } from "react-router-dom";

export default function EnterNumber() {
    let navigate = useNavigate();

    const HandelSubmit = (e) => {
        e.preventDefault();
        navigate("/verify_number_page");
    };

    return (
        <div className="EnterNumber">
            <form onSubmit={HandelSubmit} action="" className="Container">
                <img
                    src={WhatsAppIcon}
                    alt="WhatsApp icon"
                    className="WhatsAppIcon"
                />
                <div className="Heading">Enter your phone number</div>
                <div className="DescriptionText">
                    WhatsApp will need to verify your phone number
                </div>
                <input
                    required="required"
                    placeholder="Enter your number"
                    type="tel"
                    className="InputNumber"
                    pattern="[0-9]{10}"
                />
                <button type="submit" className="NextButton">
                    SEND OTP
                </button>
            </form>
        </div>
    );
}
