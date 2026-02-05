import { useDispatch, useSelector } from "react-redux";
import { selectFilteredPosts } from "../features/posts/postsSelectors";
import { deletePost } from "../features/posts/postsThunks";

export default function PostList() {
  const dispatch = useDispatch();
  const posts = useSelector(selectFilteredPosts);

  if (posts.length === 0) return <p>No hay posts.</p>;

  return (
    <ul style={{ paddingLeft: 16 }}>
      {posts.map((p) => (
        <li key={p.id} style={{ marginBottom: 8 }}>
          <b>{p.Nombre}</b> — {p.Descripcion}{" "}
          <button onClick={() => dispatch(deletePost(p.id))}>
            Eliminar
          </button>
        </li>
      ))}
    </ul>
  );
}
