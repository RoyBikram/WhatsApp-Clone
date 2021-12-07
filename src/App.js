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
import { SetMessages } from "./redux/Messages/MessagesAction";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { db } from "./firebase/firebase";
import React, { useEffect } from "react";

function App({
    SetCurrentUser,
    SetFriendsData,
    UserUid,
    FriendsData,
    SetSearchData,
    SetMessagesData,
}) {

    //* All the firebase connection breaker initialization

    let UnsubscribeFromSearchData = null;
    let UnsubscribeFromFriendsData = null;

    // * Fetch user data from firebase for search field

    const FetchSearchData = async () => {
        const SearchData = {};
        const q = collection(db, "Users");
        UnsubscribeFromSearchData = onSnapshot(q, (querySnapshot) => {
            querySnapshot.forEach((doc) => {
                SearchData[doc.id] = doc.data();
            });

            SetSearchData(SearchData);
        });
    };

    // * Fetch friends data from firebase for the sidebar MessageOverview

    const FetchFriendsData = async () => {
        // const FriendsData = {};

        try {
            // const Friend =[]
            const colRef = collection(db, `Users/${UserUid}/Friends`);
            let q = query(colRef, orderBy("LastActive" ,'desc'));
            UnsubscribeFromFriendsData = onSnapshot(q, (querySnapshot) => {
                const FriendsData = {};
                querySnapshot.forEach((doc) => {
                    // FriendsData[doc.id] = {
                    //     // Messages:[]
                    // };
                    FriendsData[doc.id] = doc.data();
                    // added
                    // Friend.push(doc.id)
                });
                // console.log(FriendsData)
                SetFriendsData(FriendsData);
                // console.log(Friend)
                // SetFriendsUid(Friend)
            });
        } catch (error) {
            console.log("Error in MessageSection", error.message);
        }
    };

    useEffect(() => {
        // console.log(FriendsData);
        // const FriendsD = FriendsData
        const FriendsUidArr = Object.keys(FriendsData);
        if (FriendsUidArr.length > 0) {
            const MessagesData = {};
            FriendsUidArr.forEach((each, index) => {
                const MessageLocation = FriendsData[each]?.MessageLocation;
                let UnsubscribeFromMessageData = null;

                let colRef = collection(
                    db,
                    `MessagesStore/${MessageLocation}/Messages`
                );
                let q = query(colRef, orderBy("Time"));
                UnsubscribeFromMessageData = onSnapshot(q, (querySnapshot) => {
                    const Data = [];
                    querySnapshot.forEach((doc) => {
                        Data.push(doc.data());
                    });
                    MessagesData[each] = {};
                    MessagesData[each].Message = Data;
                    SetMessagesData(MessagesData);
                });
            });
        }

        return () => {};
    }, [Object.keys(FriendsData).length,SetMessagesData]);

    useEffect(() => {
    let UnsubscribeFromAuth = null;
        UnsubscribeFromAuth = getAuth().onAuthStateChanged((User) => {
            SetCurrentUser(User);
        });
        FetchSearchData();
        return () => {
            UnsubscribeFromAuth();
            UnsubscribeFromSearchData();
        };
    }, [UserUid]);

    useEffect(() => {
        FetchFriendsData();
        return () => {
            UnsubscribeFromFriendsData();
        };
    }, [UserUid]);

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
    SetMessagesData: (MessagesData) => {
        dispatch(SetMessages(MessagesData));
    },
});
const mapStateToProps = (state) => ({
    UserUid: state.User.CurrentUser?.uid,
    FriendsData: state.FriendsData.FriendsData,
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
