import NoteCollectionCRUDActionTypes from "./note-collection-crud.action.types";

const INITIAL_STATE = {
  isEditing: false,
  showModal: false,
  errorMessage: "",
  selectedNoteCollection: null,
};

const noteCollectionCRUDReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case NoteCollectionCRUDActionTypes.SELECT_NOTE_COLLECTION:
      return {
        ...state,
        selectedNoteCollection: action.payload,
      };
    case NoteCollectionCRUDActionTypes.ADD_NOTE_COLLECTION_START:
      return {
        ...state,
        isEditing: false,
        showModal: true,
        errorMessage: "",
        selectedNoteCollection: null,
      };
    case NoteCollectionCRUDActionTypes.EDIT_NOTE_COLLECTION_START:
      return {
        ...state,
        isEditing: true,
        showModal: true,
        errorMessage: "",
      };
    case NoteCollectionCRUDActionTypes.NOTE_COLLECTION_CRUD_CANCEL:
      return {
        ...state,
        isEditing: false,
        showModal: false,
      };
    case NoteCollectionCRUDActionTypes.ADD_NOTE_COLLECTION_SEND_REQUEST:
    case NoteCollectionCRUDActionTypes.EDIT_NOTE_COLLECTION_SEND_REQUEST:
      // no need to set payload here, data returned goes to the component as state.
      return {
        ...state,
        showModal: true,
      };
    case NoteCollectionCRUDActionTypes.ADD_NOTE_COLLECTION_SUCCESS:
    case NoteCollectionCRUDActionTypes.EDIT_NOTE_COLLECTION_SUCCESS:
      return {
        ...state,
        showModal: false,
        isEditing: false,
        selectedNoteCollection: action.payload,
      };
    case NoteCollectionCRUDActionTypes.ADD_NOTE_COLLECTION_FAILURE:
    case NoteCollectionCRUDActionTypes.EDIT_NOTE_COLLECTION_FAILURE:
      return {
        ...state,
        showModal: true,
        errorMessage: action.payload,
      };
    case NoteCollectionCRUDActionTypes.DELETE_NOTE_COLLECTION_SEND_REQUEST:
      // no need to set payload here, data returned goes to the component as state.
      return {
        ...state,
      };
    case NoteCollectionCRUDActionTypes.DELETE_NOTE_COLLECTION_FAILURE:
      return {
        ...state,
        errorMessage: action.payload,
      };
    default:
      return {
        ...state,
      };
  }
};

export default noteCollectionCRUDReducer;
