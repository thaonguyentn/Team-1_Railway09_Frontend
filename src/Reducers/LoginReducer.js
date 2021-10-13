import { LOGIN, SET_ISOPEN_LOGIN } from "../Actions/index";
let isLogin;
if (localStorage.getItem("user_login")) {
  isLogin = true;
} else {
  isLogin = false;
}
const reducer = (state = { isLogin: isLogin, isopen: false }, action) => {
  if (action.type === LOGIN) {
    return {
      ...state,
      isLogin: action.islogin,
    };
  }
  if (action.type === SET_ISOPEN_LOGIN) {
    return {
      ...state,
      isopen: action.data,
    };
  }
  return { ...state };
};
export default reducer;
