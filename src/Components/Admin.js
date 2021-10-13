import React, { Component } from "react";
import { NavLink, Switch, Route, Redirect } from "react-router-dom";
import {
  getlistproduct,
  getlistaccount,
  getallorder,
  deleteproduct,
  cancelorder,
  updateorder,
} from "../Requestdata/CallAPI";
import { connect } from "react-redux";
import {
  setlistproduct,
  setallorder,
  setlogin,
  setcart,
  setcartdetail,
  setprofile,
  setlistaccount,
} from "../Actions/index";
import slides from "./Carousel";
import AddProduct from "./AddProduct";
import Addimageslide from "./AddImageSlide";
import ReactModal from "react-modal";
import Accountmanager from "./Accountmanager";
import Productmanager from "./Productmanager";
import Odermanager from "./Odermanager";
import Orderdetailmanager from "./Orderdetailmanager";
class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      prid: 0,
      isopenmodaladd: false,
      isopenmodaladdslide: false,
      isopenid: null,
      isopenmodaldeleteorder: false,
      isavtiveclass: 1,
      why: "",
      whyalert: "",
    };
  }
  logout = () => {
    localStorage.removeItem("role");
    localStorage.removeItem("token");
    localStorage.removeItem("user_login");
    localStorage.removeItem("user_login_infor");
    this.props.setcart(null);
    this.props.setcartdetail(null);
    this.props.setprofile(null);
    this.props.setlogin(false);
  };
  Nextproduct = () => {
    if (this.props.totalpageproduct !== this.props.currenpageproduct + 1) {
      getlistproduct(this.props.currenpageproduct + 1 + 1, "", "", "", "").then(
        (data) => {
          this.props.getlistproduct(data.data);
        }
      );
    }
  };
  Previosproduct = () => {
    if (this.props.currenpageproduct !== 0) {
      getlistproduct(this.props.currenpageproduct, "", "", "", "").then(
        (data) => {
          this.props.getlistproduct(data.data);
        }
      );
    }
  };
  Nextaccount = () => {
    if (this.props.totalpageaccount !== this.props.currenpageaccount + 1) {
      getlistaccount(this.props.currenpageproduct + 1 + 1).then((data) => {
        this.props.setlistaccount(data.data);
      });
    }
  };
  Previosaccount = () => {
    if (this.props.currenpageaccount !== 0) {
      getlistaccount(this.props.currenpageaccount).then((data) => {
        this.props.setlistaccount(data.data);
      });
    }
  };
  Nextorder = () => {
    if (this.props.totalpageorder !== this.props.currenpageorder + 1) {
      getallorder(this.props.currenpageorder + 1 + 1).then((data) => {
        this.props.setallorder(data.data);
      });
    }
  };
  Previosorder = () => {
    if (this.props.totalpageorder !== 0) {
      getallorder(this.props.currenpageorder).then((data) => {
        this.props.setallorder(data.data);
      });
    }
  };
  DeleteProduct = (id) => {
    deleteproduct(id).then(() => {
      getlistproduct(1, "", "", "", "").then((response) => {
        this.props.getlistproduct(response.data);
      });
    });
  };
  showimageslide = (id) => {
    if (id === this.state.prid) {
      this.setState({
        prid: 0,
      });
    } else {
      this.setState({
        prid: id,
      });
    }
  };
  updateorder = (id, status) => {
    if (
      window.confirm(
        status === "Not_Active"
          ? "Xác nhận duyệt đơn hàng"
          : status === "Active"
          ? "Xác nhận đã giao hàng"
          : status === "End"
          ? "Đã giao"
          : status === "Delete"
          ? "Đã huỷ"
          : ""
      )
    ) {
      updateorder(id).then(() => {
        getallorder().then((response) => {
          this.props.setallorder(response.data);
        });
      });
    }
  };
  cancelorder = (id) => {
    if (this.state.why === "") {
      this.setState({ whyalert: "* bạn chưa nhập lý do" });
      return;
    }
    let body = { description: "Huỷ : " + this.state.why };
    cancelorder(id, body).then(() => {
      getallorder().then((response) => {
        this.props.setallorder(response.data);
        this.setState({ isopenmodaldeleteorder: false });
      });
    });
  };
  format2 = (n) => {
    return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  componentDidMount() {
    getlistaccount(1).then((response) => {
      this.props.setlistaccount(response.data);
    });
    getlistproduct(1, "", "", "", "").then((response) => {
      this.props.getlistproduct(response.data);
    });
    getallorder().then((response) => {
      this.props.setallorder(response.data);
    });
  }
  componentWillUnmount() {
    this.props.history.replace("/");
  }
  render() {
    let rows;
    if (this.props.listaccount) {
      rows = this.props.listaccount.map((row, index) => {
        return (
          <tr key="index">
            <td>{row.id}</td>
            <td>{row.username}</td>
            <td>{row.email}</td>
            <td>{row.fullname}</td>
            <td>{row.gender}</td>
            <td>{row.address}</td>
            <td>{row.avatar}</td>
            <td>{row.phone_number}</td>
            <td>{row.register_date}</td>
          </tr>
        );
      });
    }
    let Previosaccount;
    let Nextaccount;
    if (
      this.props.currenpageaccount === 0 ||
      this.props.currenpageaccount === undefined
    ) {
      Previosaccount = "";
    } else {
      Previosaccount = (
        <button className="page-link" onClick={this.Previosaccount}>
          Previous
        </button>
      );
    }
    if (
      this.props.totalpageaccount === this.props.currenpageaccount + 1 ||
      this.props.currenpageaccount === undefined
    ) {
      Nextaccount = "";
    } else {
      Nextaccount = (
        <button className="page-link" onClick={this.Nextaccount}>
          Next
        </button>
      );
    }
    let pageaccount = [];
    for (let index = 0; index < this.props.totalpageaccount; index++) {
      let button = (
        <button
          className="page-link"
          id={this.props.currenpageaccount === index ? "buttonpage" : "abc"}
          onClick={() => {
            getlistaccount(index + 1).then((data) => {
              this.props.setlistaccount(data.data);
            });
          }}
        >
          {index + 1}
        </button>
      );
      pageaccount.push(button);
    }
    let navaccount = (
      <nav aria-label="Page navigation example">
        <ul className="pagination">
          <li className="page-item" id="show">
            {Previosaccount}
            {pageaccount}
            {Nextaccount}
          </li>
        </ul>
        <ul className="pagination" id="pagination"></ul>
      </nav>
    );
    let rows2;
    if (this.props.listpro) {
      rows2 = this.props.listpro.map((row, index) => {
        return (
          <tr key={index}>
            <td>{row.id}</td>
            <td>{row.name}</td>
            <td>{row.price}</td>
            <td>{row.discount}%</td>
            <td>{row.brand}</td>
            <td>{row.category}</td>
            <td>{row.description}</td>
            <td>{row.ram}</td>
            <td>{row.memory}</td>
            <td>{row.camera}</td>
            <td>{row.color}</td>
            <td>{row.screenSize}</td>
            <td>{row.operatingSystem}</td>
            <td>{row.chip}</td>
            <td>{row.battery} mAh</td>
            <td>{row.sim}</td>
            <td>
              <button onClick={() => this.setState({ isopenid: row.id })}>
                Xem
              </button>
              <ReactModal
                style={{
                  overlay: {},
                  content: {
                    width: "600px",
                    margin: "auto",
                  },
                }}
                isOpen={this.state.isopenid === row.id}
                onRequestClose={() => this.setState({ isopenid: null })}
              >
                <img style={{ width: "535px" }} src={row.image} alt="" />
              </ReactModal>
            </td>
            <td>
              <button onClick={() => this.showimageslide(row.id)}>
                {row.listResponse ? row.listResponse.length : 0}
              </button>
              <ReactModal
                style={{
                  overlay: {},
                  content: { width: "650px", margin: "auto", height: "auto" },
                }}
                isOpen={this.state.prid === row.id}
                onRequestClose={() => this.setState({ prid: 0 })}
              >
                {slides(row.listResponse, "600px")}
              </ReactModal>
              <button
                onClick={() => this.setState({ isopenmodaladdslide: true })}
              >
                <span className="glyphicon glyphicon-plus"></span>
              </button>
              <Addimageslide
                isopenmodaladdslide={this.state.isopenmodaladdslide}
                setisopenmodaladdslide={(data) => {
                  this.setState({ isopenmodaladdslide: data });
                }}
              />
            </td>
            <td>{row.quantity}</td>
            <td>{row.enter_date}</td>
            <td>
              <button
                type="button"
                className="btn btn-danger"
                onClick={() => {
                  this.DeleteProduct(row.id);
                }}
              >
                delete
              </button>
            </td>
          </tr>
        );
      });
    }
    let Previosproduct;
    let Nextproduct;
    if (
      this.props.currenpageproduct === 0 ||
      this.props.currenpageproduct === undefined
    ) {
      Previosproduct = "";
    } else {
      Previosproduct = (
        <button className="page-link" onClick={this.Previosproduct}>
          Previous
        </button>
      );
    }
    if (
      this.props.totalpageproduct === this.props.currenpageproduct + 1 ||
      this.props.currenpageproduct === undefined
    ) {
      Nextproduct = "";
    } else {
      Nextproduct = (
        <button className="page-link" onClick={this.Nextproduct}>
          Next
        </button>
      );
    }
    let page = [];
    for (let index = 0; index < this.props.totalpageproduct; index++) {
      let button = (
        <button
          className="page-link"
          id={this.props.currenpageproduct === index ? "buttonpage" : "abc"}
          onClick={() => {
            getlistproduct(index + 1, "", "", "", "").then((data) => {
              this.props.getlistproduct(data.data);
            });
          }}
        >
          {index + 1}
        </button>
      );
      page.push(button);
    }
    let nav = (
      <nav aria-label="Page navigation example">
        <ul className="pagination">
          <li className="page-item" id="show">
            {Previosproduct}
            {page}
            {Nextproduct}
          </li>
        </ul>
        <ul className="pagination" id="pagination"></ul>
      </nav>
    );
    let rows3;
    if (this.props.allorder) {
      rows3 = this.props.allorder.map((row, index) => {
        return (
          <tr key={index}>
            <td>{row.orderID}</td>
            <td>{row.fullname}</td>
            <td>{row.address}</td>
            <td>{row.phone}</td>
            <td>{this.format2(row.totalPrice)} đ</td>
            <td>
              {row.status === "Not_Active"
                ? "Chờ duyệt"
                : row.status === "Active"
                ? "Đang giao"
                : row.status === "End"
                ? "Đã giao"
                : row.status === "Delete"
                ? "Đã huỷ"
                : ""}{" "}
              <button
                type="button"
                class="btn btn-info"
                onClick={() => this.updateorder(row.orderID, row.status)}
                style={{
                  display:
                    row.status === "End"
                      ? "none"
                      : row.status === "Delete"
                      ? "none"
                      : "",
                }}
              >
                {row.status === "Not_Active"
                  ? "Duyệt đơn hàng"
                  : row.status === "Active"
                  ? "Hoàn tất đơn hàng"
                  : ""}
              </button>
              <button
                type="button"
                class="btn btn-danger"
                onClick={() => this.setState({ isopenmodaldeleteorder: true })}
                style={{
                  display:
                    row.status === "End"
                      ? "none"
                      : row.status === "Delete"
                      ? "none"
                      : "",
                }}
              >
                Huỷ đơn hàng
              </button>
            </td>

            <td>{row.orderDate}</td>
            <td>
              {row.description}

              <ReactModal
                isOpen={this.state.isopenmodaldeleteorder}
                onRequestClose={() =>
                  this.setState({ isopenmodaldeleteorder: false })
                }
                style={{
                  overlay: { background: "none" },
                  content: {
                    backgroundColor: "orange",
                    width: "500px",
                    height: "300px",
                    margin: "auto",
                    textAlign: "center",
                  },
                }}
              >
                <h3>Hãy nhập lý do huỷ đơn hàng</h3>
                <textarea
                  name="why"
                  value={this.state.why}
                  onChange={(event) =>
                    this.setState({ why: event.target.value, whyalert: "" })
                  }
                  cols="40"
                  rows="5"
                ></textarea>
                <p style={{ color: "red" }}>{this.state.whyalert}</p>
                <p>
                  <button
                    style={{ padding: "5px", backgroundColor: "red" }}
                    onClick={() => this.cancelorder(row.orderID)}
                  >
                    Xác nhận huỷ
                  </button>
                </p>
              </ReactModal>
            </td>
          </tr>
        );
      });
    }
    let Previosorder;
    let Nextorder;
    if (
      this.props.currenpageorder === 0 ||
      this.props.currenpageorder === undefined
    ) {
      Previosorder = "";
    } else {
      Previosorder = (
        <button className="page-link" onClick={this.Previosorder}>
          Previous
        </button>
      );
    }
    if (
      this.props.totalpageorder === this.props.currenpageorder + 1 ||
      this.props.currenpageorder === undefined ||
      this.props.totalpageorder === 0
    ) {
      Nextorder = "";
    } else {
      Nextorder = (
        <button className="page-link" onClick={this.Nextorder}>
          Next
        </button>
      );
    }
    let pageorder = [];
    for (let index = 0; index < this.props.totalpageorder; index++) {
      let button = (
        <button
          className="page-link"
          id={this.props.currenpageorder === index ? "buttonpage" : "abc"}
          onClick={() => {
            getallorder(index + 1).then((data) => {
              this.props.setallorder(data.data);
            });
          }}
        >
          {index + 1}
        </button>
      );
      pageorder.push(button);
    }
    let navorder = (
      <nav aria-label="Page navigation example">
        <ul className="pagination">
          <li className="page-item" id="show">
            {Previosorder}
            {pageorder}
            {Nextorder}
          </li>
        </ul>
        <ul className="pagination" id="pagination"></ul>
      </nav>
    );
    return (
      <div>
        <div style={{}}>
          <button
            style={{ width: "100%" }}
            type="button"
            className="btn btn-primary"
            onClick={this.logout}
          >
            Đăng xuất
          </button>
        </div>
        <marquee direction="left">
          <h1 style={{ color: "red" }}>
            Warning! Đây là trang của Admin không phận sự miễn vào !
          </h1>
        </marquee>
        <ul className="navadmin">
          <li
            className={
              this.state.isavtiveclass === 1 ? "liactive" : "linoactive"
            }
          >
            <NavLink
              exact
              to="/admin/accounts"
              onClick={() => this.setState({ isavtiveclass: 1 })}
            >
              <h1>Quản lý Account</h1>
            </NavLink>
          </li>
          <li
            className={
              this.state.isavtiveclass === 2 ? "liactive" : "linoactive"
            }
          >
            <NavLink
              exact
              to="/admin/products"
              onClick={() => this.setState({ isavtiveclass: 2 })}
            >
              <h1>Quản lý sản phẩm</h1>
            </NavLink>
          </li>
          <li
            className={
              this.state.isavtiveclass === 3 ? "liactive" : "linoactive"
            }
          >
            <NavLink
              exact
              to="/admin/orders"
              onClick={() => this.setState({ isavtiveclass: 3 })}
            >
              <h1>Quản lý đơn hàng</h1>
            </NavLink>
          </li>
        </ul>
        <Switch>
          <Route path="/admin/accounts" component={Accountmanager} exact />
          <Route path="/admin/products" component={Productmanager} exact />
          <Route path="/admin/orders" component={Odermanager} exact />
          <Route
            path="/admin/orders/detail/:ID"
            component={Orderdetailmanager}
          />
        </Switch>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    totalpageproduct: state.productreducer.totalPage,
    currenpageproduct: state.productreducer.currenPage,
    listpro: state.productreducer.listproduct,
    totalpageorder: state.orderreducer.totalPage,
    currenpageorder: state.orderreducer.currenPage,
    allorder: state.orderreducer.allorder,
    islogin: state.loginreducer.isLogin,
    totalpageaccount: state.accountreducer.totalPage,
    currenpageaccount: state.accountreducer.currenPage,
    listaccount: state.accountreducer.listaccount,
  };
};
const mapDispatchToProps = (dispath) => {
  return {
    getlistproduct: (list) => {
      dispath(setlistproduct(list));
    },
    setallorder: (allorder) => {
      dispath(setallorder(allorder));
    },
    setlogin: (islogin) => {
      dispath(setlogin(islogin));
    },
    setcart: (cart) => {
      dispath(setcart(cart));
    },
    setcartdetail: (cartdetail) => {
      dispath(setcartdetail(cartdetail));
    },
    setprofile: (account) => {
      dispath(setprofile(account));
    },
    setlistaccount: (data) => {
      dispath(setlistaccount(data));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Admin);
