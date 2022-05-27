import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { dnd, trash } from "../../features/icons";
import { removeTodo, ToggleTodo } from "./todoSlice";

export default function ListItem({
  id,
  text,
  completed,
  dragStartHandler,
  dragEndHandler,
  dragOverHandler,
  dragLeaveHandler,
  dropHandler
}) {
  const dispatch = useDispatch();
  const [draggable, setDraggable] = useState(false);

  const handleChange = () => {
    dispatch(ToggleTodo(id));
  };

  const handleClick = () => {
    dispatch(removeTodo(id));
  };
  const isDone = completed ? "checked text_todo" : "text_todo";
  let editText = text.length > 130 ? text.substr(0, 129) + "..." : text;
  return (
    <li
      className="row"
      draggable={draggable}
      onDragStart={(e) => dragStartHandler(e, id)}
      onDragEnd={dragEndHandler}
      onDragLeave={dragLeaveHandler}
      onDragOver={dragOverHandler}
      onDrop={(e) => dropHandler(e, id)}
    >
      <div className="row_container">
        <div className="checkbox_btn">
          <input id={id} name={id} className="btn_check" type="checkbox" checked={completed} onChange={handleChange} />
          <label htmlFor={id}></label>
          <span className="move_task" onMouseEnter={() => setDraggable(true)} onMouseLeave={() => setDraggable(false)}>
            {dnd}
          </span>
        </div>
        <div className="todo">
          <p className={isDone}>{editText}</p>
        </div>
        <div className="delete_btn">
          <p style={{ cursor: "pointer" }} className="text-center" onClick={handleClick}>
            {trash}
          </p>
        </div>
      </div>
    </li>
  );
}
