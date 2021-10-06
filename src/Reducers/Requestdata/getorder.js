import Axios from "axios";
export const getorder = (id) => {
  let get = Axios.get("http://localhost:8080/api/v5/orders/" + id);
  return get;
};
export const getallorder = (page) => {
  if (page === undefined || page === "") {
    page = 1;
  }
  let get = Axios.get("http://localhost:8080/api/v5/orders/all?page=" + page);
  return get;
};
