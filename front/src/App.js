import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'font-awesome/css/font-awesome.css';
import {React, useState} from 'react'
import {CategoryListPage} from "./pages/categorн/CategoryListPage";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import {NavbarComponent} from "./components/NavbarComponent";
import {ArchiveCategoryListPage} from "./pages/categorн/ArchiveCategoryListPage";
import {NotFoundPage} from "./pages/exception/NotFoundPage";
import {LoginPage} from "./pages/auth/LoginPage";
import RequireAuth from "./services/RequireAuth";
import {RegistrationPage} from "./pages/auth/RegistratioinPage";
import {DoneTaskListPage} from "./pages/task/DoneTaskListPage";
import {ToDoTaskListPage} from "./pages/task/ToDoTaskListPage";

function App() {

    const [spinnerCall, showSpinner] = useState(false);

    // console.log(new Date().getTimezoneOffset())

    return (
        <div className="App">
            <NavbarComponent spinnerCall={spinnerCall} />

            <Router>
                <Routes>
                    <Route path='/' element={<RequireAuth><ToDoTaskListPage showSpinner={showSpinner} /></RequireAuth>}/>
                    <Route path='/done-tasks' element={<RequireAuth><DoneTaskListPage showSpinner={showSpinner} /></RequireAuth>}/>
                    <Route path="/categories" element={<RequireAuth><CategoryListPage showSpinner={showSpinner} /></RequireAuth>} />
                    <Route path="/categories/archive" element={<RequireAuth><ArchiveCategoryListPage showSpinner={showSpinner} /></RequireAuth>} />

                    <Route path="*" element={<NotFoundPage />} />
                    <Route path="/sign-in" element={<LoginPage />} />
                    <Route path="/sign-up" element={<RegistrationPage />} />
                    {/*<Route path="/profile" component={<Profile />} />*/}
                </Routes>
            </Router>
        </div>
    );
}

export default App;
