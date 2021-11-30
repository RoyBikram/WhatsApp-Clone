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
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "./firebase/firebase";
import React, { Component } from "react";

class App extends Component {
    UnsubscribeFromAuth = null;
    UnsubscribeFromSearchData = null;
    componentDidMount() {
        this.UnsubscribeFromAuth = getAuth().onAuthStateChanged((User) => {
            this.props.SetCurrentUser(User);
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
        this.props.SetSearchData(SearchData)
        });
    };

    componentWillUnmount() {
        this.UnsubscribeFromAuth();
        this.UnsubscribeFromSearchData();
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
});

export default connect(null, mapDispatchToProps)(App);
