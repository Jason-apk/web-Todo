import { Trash } from "lucide-react";

type Priority = "strength" | "medium" | "low";
type Todo = {
  id: number;
  task: string;
  priority: Priority;
};
type props = {
  todo: Todo;
  deleteTodo: (id: number) => void;
  toggleSelectedTaskById: (id: number) => void;
  isSelected: boolean;
};
const todoItem = ({
  todo,
  deleteTodo,
  isSelected,
  toggleSelectedTaskById,
}: props) => {
  return (
    <li className="p-3">
      <div className="flex justify-between items-center">
        <div className="flex items-center justify-between gap-2">
          <input
            checked={isSelected}
            type="checkbox"
            className="checkbox checkbox-primary checkbox-sm"
            onChange={() => toggleSelectedTaskById(todo.id)}
          />
          <span className="font-bold text-md ml-2">
            <span>{todo.task}</span>
          </span>
          <span
            className={`badge badge-sm badge-soft ${
              todo.priority === "strength"
                ? "badge-error"
                : todo.priority === "medium"
                ? "badge-warning"
                : todo.priority === "low"
                ? "badge-success"
                : ""
            }`}
          >
            {todo.priority}
          </span>
        </div>
        <button
          onClick={() => {
            deleteTodo(todo.id);
            console.log("task deleted ✔");
          }}
          className="btn btn-error btn-soft btn-sm"
        >
          <Trash className="w-4 h-4" />
        </button>
      </div>
    </li>
  );
};

export default todoItem;
