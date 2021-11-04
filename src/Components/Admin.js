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
    islogin: state.loginreducer.isLogin,
  };
};
const mapDispatchToProps = (dispath) => {
  return {};
};
export default connect(mapStateToProps, mapDispatchToProps)(Admin);
