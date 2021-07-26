import { firestore } from "../../firebase/firebase.utils";
import { takeLatest, call, all, put } from "redux-saga/effects";

import {
  editNoteCollectionSuccess,
  addNoteCollectionSuccess,
  addNoteCollectionFailure,
  deleteNoteCollectionFailure,
  noteCollectionCRUDCancel,
} from "./note-collection-crud.action";
import NoteCollectionCRUDActionTypes from "./note-collection-crud.action.types";

import {
  insertNoteCollection,
  updateNoteCollection,
  deleteNoteCollection,
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
    });
    yield put(
      insertNoteCollection({
        name,
        description,
        createDate: today,
        updateDate: today,
        id: addedObj.id,
      })
    );
    yield put(
      addNoteCollectionSuccess({
        name,
        description,
        createDate: today,
        updateDate: today,
        id: addedObj.id,
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
    yield firestore.doc(`default/${id}`).delete();
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
export function* NoteCollectionCRUDSagas() {
  yield all([
    call(addNoteCollectionStart),
    call(editNoteCollectionStart),
    call(deleteNoteCollectionStart),
  ]);
}
