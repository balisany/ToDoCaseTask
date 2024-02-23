import { useState } from "react";
import TodoItem from "./types";
import ToDoMockData from "./data";
import TodoForm from "./components/TodoForm";

function App() {
  const initialMockData = ToDoMockData;
  const [todos, setTodos] = useState<TodoItem[]>(initialMockData);

  const onSubmit = (title: string) => {
    setTodos((currentTodos) => {
      return [
        ...currentTodos,
        {
          id: crypto.randomUUID(),
          completed: false,
          title: title,
          description: "",
        },
      ];
    });
  };

  return (
    <div className="container">
      <div className="bg-white rounded shadow p-6 m-4 sm:w-full md:w-3/4 lg:w-3/4 lg:max-w-lg">
        <TodoForm onSubmit={onSubmit} />

        <ul className="p-4 list">
          {todos.map((todo) => (
            <li className="p-2 list-item" key={todo.id}>
              {todo.title}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
