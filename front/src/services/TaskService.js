import {deleteReq, postReq} from "./RequestService";
import {NO_CATEGORIES_VALUE, TO_DO_TASK_STATUS} from "../Constants";
import {showAlert} from "./AlertService";

/**
 * Загрузить карту задач, где в качестве ключа выступает буква приоритета,
 * а в качестве значения список задач
 *
 * @param taskStatus статус задач
 * @param category категория
 * @returns результат выполнения запроса
 */
export function fetchPriorityTaskListMap(category, taskStatus) {
    if (category === "") {
        return {};
    }

    let body = {
        taskStatuses: taskStatus !== "" ? [taskStatus] : [],
        categoryNames: [category],
        periodType: "ALL",
        sortType: "NONE"
    };

    return postReq("http://localhost:80/api/task/find-priority-task-list-map", body)
        .then(response => {
            if (response && response.data) {
                return response.data;
            }

            return {};
        });
}

/**
 * Изменяет статус задачи
 *
 * @param id идентификатор задачи
 * @param taskStatus стстус задачи, который необходимо выставить
 * @param completed хук уведомления о выполнении
 */
export function changeStatus(id, taskStatus, completed) {
    let body = {
        id: id,
        status: taskStatus
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
        return Promise.resolve();
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

/**
 * Создание/обновление задачи
 *
 * @param id идентификатор
 * @param description описание задачи
 * @param priority приоритет
 * @param categoryName наименование категории
 * @param date планируемая дата завершения
 * @param time планируемое время завершения
 * @returns результат выполнения запроса
 */
export function createUpdateTask(id, description, priority, categoryName, date, time) {
    if (description === null
        || description === ""
        || categoryName === null) {
        return Promise.resolve();
    }

    let body = {
        id: id,
        description: description,
        priority: priority,
        categoryName: categoryName,
        status: TO_DO_TASK_STATUS,
        plannedDate: date,
        plannedTime: time
    };

    return postReq('http://localhost:80/api/task/create-update', body);
}

