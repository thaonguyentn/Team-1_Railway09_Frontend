import Axios from "axios";
const listaccount = (page) => {
  let token = localStorage.getItem("token");
  if (page === undefined || page === "") {
    page = 1;
  }
  let get = Axios.get("http://localhost:8080/api/v1/accounts?page=" + page, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
  return get;
};
export default listaccount;
