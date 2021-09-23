import Axios from "axios";
let getcartdetail = (id) => {
  let get = Axios.get(
    "http://localhost:8080/api/v5/cart/" + id + "/cartDetails",
    {
      auth: {
        username: "adminaccount",
        password: "123456",
      },
    }
  );
  return get;
};
export default getcartdetail;
