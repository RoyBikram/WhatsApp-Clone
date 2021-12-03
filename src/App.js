import "./App.css";
import MainApp from "./components/main_app/MainApp";
import StartPage from "./components/pages/start_page/StartPage";
import LoginPage from "./components/pages/login_page/LoginPage";
import VerifyNumber from "./components/pages/verify_number/VerifyNumber";
import PersonalInfo from "./components/pages/personal_info/PersonalInfo";
import { Routes, Route } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { connect } from "react-redux";
import { SetCurrentUser } from "./redux/User/UserAction";
import { SetSearchData } from "./redux/Search/SearchAction";
import { SetFriendsData } from "./redux/Friends/FriendsAction";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "./firebase/firebase";
import React, { Component } from "react";

class App extends Component {
    UnsubscribeFromAuth = null;
    UnsubscribeFromSearchData = null;
    UnsubscribeFromFriendsData = null;
    componentDidMount() {
        this.UnsubscribeFromAuth = getAuth().onAuthStateChanged((User) => {
            this.props.SetCurrentUser(User);
            this.FetchFriendsData();
        });
        this.FetchSearchData();
    }

    FetchSearchData = async () => {
        const SearchData = {};

        const q = collection(db, "Users");
        this.UnsubscribeFromSearchData = onSnapshot(q, (querySnapshot) => {
            querySnapshot.forEach((doc) => {
                // console.log(doc.data())
                SearchData[doc.id] = doc.data();
            });
            this.props.SetSearchData(SearchData);
        });
    };

    FetchFriendsData = async () => {
        const FriendsData = {};
        try {
            // console.log(this.props.UserUid)
            const q = collection(db, `Users/${this.props.UserUid}/Friends`);
            this.UnsubscribeFromFriendsData = onSnapshot(q, (querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    
                    FriendsData[doc.id] = doc.data();
                });
                // console.log(FriendsData)
                this.props.SetFriendsData(FriendsData);
            });
        } catch (error) {
            console.log(error.message)
        }
    };

    componentWillUnmount() {
        this.UnsubscribeFromAuth();
        this.UnsubscribeFromSearchData();
        this.UnsubscribeFromFriendsData();
    }

    render() {
        return (
            <div className="App">
                <Routes>
                    <Route exact path="/" element={<MainApp />} />
                    <Route exact path="/start_page" element={<StartPage />} />
                    <Route exact path="/login_page" element={<LoginPage />} />
                    <Route
                        exact
                        path="/verify_number_page"
                        element={<VerifyNumber />}
                    />
                    <Route
                        exact
                        path="/personal_info_page"
                        element={<PersonalInfo />}
                    />
                    <Route exact path="*" element={<h1>No Page</h1>} />
                </Routes>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    SetCurrentUser: (User) => {
        dispatch(SetCurrentUser(User));
    },
    SetSearchData: (SearchData) => {
        dispatch(SetSearchData(SearchData));
    },
    SetFriendsData: (FriendsData) => {
        dispatch(SetFriendsData(FriendsData));
    },
});
const mapStateToProps = (state) => ({
    UserUid: state.User.CurrentUser?.uid,
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
