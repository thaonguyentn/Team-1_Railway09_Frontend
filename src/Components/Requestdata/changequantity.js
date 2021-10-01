import Axios from "axios";
export const addquantity = (id) => {
  let post = Axios.put("http://localhost:8080/api/v4/cartdetail/" + id);
  return post;
};
export const minusquantity = (id) => {
  let post = Axios.put("http://localhost:8080/api/v4/cartdetail/?id=" + id);
  return post;
};
