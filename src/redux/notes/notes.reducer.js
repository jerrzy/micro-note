import NotesActionTypes from "./notes.action.types";

const INITIAL_STATE = {
  notes: [],
  selectedNote: null,
  isFetching: false,
  isAdding: false,
  isUpdating: false,
  isDeleting: false,
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
        isAdding: false,
        isUpdating: false,
        errorMessage: action.payload,
      };
    case NotesActionTypes.SELECT_NOTE:
      return {
        ...state,
        isFetching: false,
        isAdding: false,
        isUpdating: false,
        selectedNote: action.payload,
      };
    case NotesActionTypes.ADD_NOTE_FAILURE:
      return {
        ...state,
        isFetching: false,
        isAdding: true,
        isUpdating: false,
        errorMessage: action.payload,
      };
    case NotesActionTypes.UPDATE_NOTE_START:
      return {
        ...state,
        isFetching: false,
        isAdding: false,
        isUpdating: true,
        selectedNote: action.payload,
      };
    case NotesActionTypes.UPDATE_NOTE_REQUEST:
      return {
        ...state,
        isFetching: false,
        isAdding: false,
        isUpdating: true,
      };
    case NotesActionTypes.UPDATE_NOTE_FAILURE:
      return {
        ...state,
        isFetching: false,
        isAdding: false,
        isUpdating: true,
        errorMessage: action.payload,
      };
    case NotesActionTypes.ADD_NOTE_START:
      return {
        ...state,
        isFetching: false,
        isAdding: true,
        isUpdating: false,
      };
    case NotesActionTypes.ADD_NOTE_SUCCESS:
      return {
        ...state,
        isFetching: false,
        isAdding: false,
        isUpdating: false,
        notes: [...state.notes, action.payload],
      };
    case NotesActionTypes.UPDATE_NOTE_SUCCESS:
      const updatedNotes = state.notes.map((note) => {
        if (note.id === action.payload.id) {
          return { ...action.payload };
        } else {
          return { ...note };
        }
      });
      return {
        ...state,
        isFetching: false,
        isAdding: false,
        isUpdating: false,
        notes: updatedNotes,
      };
    case NotesActionTypes.CANCEL_NOTE:
      return {
        ...state,
        isFetching: false,
        isAdding: false,
        isUpdating: false,
        isDeleting: false,
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
        isAdding: false,
        isUpdating: false,
        isDeleting: true,
        errorMessage: action.payload,
      };
    default:
      return {
        ...state,
        isFetching: false,
        isAdding: false,
        isUpdating: false,
        selectedNote: null,
        errorMessage: null,
      };
  }
};

export default NotesReducer;
