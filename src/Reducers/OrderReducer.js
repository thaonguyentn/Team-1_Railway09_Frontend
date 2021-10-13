import { SET_ALL_ORDER } from "../Actions/index";
let order = [];
const reducer = (state = { order: order }, action) => {
  if (action.type === SET_ALL_ORDER) {
    let list = action.data.content;
    let totalPage = action.data.totalPages;
    let currenPage = action.data.pageable.pageNumber;
    return {
      ...state,
      allorder: list,
      totalPage: totalPage,
      currenPage: currenPage,
    };
  } else {
    return {
      ...state,
    };
  }
};
export default reducer;
