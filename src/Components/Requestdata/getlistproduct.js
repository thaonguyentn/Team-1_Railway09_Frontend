import Axios from "axios";
let listproduct = (page, ram, brand, memory, search) => {
  if (page === undefined) {
    page = 1;
  }
  let rams = ram !== "" ? "&ramName=" + ram : "";
  let brands = brand !== "" ? "&brandName=" + brand : "";
  let memorys = memory !== "" ? "&memoryName=" + memory : "";
  let searchs = search !== "" ? "&search=" + search : "";
  console.log(rams, searchs, brands, memorys);
  let get = Axios.get(
    "http://localhost:8080/api/v2/products?page=" +
      page +
      rams +
      brands +
      memorys +
      searchs,
    {
      auth: {
        username: "adminaccount",
        password: "123456",
      },
    }
  );
  return get;
};
export default listproduct;
