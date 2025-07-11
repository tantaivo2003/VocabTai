import { useEffect, useState } from "react";
import type { Vocabulary } from "../types/vocabulary";
import {
  getVocabularies,
  createVocabulary,
  updateVocabulary,
  deleteVocabulary,
} from "../api/vocabularyApi";

export function useVocabularies(topicId?: number) {
  const [vocabularies, setVocabularies] = useState<Vocabulary[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 🔄 Load vocabularies mỗi khi topicId thay đổi
  useEffect(() => {
    if (!topicId) return;

    (async () => {
      setLoading(true);
      try {
        const fetched = await getVocabularies(topicId);
        setVocabularies(fetched);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    })();
  }, [topicId]);

  // ✅ Thêm từ mới
  const addVocabulary = async (vocab: {
    word: string;
    meaning: string;
    context: string;
    pronunciation: string;
  }) => {
    if (!topicId) return;
    try {
      const newVocab = await createVocabulary({ ...vocab, topic_id: topicId });
      setVocabularies((prev) => [newVocab, ...prev]);
    } catch (err: any) {
      setError(err.message);
    }
  };

  // ✅ Cập nhật từ
  const updateVocabularyById = async (
    id: number,
    data: {
      word: string;
      meaning: string;
      context: string;
      pronunciation: string;
    }
  ) => {
    if (!topicId) return;
    try {
      const updated = await updateVocabulary(id, { ...data, topic_id: topicId });
      setVocabularies((prev) =>
        prev.map((v) => (v.id === id ? { ...v, ...updated } : v))
      );
    } catch (err: any) {
      setError(err.message);
    }
  };

  // ✅ Xoá từ
  const deleteVocabularyById = async (id: number) => {
    try {
      await deleteVocabulary(id);
      setVocabularies((prev) => prev.filter((v) => v.id !== id));
    } catch (err: any) {
      setError(err.message);
    }
  };

  return {
    vocabularies,
    loading,
    error,
    addVocabulary,
    updateVocabularyById,
    deleteVocabularyById,
  };
}
