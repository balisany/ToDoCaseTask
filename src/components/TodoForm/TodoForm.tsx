import { FormEvent, useState } from "react";

type Props = {
  onSubmit: (title: string) => void;
};

const TodoForm: React.FC<Props> = ({ onSubmit }) => {
  const [value, setValue] = useState("");

  const handleOnSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!value.trim()) return;
    onSubmit(value);
    setValue("");
  };

  return (
    <form onSubmit={(e) => handleOnSubmit(e)}>
      <div className="flex items-center border-b-2 border-teal-500 py-2">
        <input
          className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
          type="text"
          placeholder="Add a task"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <button
          className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded"
          type="button"
          onClick={(e) => handleOnSubmit(e)}
        >
          Add
        </button>
      </div>
    </form>
  );
};

export default TodoForm;
