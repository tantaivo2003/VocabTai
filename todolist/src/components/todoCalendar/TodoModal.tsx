import { useState } from "react";
import type { Todo } from "../../types/todo";
import dayjs from "dayjs";
import { CheckCircle, Circle, Trash2 } from "lucide-react";

interface TodoModalProps {
  date: string;
  todos: Todo[];
  onClose: () => void;
  addTodo: (title: string, description: string, start_time: string) => void;
  toggleTodo: (id: number) => void;
  deleteTodo: (id: number) => void;
}

const TodoModal = ({
  date,
  todos,
  onClose,
  addTodo,
  toggleTodo,
  deleteTodo,
}: TodoModalProps) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = () => {
    if (!title.trim()) return;
    addTodo(title.trim(), description.trim(), date);
    setTitle("");
    setDescription("");
  };

  return (
    <div className="w-2xl sm:w-full bg-white border p-4 rounded-xl shadow-2xl">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-bold text-lg text-gray-800">
          📅 {dayjs(date).format("DD/MM/YYYY")}
        </h2>
        <button
          onClick={onClose}
          className="text-red-500 text-lg font-bold hover:scale-110"
        >
          ✕
        </button>
      </div>

      {/* Todo List */}
      <div className="space-y-2 max-h-52 overflow-y-auto">
        {todos.length === 0 ? (
          <p className="text-sm text-gray-500 italic">Chưa có công việc nào.</p>
        ) : (
          todos.map((todo) => (
            <div
              key={todo.id}
              className={`flex items-start justify-between gap-2 p-2 border rounded-lg ${
                todo.completed ? "bg-green-50" : "bg-gray-50"
              }`}
            >
              <div className="flex-1">
                <div
                  className={`font-medium ${
                    todo.completed
                      ? "line-through text-gray-400"
                      : "text-gray-800"
                  }`}
                >
                  {todo.title}
                </div>
                <p className="text-xs text-gray-600 whitespace-pre-wrap break-words">
                  {todo.description}
                </p>
              </div>
              <div className="flex flex-col items-center gap-1">
                <button
                  onClick={() => toggleTodo(todo.id)}
                  className="text-blue-500 hover:text-blue-700"
                  title="Đánh dấu hoàn thành"
                >
                  {todo.completed ? (
                    <CheckCircle size={20} />
                  ) : (
                    <Circle size={20} />
                  )}
                </button>
                <button
                  onClick={() => deleteTodo(todo.id)}
                  className="text-red-400 hover:text-red-600"
                  title="Xoá"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Form Thêm Todo */}
      <div className="mt-4 space-y-2">
        <input
          type="text"
          placeholder="Tiêu đề"
          className="w-full border px-3 py-2 rounded focus:outline-none focus:ring focus:border-blue-500 text-sm"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Mô tả"
          className="w-full border px-3 py-2 rounded focus:outline-none focus:ring focus:border-blue-500 text-sm"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={2}
        />
        <div className="text-right">
          <button
            onClick={handleSubmit}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm"
          >
            Thêm công việc
          </button>
        </div>
      </div>
    </div>
  );
};

export default TodoModal;
