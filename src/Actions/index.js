export const LOGIN = "LOGIN";
export const ADD_PRODUCT_TO_CART = "ADD_PRODUCT_TO_CART";
export const REMOVE_PRODUCT_FROM_CART = "REMOVE_PRODUCT_FROM_CART";
export const INCREMENT_CART_ITEM_QUANTITY = "INCREMENT_CART_ITEM_QUANTITY";
export const DECREMENT_CART_ITEM_QUANTITY = "DECREMENT_CART_ITEM_QUANTITY";
export const SET_ISOPEN_LOGIN = "SET_ISOPEN_LOGIN";
export const GET_CART = "GET_CART";
export const SET_CART = "SET_CART";
export const SET_CARTDETAIL = "SET_CARTDETAIL";
export const SET_PROFILE = "SET_PROFILE";
export const SETLISTPRODUCT = "SETLISTPRODUCT";
export const SETRAM = "SETRAM";
export const SETBRAND = "SETBRAND";
export const SETMEMORY = "SETMEMORY";
export const SETRAMFILTER = "SETRAMFILTER";
export const SETBRANDFILTER = "SETBRANDFILTER";
export const SETMEMORYFILTER = "SETMEMORYFILTER";
export const SETPRODUCT_IMAGE = "SETPRODUCT_IMAGE";
export const SET_SORT = "SET_SORT";
export const SET_ALL_ORDER = "SET_ALL_ORDER";
export const SET_LIST_ACCOUNT = "SET_LIST_ACCOUNT";
export const setlistaccount = (data) => {
  return {
    type: SET_LIST_ACCOUNT,
    data: data,
  };
};
export const setopenlogin = (data) => {
  return {
    type: SET_ISOPEN_LOGIN,
    data: data,
  };
};
export const setlogin = (islogin) => {
  return { type: LOGIN, islogin: islogin };
};
export const addProductToCart = (product) => {
  return {
    type: ADD_PRODUCT_TO_CART,
    payload: product,
  };
};
export const removeProductToCart = (productId) => {
  return {
    type: REMOVE_PRODUCT_FROM_CART,
    payload: productId,
  };
};
export const getCart = (id) => {
  return {
    type: GET_CART,
    id: id,
  };
};
export const setcart = (data) => {
  return {
    type: SET_CART,
    data: data,
  };
};
export const setcartdetail = (data) => {
  return {
    type: SET_CARTDETAIL,
    data: data,
  };
};
export const setlistproduct = (data) => {
  return {
    type: SETLISTPRODUCT,
    data: data,
  };
};
export const setprofile = (account) => {
  return {
    type: SET_PROFILE,
    account: account,
  };
};
export const setram = (data) => {
  return {
    type: SETRAM,
    data: data,
  };
};
export const setbrand = (data) => {
  return {
    type: SETBRAND,
    data: data,
  };
};
export const setmemory = (data) => {
  return {
    type: SETMEMORY,
    data: data,
  };
};
export const setramfilter = (data) => {
  return {
    type: SETRAMFILTER,
    data: data,
  };
};
export const setbrandfilter = (data) => {
  return {
    type: SETBRANDFILTER,
    data: data,
  };
};
export const setmemoryfilter = (data) => {
  return {
    type: SETMEMORYFILTER,
    data: data,
  };
};
export const setallorder = (data) => {
  return {
    type: SET_ALL_ORDER,
    data: data,
  };
};
export const setproductimages = (images) => {
  return {
    type: SETPRODUCT_IMAGE,
    images: images,
  };
};
export const setsort = (kind) => {
  return {
    type: SET_SORT,
    kind: kind,
  };
};
export const incrementCartQuantity = (productId) => {
  return {
    type: INCREMENT_CART_ITEM_QUANTITY,
    payload: productId,
  };
};

export const decrementCartQuantity = (productId) => {
  return {
    type: DECREMENT_CART_ITEM_QUANTITY,
    payload: productId,
  };
};

export const ADD_BRAND_TO_FILTER = "ADD_BRAND_TO_FILTER";
export const REMOVE_BRAND_FROM_FILTER = "REMOVE_BRAND_FROM_FILTER";

export const addBrandToFilter = (brand) => {
  return {
    type: ADD_BRAND_TO_FILTER,
    brand,
  };
};

export const removeBrandFromFilter = (brand) => {
  return {
    type: REMOVE_BRAND_FROM_FILTER,
    brand,
  };
};

export const ORDER_BY_ASC = "ORDER_BY_ASC";
export const ORDER_BY_DESC = "ORDER_BY_DESC";
export const CLEAR_ORDER_BY_PRICE = "CLEAR_ORDER_BY_PRICE";

export const orderByAsc = () => {
  return {
    type: ORDER_BY_ASC,
  };
};

export const orderByDesc = () => {
  return {
    type: ORDER_BY_DESC,
  };
};

export const clearOrderBy = () => {
  return {
    type: CLEAR_ORDER_BY_PRICE,
  };
};

export const PREV_PAGE = "PREV_PAGE";
export const NEXT_PAGE = "NEXT_PAGE";
export const GO_PAGE = "GO_PAGE";
export const COUNT_ITEM = "COUNT_ITEM";

export const nextPage = () => {
  return {
    type: NEXT_PAGE,
  };
};

export const prevPage = () => {
  return {
    type: PREV_PAGE,
  };
};

export const goPage = (n) => {
  return {
    type: GO_PAGE,
    currentPage: n,
  };
};

export const countItem = (n) => {
  return {
    type: COUNT_ITEM,
    totalItemsCount: n,
  };
};
