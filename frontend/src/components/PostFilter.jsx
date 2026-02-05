import { useDispatch, useSelector } from "react-redux";
import { setFilter } from "../features/posts/postsSlice";

export default function PostFilter() {
  const dispatch = useDispatch();
  const filter = useSelector((s) => s.posts.filter);

  return (
    <input
      value={filter}
      onChange={(e) => dispatch(setFilter(e.target.value))}
      placeholder="Filtrar por Nombre..."
      style={{ width: "100%", marginBottom: 12 }}
    />
  );
}
