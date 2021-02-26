import * as redux from "redux";
import logger from "redux-logger";
import thunk from "redux-thunk";
import counterReducer from "./counter";
import cocktailReducer from "./cocktails";
import { composeWithDevTools } from "redux-devtools-extension";

const rootReducer = redux.combineReducers({
  counterState: counterReducer,
  cocktailState: cocktailReducer,
});

const store = redux.createStore(
  rootReducer,
  composeWithDevTools(redux.applyMiddleware(logger, thunk))
);

export default store;
