export const selectNoteCollections = (state) => ({
  noteCollections: state.noteCollections.noteCollections,
  isLoading: state.noteCollections.isFetching,
});
