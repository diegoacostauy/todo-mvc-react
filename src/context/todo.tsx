import React, { createContext, useContext, useMemo, useState } from "react";
import {
  Todo as TodoType,
  TodoContext as TodoContextType,
  Filter,
} from "../../types";

const TodosContext = createContext<TodoContextType | null>(null);

const TodosProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [filter, setFilter] = useState<Filter | null>(null);

  const [todos, setTodos] = useState<TodoType[]>(
    JSON.parse(localStorage.getItem("todos") || "[]")
  );

  const addTodo = (todo: TodoType) => {
    const draft = [todo, ...todos];
    localStorage.setItem("todos", JSON.stringify(draft));
    setTodos(draft);
  };

  const deleteTodo = (id: string) => {
    const draft = todos.filter((todo) => todo.id != id);
    localStorage.setItem("todos", JSON.stringify(draft));
    setTodos(draft);
  };

  const toggleComplete = (id: string) => {
    const draft = todos.map((todo) => {
      if (todo.id == id) {
        return {
          ...todo,
          completed: !todo.completed,
        };
      } else {
        return todo;
      }
    });
    localStorage.setItem("todos", JSON.stringify(draft));
    setTodos(draft);
  };

  const toggleAllComplete = (completed: boolean) => {
    const draft = todos.map((todo) => ({ ...todo, completed: completed }));
    localStorage.setItem("todos", JSON.stringify(draft));
    setTodos(draft)
  };

  const clearCompleted = () => {
    const draft = todos.filter((todo) => !todo.completed);
    localStorage.setItem("todos", JSON.stringify(draft));
    setTodos(draft);
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
        toggleComplete,
        toggleAllComplete,
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
    toggleComplete,
    toggleAllComplete,
    clearCompleted,
    handleChangeFilter,
    filteredTodos,
  } = useContext(TodosContext) as TodoContextType;

  return {
    todos,
    filteredTodos,
    addTodo,
    deleteTodo,
    toggleComplete,
    toggleAllComplete,
    clearCompleted,
    handleChangeFilter,
  };
};

export { TodosProvider, useTodos };
