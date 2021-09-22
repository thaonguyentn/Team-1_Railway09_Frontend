import Axios from "axios";
let getram = () => {
  let get = Axios.get("http://localhost:8080/api/v1/productramcontrollers", {
    auth: {
      username: "adminaccount",
      password: "123456",
    },
  });
  return get;
};
export default getram;
