// store/todoSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getTodosByUserId,
  createTodo,
  toggleTodoStatus,
  deleteTodo as deleteTodoApi,
} from "../api/todoApi";
import type { Todo } from "../types/todo";

const initialState: { todos: Todo[]; loading: boolean; error: string | null } = {
  todos: [],
  loading: false,
  error: null,
};

export const fetchTodos = createAsyncThunk(
  "todos/fetchTodos",
  async (userId: number) => await getTodosByUserId(userId)
);

export const addTodo = createAsyncThunk(
  "todos/addTodo",
  async ({ userId, title, description, start_time }: { userId: number; title: string; description: string; start_time: string }) =>
    await createTodo({ user_id: userId, title, description, start_time })
);

export const toggleTodo = createAsyncThunk("todos/toggle", toggleTodoStatus);

export const deleteTodo = createAsyncThunk("todos/delete", deleteTodoApi);

const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.todos = action.payload;
      })
      .addCase(addTodo.fulfilled, (state, action) => {
        state.todos.unshift(action.payload);
      })
      .addCase(toggleTodo.fulfilled, (state, action) => {
        const idx = state.todos.findIndex((t) => t.id === action.payload.id);
        if (idx !== -1) state.todos[idx] = action.payload;
      })
      .addCase(deleteTodo.fulfilled, (state, action) => {
        state.todos = state.todos.filter((t) => t.id !== action.payload);
      });
  },
});

export default todoSlice.reducer;
