import TodoItem from "../../../types";
import { CheckBox } from "../../Icons/Checkbox";
import { Delete } from "../../Icons/Delete";
import { Edit } from "../../Icons/Edit";
import styles from "./ListItem.module.scss";

type Props = {
  data: TodoItem;
  onToggle: (id: string, status: boolean) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string) => void;
};

const ListItem: React.FC<Props> = ({ data, onEdit, onDelete, onToggle }) => {
  const { id, title, completed } = data;

  const CheckBoxOutput = () => {
    return (
      <div className="inline-flex items-center">
        <label
          className="relative flex items-center p-3 rounded-full cursor-pointer"
          htmlFor={id}
        >
          <input
            type="checkbox"
            className="before:content[''] peer relative h-8 w-8 cursor-pointer appearance-none rounded-full border border-gray-900/20 bg-gray-900/10 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:checked:bg-emerald-500 checked:bg-emerald-500 checked:before:bg-gray-900 hover:scale-105 hover:before:opacity-0"
            id={id}
            onChange={() => onToggle(id, !completed)}
            checked={completed}
          />
          <CheckBox />
        </label>
      </div>
    );
  };

  return (
    <div className={styles.wrapper}>
      <CheckBoxOutput />
      <p
        className={`w-full ${
          completed ? "line-through text-green" : "text-grey-darkest"
        }`}
      >
        {title}
      </p>

      <div className={styles.meta}>
        <button
          className="text-blue-500 border border-blue-500 hover:bg-blue-500 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-1.5 text-center inline-flex items-center disabled:bg-gray-300 disabled:text-gray-500 disabled:border-gray-200"
          type="button"
          title="Edit task"
          disabled={data.completed}
          onClick={() => onEdit(id)}
        >
          <Edit />
          <span className="sr-only">{`edit task ${title}`}</span>
        </button>
        <button
          className="text-red-500 border border-red-500 hover:bg-red-500 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-1.5 text-center inline-flex items-center"
          type="button"
          title="Delete task"
          onClick={() => onDelete(id)}
        >
          <Delete />
          <span className="sr-only">{`delete task ${title}`}</span>
        </button>
      </div>
    </div>
  );
};

export default ListItem;
