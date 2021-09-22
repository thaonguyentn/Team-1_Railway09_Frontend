import Axios from "axios";
let getbrand = () => {
  let get = Axios.get("http://localhost:8080/api/v1/productbrandcontrollers", {
    auth: {
      username: "adminaccount",
      password: "123456",
    },
  });
  return get;
};
export default getbrand;
