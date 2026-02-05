import { createAsyncThunk } from "@reduxjs/toolkit";

const API_URL = "http://localhost:3000"; // tu backend

export const fetchPosts = createAsyncThunk("posts/fetchAll", async () => {
  const res = await fetch(`${API_URL}/posts`);
  if (!res.ok) throw new Error("No se pudo cargar los posts");
  return res.json(); // [{ id, Nombre, Descripcion }]
});

export const createPost = createAsyncThunk(
  "posts/create",
  async ({ Nombre, Descripcion }) => {
    const res = await fetch(`${API_URL}/posts`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ Nombre, Descripcion }),
    });

    if (!res.ok) throw new Error("No se pudo crear el post");
    return res.json(); // { id, Nombre, Descripcion }
  }
);

export const deletePost = createAsyncThunk(
  "posts/delete",
  async (id) => {
    const res = await fetch(`${API_URL}/posts/${id}`, {
      method: "DELETE",
    });

    if (!res.ok) throw new Error("No se pudo eliminar el post");
    return res.json(); // tu backend devuelve { id, Nombre, Descripcion }
  }
);
