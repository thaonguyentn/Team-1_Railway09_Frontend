import Axios from "axios";
const baseURL = "https://thegioicamtayapi.herokuapp.com";
// const baseURL = "http://localhost:8080";
export const getbrand = () => {
  const get = Axios.get(baseURL + "/api/v1/productbrandcontrollers");
  return get;
};
export const getcart = (id) => {
  let token = localStorage.getItem("token");
  const get = Axios.get(baseURL + "/api/v5/cart/" + id, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
  return get;
};
export const getcartdetail = (id) => {
  let token = localStorage.getItem("token");
  const get = Axios.get(baseURL + "/api/v5/cart/" + id + "/cartDetails", {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
  return get;
};
export const getmemory = () => {
  const get = Axios.get(baseURL + "/api/v1/productmemorycontrollers");
  return get;
};
export const getorder = (id) => {
  let token = localStorage.getItem("token");
  const get = Axios.get(baseURL + "/api/v5/orders/" + id, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
  return get;
};
export const getallorder = (page) => {
  let token = localStorage.getItem("token");
  if (page === undefined || page === "") {
    page = 1;
  }
  const get = Axios.get(baseURL + "/api/v5/orders/all?page=" + page, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
  return get;
};
export const getorderbyid = (id) => {
  let token = localStorage.getItem("token");
  const get = Axios.get(baseURL + "/api/v5/orders/order/" + id, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
  return get;
};
export const getorderdetail = (id) => {
  let token = localStorage.getItem("token");
  const get = Axios.get(baseURL + "/api/v5/orders/" + id + "/orderDetails", {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
  return get;
};
export const getram = () => {
  const get = Axios.get(baseURL + "/api/v1/productramcontrollers");
  return get;
};
export const addquantity = (id) => {
  let token = localStorage.getItem("token");
  const put = Axios({
    method: "put",
    url: baseURL + "/api/v4/cartdetail/" + id,
    headers: {
      Authorization: "Bearer " + token,
    },
  });
  return put;
};
export const minusquantity = (id) => {
  let token = localStorage.getItem("token");
  const put = Axios({
    method: "put",
    url: baseURL + "/api/v4/cartdetail/?id=" + id,
    headers: {
      Authorization: "Bearer " + token,
    },
  });
  return put;
};
export const changestatuscart = (id) => {
  let token = localStorage.getItem("token");
  const get = Axios({
    method: "post",
    url: baseURL + "/api/v4/cartdetail/" + id,
    headers: {
      Authorization: "Bearer " + token,
    },
  });
  return get;
};
export const getcartdetailbyid = (id) => {
  let token = localStorage.getItem("token");
  const get = Axios.get(baseURL + "/api/v4/cartdetail/" + id, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
  return get;
};
export const getlistaccount = (page) => {
  let token = localStorage.getItem("token");
  if (page === undefined || page === "") {
    page = 1;
  }
  const get = Axios.get(baseURL + "/api/v1/accounts?page=" + page, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
  return get;
};
export const getlistproduct = (page, ram, brand, memory, search) => {
  if (page === undefined) {
    page = 1;
  }
  const rams = ram !== "" ? "&ramName=" + ram : "";
  const brands = brand !== "" ? "&brandName=" + brand : "";
  const memorys = memory !== "" ? "&memoryName=" + memory : "";
  const searchs = search !== "" ? "&search=" + search : "";
  const get = Axios.get(
    baseURL +
      "/api/v2/products?page=" +
      page +
      rams +
      brands +
      memorys +
      searchs
  );
  return get;
};
export const getproductbyid = (id) => {
  const get = Axios.get(baseURL + "/api/v2/products/" + id);
  return get;
};
export const getlistproductsort = (order, page) => {
  const get = Axios.get(
    baseURL + "/api/v2/products/" + order + "?page=" + page
  );
  return get;
};
export const createproduct = (body) => {
  let token = localStorage.getItem("token");
  const create = Axios({
    method: "post",
    url: baseURL + "/api/v2/products",
    headers: {
      Authorization: "Bearer " + token,
    },
    data: body,
  });
  return create;
};
export const activeaccount = (token) => {
  const active = Axios.get(baseURL + "/api/v3/register" + token);
  return active;
};
export const deleteproduct = (id) => {
  let token = localStorage.getItem("token");
  const deleteproduct = Axios.delete(baseURL + "/api/v2/products/" + id, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
  return deleteproduct;
};
export const cancelorder = (id, body) => {
  let token = localStorage.getItem("token");
  const cancel = Axios({
    method: "put",
    url: baseURL + "/api/v5/orders/?orderID=" + id,
    headers: {
      Authorization: "Bearer " + token,
    },
    data: body,
  });
  return cancel;
};
export const updateorder = (id) => {
  let token = localStorage.getItem("token");
  const update = Axios({
    method: "put",
    url: baseURL + "/api/v5/orders/" + id,
    headers: {
      Authorization: "Bearer " + token,
    },
  });
  return update;
};
export const addcartdetail = (productid, accountid) => {
  let token = localStorage.getItem("token");
  const add = Axios({
    method: "post",
    url:
      baseURL +
      "/api/v4/cartdetail?productId=" +
      productid +
      "&accountId=" +
      accountid,
    headers: {
      Authorization: "Bearer " + token,
    },
  });
  return add;
};
export const getlogin = (body) => {
  const login = Axios.post(baseURL + "/api/v1/login", body);
  return login;
};
export const getprofile = (id, auth) => {
  let token = localStorage.getItem("token");
  const get = Axios.get(baseURL + "/api/v1/accounts/" + id, {
    auth: auth,
  });
  return get;
};
export const createorder = (body) => {
  let token = localStorage.getItem("token");
  const user_login_infor = JSON.parse(localStorage.getItem("user_login_infor"));
  const create = Axios.post(
    baseURL + "/api/v5/orders/" + user_login_infor.id,
    body,
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );

  return create;
};
export const register = (body) => {
  const register = Axios({
    method: "post",
    url: baseURL + "/api/v3/register",
    data: body,
  });
  return register;
};
export const addimageslide = (productID, images) => {
  let token = localStorage.getItem("token");
  const create = Axios({
    method: "post",
    url: baseURL + "/api/v5/productimages/" + productID,
    headers: {
      Authorization: "Bearer " + token,
      "Content-Type": "application/json",
    },
    data: images,
  });
  return create;
};
