import logo from './logo.svg';
import './App.css';

function App() {
    return (
        <div className="App">
            <div className="filter-block">
                <div className="filter-block-header">
                    Список задач
                </div>

                <div className="selector-block">
                    <div className="selector-header">
                        Раздел:
                    </div>
                    <div className="selector-wrapper">
                        <select size="1">
                            <option>Работа</option>
                            <option>Домашние дела</option>
                        </select>
                    </div>
                </div>

                <div className="selector-block">
                    <div className="selector-header">
                        За период:
                    </div>
                    <div className="selector-wrapper">
                        <select size="1">
                            <option>День</option>
                            <option>Неделя</option>
                            <option>Месяц</option>
                        </select>
                    </div>
                </div>
            </div>

            <div className="tasks-block">

            </div>
        </div>
    );
}

export default App;
