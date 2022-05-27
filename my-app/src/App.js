import React from "react";

import AddNewTodo from "./features/components/AddNewForm";
import Header from "./features/components/Header";
import TodoList from "./features/todos/TodoList";

export default function App() {
  return (
    <div className="app">
      <div className="app_box">
        <Header />
        <AddNewTodo />
        <TodoList />
      </div>
    </div>
  );
}
