import { useState } from "react";
import TodoList from "./components/TodoList";
import TodoForm from "./components/TodoForm";
import ToDoMockData from "./data";
import TodoItem from "./types";

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

  const onToggle = (id: string, status: boolean) => {
    setTodos((currentTodo) => {
      return currentTodo.map((todo) => {
        if (todo.id === id) {
          return { ...todo, completed: status };
        }
        return todo;
      });
    });
  };

  const onDelete = (id: string) => {
    setTodos((currentValues) => {
      return currentValues.filter((todo) => todo.id !== id);
    });
  };

  const onEdit = (id: string) => {};

  return (
    <div className="container">
      <div className="bg-white rounded shadow p-6 m-4 sm:w-full md:w-3/4 lg:w-3/4 lg:max-w-lg">
        <TodoForm onSubmit={onSubmit} />
        <TodoList
          data={todos}
          onEdit={onEdit}
          onDelete={onDelete}
          onToggle={onToggle}
        />
      </div>
    </div>
  );
}

export default App;
