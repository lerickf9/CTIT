import { createSlice } from "@reduxjs/toolkit";
import { fetchPosts } from "./postsThunks";

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
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { setFilter } = postsSlice.actions;
export default postsSlice.reducer;
