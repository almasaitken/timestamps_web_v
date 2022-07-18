import React from 'react';
import './timestamp.css';

export const Timestamp = ({time, description, handleDeleteTimestamp, handleEditTimestamp}) => {
    return (
        <div className='ts-root'>
            <div> { time.hours } : { time.minutes } : { time.seconds } - {description}</div>
            <div className='btns'>
            <button onClick={handleEditTimestamp}> edit </button> 
            <button onClick={handleDeleteTimestamp}> delete </button>
            </div>
        </div>
    )
}

export const EditableTimestamp = ({time, handleDeleteTimestamp, handleSaveTimestamp, handleEditDescription, editedDescription}) => {
    return (
        <div className='ts-root'>
            <div> { time.hours } : { time.minutes } : { time.seconds }
                - <input onChange={handleEditDescription} type="text" value={editedDescription}/>
            </div>
            <div className='btns'>
            <button onClick={handleSaveTimestamp}> save </button> 
            <button onClick={handleDeleteTimestamp}> delete </button>
            </div>
        </div>
    )
}