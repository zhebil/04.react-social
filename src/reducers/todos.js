const setFavourite = (todos, todoId) => {
  const itemIdx = todos.findIndex(({ id }) => id === todoId);
  const newItem = updateTodo(todos[itemIdx], "isFavourite");
  return [...todos.slice(0, itemIdx), newItem, ...todos.slice(itemIdx + 1)];
};

const setCompleted = (todos, todoId) => {
  const itemIdx = todos.findIndex(({ id }) => id === todoId);
  const newItem = updateTodo(todos[itemIdx], "completed");
  return [...todos.slice(0, itemIdx), newItem, ...todos.slice(itemIdx + 1)];
};
const deleteTodo = (todos, todoId) => {
  const itemIdx = todos.findIndex(({ id }) => id === todoId);
  return [...todos.slice(0, itemIdx), ...todos.slice(itemIdx + 1)];
};
const addTodo = (todos, todo) => {
  return [...todos, todo];
};

const updateTodo = (item = {}, prop) => {
  const { completed, isFavourite } = item;

  switch (prop) {
    case "isFavourite":
      return {
        ...item,
        isFavourite: !isFavourite,
      };
    case "completed":
      return {
        ...item,
        completed: !completed,
      };
    default:
      break;
  }
};

export default function todos(state, action) {
  switch (action.type) {
    case "LOAD_TODOS":
      const todos = action.payload.map((item) => {
        item.isFavourite = false;
        return item;
      });
      return todos;
    case "FAVOURITE_TODO":
      return setFavourite(state.todos, action.payload);
    case "COMPLETED_TODO":
      return setCompleted(state.todos, action.payload);
    case "DELETE_TODO":
      return deleteTodo(state.todos, action.payload);
    case "ADD_TODO":
      return addTodo(state.todos, action.payload);
    default:
      return state.todos;
  }
}
