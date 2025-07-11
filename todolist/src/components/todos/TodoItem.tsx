import type { Todo } from "../../types/todo";

export default function TodoItem({
  todo,
  onToggle,
  onDelete,
}: {
  todo: Todo;
  onToggle: () => void;
  onDelete: () => void;
}) {
  return (
    <div className="flex justify-between items-center p-2">
      <div
        className={`cursor-pointer ${
          todo.completed ? "line-through text-gray-400" : ""
        }`}
        onClick={onToggle}
      >
        {todo.title}
      </div>
      <button
        onClick={onDelete}
        className="text-red-500 cursor-pointer hover:text-red-700 transition-colors duration-200"
      >
        ✕
      </button>
    </div>
  );
}
