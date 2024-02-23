import TodoItem from "../../types";
import ListItem from "./ListItem";

type Props = {
  data: TodoItem[];
  onToggle: (id: string, status: boolean) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string) => void;
};

const TodoList: React.FC<Props> = ({ data, onDelete, onEdit, onToggle }) => {
  return (
    <div className="my-4">
      {data.length === 0 && <p className="mx-4">Empty list</p>}
      {data.map((todo) => (
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
