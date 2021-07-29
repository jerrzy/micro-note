import { firestore } from "../../firebase/firebase.utils";
import { takeLatest, call, all, put } from "redux-saga/effects";

import {
  editNoteCollectionSuccess,
  addNoteCollectionSuccess,
  addNoteCollectionFailure,
  deleteNoteCollectionFailure,
  noteCollectionCRUDCancel,
  pinNoteCollectionFailure,
} from "./note-collection-crud.action";
import NoteCollectionCRUDActionTypes from "./note-collection-crud.action.types";

import {
  insertNoteCollection,
  updateNoteCollection,
  deleteNoteCollection,
  pinNoteCollection,
  unPinNoteCollection,
} from "../note-collections/note-collections.action";

export function* addNoteCollectionAsync({ payload: { name, description } }) {
  try {
    if (!name) {
      yield put(
        addNoteCollectionFailure("Please type in the Note Collection name.")
      );
      return;
    }
    const snapshot = yield firestore
      .collection("default")
      .where("name", "==", name)
      .get();
    if (snapshot.docs.length !== 0) {
      yield put(
        addNoteCollectionFailure(
          `Note Collection ${name} already exists. Please type in another name.`
        )
      );
      return;
    }
    const today = new Date();
    const addedObj = yield firestore.collection("default").add({
      name,
      description,
      create_date: today,
      update_date: today,
      isPinned: false,
    });
    yield put(
      insertNoteCollection({
        name,
        description,
        createDate: today,
        updateDate: today,
        id: addedObj.id,
        isPinned: false,
      })
    );
    yield put(
      addNoteCollectionSuccess({
        name,
        description,
        createDate: today,
        updateDate: today,
        id: addedObj.id,
        isPinned: false,
      })
    );
  } catch (error) {
    yield put(addNoteCollectionFailure(error.message));
  }
}

export function* editNoteCollectionAsync({
  payload: { selectedCollection, newName, newDescription },
}) {
  try {
    if (
      newName === selectedCollection.name &&
      newDescription === selectedCollection.description
    ) {
      yield put(noteCollectionCRUDCancel());
      return;
    }
    const { id, name } = selectedCollection;
    if (!id) {
      yield put(addNoteCollectionFailure("Please select a Note Collection."));
      return;
    }
    if (!name) {
      yield put(
        addNoteCollectionFailure("Please type in the Note Collection name.")
      );
      return;
    }
    const noteCollectionRef = firestore.doc(`default/${id}`);
    const snapshot = yield noteCollectionRef.get();
    if (!snapshot.exists) {
      yield put(addNoteCollectionFailure(`Note Collection ${name} not found.`));
    } else {
      const today = new Date();
      yield noteCollectionRef.update({
        name: newName,
        description: newDescription,
        update_date: today,
      });
      yield put(
        updateNoteCollection({
          ...selectedCollection,
          name: newName,
          description: newDescription,
          updateDate: today,
        })
      );
      yield put(
        editNoteCollectionSuccess({
          ...selectedCollection,
          name: newName,
          description: newDescription,
          updateDate: today,
        })
      );
    }
  } catch (error) {
    yield put(addNoteCollectionFailure(error.message));
  }
}

export function* pinNoteCollectionAsync({ payload }) {
  yield handlePinNoteCollectionAsync(payload, true);
}

export function* unpinNoteCollectionAsync({ payload }) {
  yield handlePinNoteCollectionAsync(payload, false);
}

function* handlePinNoteCollectionAsync(selectedCollection, isPin) {
  try {
    const { id, name } = selectedCollection;
    const noteCollectionRef = firestore.doc(`default/${id}`);
    const snapshot = yield noteCollectionRef.get();
    if (!snapshot.exists) {
      yield put(pinNoteCollectionFailure(`Note Collection ${name} not found.`));
    } else {
      yield noteCollectionRef.update({
        is_pinned: isPin,
      });
      isPin
        ? yield put(
            pinNoteCollection({
              ...selectedCollection,
            })
          )
        : yield put(
            unPinNoteCollection({
              ...selectedCollection,
            })
          );
    }
  } catch (error) {
    yield put(pinNoteCollectionFailure(error.message));
  }
}

export function* deleteNoteCollectionAsync({ payload: noteCollection }) {
  try {
    const { id } = noteCollection;
    if (!id) {
      yield put(
        deleteNoteCollectionFailure(
          "Please select a Note Collection to delete."
        )
      );
      return;
    }
    const noteCollectionRef = firestore.doc(`default/${id}`);
    yield noteCollectionRef.update({
      delete_date: new Date(),
    });
    // yield firestore.doc(`default/${id}`).delete();
    yield put(deleteNoteCollection(noteCollection));
    // yield put(deleteNoteCollectionSuccess(noteCollection));
  } catch (error) {
    yield put(deleteNoteCollectionFailure(error.message));
  }
}

export function* addNoteCollectionStart() {
  yield takeLatest(
    NoteCollectionCRUDActionTypes.ADD_NOTE_COLLECTION_SEND_REQUEST,
    addNoteCollectionAsync
  );
}

export function* editNoteCollectionStart() {
  yield takeLatest(
    NoteCollectionCRUDActionTypes.EDIT_NOTE_COLLECTION_SEND_REQUEST,
    editNoteCollectionAsync
  );
}

export function* deleteNoteCollectionStart() {
  yield takeLatest(
    NoteCollectionCRUDActionTypes.DELETE_NOTE_COLLECTION_SEND_REQUEST,
    deleteNoteCollectionAsync
  );
}

export function* pinNoteCollectionStart() {
  yield takeLatest(
    NoteCollectionCRUDActionTypes.PIN_SELECTED_NOTE_COLLECTION,
    pinNoteCollectionAsync
  );
}

export function* unpinNoteCollectionStart() {
  yield takeLatest(
    NoteCollectionCRUDActionTypes.UNPIN_SELECTED_NOTE_COLLECTION,
    unpinNoteCollectionAsync
  );
}

export function* NoteCollectionCRUDSagas() {
  yield all([
    call(addNoteCollectionStart),
    call(editNoteCollectionStart),
    call(deleteNoteCollectionStart),
    call(pinNoteCollectionStart),
    call(unpinNoteCollectionStart),
  ]);
}
