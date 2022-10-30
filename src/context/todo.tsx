import React, { createContext, useContext, useMemo, useState } from "react";
import { Todo as TodoType, TodoContext as TodoContextType, Filter } from "../../types";

const TodosContext = createContext<TodoContextType | null>(null);

const TodosProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

  const [filter, setFilter] = useState<Filter | null>(null);

  const [todos, setTodos] = useState<TodoType[]>([
    {
      id: Date.now().toString(),
      name: "Sarasa",
      completed: false
    },
  ]);

  const addTodo = (todo: TodoType) => {
    setTodos(state => [todo, ...state]);
  }

  const deleteTodo = (id: string) => {
    setTodos(state => {
      return state.filter(todo => todo.id != id);
    })
  }

  const toggleComplete = (id: string) => {
    setTodos(state => {
      return state.map(todo => {
        if (todo.id == id) {
          return {
            ...todo,
            completed: !todo.completed
          }
        } else {
          return todo;
        }
      });
    })
  }

  const toggleAllComplete = (completed: boolean) => {
    setTodos(state => {
      return state.map(todo => ({ ...todo, completed: completed}))
    });
  }

  const clearCompleted = () => {
    setTodos(state => {
      return state.filter( todo => !todo.completed)
    })
  }

  const filteredTodos = useMemo(() => {
    let matches = todos;
    if (filter) {
      matches = todos.filter(filter);
    }
    console.log(matches);
    return matches;
  }, [todos, filter]);

  const handleChangeFilter = (filter: Filter) => {
    setFilter(() => filter);
  }

  return (
    <TodosContext.Provider
      value={{ todos, addTodo, deleteTodo, toggleComplete, toggleAllComplete, clearCompleted, filteredTodos, handleChangeFilter }}
    >
      {children}
    </TodosContext.Provider>
  );
}

const useTodos = () => {
  const { todos, addTodo, deleteTodo, toggleComplete, toggleAllComplete, clearCompleted, handleChangeFilter, filteredTodos } =
    useContext(TodosContext) as TodoContextType;

  return {
    todos,
    filteredTodos,
    addTodo,
    deleteTodo,
    toggleComplete,
    toggleAllComplete,
    clearCompleted,
    handleChangeFilter
  };
}

export { TodosProvider, useTodos };
