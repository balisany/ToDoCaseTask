import { FormEvent, useState } from "react";
import { TodoItem } from "../../types";

type Props = {
  data: TodoItem | undefined;
  onCancel: () => void;
  onUpdate: (id: string, title: string) => void;
};

const EditForm: React.FC<Props> = ({ data, onUpdate, onCancel }) => {
  const [value, setValue] = useState(data?.title);

  const handleOnSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!data?.id || !value?.trim()) return;
    onUpdate(data.id, value);
    setValue("");
  };

  return (
    <form onSubmit={(e) => handleOnSubmit(e)}>
      <div className="flex items-center border-b-2 border-teal-500 py-2 gap-2">
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
          Update
        </button>
        <button
          className="flex-shrink-0 bg-orange-500 hover:bg-orange-700 border-orange-500 hover:border-orange-700 text-sm border-4 text-white py-1 px-2 rounded"
          type="button"
          onClick={onCancel}
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default EditForm;
