import Axios from "axios";
let getaccount = (id) => {
  let get = Axios.get("http://localhost:8080/api/v1/accounts/" + id, {
    auth: {
      username: "admin",
      password: "123456",
    },
  });
  return get;
};
export default getaccount;
