export default class JsonPlaceholderService {
  _apiBase = "https://jsonplaceholder.typicode.com";
  _apiPhotoBase =
    "https://pixabay.com/api/?key=19060740-28e07d1b59a78c5b024055f9e";
  pixabayKey = "?key=19060740-28e07d1b59a78c5b024055f9e";
  getResourse = async (url) => {
    const res = await fetch(`${this._apiBase}${url}`);
    if (!res.ok) {
      throw new Error("incorrect server response");
    }
    return await res.json();
  };
  getPhotoResourse = async (url) => {
    const res = await fetch(`${this._apiPhotoBase}${url}`);
    if (!res.ok) {
      throw new Error("incorrect server response");
    }
    return await res.json();
  };
  getUserPhoto = async (id) => {
    if (id === 8) {
      id = 11
    }
    const res = await this.getPhotoResourse("&id=50" + id);

    return res;
  };
  getUserPhotos = async (id) => {
    const res = await this.getPhotoResourse("&orientation=vertical&page=" + id);

    return res;
  };
  getPostsPhoto = async (id) => {
    const res = await this.getPhotoResourse("&q=post&page=" + id);

    return res;
  };
  getCommentsPhoto = async (id) => {
    const res = await this.getPhotoResourse(`&per_page=5&page=${id}`);

    return res;
  };
  getAllUsers = async () => {
    const res = await this.getResourse(`/users/`);

    return res;
  };
  getUser = async (id) => {
    const res = await this.getResourse(`/users/${id}`);
    return res;
  };
  getUserData = async (id, type) => {
    const res = await this.getResourse(`/users/${id}/${type}`);
    return res;
  };
  getAllPhotos = async () => {
    const res = await this.getResourse(`/photos`);
    return res;
  };

  getUserPosts = async (id) => {
    return this.getUserData(id, "posts");
  };
  getUserAlbums = async (id) => {
    return this.getUserData(id, "albums");
  };

  getUserTodos = async (id) => {
    return this.getUserData(id, "todos");
  };
  getAllPosts = async () => {
    const res = await this.getResourse(`/posts`);
    return res;
  };
  
  getUserPosts = async (id) => {
    const res = await this.getResourse(`/user/${id}/posts`);
    return res;
  };
  getComments = async (id) => {
    const res = await this.getResourse(`/posts/${id}/comments`);
    return res;
  };
}
