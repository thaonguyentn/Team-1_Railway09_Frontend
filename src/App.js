import "./App.css";
import { NavLink, Switch, Route, Redirect } from "react-router-dom";
import Dienthoai from "./Components/Dienthoai";
import Phukien from "./Components/Phukien";
import Login from "./Components/Login";
import Register from "./Components/Register";
import Home from "./Components/Home";
import DienthoaiDetail from "./Components/DienthoaiDetail";
import Giohang from "./Components/Giohang";
import { Component, useState } from "react";
import Admin from "./Components/Admin";
import { connect } from "react-redux";
import { setlogin, setcart, setprofile, setcartdetail } from "./Actions/index";
import Footer from "./Components/Footer";
import Banner from "./Components/Banner";
import Profile from "./Components/Profile";
import React from "react";
import ActiveAccount from "./Components/ActiveAccount";
import Order from "./Components/Order";
import avatar from "../src/Images/avatar.jpg";
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  Logout = () => {
    this.props.setlogin(false);
    localStorage.removeItem("role");
    localStorage.removeItem("token");
    localStorage.removeItem("user_login");
    localStorage.removeItem("user_login_infor");
    this.props.setcart(null);
    this.props.setcartdetail(null);
    this.props.setprofile(null);
  };
  render() {
    const user_login_infor = JSON.parse(
      localStorage.getItem("user_login_infor")
    );
    const role = JSON.parse(localStorage.getItem("role"));
    if (role === "Admin") {
      return (
        <>
          <Redirect
            to={{
              pathname: "/admin",
            }}
          ></Redirect>
          <Switch>
            <Route path="/admin" component={Admin} />
          </Switch>
        </>
      );
    }
    let loginelement;
    let registerelement;
    if (this.props.isLogin === true) {
      if (role === "Admin") {
        registerelement = (
          <div>
            <ul className="nav navbar-nav" id="user">
              <li>
                <NavLink
                  activeStyle={{ backgroundColor: "rgba(0,0,0,0)" }}
                  to="/admin"
                >
                  Quản lý trang bán hàng
                </NavLink>
              </li>
            </ul>
          </div>
        );
      }
      if (user_login_infor) {
        loginelement = (
          <div>
            <div className="dropdown" id="rapper">
              <button
                className="btn btn-primary dropdown-toggle"
                type="button"
                data-toggle="dropdown"
                id="optionuser"
              >
                <span>{user_login_infor.fullname}</span>
                <img
                  style={{
                    width: "23px",
                    height: "auto",
                    borderRadius: "50%",
                    marginLeft: "5px",
                  }}
                  src={
                    user_login_infor.avatar !== null
                      ? user_login_infor.avatar
                      : avatar
                  }
                  alt={avatar}
                />
              </button>
              <ul className="dropdown-menu">
                <li>
                  <NavLink to="/profile">Tài khoản của tôi</NavLink>
                </li>
                <li>
                  <a style={{ cursor: "pointer" }} onClick={this.Logout}>
                    Đăng xuất
                  </a>
                </li>
              </ul>
            </div>
          </div>
        );
      }
    } else {
      loginelement = <Login />;
      registerelement = <Register />;
    }

    return (
      <div className="App">
        <header>
          <Banner />
          <div id="loginlogout">
            <div id="lienketcontainer">
              <div id="lienhe">
                Liên hệ với chúng tôi: <span>Hà nội: 0964385217</span>|{" "}
                <span>TP.Hồ Chí Minh: 0705818277</span>
              </div>

              <div id="ketnoi">
                <ul>
                  <li>Kết nối:</li>
                  <li>
                    <a
                      href="https://www.facebook.com/GHKSand/"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <i className="fa fa-facebook"></i>
                    </a>
                  </li>
                  <li>
                    <a href="">
                      <i className="fa fa-google"></i>
                    </a>
                  </li>
                  <li>
                    <a href="">
                      <i className="fa fa-instagram"></i>
                    </a>
                  </li>
                  <li>
                    <a href="">
                      <i className="fa fa-twitter"></i>
                    </a>
                  </li>
                  <li>
                    <a href="">
                      <i className="fa fa-youtube"></i>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div style={{ float: "right" }}>
              {loginelement}
              {registerelement}
            </div>
            {/* <React.Fragment style={{ clear: "both" }}> </React.Fragment> */}
            <br style={{ clear: "both" }} />
          </div>

          {/* <p ></p> */}
          <div id="searchwaper">
            <div id="logo">
              <NavLink
                activeStyle={{
                  backgroundColor: "none",
                }}
                exact
                to="/"
              >
                <span style={{ fontSize: "16px" }}>
                  <img
                    style={{
                      height: "38.5px",
                      borderRadius: "5px",
                      padding: "3px",
                    }}
                    src={require("./Images/logonew.jpg").default}
                    alt=""
                  />
                </span>
              </NavLink>
            </div>
            <div id="search">
              <div id="searchinput">
                <input placeholder="Bạn muốn tìm gì" />
              </div>
              <div
                style={{
                  marginLeft: "auto",
                }}
              >
                <button
                  type="button"
                  className="btn btn-default"
                  id="searchbutton"
                >
                  <span className="glyphicon glyphicon-search"></span>
                </button>
              </div>
            </div>
            <div id="giohangbutton">
              <NavLink
                exact
                to={{
                  pathname: "/giohang",
                }}
                activeStyle={{ textDecoration: "none" }}
              >
                <i
                  className="fa fa-shopping-cart"
                  style={{ color: "white", margin: "7px" }}
                ></i>
                <span style={{ color: "white", margin: "7px" }}>Giỏ hàng</span>
                <div
                  style={{
                    color: "white",
                    position: "absolute",
                    backgroundColor: "blue",
                    width: "20px",
                    height: "20px",
                    textAlign: "center",
                    left: "90px",
                    bottom: "20px",
                    borderRadius: "50%",
                    display: this.props.cart ? "" : "none",
                  }}
                >
                  {this.props.cart ? this.props.cart.quantity : ""}
                </div>
              </NavLink>
            </div>
          </div>

          <nav
            className="navbar navbar-default bg-primary"
            role="navigation"
            style={{ backgroundColor: "#006eff", color: "#96a8c0" }}
          >
            <div className="navbar-header">
              <button
                type="button"
                className="navbar-toggle"
                data-toggle="collapse"
                data-target=".navbar-ex1-collapse"
              >
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </button>
              <span style={{ color: "white" }} className="navbar-brand">
                Danh mục sản phẩm
              </span>
            </div>
            <div className="collapse navbar-collapse navbar-ex1-collapse">
              <ul className="nav navbar-nav" id="menusp">
                <li>
                  <NavLink
                    exact
                    to="/dienthoai"
                    activeStyle={{ color: "greenyellow" }}
                  >
                    <span style={{ fontSize: "16px" }}>Điện thoại</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    exact
                    to="/phukien"
                    activeStyle={{ color: "greenyellow" }}
                  >
                    <span style={{ fontSize: "16px" }}>Phụ kiện</span>
                  </NavLink>
                </li>
              </ul>
            </div>
          </nav>
          <Switch>
            <Route path="/" component={Home} exact />

            <Route path="/dienthoai" component={Dienthoai} exact />
            <Route path="/phukien" component={Phukien} exact />
            <Route path="/dienthoai/:ID" component={DienthoaiDetail} exact />
            <Route path="/giohang/" component={Giohang} />
            <Route path="/profile/" component={Profile} />
            <Route path="/activeUser" component={ActiveAccount} />
            <Route path="/login" component={Login} />
            <Route path="/order" component={Order} />
          </Switch>
        </header>
        <footer>
          <Footer />
        </footer>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    isLogin: state.loginreducer.isLogin,
    cart: state.cart.cart,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    setlogin: (islogin) => {
      dispatch(setlogin(islogin));
    },
    setcart: (cart) => {
      dispatch(setcart(cart));
    },
    setcartdetail: (cartdetail) => {
      dispatch(setcartdetail(cartdetail));
    },
    setprofile: (account) => {
      dispatch(setprofile(account));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(App);
