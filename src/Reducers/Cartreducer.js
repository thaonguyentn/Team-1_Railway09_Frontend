import { SET_CART, SET_CARTDETAIL } from "../Actions/index";
let isLogin;
if (localStorage.getItem("user_login")) {
  isLogin = true;
} else {
  isLogin = false;
}
const reducer = (state = { isLogin: isLogin }, action) => {
  if (action.type === SET_CART) {
    let cart = action.data;
    return {
      ...state,
      cart: cart,
    };
  }
  if (action.type === SET_CARTDETAIL) {
    let cartdetail = action.data;
    return {
      ...state,
      cartdetail: cartdetail,
    };
  }
  return { ...state };
};
export default reducer;
