function getId() {
  const myId = window.localStorage.getItem("myId");
  return { userId: myId };
}
export default function userInfo(state, action) {
  switch (action.type) {
    case "REGISTER":
      return { userId: action.payload };

    case "GET_ID":
      return getId();

    default:
      return state.userInfo;
  }
}
