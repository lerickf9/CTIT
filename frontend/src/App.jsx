import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "./features/posts/postsThunks";
import PostForm from "./components/PostForm";
import PostFilter from "./components/PostFilter";
import PostList from "./components/PostList";

export default function App() {
  const dispatch = useDispatch();
  const status = useSelector((s) => s.posts.status);
  const error = useSelector((s) => s.posts.error);

  useEffect(() => {
    dispatch(fetchPosts()); // SOLO UNA VEZ
  }, [dispatch]);

  return (
    <div style={{ maxWidth: 720, margin: "40px auto", padding: 16 }}>
      <h1>Posts TCIT</h1>

      <PostFilter />

      {status === "loading" && <p>Cargando...</p>}
      {status === "failed" && <p style={{ color: "red" }}>{error}</p>}
      
      <PostList />
      <PostForm />
    </div>
  );
}
