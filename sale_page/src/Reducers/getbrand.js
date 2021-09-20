import Axios from "axios";
let getbrand = () => {
  let get = Axios.get("http://localhost:8080/api/v5/cart/", {
    auth: {
      username: "admin",
      password: "123456",
    },
  });
  return get;
};
export default getbrand;
