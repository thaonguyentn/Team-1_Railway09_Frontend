import Axios from "axios";
let getcartdetailbyid = (id) => {
  let get = Axios.get("http://localhost:8080/api/v4/cartdetail/" + id);
  return get;
};
export default getcartdetailbyid;
