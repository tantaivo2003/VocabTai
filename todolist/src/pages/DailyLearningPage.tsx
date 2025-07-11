// src/pages/DailyLearningPage.tsx
import { useParams } from "react-router-dom";

const DailyLearningPage = () => {
  const { date } = useParams();

  return (
    <div>
      <h1 className="text-2xl font-bold">Daily Learning</h1>
      <p>Học từ vựng cho ngày: {date}</p>
    </div>
  );
};

export default DailyLearningPage;
