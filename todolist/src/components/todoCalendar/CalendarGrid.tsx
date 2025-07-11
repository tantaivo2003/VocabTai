// components/CalendarGrid.tsx
import dayjs from "dayjs";
import CalendarCell from "./CalendarCell";
import type { Todo } from "../../types/todo";

interface Props {
  currentMonth: dayjs.Dayjs;
  todos: Todo[];
  addTodo: (title: string, description: string, start_time: string) => void;
  toggleTodo: (id: number) => void;
  deleteTodo: (id: number) => void;
}

const CalendarGrid = ({
  currentMonth,
  todos,
  addTodo,
  toggleTodo,
  deleteTodo,
}: Props) => {
  const startOfMonth = currentMonth.startOf("month");
  const startDate = startOfMonth.startOf("week"); // bắt đầu từ Chủ nhật

  const days: dayjs.Dayjs[] = [];
  for (let i = 0; i < 42; i++) {
    days.push(startDate.add(i, "day"));
  }

  const dayLabels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <div>
      <div className="grid grid-cols-7 text-center font-semibold mb-2">
        {dayLabels.map((day) => (
          <div key={day}>{day}</div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {days.map((day) => (
          <CalendarCell
            key={day.toString()}
            date={day}
            currentMonth={currentMonth}
            todos={todos.filter((todo) =>
              dayjs(todo.start_time).isSame(day, "day")
            )}
            addTodo={addTodo}
            toggleTodo={toggleTodo}
            deleteTodo={deleteTodo}
          />
        ))}
      </div>
    </div>
  );
};

export default CalendarGrid;
