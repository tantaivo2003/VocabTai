import { useEffect, useState } from "react";
import type { Todo } from "../types/todo";
import {
  getTodosByUserId,
  createTodo,
  toggleTodoStatus,
  deleteTodo as deleteTodoApi,
} from "../api/todoApi";

export function useTodos(userId: number) {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 🔄 Load todos khi component mount hoặc userId thay đổi
  useEffect(() => {
    if (!userId) return;
    (async () => {
      setLoading(true);
      try {
        const fetchedTodos = await getTodosByUserId(userId);
        setTodos(fetchedTodos);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    })();
  }, [userId]);

  // ✅ Thêm todo
  const addTodo = async (
    title: string,
    description: string,
    start_time: string
  ) => {
    try {
      const newTodo = await createTodo({
        title,
        description,
        user_id: userId,
        start_time, // ✅ Thêm trường này
      });
      setTodos((prev) => [newTodo, ...prev]);
    } catch (err: any) {
      setError(err.message);
    }
  };


  // ✅ Toggle trạng thái
  const toggleTodo = async (id: number) => {
    try {
      const updated = await toggleTodoStatus(id);
      setTodos((prev) =>
        prev.map((todo) => (todo.id === id ? updated : todo))
      );
    } catch (err: any) {
      setError(err.message);
    }
  };

  // ✅ Xoá todo
  const deleteTodo = async (id: number) => {
    try {
      await deleteTodoApi(id);
      setTodos((prev) => prev.filter((todo) => todo.id !== id));
    } catch (err: any) {
      setError(err.message);
    }
  };

  return {
    todos,
    loading,
    error,
    addTodo,
    toggleTodo,
    deleteTodo,
  };
}
