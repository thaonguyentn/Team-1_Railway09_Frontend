import { SET_LIST_ACCOUNT, SET_PROFILE } from "../Actions";
let account1 = JSON.parse(localStorage.getItem("user_login_infor"));
const reducer = (state = { account: account1 }, action) => {
  if (action.type === SET_PROFILE) {
    let account = action.account;
    return {
      ...state,
      account: account,
    };
  }
  if (action.type === SET_LIST_ACCOUNT) {
    let list = action.data.content;
    let totalPage = action.data.totalPages;
    let currenPage = action.data.pageable.pageNumber;
    return {
      ...state,
      listaccount: list,
      totalPage: totalPage,
      currenPage: currenPage,
    };
  }

  return { ...state };
};
export default reducer;
