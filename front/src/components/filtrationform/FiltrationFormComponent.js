import '../../App.css';
import {React, useEffect, useState} from 'react';
import {SelectorComponent} from './SelectorComponent'
import {
    CATEGORY_KEY,
    CATEGORY_SELECT_ID,
    DONE_TASK_STATUS,
    END_DONE_DATE_KEY,
    END_DONE_DATE_SELECT_ID,
    NO_CATEGORIES_VALUE,
    START_DONE_DATE_KEY,
    START_DONE_DATE_SELECT_ID,
} from '../../Constants'
import {convertRawCategoriesToMap, fetchRawCategories} from "../../services/CategoryService";
import {DateSelectComponent} from "./DateSelectComponent";

/**
 * Параметры поиска задач
 *
 * @param taskStatus статус задач (изначально для определения находимся ли мы на странице выполненных задач)
 * @param notifyRefresh уведомление об обновлении формы
 * @returns селекторы с параметров поиска
 */
export const FiltrationForm = ({taskStatus, notifyRefresh}) => {

    const doneTasksPage = taskStatus && taskStatus === DONE_TASK_STATUS;

    const loadingCategories = {"": "Загрузка..."};
    const [formDisabled, setFormDisables] = useState(true);
    const [categories, setCategories] = useState(loadingCategories);

    useEffect(() => {
            fetchRawCategories(false)
                .then(rawCategories => {
                    if (rawCategories.length === 0) {
                        setCategories({"": NO_CATEGORIES_VALUE});
                        notifyRefresh();

                        return;
                    }

                    let categoriesFromServer = convertRawCategoriesToMap(rawCategories);
                    setCategories(categoriesFromServer);
                    setFormDisables(false);

                    notifyRefresh();
                }
            );
        },
        []);

    const currentDate = new Date();
    const endDoneDateDefaultValue = currentDate.toLocaleDateString('en-CA');
    // По умолчанию дата начала периода на неделю раньше сегодняшней даты
    const startDoneDateDefaultValue = () => {
        return new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() - 7)
            .toLocaleDateString('en-CA');
    }


    const renderStartDoneDate = () => {
        return (
            <div className="selector-wrap">
                <div className="selector-header">Период с</div>
                <div className="selector-wrapper">
                    <DateSelectComponent
                        id={START_DONE_DATE_SELECT_ID}
                        disabled={formDisabled}
                        storageKey={START_DONE_DATE_KEY}
                        defaultValue={startDoneDateDefaultValue}
                        notifySelection={notifyRefresh}/>
                </div>
            </div>
        )
    }

    const renderEndDoneDate = () => {
        return (
            <div className="selector-wrap">
                <div className="selector-header">до</div>
                <div className="selector-wrapper">
                    <DateSelectComponent
                        id={END_DONE_DATE_SELECT_ID}
                        disabled={formDisabled}
                        storageKey={END_DONE_DATE_KEY}
                        defaultValue={endDoneDateDefaultValue}
                        notifySelection={notifyRefresh}/>
                </div>
            </div>
        )
    }

    return (
        <>
            <div className="selectors-group">
                {/* Селектор категорий */}
                <div className="selector-wrap">
                    <div className="selector-header">Раздел</div>
                    <div className="selector-wrapper">
                        <SelectorComponent
                            id={CATEGORY_SELECT_ID}
                            disabled={formDisabled}
                            storageKey={CATEGORY_KEY}
                            optionMap={categories}
                            notifySelection={notifyRefresh}/>
                    </div>
                </div>

                {doneTasksPage && renderStartDoneDate()}
                {doneTasksPage && renderEndDoneDate()}
            </div>
        </>
    )
}
