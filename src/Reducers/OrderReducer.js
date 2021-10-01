import { SETORDER } from "../Actions/index";
let order = [];
const reducer = (state = { order: order }, action) => {
  switch (action.type) {
    case SETORDER:
      console.log("kkkkkkk");
      if (action.kind === "increament") {
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
      } else if (action.kind === "decreament") {
        let list1 = [...state.order];
        let index1 = list1.findIndex(
          (element) => element.id === action.data.id
        );
        console.log(index1);
        list1.splice(index1, 1);
        return {
          ...state,
          order: list1,
        };
      } else {
        return {
          ...state,
        };
      }

    default:
      return {
        ...state,
      };
  }
};
export default reducer;
