import { takeLatest, call, put, all } from "redux-saga/effects";

import { firestore } from "../../firebase/firebase.utils";
import NotesActionTypes from "./notes.action.types";
import {
  fetchNotesFailure,
  fetchNotesSuccess,
  addNoteFailure,
  addNoteSuccess,
  deleteNoteFailure,
  deleteNoteSuccess,
  editNoteSuccess,
  editNoteFailure,
  cancelNote,
} from "./notes.action";

export function* fetchNotesAsync({ payload: { id, name } }) {
  try {
    const noteCollectionsRef = firestore.collection(`default/${id}/notes`);
    const snapshot = yield noteCollectionsRef.get();
    const notes = yield call(() => {
      return snapshot.docs.map((doc) => {
        const docData = doc.data();
        console.log(docData);
        return {
          id: doc.id,
          createDate: docData.create_date,
          updateDate: docData.update_date,
          deleteDate: docData.delete_date,
          title: docData.title,
          content: docData.content,
          isPinned: docData.is_pinned,
        };
      });
    });
    const validNotes = notes.filter((note) => !note.deleteDate);
    yield put(fetchNotesSuccess(validNotes));
  } catch (error) {
    yield put(fetchNotesFailure(error.message));
  }
}

export function* addNoteAsync({
  payload: { selectedNoteCollectionId, title, content },
}) {
  try {
    if (!selectedNoteCollectionId) {
      yield put(addNoteFailure("Please select a collection to add Note"));
      return;
    }
    if (!title) {
      yield put(addNoteFailure("Please give the Note a title"));
      return;
    }
    const today = new Date();
    const addedObj = yield firestore
      .collection("default")
      .doc(`${selectedNoteCollectionId}`)
      .collection("notes")
      .add({
        title,
        content,
        create_date: today,
        update_date: today,
        is_pinned: false,
      });
    yield put(
      addNoteSuccess({
        title,
        content,
        createDate: today,
        updateDate: today,
        id: addedObj.id,
        is_pinned: false,
      })
    );
  } catch (error) {
    yield put(addNoteFailure(error.message));
  }
}

function* deleteNoteAsync({
  payload: { selectedNoteCollectionId, selectedNoteId },
}) {
  try {
    if (!selectedNoteCollectionId) {
      yield put(deleteNoteFailure("Please select a collection to delete Note"));
      return;
    }
    if (!selectedNoteId) {
      yield put(deleteNoteFailure("Please select a Note to delete"));
      return;
    }
    yield firestore
      .collection("default")
      .doc(`${selectedNoteCollectionId}`)
      .collection("notes")
      .doc(`${selectedNoteId}`)
      .update({
        delete_date: new Date(),
      });
    // yield firestore
    //   .collection("default")
    //   .doc(`${selectedNoteCollectionId}`)
    //   .collection("notes")
    //   .doc(`${selectedNoteId}`)
    //   .delete();
    yield put(deleteNoteSuccess(selectedNoteId));
  } catch (error) {
    yield put(deleteNoteFailure(error.message));
  }
}

function* editNoteAsync({
  payload: { noteCollectionId, note, newTitle, newContent },
}) {
  try {
    if (!note) {
      yield put(editNoteFailure("Please select a Note to update"));
      return;
    }
    if (note.title === newTitle && note.content === newContent) {
      yield put(cancelNote());
      return;
    }
    const today = new Date();
    yield firestore
      .collection("default")
      .doc(`${noteCollectionId}`)
      .collection("notes")
      .doc(`${note.id}`)
      .update({
        title: newTitle,
        content: newContent,
        update_date: today,
      });
    yield put(
      editNoteSuccess({
        ...note,
        title: newTitle,
        content: newContent,
        update_date: today,
      })
    );
  } catch (error) {
    yield put(editNoteFailure(error.message));
  }
}

export function* fetchNotesStart() {
  yield takeLatest(NotesActionTypes.FETCH_NOTES_START, fetchNotesAsync);
}

export function* addNoteStart() {
  yield takeLatest(NotesActionTypes.ADD_NOTE_REQUEST, addNoteAsync);
}

export function* deleteNoteStart() {
  yield takeLatest(NotesActionTypes.DELETE_NOTE_REQUEST, deleteNoteAsync);
}

export function* editNoteStart() {
  yield takeLatest(NotesActionTypes.EDIT_NOTE_REQUEST, editNoteAsync);
}

export function* notesSagas() {
  yield all([
    call(fetchNotesStart),
    call(addNoteStart),
    call(deleteNoteStart),
    call(editNoteStart),
  ]);
}
