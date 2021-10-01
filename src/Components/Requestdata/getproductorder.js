import Axios from "axios";
export const getlistproductsort = (order, page) => {
  let get = Axios.get(
    "http://localhost:8080/api/v2/products/" + order + "?page=" + page
  );
  return get;
};
