import TodoItem from "../../types";

type Props = {
  data: TodoItem[];
  setFilteredToDos: (todos: TodoItem[]) => void;
};

type FilterType = "ALL" | "ACTIVE" | "COMPLETED";

const Filter: React.FC<Props> = ({ data, setFilteredToDos }) => {
  const countFilteredTasks = (type: FilterType): number => {
    const filteredByType =
      type === "ALL"
        ? data
        : data.filter((todo) =>
            type === "COMPLETED" ? todo.completed : !todo.completed
          );

    return filteredByType.length;
  };

  const onFilter = (type: FilterType) => {
    const filtered =
      type === "ALL"
        ? data
        : data.filter((todo) =>
            type === "COMPLETED" ? todo.completed : !todo.completed
          );

    setFilteredToDos(filtered);
  };

  const CounterLabel = (props: { count: number }) => {
    return (
      <span className="inline-flex items-center justify-center w-6 h-6 ms-1 text-xs font-semibold text-blue-800 bg-blue-200 rounded-full">
        {Number(props.count)}
      </span>
    );
  };

  const filterValues: FilterType[] = ["ALL", "ACTIVE", "COMPLETED"];

  const FilterItems = () => {
    return filterValues.map((val, index) => (
      <button
        key={index}
        type="button"
        className="hover:underline capitalize"
        onClick={() => onFilter(val)}
      >
        {val.toLowerCase()}
        <CounterLabel count={countFilteredTasks(val)} />
      </button>
    ));
  };

  return (
    <div className="p-1 m-4  flex text-center content-center items-center gap-6">
      <FilterItems />
    </div>
  );
};

export default Filter;
