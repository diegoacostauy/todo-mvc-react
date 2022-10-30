import React, { createContext, useContext, useMemo, useReducer, useState } from "react";
import {
  Todo as TodoType,
  TodoContext as TodoContextType,
  Filter,
} from "../../types";
import { todosReducer, INITIAL_TODOS } from "../store/todosStore";

const TodosContext = createContext<TodoContextType | null>(null);

const TodosProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [filter, setFilter] = useState<Filter | null>(null);

  const [todos, dispatch] = useReducer(todosReducer, INITIAL_TODOS);

  const addTodo = (todo: TodoType) => {
    dispatch({ type: "ADD_TODO", payload: todo });
  };

  const deleteTodo = (id: string) => {
    dispatch({ type: "DELETE_TODO", payload: id });
  };

  const toggleCompleted = (id: string) => {
    dispatch({ type: "TOGGLE_COMPLETED", payload: id });
  };

  const toggleAllCompleted = (completed: boolean) => {
    dispatch({ type: "TOGGLE_ALL_COMPLETED", payload: completed});
  };

  const clearCompleted = () => {
    dispatch({ type: "CLEAR_COMPLETED" });
  };

  const filteredTodos = useMemo(() => {
    let matches = todos;
    if (filter) {
      matches = todos.filter(filter);
    }
    return matches;
  }, [todos, filter]);

  const handleChangeFilter = (filter: Filter) => {
    setFilter(() => filter);
  };

  return (
    <TodosContext.Provider
      value={{
        todos,
        addTodo,
        deleteTodo,
        toggleCompleted,
        toggleAllCompleted,
        clearCompleted,
        filteredTodos,
        handleChangeFilter,
      }}
    >
      {children}
    </TodosContext.Provider>
  );
};

const useTodos = () => {
  const {
    todos,
    addTodo,
    deleteTodo,
    toggleCompleted,
    toggleAllCompleted,
    clearCompleted,
    handleChangeFilter,
    filteredTodos,
  } = useContext(TodosContext) as TodoContextType;

  return {
    todos,
    filteredTodos,
    addTodo,
    deleteTodo,
    toggleCompleted,
    toggleAllCompleted,
    clearCompleted,
    handleChangeFilter,
  };
};

export { TodosProvider, useTodos };
