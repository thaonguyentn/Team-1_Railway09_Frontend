import Axios from "axios";
let token = localStorage.getItem("token");
let listaccount = Axios.get("http://localhost:8080/api/v1/accounts/", {
  headers: {
    Authorization: "Bearer " + token,
  },
});
export default listaccount;
