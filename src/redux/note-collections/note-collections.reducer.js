import NoteCollectionsActions from "./note-collections.action.types";

const INITIAL_STATE = {
  noteCollections: [],
  isFetching: false,
  errorMessage: "",
};

const reOrderNoteCollections = (noteCollections) => {
  const pinnedCollections = noteCollections.filter(
    (collection) => collection.isPinned
  );
  const unpinnedCollections = noteCollections.filter(
    (collection) => !collection.isPinned
  );

  return [...pinnedCollections, ...unpinnedCollections];
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
    case NoteCollectionsActions.PIN_NOTE_COLLECTION:
      const noteCollectionToPin = state.noteCollections.find(
        (collection) => collection.id === action.payload.id
      );
      noteCollectionToPin.isPinned = true;
      const noteCollections = reOrderNoteCollections(state.noteCollections);
      return {
        ...state,
        noteCollections: [...noteCollections],
      };
    case NoteCollectionsActions.UNPIN_NOTE_COLLECTION:
      const noteCollectionToUnPin = state.noteCollections.find(
        (collection) => collection.id === action.payload.id
      );
      noteCollectionToUnPin.isPinned = false;
      const noteCollections2 = reOrderNoteCollections(state.noteCollections);
      return {
        ...state,
        noteCollections: [...noteCollections2],
      };
    default:
      return state;
  }
};

export default noteCollectionsReducer;
