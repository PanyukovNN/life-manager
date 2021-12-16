import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {React} from 'react'
import {Links} from "./components/Links";
import {TaskListPage} from "./pages/TaskListPage";
import {CategoryListPage} from "./pages/categorylist/CategoryListPage";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import {NavbarComponent} from "./components/NavbarComponent";
import {ArchiveCategoryListPage} from "./pages/categorylist/ArchiveCategoryListPage";
import {NotFound} from "./pages/exception/NotFound";

function App() {

    return (
        <div className="App">
            <Links />

            <NavbarComponent />

            <Router>
                <Routes>
                    <Route path="/" element={<TaskListPage />} />
                    <Route path="/categories" element={<CategoryListPage />} />
                    <Route path="/categories/archive" element={<ArchiveCategoryListPage />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </Router>
        </div>
    );
}

export default App;
