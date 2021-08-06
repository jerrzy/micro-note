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

export const selectNote = (selectedNote) => ({
  type: NotesActionTypes.SELECT_NOTE,
  payload: selectedNote,
});

/**
 * for new note, title is always "New Note", content is always "New Note Content"
 * @param {*} selectedNoteCollectionId
 * @returns
 */
export const addNoteRequest = (selectedNoteCollectionId) => ({
  type: NotesActionTypes.ADD_NOTE_REQUEST,
  payload: {
    selectedNoteCollectionId,
    title: "New Note",
    content: "Note Content goes here",
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

export const editNoteStart = () => {
  return {
    type: NotesActionTypes.EDIT_NOTE_START,
  };
};

export const editNoteRequest = ({
  noteCollectionId,
  note,
  newTitle,
  newContent,
}) => ({
  type: NotesActionTypes.EDIT_NOTE_REQUEST,
  payload: { noteCollectionId, note, newTitle, newContent },
});

export const editNoteSuccess = (note) => ({
  type: NotesActionTypes.EDIT_NOTE_SUCCESS,
  payload: note,
});

export const editNoteFailure = (errorMessage) => ({
  type: NotesActionTypes.EDIT_NOTE_FAILURE,
  payload: errorMessage,
});
