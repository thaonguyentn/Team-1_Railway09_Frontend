import Axios from "axios";
let token = localStorage.getItem("token");
let listaccount = Axios.get("http://localhost:8080/api/v1/accounts/", {
  auth: {
    username: "adminaccount",
    password: "123456",
  },
});
export default listaccount;
