import {getCurrentCategory} from "./CategoryService";
import {deleteReq, postReq} from "./RequestService";
import {DONE_TASK_STATUS} from "../Constants";
import {showAlert} from "./AlertService";

/**
 * Загрузить карту задач, где в качестве ключа выступает буква приоритета,
 * а в качестве значения список задач
 *
 * @param taskStatus статус задач
 * @returns результат выполнения запроса
 */
export function fetchPriorityTaskListMap(taskStatus) {
    let currentCategory = getCurrentCategory();

    if (currentCategory === "") {
        return null;
    }

    let body = {
        taskStatuses: taskStatus !== "" ? [taskStatus] : [],
        categories: [currentCategory],
        periodType: "ALL",
        sortType: "NONE"
    };

    return postReq("http://localhost:80/api/task/find-priority-task-list-map", body)
        .then(response => {
            if (response && response.data) {
                return response.data;
            }

            return null;
        });
}

/**
 * Пометить задачу как выполненную
 *
 * @param id идентификатор задачи
 * @param completed хук уведомления о выполнении
 */
export function markAsDone(id, completed) {
    let body = {
        ids: [id],
        status: DONE_TASK_STATUS
    };

    postReq("http://localhost:80/api/task/set-status", body)
        .then((response) => {
            if (response && response.data) {
                showAlert(response.data)
            }

            completed();
        });
}

/**
 * Удалить задачу
 *
 * @param id идентификатор задачи
 * @param completed хук уведомления о выполнении
 */
export function deleteTask(id, completed) {
    let result = window.confirm("Вы уверены, что хотите удалить задачу?");
    if (!result) {
        return;
    }

    let body = {
        ids: [id]
    };

    deleteReq("http://localhost:80/api/task/delete-by-ids", body)
        .then((response) => {
            if (response && response.data) {
                showAlert(response.data)
            }

            completed();
        });
}

