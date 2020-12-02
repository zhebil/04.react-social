import todos from "./todos";
import posts from "./posts";

const initialState = {
  todos: [],
  posts: []
};

const reducer = (state=initialState, action) => {
  return {
    todos: todos(state, action),
    posts: posts(state, action)
  };
};

export default reducer;
