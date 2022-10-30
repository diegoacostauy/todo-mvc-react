import { Todo as TodoType } from "../types/index";
import { useTodos } from "./context/todo";

type TodoProps = {
  todo: TodoType;
}

const Todo = ({todo: {id, name, completed }}: TodoProps) => {
  const { deleteTodo, toggleComplete } = useTodos();

  return (
    <>
      <div className="view">
        <input className="toggle" type="checkbox" checked={completed} onChange={() => toggleComplete(id)} />
        <label>{name}</label>
        <button className="destroy" onClick={() => deleteTodo(id)}/>
      </div>
    </>
  );
}

export default Todo;
