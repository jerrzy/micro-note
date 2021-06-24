import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import noteCollectionsReducer from "./note-collections/note-collections.reducer";
import userReducer from "./user/user.reducers";
import noteCollectionCRUDReducer from "./note-collection-crud/note-collection-crud.reducer";
import NotesReducer from "./notes/notes.reducer";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["cart"],
};

const rootReducer = combineReducers({
  noteCollections: noteCollectionsReducer,
  notes: NotesReducer,
  user: userReducer,
  noteCollectionCRUD: noteCollectionCRUDReducer,
  //   user: userReducer,
  //   cart: cartReducer,
  //   directory: directoryReducer,
  //   shop: shopReducer,
});

export default persistReducer(persistConfig, rootReducer);
