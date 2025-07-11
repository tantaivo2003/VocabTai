// src/api/todoApi.ts
import type { CreateTodoInput } from "../types/todo";
const API_URL = import.meta.env.VITE_API_URL;

export async function getTodosByUserId(userId: number) {
  const res = await fetch(`${API_URL}/todos/user/${userId}`);

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || "Failed to fetch todos");
  }

  const data = await res.json();
  return data; // mảng todo
}
// ✅ todoApi.ts
export const createTodo = async (todo: CreateTodoInput) => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/todos`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`, // nếu có JWT auth
    },
    body: JSON.stringify(todo),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to create todo");
  }

  return response.json(); // Trả về todo mới tạo
};


export async function toggleTodoStatus(id: number) {
  const res = await fetch(`${API_URL}/todos/${id}/toggle`, {
    method: "PATCH",
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || "Failed to toggle todo");
  }

  const data = await res.json();
  return data; 
}

export async function deleteTodo(id: number) {
  const res = await fetch(`${API_URL}/todos/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || "Failed to delete todo");
  }

  return id; // Trả về ID của todo đã xóa
}

