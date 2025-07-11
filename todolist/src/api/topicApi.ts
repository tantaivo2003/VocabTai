const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";

export async function fetchTopics() {
  const res = await fetch(`${BASE_URL}/topics`);
  return res.json();
}

export async function createTopic(data: { name: string; description: string }) {
  const res = await fetch(`${BASE_URL}/topics`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function getTopic(id: number) {
  const res = await fetch(`${BASE_URL}/topics/${id}`);
  return res.json();
}

export async function updateTopic(id: number, data: { name: string; description: string }) {
  const res = await fetch(`${BASE_URL}/topics/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function deleteTopic(id: number) {
  const res = await fetch(`${BASE_URL}/topics/${id}`, {
    method: "DELETE",
  });
  return res.json();
}
