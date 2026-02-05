import { useState } from "react";
import { useDispatch } from "react-redux";
import { createPost } from "../features/posts/postsThunks";

export default function PostForm() {
  const dispatch = useDispatch();
  const [Nombre, setNombre] = useState("");
  const [Descripcion, setDescripcion] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    const n = Nombre.trim();
    const d = Descripcion.trim();
    if (!n || !d) return;

    dispatch(createPost({ Nombre: n, Descripcion: d }));
    setNombre("");
    setDescripcion("");
  };

  return (
    <form onSubmit={onSubmit} style={{ display: "flex", gap: 8, marginBottom: 12 }}>
      <input value={Nombre} onChange={(e) => setNombre(e.target.value)} placeholder="Nombre" />
      <input value={Descripcion} onChange={(e) => setDescripcion(e.target.value)} placeholder="Descripcion" />
      <button type="submit">Crear</button>
    </form>
  );
}
