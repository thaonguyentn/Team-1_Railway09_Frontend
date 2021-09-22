import {
  SETLISTPRODUCT,
  SETBRAND,
  SETMEMORY,
  SETRAM,
  SETRAMFILTER,
  SETBRANDFILTER,
  SETMEMORYFILTER,
} from "../Actions";
let ramfilter = "";
let brandfilter = "";
let memoryfilter = "";
let searchfilter = "";
const reducer = (
  state = {
    ramfilter: ramfilter,
    brandfilter: brandfilter,
    memoryfilter: memoryfilter,
    searchfilter: searchfilter,
  },
  action
) => {
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
    case SETRAMFILTER:
      let ramfilternew = action.data;
      return {
        ...state,
        ramfilter: ramfilternew,
      };
    case SETBRANDFILTER:
      let brandfilternew = action.data;
      return {
        ...state,
        brandfilter: brandfilternew,
      };
    case SETMEMORYFILTER:
      let memoryfilternew = action.data;
      return {
        ...state,
        memoryfilter: memoryfilternew,
      };
    default:
      return { ...state };
  }
};
export default reducer;
