import { motion } from "framer-motion";
import { Todo as TodoType } from "../types/index";
import { useTodos } from "./context/todo";

type TodoProps = {
  todo: TodoType;
};

const Todo = ({ todo: { id, name, completed } }: TodoProps) => {
  const { deleteTodo, toggleCompleted } = useTodos();

  return (
    <>
      <div className="view">
        <input
          className="toggle"
          type="checkbox"
          checked={completed}
          onChange={() => toggleCompleted(id)}
        />
        <label>{name}</label>
        <motion.button
          className="destroy"
          onClick={() => deleteTodo(id)}
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.85 }}
        />
      </div>
    </>
  );
};

export default Todo;
