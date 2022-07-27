import React from "react";
import "./timestamp.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";

export const Timestamp = ({
  time,
  description,
  handleDeleteTimestamp,
  handleEditTimestamp,
}) => {
  return (
    <div className="ts-root">
      <div className="timecode">
        {" "}
        {time.hours}:{time.minutes}:{time.seconds} - 
        <div className="description"> {" " + (description ? description : '')} </div>
      </div>
      <div className="btns">
        <button onClick={handleEditTimestamp} className="edit-delete">
          <FontAwesomeIcon
            icon={faPenToSquare}
            className="fa-2x"
          />
        </button>
        <button onClick={handleDeleteTimestamp} className="edit-delete">
          <FontAwesomeIcon icon={faTrash} className="fa-2x" />
        </button>
      </div>
    </div>
  );
};

export const EditableTimestamp = ({
  time,
  handleDeleteTimestamp,
  handleChangeDescription,
  handleSaveTimestamp,
  description,
  handleOnKeyPress,
}) => {
  return (
    <div className="ts-root" id="editable-ts">
      <div>
        {" "}
        {time.hours}:{time.minutes}:{time.seconds} {" "}-{" "}
        <input 
            className="edit-input"
            type="text" 
            defaultValue={description}
            onChange={handleChangeDescription}
            onKeyPress={handleOnKeyPress}
            autoFocus={true}
            placeholder="Description"
        />
      </div>
      <div className="btns">
        <button onClick={handleSaveTimestamp} className="edit-delete">
          <FontAwesomeIcon
            icon={faCircleCheck}
            className="fa-2x"
          />
        </button>
        <button onClick={handleDeleteTimestamp} className="edit-delete">
          <FontAwesomeIcon icon={faTrash} className="fa-2x" />
        </button>
      </div>
    </div>
  );
};