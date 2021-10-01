import Axios from "axios";
let getmemory = () => {
  let get = Axios.get("http://localhost:8080/api/v1/productmemorycontrollers", {
    auth: {
      username: "adminaccount",
      password: "123456",
    },
  });
  return get;
};
export default getmemory;
