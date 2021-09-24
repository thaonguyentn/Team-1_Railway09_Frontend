import { LOGIN } from "../Actions/index";
let isLogin;
if (localStorage.getItem("user_login")) {
  isLogin = true;
} else {
  isLogin = false;
}
const reducer = (state = { isLogin: isLogin }, action) => {
  console.log(action.type, LOGIN);
  if (action.type === LOGIN) {
    return {
      ...state,
      isLogin: action.islogin,
    };
  }
  return { ...state };
};
export default reducer;
