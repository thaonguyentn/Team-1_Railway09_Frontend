import Axios from "axios";
let listaccount = Axios.get("http://localhost:8080/api/v1/accounts/", {
  auth: {
    username: "admin",
    password: "123456",
  },
});
export default listaccount;
