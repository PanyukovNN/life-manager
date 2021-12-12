import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {React} from 'react'
import {Links} from "./components/Links";
import {TaskListPage} from "./pages/TaskListPage";
import {CategoryListPage} from "./pages/CategoryListPage";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import {NavbarComponent} from "./components/NavbarComponent";

function App() {

    return (
        <div className="App">
            <Links />

            <NavbarComponent />

            <Router>
                <Routes>
                    <Route path="/tasks" element={<TaskListPage />} />
                    <Route path="/categories" element={<CategoryListPage />} />
                </Routes>
            </Router>
        </div>
    );
}

export default App;
