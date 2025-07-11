import { useState } from "react";

export default function TodoInput({
  onAdd,
}: {
  onAdd: (title: string, description: string) => void;
}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;
    onAdd(title.trim(), description.trim());
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex border border-gray-300 px-2 rounded-2xl">
        <input
          className="w-1/4 py-2 border-r focus:outline-none focus:border-amber-500"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter title..."
        />
        <input
          className="flex-1 w-3/4 ml-2 focus:outline-none focus:border-amber-500"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter description..."
        />
      </div>
      <div className="flex justify-end">
        <button
          type="submit"
          className="bg-amber-200 px-10 py-2 my-2 rounded flex justify-end cursor-pointer hover:bg-amber-300 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Add
        </button>
      </div>
    </form>
  );
}
