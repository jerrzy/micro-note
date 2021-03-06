import { createStore, applyMiddleware, compose } from "redux";
import { persistStore } from "redux-persist";
import logger from "redux-logger";
import createSagaMiddleware from "redux-saga";

import rootReducer from "./root-reducer";
import rootSaga from "./root-saga";

const sagaMiddleware = createSagaMiddleware();

const middlewares = [sagaMiddleware];

// force the ENV to staging for Heroku
// process.env.NODE_ENV = "staging";

if (process.env.NODE_ENV === "development") {
  middlewares.push(logger);
}

// export const store = createStore(
//   rootReducer,
//   {},
//   process.env.NODE_ENV === "development"
//     ? compose(
//         applyMiddleware(...middlewares),
//         window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__()
//       )
//     : applyMiddleware(...middlewares)
// );

export const store = createStore(
  rootReducer,
  {},
  applyMiddleware(...middlewares)
);

sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);
