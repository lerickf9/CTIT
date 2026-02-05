import { createSlice } from "@reduxjs/toolkit";
import { fetchPosts, createPost, deletePost } from "./postsThunks";

const initialState = {
  items: [],
  status: "idle",
  error: null,
  filter: "",
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    setFilter(state, action) {
      state.filter = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error?.message ?? "Error";
      })

      
      .addCase(createPost.fulfilled, (state, action) => {
        state.items.unshift(action.payload);
      })
      .addCase(createPost.rejected, (state, action) => {
        state.error = action.error?.message ?? "Error creando post";
      })

      
      .addCase(deletePost.fulfilled, (state, action) => {
        const deletedId = action.payload?.id;
        state.items = state.items.filter((p) => p.id !== deletedId);
      })
      .addCase(deletePost.rejected, (state, action) => {
        state.error = action.error?.message ?? "Error eliminando post";
      });
  },
});

export const { setFilter } = postsSlice.actions;
export default postsSlice.reducer;
