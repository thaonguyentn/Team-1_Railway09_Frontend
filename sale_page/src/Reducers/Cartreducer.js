import { GET_CART } from "../Actions/index";
import Axios from "axios";
let isLogin;
if (localStorage.getItem("user_login")) {
  isLogin = true;
} else {
  isLogin = false;
}
const reducer = (state = { isLogin: isLogin }, action) => {
  console.log(action.type, LOGIN);
  if (action.type === GET_CART) {
    let getcart = Axios.get("http://localhost:8080/api/v5/cart/" + action.id, {
      auth: {
        username: "admin",
        password: "123456",
      },
    }).then((response) => {
      console.log(response.data);
      return {
        cart: response.data,
      };
    });

    return {
      ...state,
    };
  }
  return { ...state };
};
export default reducer;
