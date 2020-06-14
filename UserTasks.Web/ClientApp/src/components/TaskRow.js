import React from 'react';

const TaskRow = ({ task, currentUser, onTakeTask, onDoneTask }) => {
    const { userName } = task;
    const current = `${currentUser.firstName} ${currentUser.lastName}`
    return (
        <tr>
            <td>{task.name}</td>
            <td>
                {userName == null && <button className='btn btn-primary' onClick={onTakeTask}>I'm doing this one</button>}

                {(userName != null && current === userName) &&
                    <button className='btn btn-danger' onClick={onDoneTask}>DoneTask!</button>
                }
                {(userName != null && current !== userName) &&
                    <button className='btn btn-info' disabled>{userName} is doing this task</button>
                }

            </td>
        </tr>
    );
}

export default TaskRow;