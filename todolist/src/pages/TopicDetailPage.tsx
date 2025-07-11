import { useEffect, useState } from "react";
import { useTopics } from "../hooks/useTopics";
import { useVocabularies } from "../hooks/useVocabularies";

const TopicDetailPage = () => {
  const {
    topics,
    addTopic,
    updateTopicById,
    deleteTopicById,
    loading: loadingTopics,
    error,
  } = useTopics();
  const [selectedTopicId, setSelectedTopicId] = useState<number | null>(null);

  const {
    vocabularies,
    loading,
    error: vocabError,
    addVocabulary,
    updateVocabularyById,
    deleteVocabularyById,
  } = useVocabularies(selectedTopicId ?? undefined);
  const [newTopic, setNewTopic] = useState({ name: "", description: "" });
  const [editingTopicId, setEditingTopicId] = useState<number | null>(null);
  const [topicEditForm, setTopicEditForm] = useState({
    name: "",
    description: "",
  });

  const [form, setForm] = useState({
    word: "",
    meaning: "",
    context: "",
    pronunciation: "",
  });
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editForm, setEditForm] = useState({
    word: "",
    meaning: "",
    context: "",
    pronunciation: "",
  });

  // ✅ Gán topic đầu tiên làm mặc định
  useEffect(() => {
    if (topics.length > 0 && selectedTopicId === null) {
      setSelectedTopicId(topics[0].id);
    }
  }, [topics, selectedTopicId]);

  // ✅ Thêm từ vựng
  const handleAdd = async () => {
    if (!selectedTopicId) return;
    try {
      await addVocabulary(form);
      setForm({
        word: "",
        meaning: "",
        context: "",
        pronunciation: "",
      });
    } catch (err) {
      console.error("Lỗi thêm từ:", err);
    }
  };

  return (
    <div className="flex h-screen">
      {/* 📌 Sidebar: Danh sách chủ đề */}
      <aside className="w-1/4 border-r p-4 overflow-y-auto">
        <h2 className="text-xl font-semibold mb-4">📚 Chủ đề</h2>

        {loadingTopics ? (
          <p>Đang tải chủ đề...</p>
        ) : error ? (
          <p className="text-red-500">Lỗi: {error}</p>
        ) : (
          <ul className="space-y-2">
            {topics.map((t) => (
              <li key={t.id}>
                {editingTopicId === t.id ? (
                  <div className="space-y-1">
                    <input
                      className="w-full border px-2 py-1 rounded"
                      value={topicEditForm.name}
                      onChange={(e) =>
                        setTopicEditForm({
                          ...topicEditForm,
                          name: e.target.value,
                        })
                      }
                    />
                    <input
                      className="w-full border px-2 py-1 rounded"
                      value={topicEditForm.description}
                      onChange={(e) =>
                        setTopicEditForm({
                          ...topicEditForm,
                          description: e.target.value,
                        })
                      }
                    />
                    <div className="flex space-x-2">
                      <button
                        className={`flex-1 px-2 py-1 rounded text-white ${
                          topicEditForm.name.trim() &&
                          topicEditForm.description.trim()
                            ? "bg-green-500 hover:bg-green-600"
                            : "bg-green-300 cursor-not-allowed"
                        }`}
                        disabled={
                          !topicEditForm.name.trim() ||
                          !topicEditForm.description.trim()
                        }
                        onClick={async () => {
                          await updateTopicById(t.id, topicEditForm);
                          setEditingTopicId(null);
                        }}
                      >
                        💾 Lưu
                      </button>

                      <button
                        className="flex-1 bg-gray-400 text-white px-2 py-1 rounded"
                        onClick={() => setEditingTopicId(null)}
                      >
                        ❌ Huỷ
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => setSelectedTopicId(t.id)}
                      className={`text-left flex-1 p-2 rounded hover:bg-blue-100 ${
                        t.id === selectedTopicId
                          ? "bg-blue-200 font-medium"
                          : ""
                      }`}
                    >
                      {t.name}
                    </button>
                    <div className="space-x-1">
                      <button
                        className="text-yellow-600 hover:text-yellow-800"
                        onClick={() => {
                          setEditingTopicId(t.id);
                          setTopicEditForm({
                            name: t.name,
                            description: t.description,
                          });
                        }}
                      >
                        ✏️
                      </button>
                      <button
                        className="text-red-500 hover:text-red-700"
                        onClick={async () => {
                          const confirm = window.confirm(
                            `Xoá chủ đề "${t.name}"?`
                          );
                          if (confirm) {
                            await deleteTopicById(t.id);
                            if (selectedTopicId === t.id)
                              setSelectedTopicId(null);
                          }
                        }}
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}

        {/* 🆕 Thêm chủ đề mới */}
        <div className="mb-4 mt-10 space-y-2">
          <input
            className="w-full border px-2 py-1 rounded"
            placeholder="Tên chủ đề"
            value={newTopic.name}
            onChange={(e) => setNewTopic({ ...newTopic, name: e.target.value })}
          />
          <input
            className="w-full border px-2 py-1 rounded"
            placeholder="Mô tả"
            value={newTopic.description}
            onChange={(e) =>
              setNewTopic({ ...newTopic, description: e.target.value })
            }
          />
          <button
            className={`w-full px-2 py-1 rounded text-white ${
              newTopic.name.trim() && newTopic.description.trim()
                ? "bg-blue-500 hover:bg-blue-600"
                : "bg-blue-300 cursor-not-allowed"
            }`}
            disabled={!newTopic.name.trim() || !newTopic.description.trim()}
            onClick={async () => {
              if (!newTopic.name.trim() || !newTopic.description.trim()) return;
              await addTopic(newTopic.name, newTopic.description);
              setNewTopic({ name: "", description: "" });
            }}
          >
            ➕ Thêm chủ đề
          </button>
        </div>
      </aside>

      {/* 📖 Content chính */}
      <main className="flex-1 p-6 overflow-y-auto">
        <h1 className="text-2xl font-bold mb-2">📘 Từ vựng trong chủ đề</h1>
        <p className="text-gray-600 mb-6">
          Chủ đề đang chọn:{" "}
          <strong>
            {topics.find((t) => t.id === selectedTopicId)?.name ||
              "Đang tải..."}
          </strong>
        </p>

        {/* 📝 Form thêm từ mới */}
        <div className="bg-gray-100 p-4 rounded shadow mb-6">
          <h3 className="font-semibold mb-2">➕ Thêm từ mới</h3>
          <div className="grid grid-cols-2 gap-4">
            <input
              placeholder="Word"
              className="border rounded px-3 py-2"
              value={form.word}
              onChange={(e) => setForm({ ...form, word: e.target.value })}
            />
            <input
              placeholder="Meaning"
              className="border rounded px-3 py-2"
              value={form.meaning}
              onChange={(e) => setForm({ ...form, meaning: e.target.value })}
            />
            <input
              placeholder="Context"
              className="border rounded px-3 py-2 col-span-2"
              value={form.context}
              onChange={(e) => setForm({ ...form, context: e.target.value })}
            />
            <input
              placeholder="Pronunciation"
              className="border rounded px-3 py-2 col-span-2"
              value={form.pronunciation}
              onChange={(e) =>
                setForm({ ...form, pronunciation: e.target.value })
              }
            />
          </div>
          <button
            onClick={handleAdd}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Lưu từ mới
          </button>
        </div>

        {/* 📄 Danh sách từ */}
        {loading ? (
          <p>Đang tải từ vựng...</p>
        ) : vocabError ? (
          <p className="text-red-500">Lỗi: {vocabError}</p>
        ) : vocabularies.length === 0 ? (
          <p className="text-gray-500 italic">
            Chưa có từ nào trong chủ đề này.
          </p>
        ) : (
          <ul className="space-y-4">
            {vocabularies.map((vocab) => {
              const isEditing = editingId === vocab.id;
              return (
                <li
                  key={vocab.id}
                  className="border rounded p-4 flex justify-between items-start"
                >
                  {isEditing ? (
                    // ✏️ Chế độ chỉnh sửa
                    <div className="w-full">
                      <input
                        className="w-full border rounded px-2 py-1 mb-2"
                        value={editForm.word}
                        onChange={(e) =>
                          setEditForm({ ...editForm, word: e.target.value })
                        }
                      />
                      <input
                        className="w-full border rounded px-2 py-1 mb-2"
                        value={editForm.meaning}
                        onChange={(e) =>
                          setEditForm({ ...editForm, meaning: e.target.value })
                        }
                      />
                      <input
                        className="w-full border rounded px-2 py-1 mb-2"
                        value={editForm.context}
                        onChange={(e) =>
                          setEditForm({ ...editForm, context: e.target.value })
                        }
                      />
                      <input
                        className="w-full border rounded px-2 py-1 mb-2"
                        value={editForm.pronunciation}
                        onChange={(e) =>
                          setEditForm({
                            ...editForm,
                            pronunciation: e.target.value,
                          })
                        }
                      />
                      <div className="space-x-2 mt-2">
                        <button
                          className="px-3 py-1 text-sm bg-green-500 text-white rounded"
                          onClick={async () => {
                            await updateVocabularyById(vocab.id, {
                              ...editForm,
                            });
                            setEditingId(null);
                          }}
                        >
                          Lưu
                        </button>
                        <button
                          className="px-3 py-1 text-sm bg-gray-400 text-white rounded"
                          onClick={() => setEditingId(null)}
                        >
                          Hủy
                        </button>
                      </div>
                    </div>
                  ) : (
                    // 📄 Hiển thị từ
                    <>
                      <div>
                        <h4 className="text-lg font-semibold">{vocab.word}</h4>
                        <p className="text-sm text-gray-600 mb-1">
                          <strong>Ý nghĩa:</strong> {vocab.meaning}
                        </p>
                        <p className="text-sm text-gray-600 mb-1">
                          <strong>Ngữ cảnh:</strong> {vocab.context}
                        </p>
                        <p className="text-sm text-gray-600">
                          <strong>Phát âm:</strong> {vocab.pronunciation}
                        </p>
                      </div>
                      <div className="space-x-2">
                        <button
                          className="px-3 py-1 text-sm bg-yellow-400 text-white rounded"
                          onClick={() => {
                            setEditingId(vocab.id);
                            setEditForm({
                              word: vocab.word,
                              meaning: vocab.meaning,
                              context: vocab.context,
                              pronunciation: vocab.pronunciation,
                            });
                          }}
                        >
                          Sửa
                        </button>
                        <button
                          className="px-3 py-1 text-sm bg-red-500 text-white rounded"
                          onClick={() => deleteVocabularyById(vocab.id)}
                        >
                          Xoá
                        </button>
                      </div>
                    </>
                  )}
                </li>
              );
            })}
          </ul>
        )}
      </main>
    </div>
  );
};

export default TopicDetailPage;
