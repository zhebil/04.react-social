import { applyMiddleware, createStore } from "redux";
import reducer from "./reducers";
import thunkMiddleware from "redux-thunk";
const store = createStore(reducer, applyMiddleware(thunkMiddleware));
store.subscribe(() => {
  console.log("subscribe", store.getState());
});
export default store;
