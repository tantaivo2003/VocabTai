import { useState } from "react";
import dayjs from "dayjs";
import type { Todo } from "../../types/todo";
import TodoModal from "./TodoModal";
import {
  useFloating,
  offset,
  flip,
  shift,
  autoUpdate,
} from "@floating-ui/react";
import { useClick, useDismiss, useInteractions } from "@floating-ui/react";

interface CalendarCellProps {
  date: dayjs.Dayjs;
  currentMonth: dayjs.Dayjs;
  todos: Todo[];
  addTodo: (title: string, description: string, start_time: string) => void;
  toggleTodo: (id: number) => void;
  deleteTodo: (id: number) => void;
}
const CalendarCell = ({
  date,
  currentMonth,
  todos,
  addTodo,
  toggleTodo,
  deleteTodo,
}: CalendarCellProps) => {
  const isToday = date.isSame(dayjs(), "day");
  const isCurrentMonth = date.month() === currentMonth.month();
  const [open, setOpen] = useState(false);

  const { refs, floatingStyles, context } = useFloating({
    open,
    onOpenChange: setOpen,
    middleware: [offset(10), flip(), shift()],
    placement: "right",
    whileElementsMounted: autoUpdate,
  });

  const click = useClick(context);
  const dismiss = useDismiss(context);
  const { getReferenceProps, getFloatingProps } = useInteractions([
    click,
    dismiss,
  ]);

  return (
    <>
      {/* Ô ngày */}
      <div
        ref={refs.setReference}
        {...getReferenceProps()}
        className={`
          border p-2 h-24 rounded cursor-pointer relative
          ${!isCurrentMonth ? "bg-gray-100 text-gray-400" : ""}
          ${isToday ? "border-blue-500" : "border-gray-300"}
        `}
      >
        <div className="text-sm font-semibold">{date.date()}</div>

        {todos.length > 0 && (
          <div className="text-sm mt-1 text-green-600 space-y-0.5">
            {todos.slice(0, 2).map((todo) => (
              <div key={todo.id} className="truncate">
                • {todo.title}
              </div>
            ))}
            {todos.length > 2 && (
              <div className="text-gray-400">
                ...và {todos.length - 2} công việc khác
              </div>
            )}
          </div>
        )}
      </div>

      {/* 🪟 Pop-up modal nổi */}
      {open && (
        <div
          ref={refs.setFloating}
          style={{ ...floatingStyles, zIndex: 999 }}
          {...getFloatingProps()}
        >
          <TodoModal
            onClose={() => setOpen(false)}
            todos={todos}
            date={date.toISOString()}
            addTodo={addTodo}
            toggleTodo={toggleTodo}
            deleteTodo={deleteTodo}
          />
        </div>
      )}
    </>
  );
};

export default CalendarCell;
