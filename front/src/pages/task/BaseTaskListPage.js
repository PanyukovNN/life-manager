import '../../App.css';
import {React, useEffect, useState} from 'react'
import {PriorityTaskBlocksComponent} from "../../components/tasklist/PriorityTaskBlocksComponent";
import {FiltrationForm} from "../../components/filtrationform/FiltrationFormComponent";

/**
 * Главная страница со списком задачи и формой фильтрации
 *
 * @returns {*} главная страница со списком задач
 * @constructor
 */
export const BaseTaskListPage = ({taskStatus}) => {

    const [refreshTaskListCall, setFiltrationFormRefresh] = useState(0);

    // Функция закрытия всплывающих меню у задач, при клике мышкой вне меню
    useEffect(() => {
        window.onclick = function(event) {
            if (event.target.matches('.dropdown-element')) {
                return;
            }

            let elementsByClassName = document.getElementsByClassName('dropdown-show');

            if (elementsByClassName && elementsByClassName.length !== 0) {
                elementsByClassName[0].classList.remove('dropdown-show');
            }
        }
    }, []);

    return (
        <div className="task-list-page">
            <div className="functional-block-wrap">
                <FiltrationForm
                    notifyRefresh={() => setFiltrationFormRefresh(refreshTaskListCall => refreshTaskListCall + 1)}/>
            </div>

            <div className="task-list-wrap">
                <PriorityTaskBlocksComponent
                    refreshTaskListCall={refreshTaskListCall}
                    refreshTaskList={() => setFiltrationFormRefresh(refreshTaskListCall => refreshTaskListCall + 1)}
                    taskStatus={taskStatus}/>
            </div>
        </div>
    );
}
