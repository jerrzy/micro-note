import NoteCollectionCRUDActionTypes from "./note-collection-crud.action.types";

export const selectNoteCollection = (noteCollection) => {
  return {
    type: NoteCollectionCRUDActionTypes.SELECT_NOTE_COLLECTION,
    payload: noteCollection,
  };
};

export const editNoteCollectionStart = () => ({
  type: NoteCollectionCRUDActionTypes.EDIT_NOTE_COLLECTION_START,
});

export const noteCollectionCRUDCancel = () => ({
  type: NoteCollectionCRUDActionTypes.NOTE_COLLECTION_CRUD_CANCEL,
});

export const editNoteCollectionSendRequest = (
  selectedCollection,
  newName,
  newDescription
) => {
  return {
    type: NoteCollectionCRUDActionTypes.EDIT_NOTE_COLLECTION_SEND_REQUEST,
    payload: {
      selectedCollection,
      newName,
      newDescription,
    },
  };
};

export const editNoteCollectionSuccess = (noteCollection) => ({
  type: NoteCollectionCRUDActionTypes.EDIT_NOTE_COLLECTION_SUCCESS,
  payload: noteCollection,
});

export const editNoteCollectionExists = (name) => ({
  type: NoteCollectionCRUDActionTypes.EDIT_NOTE_COLLECTION_EXISTS,
  payload: name,
});

export const addNoteCollectionStart = () => ({
  type: NoteCollectionCRUDActionTypes.ADD_NOTE_COLLECTION_START,
});

export const addNoteCollectionSendRequest = ({ name, description }) => {
  console.log("");
  return {
    type: NoteCollectionCRUDActionTypes.ADD_NOTE_COLLECTION_SEND_REQUEST,
    payload: {
      name: name,
      description: description,
    },
  };
};

export const addNoteCollectionSuccess = (noteCollection) => ({
  type: NoteCollectionCRUDActionTypes.ADD_NOTE_COLLECTION_SUCCESS,
  payload: noteCollection,
});

export const addNoteCollectionFailure = (errorMessage) => ({
  type: NoteCollectionCRUDActionTypes.ADD_NOTE_COLLECTION_FAILURE,
  payload: errorMessage,
});

export const deleteNoteCollectionSendRequest = (noteCollection) => ({
  type: NoteCollectionCRUDActionTypes.DELETE_NOTE_COLLECTION_SEND_REQUEST,
  payload: noteCollection,
});

// export const deleteNoteCollectionSuccess = (selectedNoteCollection) => ({
//   type: NoteCollectionCRUDActionTypes.DELETE_NOTE_COLLECTION_SUCCESS,
//   payload: selectedNoteCollection,
// });

export const deleteNoteCollectionFailure = (errorMessage) => ({
  type: NoteCollectionCRUDActionTypes.DELETE_NOTE_COLLECTION_FAILURE,
  payload: errorMessage,
});

export const pinSelectedNoteCollection = (noteCollection) => ({
  type: NoteCollectionCRUDActionTypes.PIN_SELECTED_NOTE_COLLECTION,
  payload: noteCollection,
});

export const unpinSelectedNoteCollection = (noteCollection) => ({
  type: NoteCollectionCRUDActionTypes.UNPIN_SELECTED_NOTE_COLLECTION,
  payload: noteCollection,
});

export const pinNoteCollectionFailure = (errorMessage) => ({
  type: NoteCollectionCRUDActionTypes.PIN_NOTE_COLLECTION_FAILURE,
  payload: errorMessage,
});
