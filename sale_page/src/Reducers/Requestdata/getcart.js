import Axios from "axios";
let getcart = (id) => {
  let token = localStorage.getItem("token");
  let get = Axios.get("http://localhost:8080/api/v5/cart/" + id, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
  return get;
};
export default getcart;
