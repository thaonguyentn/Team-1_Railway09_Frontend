import React, { Component } from "react";
import { NavLink, Switch, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Accountmanager from "./Accountmanager";
import Productmanager from "./Productmanager";
import Odermanager from "./Odermanager";
import Orderdetailmanager from "./Orderdetailmanager";
import { setcart, setcartdetail, setlogin, setprofile } from "../Actions";
import "../Asses/css/Admin.css";
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
      animation: "",
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
  componentDidMount() {
    this.props.history.replace("/admin/accounts");
  }
  componentWillUnmount() {
    this.props.history.replace("/");
  }
  render() {
    console.log(this.state.animation);
    return (
      <div style={{}}>
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
            className="linoactive"
            id={
              this.state.animation === "right"
                ? "right"
                : this.state.animation === "left"
                ? "leftnoactive"
                : ""
            }
          >
            <NavLink
              exact
              to={{
                pathname:
                  this.state.isavtiveclass === 1
                    ? "/admin/orders"
                    : this.state.isavtiveclass === 2
                    ? "/admin/accounts"
                    : this.state.isavtiveclass === 3
                    ? "/admin/products"
                    : "",
                state: { animation: this.state.animation },
              }}
              onClick={() => {
                this.setState({ animation: "right" });
                if (this.state.isavtiveclass === 1) {
                  this.setState({ isavtiveclass: 3 });
                }
                if (this.state.isavtiveclass === 2) {
                  this.setState({ isavtiveclass: 1 });
                }
                if (this.state.isavtiveclass === 3) {
                  this.setState({ isavtiveclass: 2 });
                }
                setTimeout(() => {
                  this.setState({ animation: "" });
                }, 500);
              }}
            >
              <p>
                {this.state.isavtiveclass === 1
                  ? "Quản lý đơn hàng"
                  : this.state.isavtiveclass === 2
                  ? "Quản lý Account"
                  : this.state.isavtiveclass === 3
                  ? "Quản lý sản phẩm"
                  : ""}
              </p>
            </NavLink>
          </li>
          <li
            className="liactive"
            id={
              this.state.animation === "right"
                ? "rightactive1"
                : this.state.animation === "left"
                ? "leftactive"
                : ""
            }
          >
            <a>
              <p>
                {this.state.isavtiveclass === 1
                  ? "Quản lý Account"
                  : this.state.isavtiveclass === 2
                  ? "Quản lý sản phẩm"
                  : this.state.isavtiveclass === 3
                  ? "Quản lý đơn hàng"
                  : ""}
              </p>
            </a>
          </li>
          <li
            className="linoactive"
            id={
              this.state.animation === "right"
                ? "righnoactive"
                : this.state.animation === "left"
                ? "left"
                : ""
            }
          >
            <NavLink
              exact
              to={
                this.state.isavtiveclass === 1
                  ? "/admin/products"
                  : this.state.isavtiveclass === 2
                  ? "/admin/orders"
                  : this.state.isavtiveclass === 3
                  ? "/admin/accounts"
                  : ""
              }
              onClick={() => {
                this.setState({ animation: "left" });
                if (this.state.isavtiveclass === 1) {
                  this.setState({ isavtiveclass: 2 });
                }
                if (this.state.isavtiveclass === 2) {
                  this.setState({ isavtiveclass: 3 });
                }
                if (this.state.isavtiveclass === 3) {
                  this.setState({ isavtiveclass: 1 });
                }
                setTimeout(() => {
                  this.setState({ animation: "" });
                }, 500);
              }}
            >
              <p>
                {this.state.isavtiveclass === 1
                  ? "Quản lý sản phẩm"
                  : this.state.isavtiveclass === 2
                  ? "Quản lý đơn hàng"
                  : this.state.isavtiveclass === 3
                  ? "Quản lý Account"
                  : ""}
              </p>
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
  return {
    setcart: (cart) => dispath(setcart(cart)),
    setcartdetail: (cartdetail) => dispath(setcartdetail(cartdetail)),
    setprofile: (profile) => dispath(setprofile(profile)),
    setlogin: (login) => dispath(setlogin(login)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Admin);
