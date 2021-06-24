import NoteCollectionsActions from "./note-collections.action.types";

const INITIAL_STATE = {
  noteCollections: [],
  isFetching: false,
  errorMessage: "",
};

const noteCollectionsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case NoteCollectionsActions.FETCH_NOTE_COLLECTIONS_START:
      return {
        ...state,
        isFetching: true,
      };
    case NoteCollectionsActions.FETCH_NOTE_COLLECTIONS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        noteCollections: action.payload,
      };
    case NoteCollectionsActions.FETCH_NOTE_COLLECTIONS_FAILURE:
      return {
        ...state,
        isFetching: false,
        errorMessage: action.payload,
      };
    case NoteCollectionsActions.INSERT_NOTE_COLLECTION:
      return {
        ...state,
        isFetching: false,
        errorMessage: "",
        noteCollections: [...state.noteCollections, action.payload],
      };
    case NoteCollectionsActions.UPDATE_NOTE_COLLECTION:
      const updatedNoteCollections = state.noteCollections.map(
        (noteCollection) => {
          if (noteCollection.id === action.payload.id) {
            return { ...action.payload };
          } else {
            return { ...noteCollection };
          }
        }
      );
      return {
        ...state,
        isFetching: false,
        errorMessage: "",
        noteCollections: updatedNoteCollections,
      };
    case NoteCollectionsActions.DELETE_NOTE_COLLECTION:
      const deletedNoteCollections = state.noteCollections.filter(
        (noteCollection) => noteCollection.id !== action.payload.id
      );
      return {
        ...state,
        noteCollections: [...deletedNoteCollections],
      };
    default:
      return state;
  }
};

export default noteCollectionsReducer;
