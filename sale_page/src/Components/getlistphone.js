import Axios from "axios";
let listproduct = (page) => {
  if (page === undefined) {
    page = 1;
  }
  let get = Axios.get("http://localhost:8080/api/v2/products?page=" + page, {
    auth: {
      username: "admin",
      password: "123456",
    },
  });
  return get;
};
export default listproduct;
