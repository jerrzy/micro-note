import NotesActionTypes from "./notes.action.types";

export const fetchNotesStart = (selectedNoteCollection) => ({
  type: NotesActionTypes.FETCH_NOTES_START,
  payload: selectedNoteCollection,
});

export const fetchNotesSuccess = (notes) => ({
  type: NotesActionTypes.FETCH_NOTES_SUCCESS,
  payload: notes,
});

export const fetchNotesFailure = (errorMessage) => ({
  type: NotesActionTypes.FETCH_NOTES_FAILURE,
  payload: errorMessage,
});

// export const selectNote = (selectedNote) => ({
//   type: NotesActionTypes.SELECT_NOTE,
//   palyload: selectedNote,
// });

export const addNoteStart = () => ({
  type: NotesActionTypes.ADD_NOTE_START,
});

export const addNoteRequest = (selectedNoteCollectionId, title, content) => ({
  type: NotesActionTypes.ADD_NOTE_REQUEST,
  payload: {
    selectedNoteCollectionId,
    title,
    content,
  },
});

export const addNoteSuccess = (newNote) => ({
  type: NotesActionTypes.ADD_NOTE_SUCCESS,
  payload: newNote,
});

export const addNoteFailure = (errorMessage) => ({
  type: NotesActionTypes.ADD_NOTE_FAILURE,
  payload: errorMessage,
});

export const updateNoteStart = (note) => ({
  type: NotesActionTypes.UPDATE_NOTE_START,
  payload: note,
});

export const updateNoteRequest = (
  noteCollectionId,
  note,
  newTitle,
  newContent
) => ({
  type: NotesActionTypes.UPDATE_NOTE_REQUEST,
  payload: {
    noteCollectionId,
    note,
    newTitle,
    newContent,
  },
});

export const updateNoteSuccess = (newNote) => ({
  type: NotesActionTypes.UPDATE_NOTE_SUCCESS,
  payload: newNote,
});

export const updateNoteFailure = (errorMessage) => ({
  type: NotesActionTypes.UPDATE_NOTE_FAILURE,
  payload: errorMessage,
});

export const cancelNote = () => ({
  type: NotesActionTypes.CANCEL_NOTE,
});

export const deleteNoteRequest = (
  selectedNoteCollectionId,
  selectedNoteId
) => ({
  type: NotesActionTypes.DELETE_NOTE_REQUEST,
  payload: {
    selectedNoteCollectionId,
    selectedNoteId,
  },
});

export const deleteNoteSuccess = (selectedNote) => ({
  type: NotesActionTypes.DELETE_NOTE_SUCCESS,
  payload: selectedNote,
});

export const deleteNoteFailure = (errorMessage) => ({
  type: NotesActionTypes.DELETE_NOTE_FAILURE,
  payload: errorMessage,
});
