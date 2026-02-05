import { createAsyncThunk } from "@reduxjs/toolkit";

const API_URL = "http://localhost:3000";

async function parseError(res) {
  try {
    const data = await res.json();
    return data?.message || `HTTP ${res.status}`;
  } catch {
    return `HTTP ${res.status}`;
  }
}

export const fetchPosts = createAsyncThunk("posts/fetchAll", async () => {
  const res = await fetch(`${API_URL}/posts`);
  if (!res.ok) throw new Error(await parseError(res));
  return res.json(); 
});

export const createPost = createAsyncThunk(
  "posts/create",
  async ({ Nombre, Descripcion }) => {
    const res = await fetch(`${API_URL}/posts`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ Nombre, Descripcion }),
    });

    if (!res.ok) throw new Error(await parseError(res));
    return res.json(); 
  }
);

export const deletePost = createAsyncThunk("posts/delete", async (id) => {
  const res = await fetch(`${API_URL}/posts/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error(await parseError(res));
  return res.json(); 
});
