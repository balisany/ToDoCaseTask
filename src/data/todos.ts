import { TodoItem } from "../types";

export const ToDoMockData: TodoItem[] = [
    {
      id: crypto.randomUUID(),
      title: "todo 1",
      description: "",
      completed: false,
    },
    {
      id: crypto.randomUUID(),
      title: "todo 2",
      description: "",
      completed: true,
    },
    {
      id: crypto.randomUUID(),
      title: "todo 3",
      description: "",
      completed: true,
    },
    {
      id: crypto.randomUUID(),
      title: "todo 4",
      description: "",
      completed: true,
    },
  ];