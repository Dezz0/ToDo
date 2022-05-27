import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addNewTask } from "../todos/todoSlice";
import FilterButtons from "./FilterButtons";

export default function AddNewTodo() {
  const [text, setText] = useState("");
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setText(e.target.value);
  };
  const handleClick = () => {
    if (text.trim().length) {
      dispatch(addNewTask(text));
      setText("");
    }
  };

  return (
    <div className="container container_addTask">
      <div className="add_task_input">
        <input
          type="text"
          placeholder="Enter text"
          value={text}
          onChange={handleChange}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleClick();
          }}
        />
      </div>
      <div className="add_task_btn">
        <button type="button" className="" onClick={handleClick}>
          Add task
        </button>
      </div>
      <FilterButtons />
    </div>
  );
}
