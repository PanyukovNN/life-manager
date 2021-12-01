import '../App.css';
import { React } from 'react';

export const Task = ({task}) => {
    return (
        <div className="task-block">
            <input className="task-check" type="checkbox"/>
            <div className="task-description">
                {task.description}
            </div>
            <div>
                {task.priority}
            </div>
        </div>
    )
}
