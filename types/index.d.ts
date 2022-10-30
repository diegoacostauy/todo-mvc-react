export type Todo = {
  id: string;
  name: string;
  completed: boolean;
}

export type TodoContext = {
  todos: Todo[];
  filteredTodos: Todo[],
  addTodo: (todo: Todo) => void;
  deleteTodo: (id: string) => void;
  toggleComplete: (id: string) => void;
  toggleAllComplete: (completed: boolean) => void;
  clearCompleted: () => void;
  handleChangeFilter: (filter: Filter) => void;
}

export type Status = "All" | "Active" | "Completed";

export type Filter = (todo: Todo) => boolean
