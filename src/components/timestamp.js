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

export const EditableTimestamp = ({time, handleDeleteTimestamp, handleChangeDescription, handleSaveTimestamp, description, handleOnKeyPress}) => {
    return (
        <div className='ts-root'>
            <div> { time.hours } : { time.minutes } : { time.seconds }
                - <input className='desc-input' type="text" defaultValue={description} onChange={handleChangeDescription} onKeyPress={handleOnKeyPress} placeholder='input the description' />
            </div>
            <div className='btns'>
            <button onClick={handleSaveTimestamp}> save </button> 
            <button onClick={handleDeleteTimestamp}> delete </button>
            </div>
        </div>
    )
}