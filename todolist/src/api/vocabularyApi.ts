const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";

export async function getVocabularies(topic_id?: number) {
  const url = topic_id
    ? `${BASE_URL}/vocabularies?topic_id=${topic_id}`
    : `${BASE_URL}/vocabularies`;

  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch vocabularies");
  return res.json();
}


export async function createVocabulary(data: {
  word: string;
  meaning: string;
  context: string;
  pronunciation: string;
  topic_id: number;
}) {
  const res = await fetch(`${BASE_URL}/vocabularies`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Failed to create vocabulary");
  return res.json();
}

export async function getVocabularyById(id: number) {
  const res = await fetch(`${BASE_URL}/vocabularies/${id}`);

  if (!res.ok) throw new Error("Failed to fetch vocabulary");
  return res.json();
}

export async function updateVocabulary(id: number, data: {
  word: string;
  meaning: string;
  context: string;
  pronunciation: string;
  topic_id: number;
}) {
  const res = await fetch(`${BASE_URL}/vocabularies/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Failed to update vocabulary");
  return res.json();
}

export async function deleteVocabulary(id: number) {
  const res = await fetch(`${BASE_URL}/vocabularies/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) throw new Error("Failed to delete vocabulary");
  return res.json();
}
