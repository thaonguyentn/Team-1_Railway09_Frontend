import { GET_CART, SET_CART } from "../Actions/index";
import Axios from "axios";
let isLogin;
if (localStorage.getItem("user_login")) {
  isLogin = true;
} else {
  isLogin = false;
}
const reducer = (state = { isLogin: isLogin }, action) => {
  console.log(action.type, GET_CART);
  if (action.type === GET_CART) {
    let getcart = Axios.get("http://localhost:8080/api/v5/cart/" + action.id, {
      auth: {
        username: "admin",
        password: "123456",
      },
    });
    return {
      ...state,
      getcart: getcart,
    };
  }
  if (action.type === SET_CART) {
    let cart = action.data;
    return {
      ...state,
      cart: cart,
    };
  }
  return { ...state };
};
export default reducer;
