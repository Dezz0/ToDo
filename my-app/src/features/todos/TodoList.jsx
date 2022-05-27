import React, { useState, useEffect } from "react";
import TodoItem from "./TodoItem";
import { useSelector } from "react-redux";
import { fetchTodos, MoveTask, todoFilter, todosList } from "./todoSlice";
import { useDispatch } from "react-redux";

export default function TodoList() {
  const dispatch = useDispatch();
  const { status, error } = useSelector((state) => state.todos);

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  const todos = useSelector(todosList);
  const filter = useSelector(todoFilter);
  const [curTask, setCurTask] = useState(null);
  const [indexCurTask, setIndexCurTask] = useState(null);

  const filtredTodos =
    filter === "show/active"
      ? todos.filter((todo) => todo.completed === false)
      : filter === "show/completed"
      ? todos.filter((todo) => todo.completed === true)
      : todos;

  const dragStartHandler = (e, id) => {
    const task = filtredTodos.findIndex((t) => t.id === id);
    setIndexCurTask(task);
    const currentTask = filtredTodos[task];
    setCurTask(currentTask);
  };

  const dragEndHandler = (e) => {
    e.target.style.opacity = 1;
  };

  const dragOverHandler = (e) => {
    e.preventDefault();

    e.target.style.opacity = 0.6;
  };

  const dragLeaveHandler = (e) => {
    e.target.style.opacity = 1;
  };

  const dropHandler = (e, id) => {
    e.preventDefault();
    e.target.style.opacity = 1;
    const currentIndex = filtredTodos.findIndex((t) => t.id === id);
    dispatch(MoveTask({ currentIndex, indexCurTask, curTask }));
  };
  const renderItems = filtredTodos.map((todo) => (
    <TodoItem
      key={todo.id}
      id={todo.id}
      text={todo.title}
      completed={todo.completed}
      dragStartHandler={dragStartHandler}
      dragEndHandler={dragEndHandler}
      dragOverHandler={dragOverHandler}
      dragLeaveHandler={dragLeaveHandler}
      dropHandler={dropHandler}
    />
  ));

  return (
    <div className="container container_todoList">
      {status === "loading" && (
        <div className="spinner">
          <span className="spinner__animation"></span>
          <span className="spinner__info">Загрузка...</span>
        </div>
      )}
      {error && <div className="error">An error occured {error}</div>}

      <ul className="list_todo">{renderItems}</ul>
    </div>
  );
}
