export const selectFilteredPosts = (state) => {
  const { items, filter } = state.posts;

  const f = (filter ?? "").toString().trim().toLowerCase();
  if (!f) return items;

  return items.filter((p) =>
    (p.Nombre ?? "").toString().toLowerCase().includes(f)
  );
};