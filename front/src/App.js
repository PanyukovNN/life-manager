import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'font-awesome/css/font-awesome.css';
import {React, useEffect} from 'react'
import {CategoryListPage} from "./pages/category/CategoryListPage";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import {NavbarComponent} from "./components/NavbarComponent";
import {RecentlyDeletedCategoryListPage} from "./pages/category/RecentlyDeletedCategoryListPage";
import {NotFoundPage} from "./pages/exception/NotFoundPage";
import {LoginPage} from "./pages/auth/LoginPage";
import {RegistrationPage} from "./pages/auth/RegistratioinPage";
import {DoneTaskListPage} from "./pages/task/DoneTaskListPage";
import {ToDoTaskListPage} from "./pages/task/ToDoTaskListPage";
import {useAlert} from "react-alert";
import * as AlertService from "./services/AlertService";
import RequireAuth from "./services/RequireAuth";
import RedirectAfterAuth from "./services/RedirectAfterAuth";
import {ProfilePage} from "./pages/ProfilePage";
import {NetworkErrorPage} from "./pages/exception/NetworkErrorPage";

function App() {

    AlertService.setAlert(useAlert())

    // useEffect(() => {
    //     fetch("http://back:7000/api/actuator").then(r => console.log(r));
    //     console.log("Hello")
    // }, [])

    return (
        <div className="App">
            <NavbarComponent />

            <Router>
                <Routes>
                    <Route path='/' element={<RequireAuth><ToDoTaskListPage /></RequireAuth>}/>
                    <Route path='/done-tasks' element={<RequireAuth><DoneTaskListPage /></RequireAuth>}/>
                    <Route path="/categories" element={<RequireAuth><CategoryListPage /></RequireAuth>} />
                    <Route path="/categories/recently-deleted" element={<RequireAuth><RecentlyDeletedCategoryListPage /></RequireAuth>} />

                    <Route path="/sign-in" element={<RedirectAfterAuth><LoginPage /></RedirectAfterAuth>} />
                    <Route path="/sign-up" element={<RedirectAfterAuth><RegistrationPage /></RedirectAfterAuth>} />
                    <Route path="/profile" element={<RequireAuth><ProfilePage /></RequireAuth>} />

                    <Route path="*" element={<NotFoundPage />} />
                    <Route path="/network-error" element={<NetworkErrorPage />} />
                </Routes>
            </Router>
        </div>
    );
}

export default App;
