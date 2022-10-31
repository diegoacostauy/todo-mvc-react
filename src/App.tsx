import { Todo as TodoType } from "../types";
import { useTodos } from "./context/todo";
import Footer from "./Footer";
import CompleteAll from "./CompleteAll";
import Todo from "./Todo";
import Searchbar from "./Searchbar";
import Filters from "./Filters";
import { AnimatePresence, motion } from "framer-motion";

function App() {
  const { filteredTodos } = useTodos();

  const container = {
    hidden: {
      opacity: 0
    },
    visible: {
      opacity: 1,
    }
  }

  const item = {
    hidden: {
      opacity: 0,
    },
    visible: ({ delay }) => ({
      opacity: 1,
      transition: {
        delay,
        duration: .4
      }
    })
  }

  return (
    <>
      <main className="todoapp">
        <header className="header">
          <motion.h1
            initial={{ opacity: 0, translateY: -30 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ duration: 0.3 }}
          >
            todos
          </motion.h1>
          <Searchbar />
        </header>
        <section className="main">
          <CompleteAll />
          <motion.ul
            initial={false}
            animate="visible"
            className="todo-list"
            variants={container}
          >
            <AnimatePresence>
              {filteredTodos.map((todo: TodoType, idx: number) => (
                <motion.li
                  custom={{ delay: ((idx + 1) * .1)}}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  variants={item}
                  key={todo.id}
                  className={`${todo.completed ? "completed" : ""}`}
                >
                  <Todo todo={todo} />
                </motion.li>
              ))}
            </AnimatePresence>
          </motion.ul>
        </section>
        <Filters />
      </main>
      <Footer />
    </>
  );
}

export default App;
