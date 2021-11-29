import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import "./StartPageStyle.scss";
import { Link } from "react-router-dom";
import {connect} from 'react-redux'

function StartPage({ User }) {
    const navigate = useNavigate();
    
    useEffect(() => {
        if (User) {
            navigate("/");
        }
    }, [User,navigate]);
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
                    <Link to="/login_page">
                        <button className="ContinueButton">
                            AGREE AND CONTINUE
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

const mapStateToProps = (state) => ({
    User:state.User.CurrentUser
})

export default connect(mapStateToProps)(StartPage);