import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react'

function App() {
    const [categoryOptions, setCategoryOptions] = useState([<option></option>]);

    useEffect(
        () => {
            const fetchCategories = async () => {
                // запрашиваем список категорий
                const response = await fetch("http://localhost:80/api/category/find-all")
                const data = await response.json();

                // создаем функцию возврата элементов селектора в categoryOptions
                setCategoryOptions(() => {
                    let options = [];
                    data.forEach(category => options.push(
                        <option key={category.name} value={category.name}>{category.name}</option>
                    ));

                    return options;
                });
            }
            fetchCategories();
        },
        []
    );

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
                            {categoryOptions}
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
