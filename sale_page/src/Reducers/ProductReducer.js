import { SETLISTPRODUCT, SETBRAND, SETMEMORY, SETRAM } from "../Actions";
const reducer = (state, action) => {
  switch (action.type) {
    case SETLISTPRODUCT:
      let list = action.data.content;
      let totalPage = action.data.totalPages;
      let currenPage = action.data.pageable.pageNumber;
      console.log(totalPage);
      return {
        ...state,
        listproduct: list,
        totalPage: totalPage,
        currenPage: currenPage,
      };
    case SETBRAND:
      let brand = action.data;
      return {
        ...state,
        brand: brand,
      };
    case SETMEMORY:
      let memory = action.data;
      return {
        ...state,
        memory: memory,
      };
    case SETRAM:
      let ram = action.data;
      return {
        ...state,
        ram: ram,
      };
    default:
      return { ...state };
  }
};
export default reducer;
