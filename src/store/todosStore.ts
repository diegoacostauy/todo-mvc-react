
import {
  Todo as TodoType,
} from "../../types";

type Action =
  | { type: "ADD_TODO"; payload: TodoType }
  | { type: "DELETE_TODO"; payload: string }
  | { type: "TOGGLE_COMPLETED"; payload: string }
  | { type: "TOGGLE_ALL_COMPLETED"; payload: boolean }
  | { type: "CLEAR_COMPLETED" };

const INITIAL_TODOS = JSON.parse(localStorage.getItem("todos") || "[]");

const todosReducer = (state: TodoType[], action: Action) => {
  switch (action.type) {
    case "ADD_TODO":
      const draft = [action.payload, ...state];
      localStorage.setItem("todos", JSON.stringify(draft));
      return draft;
    case "DELETE_TODO":
      const draftDeleted = state.filter((todo) => todo.id != action.payload);
      localStorage.setItem("todos", JSON.stringify(draftDeleted));
      return draftDeleted;
    case "TOGGLE_COMPLETED":
      const draftCompleted = state.map((todo) => {
        if (todo.id == action.payload) {
          return {
            ...todo,
            completed: !todo.completed,
          };
        } else {
          return todo;
        }
      });
      localStorage.setItem("todos", JSON.stringify(draftCompleted));
      return draftCompleted;
    case "TOGGLE_ALL_COMPLETED":
      const draftCompletedAll = state.map((todo) => ({ ...todo, completed: action.payload }));
      localStorage.setItem("todos", JSON.stringify(draftCompletedAll));
      return draftCompletedAll;
    case "CLEAR_COMPLETED":
      const draftClearCompleted = state.filter((todo) => !todo.completed);
      localStorage.setItem("todos", JSON.stringify(draftClearCompleted));
      return draftClearCompleted;
  }
};

export { todosReducer, INITIAL_TODOS};
