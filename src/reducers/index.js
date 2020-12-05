import todos from "./todos";
import posts from "./posts";
import userInfo from "./userInfo";
const initialState = {
  todos: [],
  posts: [],
  userInfo: {}
};

const reducer = (state = initialState, action) => {
  return {
    todos: todos(state, action),
    posts: posts(state, action),
    userInfo: userInfo(state, action),
  };
};

export default reducer;
