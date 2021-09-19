import Axios from "axios";
let listproduct = Axios.get("http://localhost:8080/api/v2/products", {
  auth: {
    username: "admin",
    password: "123456",
  },
});
export default listproduct;
