import { takeLatest, call, put, all } from "redux-saga/effects";

import { firestore } from "../../firebase/firebase.utils";

import NoteCollectionsActions from "./note-collections.action.types";
import {
  fetchNoteCollectionsSuccess,
  fetchNoteCollectionsFailure,
} from "./note-collections.action";

export function* fetchNoteCollectionsAsync() {
  try {
    const noteCollectionsRef = firestore.collection("default");
    const snapshot = yield noteCollectionsRef.get();
    const noteCollections = yield call(() => {
      return snapshot.docs.map((doc) => {
        const docData = doc.data();
        return {
          id: doc.id,
          createDate: docData.create_date,
          updateDate: docData.update_date,
          deleteDate: docData.delete_date,
          name: docData.name,
          description: docData.description,
          isPinned: docData.is_pinned ? docData.is_pinned : false,
        };
      });
    });
    const validNoteCollections = noteCollections.filter(
      (collection) => !collection.deleteDate
    );
    yield put(fetchNoteCollectionsSuccess(validNoteCollections));
  } catch (error) {
    yield put(fetchNoteCollectionsFailure(error.message));
  }
}

export function* fetchNoteCollectionsStart() {
  yield takeLatest(
    NoteCollectionsActions.FETCH_NOTE_COLLECTIONS_START,
    fetchNoteCollectionsAsync
  );
}

export function* noteCollectionsSaga() {
  yield all([call(fetchNoteCollectionsStart)]);
}
