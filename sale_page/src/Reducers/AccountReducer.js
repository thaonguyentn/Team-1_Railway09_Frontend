import { SET_PROFILE } from "../Actions";
let account1 = JSON.parse(localStorage.getItem("user_login_infor"));
const reducer = (state = { account: account1 }, action) => {
  if (action.type === SET_PROFILE) {
    let account = action.account;
    return {
      ...state,
      account: account,
    };
  }
  return { ...state };
};
export default reducer;
