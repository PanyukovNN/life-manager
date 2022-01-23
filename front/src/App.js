import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'font-awesome/css/font-awesome.css';
import {React} from 'react'
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

function App() {

    AlertService.setAlert(useAlert())

    return (
        <div className="App">
            <NavbarComponent />

            <Router>
                <Routes>
                    <Route path='/' element={<RequireAuth><ToDoTaskListPage /></RequireAuth>}/>
                    <Route path='/done-tasks' element={<RequireAuth><DoneTaskListPage /></RequireAuth>}/>
                    <Route path="/categories" element={<RequireAuth><CategoryListPage /></RequireAuth>} />
                    <Route path="/categories/recently-deleted" element={<RequireAuth><RecentlyDeletedCategoryListPage /></RequireAuth>} />

                    <Route path="*" element={<NotFoundPage />} />
                    <Route path="/sign-in" element={<LoginPage />} />
                    <Route path="/sign-up" element={<RegistrationPage />} />
                </Routes>
            </Router>
        </div>
    );
}

export default App;
