import '../App.css';
import {React} from 'react';

export const Task = ({task}) => {
    return (
        <div className="task-block">
            <input className="task-check" type="checkbox"/>
            <div className="task-description">
                {task.description}
            </div>

            <div className="task-category">
                {task.category}
            </div>

            <div className="task-completion-date-time">
                {task.completionDate} {task.completionTime}
            </div>

            <div className="task-priority">
                {task.priority}
            </div>
        </div>
    )
}
