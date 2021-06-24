import { all, call } from "redux-saga/effects";
import { noteCollectionsSaga } from "./note-collections/note-collections.saga";
import { userSagas } from "./user/user.sagas";
import { NoteCollectionCRUDSagas } from "./note-collection-crud/note-collection-crud.sagas";
import { notesSagas } from "./notes/notes.sagas";

export default function* rootSaga() {
  yield all([
    call(noteCollectionsSaga),
    call(notesSagas),
    call(userSagas),
    call(NoteCollectionCRUDSagas),
  ]);
}
