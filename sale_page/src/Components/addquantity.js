import Axios from "axios";
export const addquantity = (id) => {
  let post = Axios.post(
    "http://localhost:8080/api/v4/cartdetail/" + id + "/up"
  );
  return post;
};
export const minusquantity = (id) => {
  let post = Axios.post(
    "http://localhost:8080/api/v4/cartdetail/" + id + "/down"
  );
  return post;
};
