import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'font-awesome/css/font-awesome.css';
import {React, useState} from 'react'
import {TaskListPage} from "./pages/TaskListPage";
import {CategoryListPage} from "./pages/categorylist/CategoryListPage";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import {NavbarComponent} from "./components/NavbarComponent";
import {ArchiveCategoryListPage} from "./pages/categorylist/ArchiveCategoryListPage";
import {NotFoundPage} from "./pages/exception/NotFoundPage";
import {LoginRegistrationPage} from "./pages/LoginRegistrationPage";

function App() {

    const [spinnerCall, showSpinner] = useState(false);

    console.log(new Date().getTimezoneOffset())

    return (
        <div className="App">
            <NavbarComponent spinnerCall={spinnerCall} />

            <Router>
                <Routes>
                    <Route path="/" element={<TaskListPage showSpinner={showSpinner} />} />
                    <Route path="/categories" element={<CategoryListPage showSpinner={showSpinner} />} />
                    <Route path="/categories/archive" element={<ArchiveCategoryListPage showSpinner={showSpinner} />} />
                    <Route path="/sign-in" element={<LoginRegistrationPage isRegistration={false}/>} />
                    <Route path="/sign-up" element={<LoginRegistrationPage isRegistration={true}/>} />
                    <Route path="*" element={<NotFoundPage />} />
                </Routes>
            </Router>
        </div>
    );
}

export default App;
