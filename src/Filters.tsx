import React, { useMemo, useState } from "react";
import { Status, Todo } from "../types";
import { useTodos } from "./context/todo";

const STATUS = {
  ALL: "All",
  ACTIVE: "Active",
  COMPLETED: "Completed"
}

const Filters = () => {
  const [status, setStatus] = useState<Status>("All");

  const { todos, clearCompleted, handleChangeFilter } = useTodos();
  const itemLeft = useMemo(() => todos.filter(todo => !todo.completed), [todos]);
  const hasCompleted = useMemo(() => todos.find(todo => todo.completed), [todos]);

  const handleChange = (ev: React.SyntheticEvent ) => {
    const el = ev.currentTarget as HTMLAnchorElement;
    const draft = el.dataset.status as Status;

    setStatus(draft);

    const filterFunc = ((todo: Todo) => {
      if (draft == "Active") {
        return !todo.completed;
      } else if (draft == "Completed") {
        return todo.completed;
      }
      return true;
    })

    handleChangeFilter(filterFunc);

  }

  return (
    <footer className="footer">
      <span className="todo-count">
        <strong>{itemLeft.length}</strong> item left
      </span>
      <ul className="filters">
        <li>
          <a className={`${status == STATUS.ALL ? "selected" : ""}`} data-status={STATUS.ALL} href="#/" onClick={(ev) => handleChange(ev)}>
            All
          </a>
        </li>
        <li>
          <a className={`${status == STATUS.ACTIVE ? "selected" : ""}`} data-status={STATUS.ACTIVE} href="#/active" onClick={(ev) => handleChange(ev)}>Active</a>
        </li>
        <li>
          <a className={`${status == STATUS.COMPLETED ? "selected" : ""}`} data-status={STATUS.COMPLETED} href="#/completed" onClick={(ev) => handleChange(ev)}>Completed</a>
        </li>
      </ul>
      {
        hasCompleted &&
        <button className="clear-completed" onClick={clearCompleted}>Clear completed</button>
      }
    </footer>
  );
};

export default Filters;
