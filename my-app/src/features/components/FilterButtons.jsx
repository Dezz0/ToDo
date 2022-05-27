import React from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { changeFilterBy, todoFilter } from "../todos/todoSlice";

const buttons = [
  { id: "btnradio1", text: "All", value: "show/all" },
  { id: "btnradio2", text: "Active", value: "show/active" },
  { id: "btnradio3", text: "Completed", value: "show/completed" }
];

export default function FilterButtons() {
  const dispatch = useDispatch();
  const filter = useSelector(todoFilter);
  let filterValue;

  const changeFilter = (e) => {
    filterValue = e.target.value;
    dispatch(changeFilterBy(filterValue));
  };

  const renderFilters = buttons.map((btn) => (
    <div className="form_radio_btn" key={btn.id}>
      <input
        type="radio"
        name="btnradio"
        id={btn.id}
        value={btn.value}
        onChange={changeFilter}
        checked={btn.value === filter}
      />
      <label htmlFor={btn.id}>{btn.text}</label>
    </div>
  ));

  return <div className="add_task_radio">{renderFilters}</div>;
}
