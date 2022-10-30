import { Todo as TodoType } from "../types";
import { useTodos } from "./context/todo";
import Footer from "./Footer";
import CompleteAll from "./CompleteAll";
import Todo from "./Todo";
import Searchbar from "./Searchbar";
import Filters from "./Filters";

function App() {
  const { filteredTodos } = useTodos();

  return (
    <>
      <main className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <Searchbar/>
        </header>
        <section className="main">
          <CompleteAll/>
          <ul className="todo-list">
            {
              filteredTodos.map((todo: TodoType, idx: number) => (
              <li key={idx} className={`${todo.completed ? "completed" : ""}`}>
                <Todo todo={todo}/>
              </li>
              ))
            }
          </ul>
        </section>
        <Filters/>
      </main>
      <Footer/>
    </>
  );
}

export default App;
