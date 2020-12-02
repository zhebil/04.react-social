export const logState = {
  type: "LOGGER",
};
export const todoLoaded = (data) => {
  return {
    type: "LOAD_TODOS",
    payload: data,
  };
};
export const setFavourite = (id) => {
  return {
    type: "FAVOURITE_TODO",
    payload: id,
  };
};

export const setCompleted = (id) => {
  return {
    type: "COMPLETED_TODO",
    payload: id,
  };
};
export const postsLoaded = (data) => {
  return {
    type: "LOAD_POSTS",
    payload: data,
  };
};
export const commentsLoaded = (data, idx) => {
  return {
    type: "LOAD_COMMENTS",
    payload: data,
    idx: idx
  };
};


export const deleteTodo = (id) => {
  return {
    type: "DELETE_TODO",
    payload: id,
  };
};
