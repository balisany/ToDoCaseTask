export type TodoItem = {
    id: string;
    title: string;
    description: string;
    completed: boolean;
  }

export type  FilterType = "ALL" | "ACTIVE" | "COMPLETED";
