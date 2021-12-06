import React, {useEffect} from "react";
import "./LoginPageStyle.scss";
import WhatsAppIcon from "../../../assets/img/whatsapp.png";
import { useNavigate } from "react-router-dom";
import { ReactComponent as GoogleIcon } from "../../../assets/icons/google.svg";
import { LoginWithGoogle,CreateNewUser } from '../../../firebase/firebase'
import { connect } from "react-redux";
import { SetCurrentUser } from '../../../redux/User/UserAction'



function LoginPage({SetCurrentUser,User}) {
    let navigate = useNavigate();

    const HandelSubmit = (e) => {
        e.preventDefault();
        navigate("/verify_number_page");
    };



    useEffect(() => {
        if (User) {
            navigate("/");
        }
    }, [User,navigate]);



    const HandelLoginWithGoogle = async () => {
        
        let User = await LoginWithGoogle()
        SetCurrentUser(User)
        CreateNewUser(User)
        // console.log(User)
        
    };

    return (
        <div className="LoginPage">
            <form onSubmit={HandelSubmit} action="" className="Container">
                <img
                    src={WhatsAppIcon}
                    alt="WhatsApp icon"
                    className="WhatsAppIcon"
                />
                <div className="Heading">Login with your Google account</div>
                <div className="DescriptionText">Google account is needed to identify you and store your data in a secure location.</div>
                <button
                    onClick={HandelLoginWithGoogle}
                    type="button"
                    className="GoogleLoginButton"
                >
                    <GoogleIcon className="GoogleIcon"></GoogleIcon>
                    SIGNUP WITH GOOGLE
                </button>
                <div className="Divider">OR</div>
                <div className="LoginText">Existing user ? 
                <button
                    onClick={HandelLoginWithGoogle}
                    type="button"
                    className="GoogleSignUpButton"
                >
                    Click Here
                    </button>
                    </div>
            </form>
        </div>
    );
}


const mapStateToDispatch = (dispatch) => ({
    SetCurrentUser: (User) => {
        dispatch(SetCurrentUser(User))        
    }  
})

const mapStateToProps = (State) => ({
    User:State.User.CurrentUser
})
export default connect(mapStateToProps, mapStateToDispatch)(LoginPage);
