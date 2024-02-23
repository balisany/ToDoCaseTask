import { useEffect, useState } from "react";
import ToDoMockData from "./data";
import TodoItem from "./types";
import TodoList from "./components/TodoList";
import TodoForm from "./components/TodoForm";
import EditForm from "./components/EditForm";

function App() {
  const initialMockData = ToDoMockData;
  const [todos, setTodos] = useState<TodoItem[]>(initialMockData);
  const [filteredToDos, setFilteredToDos] = useState<TodoItem[]>(todos);
  const [isDisabled, setIsDisabled] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState("");

  useEffect(() => {
    setFilteredToDos(todos);
  }, [todos]);

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

  const onUpdate = (id: string, title: string) => {
    setTodos((currentTodos) => {
      return currentTodos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, title: title };
        }
        return todo;
      });
    });
    setSelectedItemId("");
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

  const onEdit = (id: string) => {
    setSelectedItemId(id);
  };

  const countFilteredTasks = (type: "ALL" | "ACTIVE" | "COMPLETED"): number => {
    const filteredByType =
      type === "ALL"
        ? todos
        : todos.filter((todo) =>
            type === "COMPLETED" ? todo.completed : !todo.completed
          );

    return filteredByType.length;
  };

  const onFilter = (type: "ALL" | "ACTIVE" | "COMPLETED") => {
    const filtered =
      type === "ALL"
        ? todos
        : todos.filter((todo) =>
            type === "COMPLETED" ? todo.completed : !todo.completed
          );

    setIsDisabled(type === "COMPLETED");
    setFilteredToDos(filtered);
  };

  const CounterLabel = (props: { count: number }) => {
    return (
      <span className="inline-flex items-center justify-center w-6 h-6 ms-1 text-xs font-semibold text-blue-800 bg-blue-200 rounded-full">
        {Number(props.count)}
      </span>
    );
  };

  return (
    <div className="container">
      {/* <Header data={todos} /> */}
      <div className="p-1 m-4  flex text-center content-center items-center gap-6">
        <button
          type="button"
          className="hover:underline"
          onClick={() => onFilter("ALL")}
        >
          All
          <CounterLabel count={countFilteredTasks("ALL")} />
        </button>
        <button
          type="button"
          className="hover:underline"
          onClick={() => onFilter("ACTIVE")}
        >
          Active
          <CounterLabel count={countFilteredTasks("ACTIVE")} />
        </button>
        <button
          type="button"
          className="hover:underline"
          onClick={() => onFilter("COMPLETED")}
        >
          Completed
          <CounterLabel count={countFilteredTasks("COMPLETED")} />
        </button>
      </div>
      <div className="bg-white rounded shadow p-6 m-4 sm:w-full md:w-3/4 lg:w-3/4 lg:max-w-lg">
        {isDisabled && <h1 className="">Completed tasks</h1>}
        {!isDisabled && selectedItemId === "" && (
          <TodoForm onSubmit={onSubmit} />
        )}
        {!isDisabled && selectedItemId && (
          <EditForm
            data={todos.find((todo) => todo.id === selectedItemId)}
            onCancel={() => setSelectedItemId("")}
            onUpdate={onUpdate}
          />
        )}
        <TodoList
          data={filteredToDos}
          onEdit={onEdit}
          onDelete={onDelete}
          onToggle={onToggle}
        />
      </div>
    </div>
  );
}

export default App;
