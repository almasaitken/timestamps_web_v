import React from 'react';
import './timestamp.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';

export const Timestamp = ({time, description, handleDeleteTimestamp, handleEditTimestamp}) => {
    return (
        <div className='ts-root'>
            <div> { time.hours } : { time.minutes } : { time.seconds } - {description}</div>
            <div className='btns'>
            <button onClick={handleEditTimestamp}>  
                <FontAwesomeIcon icon={faPenToSquare} className='fa-2x' color='orange' />
            </button>
            <button onClick={handleDeleteTimestamp}> 
                <FontAwesomeIcon icon={faTrash} className='fa-2x' color='orange' />
            </button>
            </div>
        </div>
    )
}

export const EditableTimestamp = ({time, handleDeleteTimestamp, handleChangeDescription, handleSaveTimestamp, description, handleOnKeyPress}) => {
    return (
        <div className='ts-root'>
            <div> { time.hours } : { time.minutes } : { time.seconds }
                - <input className='desc-input' id='save-input' type="text" defaultValue={description} onChange={handleChangeDescription} 
                onKeyPress={handleOnKeyPress} placeholder='input the description' autoFocus={true} />
            </div>
            <div className='btns'>
            <button onClick={handleSaveTimestamp}> 
                <FontAwesomeIcon icon={faCircleCheck} className='fa-2x' color='orange' />
            </button> 
            <button onClick={handleDeleteTimestamp}> 
                <FontAwesomeIcon icon={faTrash} className='fa-2x' color='orange' />
            </button>
            </div>
        </div>
    )
}