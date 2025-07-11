import { useEffect, useState } from "react";
import type { Topic } from "../types/topic";
import {
  fetchTopics,
  createTopic,
  updateTopic,
  deleteTopic,
} from "../api/topicApi";

export function useTopics() {
  const [topics, setTopics] = useState<Topic[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 🔄 Load topics khi component mount
  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const fetched = await fetchTopics();
        setTopics(fetched);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // ✅ Thêm topic mới
  const addTopic = async (name: string, description: string) => {
    try {
      const newTopic = await createTopic({ name, description });
      setTopics((prev) => [...prev, newTopic]);
    } catch (err: any) {
      setError(err.message);
    }
  };

  // ✅ Cập nhật topic
  const updateTopicById = async (
    id: number,
    data: { name: string; description: string }
  ) => {
    try {
      const updated = await updateTopic(id, data);
      setTopics((prev) =>
        prev.map((t) => (t.id === id ? { ...t, ...updated } : t))
      );
    } catch (err: any) {
      setError(err.message);
    }
  };

  // ✅ Xoá topic
  const deleteTopicById = async (id: number) => {
    try {
      await deleteTopic(id);
      setTopics((prev) => prev.filter((t) => t.id !== id));
    } catch (err: any) {
      setError(err.message);
    }
  };

  return {
    topics,
    loading,
    error,
    addTopic,
    updateTopicById,
    deleteTopicById,
  };
}
