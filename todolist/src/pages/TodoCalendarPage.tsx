import { useState } from "react";

import dayjs from "dayjs";

import CalendarHeader from "../components/todoCalendar/CalendarHeader";
import CalendarGrid from "../components/todoCalendar/CalendarGrid";
import { useTodos } from "../hooks/useTodos";

const TodoCalendarPage = () => {
  const [currentMonth, setCurrentMonth] = useState(dayjs());

  const userId = Number(localStorage.getItem("userId"));

  const { todos, addTodo, toggleTodo, deleteTodo, loading, error } =
    useTodos(userId);

  const handlePrev = () => setCurrentMonth(currentMonth.subtract(1, "month"));
  const handleNext = () => setCurrentMonth(currentMonth.add(1, "month"));

  return (
    <div className="p-4">
      <CalendarHeader
        currentMonth={currentMonth}
        onPrev={handlePrev}
        onNext={handleNext}
      />

      {loading && <p className="text-gray-500">Đang tải công việc...</p>}
      {error && <p className="text-red-500">Lỗi: {error}</p>}

      <CalendarGrid
        currentMonth={currentMonth}
        todos={todos}
        addTodo={addTodo}
        toggleTodo={toggleTodo}
        deleteTodo={deleteTodo}
      />
    </div>
  );
};

export default TodoCalendarPage;
