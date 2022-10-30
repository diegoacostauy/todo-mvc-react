import React, { useId, useRef } from "react";
import { useTodos } from "./context/todo";

const Searchbar = () => {
  const { addTodo } = useTodos();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleAdd = (event: React.SyntheticEvent) => {
    const formData = new FormData(event.currentTarget as HTMLFormElement);
    const todo = {
      id: Date.now().toString(),
      name: formData.get('name') as string,
      completed: false,
    }

    if (inputRef.current) {
      inputRef.current.value = '';
    }

    addTodo(todo);
  }

  return (
    <form onSubmit={handleAdd}>
      <input
        id="name"
        name="name"
        ref={inputRef}
        className="new-todo"
        placeholder="What needs to be done?"
        autoFocus
      />
    </form>
  );
};

export default Searchbar;
