import React from "react";
import { todosList } from "../todos/todoSlice";
import { useSelector } from "react-redux";

export default function Header() {
  const todos = useSelector(todosList);

  const sumTask = todos.filter((todo) => todo.completed !== true);
  return (
    <div className="container container_header">
      <span>YOUR TASKS</span>
      <br />
      <p className="info_task_p">
        REMAINING TASKS: <span className="info_task_span">{sumTask.length}</span>
      </p>
    </div>
  );
}
