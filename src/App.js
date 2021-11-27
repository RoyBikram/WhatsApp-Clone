import "./App.css";
import MainApp from "./components/main_app/MainApp";
import StartPage from "./components/pages/start_page/StartPage";
import EnterNumber from "./components/pages/enter_number/EnterNumber";
import VerifyNumber from "./components/pages/verify_number/VerifyNumber";
import PersonalInfo from "./components/pages/personal_info/PersonalInfo";
import { Routes, Route } from "react-router-dom";

function App() {
    return (
        <div className="App">
            <Routes>
                <Route exact path="/" element={<MainApp/>} />
                <Route exact path="/start_page" element={<StartPage/>} />
                <Route
                    exact
                    path="/enter_number_page"
                    element={<EnterNumber/>}
                />
                <Route
                    exact
                    path="/verify_number_page"
                    element={<VerifyNumber/>}
                />
                <Route
                    exact
                    path="/personal_info_page"
                    element={<PersonalInfo/>}
                />
                <Route
                    exact
                    path="*"
                    element={<h1>No Page</h1>}
                />
            </Routes>
        </div>
    );
}

export default App;
