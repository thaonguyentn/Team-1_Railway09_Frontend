import React, { Component } from "react";
import { NavLink, Switch, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Accountmanager from "./Accountmanager";
import Productmanager from "./Productmanager";
import Odermanager from "./Odermanager";
import Orderdetailmanager from "./Orderdetailmanager";
import { setcart, setcartdetail, setlogin, setprofile } from "../Actions";
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
  componentDidMount() {
    this.props.history.replace("/admin/accounts");
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
  return {
    setcart: (cart) => dispath(setcart(cart)),
    setcartdetail: (cartdetail) => dispath(setcartdetail(cartdetail)),
    setprofile: (profile) => dispath(setprofile(profile)),
    setlogin: (login) => dispath(setlogin(login)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Admin);
