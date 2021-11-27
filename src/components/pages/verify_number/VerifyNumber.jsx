import React from "react";
import { useNavigate, Link } from "react-router-dom";
import "./VerifyNumberStyle.scss";

export default function VerifyNumber() {
    let navigate = useNavigate();

    const HandelSubmit = (e) => {
        e.preventDefault();
        navigate("/personal_info_page");
    };

    return (
        <div className="VerifyNumber">
            <form onSubmit={HandelSubmit} className="Container">
                <div className="Heading">Verify your number</div>
                <div className="Description">
                    Enter the OTP sent to <span>+91 9876543210</span> mobile
                    number via SMS
                </div>
                <Link className="WrongNumber" to="/enter_number_page">
                    Wrong number?
                </Link>
                <input
                    required="required"
                    placeholder="__ __ __    __ __ __"
                    type="tel"
                    className="InputOTP"
                    pattern="[0-9]{6}"
                />
                <div className="DownDescription">Enter 6-digit code</div>
                <button type="submit" className="NextButton">
                    Verify Number
                </button>
            </form>
        </div>
    );
}
