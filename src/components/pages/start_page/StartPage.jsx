import React from "react";
import "./StartPageStyle.scss";
import { Link } from "react-router-dom";

export default function StartPage() {
    return (
        <div className="StartPage">
            <div className="Container">
                <div className="Heading">Welcome to WhatsApp</div>
                <div className="StartLogo"></div>
                <div className="Footer">
                    <div className="PrivacyText">
                        Read our <span>Privacy Policy</span>. Tap "Agree and
                        continue" to accept the <span>Terms of Service</span>.
                    </div>
                    <Link to="/enter_number_page">
                        <button className="ContinueButton">
                            AGREE AND CONTINUE
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
