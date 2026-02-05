import { useDispatch, useSelector } from "react-redux";
import { selectFilteredPosts } from "../features/posts/postsSelectors";
import { deletePost } from "../features/posts/postsThunks";

export default function PostList() {
  const dispatch = useDispatch();
  const posts = useSelector(selectFilteredPosts);

  if (posts.length === 0) return <p>No hay posts.</p>;

  return (
    <div style={{ marginBottom: "32px" }}>
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          marginTop: 16,
        }}
      >
        <thead>
          <tr style={{ backgroundColor: "#0c0c0c" }}>
            <th style={cellStyle}>Nombre</th>
            <th style={cellStyle}>Descripción</th>
            <th style={cellStyle}>Acción</th>
          </tr>
        </thead>

        <tbody>
          {posts.map((p) => (
            <tr key={p.id}>
              <td style={cellStyle}>{p.Nombre}</td>
              <td style={cellStyle}>{p.Descripcion}</td>
              <td style={cellStyle}>
                <button onClick={() => dispatch(deletePost(p.id))}>
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const cellStyle = {
  border: "1px solid #ccc",
  padding: "8px",
  textAlign: "left",

}
