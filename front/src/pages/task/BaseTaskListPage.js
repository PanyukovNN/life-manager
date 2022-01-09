import '../../App.css';
import {React, useState} from 'react'
import {Button} from "react-bootstrap";
import {convertRawCategoriesToMap, FetchRawCategories} from "../../services/CategoryService";
import {TaskModal} from "../../components/tasklist/TaskModal";
import {DoneRemoveTaskButtons} from "../../components/tasklist/DoneRemoveTaskButtons";
import {PriorityTaskBlocksComponent} from "../../components/tasklist/PriorityTaskBlocksComponent";
import {FiltrationForm} from "../../components/filtrationform/FiltrationFormComponent";
import {useAlert} from "react-alert";

/**
 * Главная страница со списком задачи и формой фильтрации
 *
 * @param spinnerCall хук показа спиннера загрузки
 * @param taskStatus статус задач
 * @returns {*} главная страница со списком задач
 * @constructor
 */
export const BaseTaskListPage = ({showSpinner, taskStatus}) => {

    const alert = useAlert();
    const [loading, setLoading] = useState(true);
    const [categories, setCategories] = useState({});
    FetchRawCategories(
        setLoading,
        (rawCategories) => {
            setCategories(convertRawCategoriesToMap(rawCategories));
        },
        undefined,
        undefined,
        alert);

    const [checkedTaskIds, setCheckedTaskIds] = useState([]);
    const [refreshTaskListCall, setFiltrationFormRefresh] = useState(0);

    function handleCheckedTaskIds(isChecked, taskId) {
        setCheckedTaskIds(checkedTaskIds => {
            if (!isChecked) {
                // Если сняли выделение с чекбокса, то удаляем taskId из списка
                const index = checkedTaskIds.indexOf(taskId);
                if (index > -1) {
                    checkedTaskIds.splice(index, 1);
                }

                return [...checkedTaskIds];
            }

            // Если taskId уже имеется в списке, то не добавляем
            if (checkedTaskIds.includes(taskId)) {
                return [...checkedTaskIds];
            }

            return [...checkedTaskIds, taskId]
        });
    }

    return (
        <div className="task-list-page">
            <div className="functional-block-wrap">
                <FiltrationForm
                    categories={categories}
                    loading={loading}
                    notifyRefresh={() => setFiltrationFormRefresh(refreshTaskListCall => refreshTaskListCall + 1)}/>

                <div className="functional-buttons-wrap">
                    <DoneRemoveTaskButtons
                        disabled={loading}
                        checkedTaskIds={checkedTaskIds}
                        refreshTaskList={() => setFiltrationFormRefresh(refreshTaskListCall => refreshTaskListCall + 1)}/>
                </div>
            </div>

            <div className="task-list-wrap">
                <PriorityTaskBlocksComponent
                    refreshTaskListCall={refreshTaskListCall}
                    refreshTaskList={() => setFiltrationFormRefresh(refreshTaskListCall => refreshTaskListCall + 1)}
                    handleCheck={(taskId, isChecked) => handleCheckedTaskIds(isChecked, taskId)}
                    taskStatus={taskStatus}
                    showSpinner={showSpinner}
                    categories={categories}/>
            </div>
        </div>
    );
}
