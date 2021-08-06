import NotesActionTypes from "./notes.action.types";

const INITIAL_STATE = {
  notes: [],
  selectedNote: null,
  isFetching: false,
  isEditing: false,
  errorMessage: "",
};

export const NotesReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case NotesActionTypes.FETCH_NOTES_START:
      return {
        ...state,
        isFetching: true,
      };
    case NotesActionTypes.FETCH_NOTES_SUCCESS:
      return {
        ...state,
        isFetching: false,
        notes: action.payload,
      };
    case NotesActionTypes.FETCH_NOTES_FAILURE:
      return {
        ...state,
        isFetching: false,
        errorMessage: action.payload,
      };
    case NotesActionTypes.SELECT_NOTE:
      return {
        ...state,
        isFetching: false,
        isEditing: false,
        selectedNote: action.payload,
      };
    case NotesActionTypes.ADD_NOTE_FAILURE:
      return {
        ...state,
        isFetching: false,
        errorMessage: action.payload,
      };
    case NotesActionTypes.ADD_NOTE_SUCCESS:
      return {
        ...state,
        isFetching: false,
        notes: [...state.notes, action.payload],
        selectedNote: action.payload,
      };
    case NotesActionTypes.CANCEL_NOTE:
      return {
        ...state,
        isFetching: false,
        isEditing: false,
      };
    case NotesActionTypes.DELETE_NOTE_REQUEST:
      return {
        ...state,
      };
    case NotesActionTypes.DELETE_NOTE_SUCCESS:
      const notesAfterDeleting = state.notes.filter((note) => {
        return note.id !== action.payload;
      });
      return {
        ...state,
        notes: notesAfterDeleting,
        selectedNote: null,
      };
    case NotesActionTypes.DELETE_NOTE_FAILURE:
      return {
        ...state,
        isFetching: false,
        errorMessage: action.payload,
      };
    case NotesActionTypes.EDIT_NOTE_START:
      return {
        ...state,
        isFetching: false,
        isEditing: true,
        errorMessage: null,
      };
    case NotesActionTypes.EDIT_NOTE_REQUEST:
      return {
        ...state,
        isFetching: false,
        isEditing: true,
        errorMessage: null,
      };
    case NotesActionTypes.EDIT_NOTE_SUCCESS:
      // update notes
      const updatedNotesForEditing = state.notes.map((note) => {
        if (note.id === action.payload.id) {
          return action.payload;
        } else {
          return note;
        }
      });
      const updatedNote = {
        ...state.selectedNote,
        title: action.payload.title,
        content: action.payload.content,
      };
      return {
        ...state,
        isFetching: false,
        isEditing: false,
        errorMessage: null,
        notes: updatedNotesForEditing,
        selectedNote: updatedNote,
      };
    case NotesActionTypes.EDIT_NOTE_FAILURE:
      return {
        ...state,
        isFetching: false,
        isEditing: true,
        errorMessage: action.payload,
      };
    default:
      return {
        ...state,
        isFetching: false,
        selectedNote: null,
        errorMessage: null,
      };
  }
};

export default NotesReducer;
