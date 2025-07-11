import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./contexts/AuthContext";

import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import MainLayout from "./layouts/MainLayout";
import DashboardPage from "./pages/DashboardPage";
import TodoCalendarPage from "./pages/TodoCalendarPage";
import VocabularyPage from "./pages/VocabularyPage";
import TopicDetailPage from "./pages/TopicDetailPage";
import DailyLearningPage from "./pages/DailyLearningPage";

function App() {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      <Route
        path="/"
        element={isAuthenticated ? <MainLayout /> : <Navigate to="/login" />}
      >
        <Route index element={<DashboardPage />} />
        <Route path="calendar" element={<TodoCalendarPage />} />
        <Route path="vocabulary" element={<VocabularyPage />} />
        <Route path="topic" element={<TopicDetailPage />} />
        <Route path="vocabulary/daily/:date" element={<DailyLearningPage />} />
      </Route>

      <Route
        path="*"
        element={<Navigate to={isAuthenticated ? "/" : "/login"} />}
      />
    </Routes>
  );
}

export default App;
