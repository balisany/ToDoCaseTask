import { useEffect, useState } from "react";
import { FilterType, TodoItem } from "./types";
import TodoList from "./components/TodoList";
import TodoForm from "./components/TodoForm";
import EditForm from "./components/EditForm";
import Filter from "./components/Filter";
import { useSearchParams } from "react-router-dom";
// import ToDoMockData from "./data";

function App() {
  // const initialMockData = ToDoMockData;
  // const [todos, setTodos] = useState<TodoItem[]>(initialMockData);

  const [todos, setTodos] = useState<TodoItem[]>(() => {
    const storedData = localStorage.getItem("TODOS");
    if (storedData === null) return [];

    return JSON.parse(storedData);
  });

  const [isDisabled, setIsDisabled] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState("");
  const [searchParams] = useSearchParams();
  const filterValue = (searchParams.get("filter") as FilterType) || "ALL";
  const isCompletedDisplay = filterValue === "COMPLETED";

  useEffect(() => {
    localStorage.setItem("TODOS", JSON.stringify(todos));
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
    setIsDisabled(false);
  };

  const onToggle = (id: string, status: boolean) => {
    onCancel();
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
    onCancel();
    setTodos((currentValues) => {
      return currentValues.filter((todo) => todo.id !== id);
    });
  };

  const onEdit = (id: string) => {
    setSelectedItemId(id);
    setIsDisabled(true);
  };

  const onCancel = () => {
    setSelectedItemId("");
    setIsDisabled(false);
  };

  return (
    <div className="container">
      <Filter data={todos} />
      <div className="bg-white rounded shadow p-6 m-4 sm:w-full md:w-3/4 lg:w-3/4 lg:max-w-lg">
        <>
          {!isCompletedDisplay && !isDisabled && selectedItemId === "" && (
            <TodoForm onSubmit={onSubmit} />
          )}
        </>
        <>
          {!isCompletedDisplay && selectedItemId && (
            <EditForm
              data={todos.find((todo) => todo.id === selectedItemId)}
              onCancel={onCancel}
              onUpdate={onUpdate}
            />
          )}
        </>
        <>{isCompletedDisplay && <h1>Completed tasks</h1>}</>

        <TodoList
          data={todos}
          filterValue={filterValue}
          onEdit={onEdit}
          onDelete={onDelete}
          onToggle={onToggle}
        />
      </div>
    </div>
  );
}

export default App;
