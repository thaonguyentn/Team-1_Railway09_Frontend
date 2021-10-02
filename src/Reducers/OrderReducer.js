import { SETORDER, SET_ALL_ORDER } from "../Actions/index";
let order = [];
const reducer = (state = { order: order }, action) => {
  if (action.type === SETORDER) {
    console.log("kkkkkkk");
    switch (action.kind) {
      case "increament":
        let list = [...state.order];
        let index = list.findIndex((element) => element.id === action.data.id);
        if (index === -1) {
          list.push(action.data);
        } else {
          list.splice(index, 1, action.data);
        }
        console.log(list);
        console.log(list);
        return {
          ...state,
          order: list,
        };
      case "decreament":
        let list1 = [...state.order];
        let index1 = list1.findIndex(
          (element) => element.id === action.data.id
        );
        console.log(index1);
        list1.splice(index1, 1, action.data);
        return {
          ...state,
          order: list1,
        };
      case "remove":
        let list2 = [...state.order];
        let index2 = list2.findIndex(
          (element) => element.id === action.data.id
        );
        console.log(index2);
        list2.splice(index2, 1);
        return {
          ...state,
          order: list2,
        };
      default:
        return {
          ...state,
        };
    }
  } else if (action.type === SET_ALL_ORDER) {
    let list = action.data.content;
    let totalPage = action.data.totalPages;
    let currenPage = action.data.pageable.pageNumber;
    console.log(totalPage);
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
