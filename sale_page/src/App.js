import "./App.css";
import { NavLink, Switch, Route } from "react-router-dom";
import Dienthoai from "./Components/Dienthoai";
import Phukien from "./Components/Phukien";
import Login from "./Components/Login";
import Register from "./Components/Register";
import Home from "./Components/Home";
import DienthoaiDetail from "./Components/DienthoaiDetail";
import Giohang from "./Components/Giohang";
function App() {
  return (
    <div className="App">
      <header>
        <div id="myCarousel" className="carousel slide" data-ride="carousel">
          <div className="carousel-inner">
            <div className="item active">
              <img
                className="image"
                src={require("./Images/1200-44-1200x44-1.png").default}
                alt=""
              />
            </div>
            <div className="item">
              <img
                className="image"
                src={require("./Images/1200-44-1200x44-2.png").default}
                alt=""
              />
            </div>

            <div className="item">
              <img
                className="image"
                src={
                  require("./Images/bannermatbang1200x44-1200x44-1.png").default
                }
                alt=""
              />
            </div>
          </div>

          {/* <a className="left carousel-control" href="#myCarousel" data-slide="prev">
            <span className="glyphicon glyphicon-chevron-left"></span>
            <span className="sr-only">Previous</span>
          </a>
          <a
            className="right carousel-control"
            href="#myCarousel"
            data-slide="next"
          >
            <span className="glyphicon glyphicon-chevron-right"></span>
            <span className="sr-only">Next</span>
          </a> */}
        </div>
        <div className="container" id="lienketcontainer">
          <div className="row">
            <div id="lienhe" className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
              Liên hệ với chúng tôi: <span>Hà nội: 0964385217</span>|{" "}
              <span>TP.Hồ Chí Minh: 0705818277</span>
            </div>
            <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3"></div>
            <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3" id="ketnoi">
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
        </div>
        <div id="loginlogout">
          <div>
            <Login />
            <Register />
          </div>
        </div>
        <div id="searchwaper">
          <div id="logo">
            <NavLink
              activeStyle={{
                backgroundColor: "bisque",
              }}
              exact
              to="/"
            >
              <span style={{ fontSize: "16px" }}>Home</span>
            </NavLink>
          </div>
          <div id="xkm">
            <p style={{ fontSize: "10px", margin: "0%" }}>Xem khuyến mãi</p>
            <p style={{ fontSize: "10px" }}>Toàn quốc</p>
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
              to="/giohang"
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

            <ul className="nav navbar-nav navbar-right">
              <li className="dropdown">
                <a href="#" className="dropdown-toggle" data-toggle="dropdown">
                  Lọc <b className="caret"></b>
                </a>
                <ul className="dropdown-menu">
                  <li>
                    <a href="#">Action</a>
                  </li>
                  <li>
                    <a href="#">Another action</a>
                  </li>
                  <li>
                    <a href="#">Something else here</a>
                  </li>
                  <li>
                    <a href="#">Separated link</a>
                  </li>
                </ul>
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
        </Switch>
      </header>

      <section></section>

      <footer>
        <div className="container">
          <div className="footerwaper">
            <div className="footerdetail">
              <ul>
                <li>
                  <a href="">Lịch sử mua hàng</a>
                </li>
                <li>
                  <a href="">Cộng tác bán hàng cùng TGDĐ</a>
                </li>
                <li>
                  <a href="">Tìm hiểu về mua trả góp</a>
                </li>
                <li>
                  <a href="">Chính sách bảo hành</a>
                </li>
                <li>
                  <a href="">Xem thêm</a>
                </li>
              </ul>
            </div>
            <div className="footerdetail">
              <ul>
                <li>
                  <a href="">Giới thiệu công ty (MWG.vn)</a>
                </li>
                <li>
                  <a href="">Tuyển dụng</a>
                </li>
                <li>
                  <a href="">Gửi góp ý, khiếu nại</a>
                </li>
                <li>
                  <a href="">Tìm siêu thị (2.294 shop)</a>
                </li>
                <li>
                  <a href="">Xem bản mobile</a>
                </li>
              </ul>
            </div>
            <div className="footerdetail">
              <ul>
                <li>Tổng đài hỗ trợ (Miễn phí gọi)</li>
                <li>
                  Gọi mua: <a href="">1800.1060</a> (7:30 - 22:00)
                </li>
                <li>
                  Kỹ thuật:<a href=""> 1800.1763 </a>(7:30 - 22:00)
                </li>
                <li>
                  Khiếu nại: <a href="">1800.1062 </a>(8:00 - 21:30)
                </li>
                <li>
                  Bảo hành: <a href=""> 1800.1064</a>(8:00 - 21:00)
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
