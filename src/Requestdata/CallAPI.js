import Axios from "axios";
const baseURL = "https://thegioicamtayapi.herokuapp.com";
export const getbrand = () => {
  const get = Axios.get(baseURL + "/api/v1/productbrandcontrollers", {
    auth: {
      username: "adminaccount",
      password: "123456",
    },
  });
  return get;
};
export const getcart = (id) => {
  const token = localStorage.getItem("token");
  const get = Axios.get(baseURL + "/api/v5/cart/" + id, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
  return get;
};
export const getcartdetail = (id) => {
  const get = Axios.get(baseURL + "/api/v5/cart/" + id + "/cartDetails", {
    auth: {
      username: "adminaccount",
      password: "123456",
    },
  });
  return get;
};
export const getmemory = () => {
  const get = Axios.get(baseURL + "/api/v1/productmemorycontrollers", {
    auth: {
      username: "adminaccount",
      password: "123456",
    },
  });
  return get;
};
export const getorder = (id) => {
  const get = Axios.get(baseURL + "/api/v5/orders/" + id);
  return get;
};
export const getallorder = (page) => {
  if (page === undefined || page === "") {
    page = 1;
  }
  const get = Axios.get(baseURL + "/api/v5/orders/all?page=" + page);
  return get;
};
export const getorderdetail = (id) => {
  const get = Axios.get(baseURL + "/api/v5/orders/" + id + "/orderDetails");
  return get;
};
export const getaccount = (id) => {
  const get = Axios.get(baseURL + "/api/v1/accounts/" + id);
  return get;
};
export const getram = () => {
  const get = Axios.get(baseURL + "/api/v1/productramcontrollers", {
    auth: {
      username: "adminaccount",
      password: "123456",
    },
  });
  return get;
};
export const addquantity = (id) => {
  const post = Axios.put(baseURL + "/api/v4/cartdetail/" + id);
  return post;
};
export const minusquantity = (id) => {
  const post = Axios.put(baseURL + "/api/v4/cartdetail/?id=" + id);
  return post;
};
export const changestatuscart = (id) => {
  const get = Axios.post(baseURL + "/api/v4/cartdetail/" + id);
  return get;
};
export const getcartdetailbyid = (id) => {
  const get = Axios.get(baseURL + "/api/v4/cartdetail/" + id);
  return get;
};
export const getlistaccount = (page) => {
  const token = localStorage.getItem("token");
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
  console.log(rams, searchs, brands, memorys);
  const get = Axios.get(
    baseURL +
      "/api/v2/products?page=" +
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
  const create = Axios.post(baseURL + "/api/v2/products", body).then(
    (response) => {
      console.log(response);
    }
  );
  return create;
};
export const activeaccount = (token) => {
  const active = Axios.get(baseURL + "/api/v3/register" + token);
  return active;
};
export const deleteproduct = (id) => {
  const token = localStorage.getItem("token");
  const deleteproduct = Axios.delete(baseURL + "/api/v2/products/" + id, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
  return deleteproduct;
};
export const cancelorder = (id, body) => {
  const cancel = Axios.put(baseURL + "/api/v5/orders/?orderID=" + id, body);
  return cancel;
};
export const updateorder = (id) => {
  const update = Axios.put(baseURL + "/api/v5/orders/" + id);
  return update;
};
export const addcartdetail = (productid, accountid) => {
  const add = Axios.post(
    baseURL +
      "/api/v4/cartdetail?productId=" +
      productid +
      "&accountId=" +
      accountid
  );
  return add;
};
export const getlogin = (body) => {
  const login = Axios.post(baseURL + "/api/v1/login", body);
  return login;
};
export const getprofile = (id, auth) => {
  const get = Axios.get(baseURL + "/api/v1/accounts/" + id, {
    auth: auth,
  });
  return get;
};
export const createorder = (body) => {
  const user_login_infor = JSON.parse(localStorage.getItem("user_login_infor"));
  const create = Axios.post(
    baseURL + "/api/v5/orders/" + user_login_infor.id,
    body
  );
  return create;
};
export const register = (body) => {
  const register = Axios.post(baseURL + "/api/v3/register", body);
  return register;
};
