const onTransformText = (text) => {
  const newText = text.split("");
  newText[0] = newText[0].toUpperCase();
  return newText.join("");
};
const getLargeText = (text) => {
  // использование Math.random() в редюсере запрещено. Тут использую исключително из необходимости создать длинный текст
  const randomNumber = Math.floor(Math.random() * Math.floor(15) + 1);
  let newText = "";
  for (let i = 0; i < randomNumber; i++) {
    newText += text + ". ";
  }
  return newText;
};

const getPosts = (state, data) =>
  data.postItems.map((item, i) => {
    return {
      ...item,
      body: getLargeText(onTransformText(item.body)),
      postPhoto: data.postPhotos.hits[i].webformatURL,
    };
  });

const getComments = (state, data, idx) => {
  let comments = data.commentsItem.map((item, i) => {
    return { ...item, photo: data.commentsItemPhoto.hits[i].userImageURL };
  });
  let newPost = {
    ...state.posts[idx],
    comments: comments,
  };
  return [...state.posts.slice(0, idx), newPost, ...state.posts.slice(idx + 1)];
};
const posts = (state, action) => {
  switch (action.type) {
    case "LOAD_POSTS":
      return getPosts(state, action.payload);
    case "LOAD_COMMENTS":
      return getComments(state, action.payload, action.idx);

    default:
      return state.posts;
  }
};

export default posts;
