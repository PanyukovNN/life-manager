import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {React, useState} from 'react'
import {Links} from "./components/Links";
import {TaskListPage} from "./pages/TaskListPage";
import {CategoryListPage} from "./pages/categorylist/CategoryListPage";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import {NavbarComponent} from "./components/NavbarComponent";
import {ArchiveCategoryListPage} from "./pages/categorylist/ArchiveCategoryListPage";
import {NotFound} from "./pages/exception/NotFound";

function App() {

    const [spinnerCall, showSpinner] = useState(false);

    return (
        <div className="App">
            <Links />

            <NavbarComponent spinnerCall={spinnerCall} />

            <Router>
                <Routes>
                    <Route path="/" element={<TaskListPage showSpinner={showSpinner} />} />
                    <Route path="/categories" element={<CategoryListPage showSpinner={showSpinner} />} />
                    <Route path="/categories/archive" element={<ArchiveCategoryListPage showSpinner={showSpinner} />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </Router>
        </div>
    );
}

export default App;
