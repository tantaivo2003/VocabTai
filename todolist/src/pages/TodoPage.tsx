import background from "../assets/background.jpg";
import TodoList from "../components/todos/TodoList";
import { useTodos } from "../hooks/useTodos";
import { useAuth } from "../hooks/useAuth";

export default function TodoPage() {
  const userName = localStorage.getItem("userName") || "User";
  const userId = Number(localStorage.getItem("userId"));
  const { todos, toggleTodo, deleteTodo } = useTodos(userId);
  const { logout } = useAuth();

  return (
    <div
      className="w-full h-screen flex items-start justify-center bg-cover bg-center"
      style={{ backgroundImage: `url(${background})` }}
    >
      <div className="bg-white mt-20 p-4 rounded-lg shadow-md max-w-md mx-auto w-full">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">📝 Xin chào {userName}</h1>
          <button
            onClick={logout}
            className="text-sm bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
          >
            Đăng xuất
          </button>
        </div>

        <TodoList todos={todos} onToggle={toggleTodo} onDelete={deleteTodo} />
      </div>
    </div>
  );
}
