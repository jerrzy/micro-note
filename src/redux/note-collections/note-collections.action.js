import NoteCollectionsActions from "./note-collections.action.types";

export const fetchNoteCollectionsStart = () => ({
  type: NoteCollectionsActions.FETCH_NOTE_COLLECTIONS_START,
});

export const fetchNoteCollectionsSuccess = (noteCollections) => ({
  type: NoteCollectionsActions.FETCH_NOTE_COLLECTIONS_SUCCESS,
  payload: noteCollections,
});

export const fetchNoteCollectionsFailure = (error) => ({
  type: NoteCollectionsActions.FETCH_NOTE_COLLECTIONS_FAILURE,
  payload: error,
});

export const insertNoteCollection = (noteCollection) => ({
  type: NoteCollectionsActions.INSERT_NOTE_COLLECTION,
  payload: noteCollection,
});

export const updateNoteCollection = (noteCollection) => ({
  type: NoteCollectionsActions.UPDATE_NOTE_COLLECTION,
  payload: noteCollection,
});

export const deleteNoteCollection = (noteCollection) => ({
  type: NoteCollectionsActions.DELETE_NOTE_COLLECTION,
  payload: noteCollection,
});

export const pinNoteCollection = (noteCollection) => ({
  type: NoteCollectionsActions.PIN_NOTE_COLLECTION,
  payload: noteCollection,
});

export const unPinNoteCollection = (noteCollection) => ({
  type: NoteCollectionsActions.UNPIN_NOTE_COLLECTION,
  payload: noteCollection,
});
