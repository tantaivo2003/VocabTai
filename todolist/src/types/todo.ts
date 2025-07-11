export interface Todo {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  start_time: string;      // ISO string (nên để string, xử lý với dayjs/new Date)
  end_time: string | null; // có thể null
  user_id: number;
  created_at: string;
  updated_at: string;
}


export interface CreateTodoInput {
  title: string;
  description: string;
  user_id: number;
  start_time: string; // ISO format, e.g. "2025-07-05T09:00:00.000Z"
}