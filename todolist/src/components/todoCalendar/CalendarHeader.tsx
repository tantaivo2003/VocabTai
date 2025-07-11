// components/CalendarHeader.tsx
import dayjs from "dayjs";

interface Props {
  currentMonth: dayjs.Dayjs;
  onPrev: () => void;
  onNext: () => void;
}

const CalendarHeader = ({ currentMonth, onPrev, onNext }: Props) => {
  return (
    <div className="flex justify-between items-center mb-4">
      <button onClick={onPrev} className="px-3 py-1 bg-gray-300 rounded">
        ◀
      </button>
      <h2 className="text-xl font-bold">{currentMonth.format("MMMM YYYY")}</h2>
      <button onClick={onNext} className="px-3 py-1 bg-gray-300 rounded">
        ▶
      </button>
    </div>
  );
};

export default CalendarHeader;
