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
import Axios from "axios";
import Admin from "./Components/Admin";
import { connect } from "react-redux";
import { setlogin, setcart, setprofile, setcartdetail } from "./Actions/index";
import Footer from "./Components/Footer";
import Banner from "./Components/Banner";
import Profile from "./Components/Profile";
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  Logout = () => {
    this.props.setlogin(false);
    console.log("kkkkkk");
    localStorage.removeItem("role");
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
    const user_login = JSON.parse(localStorage.getItem("user_login"));
    const role = JSON.parse(localStorage.getItem("role"));
    console.log(this.props.isLogin);
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
                  style={{ width: "23px", height: "auto", borderRadius: "50%" }}
                  src="https://scontent.fhan14-1.fna.fbcdn.net/v/t1.6435-9/211057898_3056832151205713_8380822449352218766_n.jpg?_nc_cat=107&_nc_rgb565=1&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=4mazPvoWXFoAX9YC86v&_nc_ht=scontent.fhan14-1.fna&oh=29fe316e4f1150d9e88b73626ad8b436&oe=616D398E"
                  alt="https://scontent.fhan14-1.fna.fbcdn.net/v/t1.6435-9/211057898_3056832151205713_8380822449352218766_n.jpg?_nc_cat=107&_nc_rgb565=1&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=4mazPvoWXFoAX9YC86v&_nc_ht=scontent.fhan14-1.fna&oh=29fe316e4f1150d9e88b73626ad8b436&oe=616D398E"
                />
                <span className="caret"></span>
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
            <div>
              {loginelement}
              {registerelement}
            </div>
          </div>
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
                      width: "50px",
                      height: "38.5px",
                      borderRadius: "5px",
                      padding: "3px",
                    }}
                    src={require("./Images/logo.jpg").default}
                    alt=""
                  />
                </span>
              </NavLink>
            </div>
            {/* <div id="xkm">
              <p style={{ fontSize: "10px", margin: "0%" }}>Xem khuyến mãi</p>
              <p style={{ fontSize: "10px" }}>Toàn quốc</p>
            </div> */}
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
              </NavLink>
            </div>
          </div>

          <nav className="navbar navbar-default" role="navigation">
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
              <span className="navbar-brand">Danh mục sản phẩm</span>
            </div>

            <div className="collapse navbar-collapse navbar-ex1-collapse">
              <ul className="nav navbar-nav">
                <li>
                  <NavLink
                    activeStyle={{
                      backgroundColor: "bisque",
                    }}
                    exact
                    to="/dienthoai"
                  >
                    <span style={{ fontSize: "16px" }}>Điện thoại</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    activeStyle={{
                      backgroundColor: "bisque",
                    }}
                    exact
                    to="/phukien"
                  >
                    <span style={{ fontSize: "16px" }}>Phụ kiện</span>
                  </NavLink>
                </li>
              </ul>
            </div>
          </nav>

          <Switch>
            <Route path="/" component={Home} exact />
            <Route path="/admin" component={Admin} exact />
            <Route path="/dienthoai" component={Dienthoai} exact />
            <Route path="/phukien" component={Phukien} exact />
            <Route path="/dienthoai/:ID" component={DienthoaiDetail} exact />
            <Route path="/giohang/" component={Giohang} />
            <Route path="/profile" component={Profile} />
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
  console.log("accountUpdate", state);
  return {
    isLogin: state.loginreducer.isLogin,
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
