import Axios from "axios";
const changestatuscart = (id) => {
  let get = Axios.post("http://localhost:8080/api/v4/cartdetail/" + id);
  return get;
};
export default changestatuscart;
