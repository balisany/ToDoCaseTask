import { FilterType, TodoItem } from "../../types";
import ListItem from "./ListItem";

type Props = {
  data: TodoItem[];
  filterValue: FilterType;
  onToggle: (id: string, status: boolean) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string) => void;
};

const TodoList: React.FC<Props> = ({
  data,
  filterValue,
  onDelete,
  onEdit,
  onToggle,
}) => {
  const filteredData =
    filterValue === "ALL"
      ? data
      : data.filter((todo) =>
          filterValue === "COMPLETED" ? todo.completed : !todo.completed
        );

  return (
    <div className="my-4">
      {filteredData.length === 0 && <p className="mx-4">Empty list</p>}
      {filteredData.map((todo) => (
        <ListItem
          key={todo.id}
          data={todo}
          onDelete={onDelete}
          onEdit={onEdit}
          onToggle={onToggle}
        />
      ))}
    </div>
  );
};

export default TodoList;
