import React, { Component } from "react";
import ReactDOM from "react-dom";
import { connect } from "react-redux";
import { NavLink, Switch, Route, Redirect } from "react-router-dom";
import Adress from "./Adress";
import Changeprofile from "./ChangeProfile";
import Orderuser from "./OrderUser";
import Orderuserdetail from "./OrderUserDetail";
import "../Asses/css/profile.css";
class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: null,
      shownav: false,
      hidenav: false,
    };
  }
  uploadImage = (e) => {
    const { files } = e.target;
    if (files.length === 0) {
      return;
    }

    const file = files[0];
    const fileReader = new FileReader();

    fileReader.onload = () => {
      this.background.style.backgroundImage = `url(${fileReader.result})`;
      this.setState({
        image: `url(${fileReader.result})`,
      });
      // document.getElementById(
      //   "ig"
      // ).style.backgroundImage = `url(${fileReader.result})`;
    };
    fileReader.readAsDataURL(file);
  };
  componentDidMount() {
    document.addEventListener("click", this.handleClickOutside, true);
  }
  handleClickOutside = (event) => {
    console.log(event.target);
    if (!document.getElementById("buttonshownav")) {
      return;
    }
    if (!document.getElementById("buttonshownav").contains(event.target)) {
      this.setState({
        shownav: false,
      });
      setTimeout(() => {
        this.setState({ hidenav: false });
      }, 200);
    }
  };
  render() {
    let nav;
    if (this.props.account !== null) {
      nav = (
        <div style={{ borderBottom: "1px solid pink" }}>
          <div
            style={{
              width: "50px",
              display: "inline-block",
              position: "relative",
              bottom: "20px",
            }}
          >
            <img
              style={{ width: "50px", borderRadius: "50%" }}
              src={
                this.props.account.avatar === null
                  ? "https://iupac.org/wp-content/uploads/2018/05/default-avatar.png"
                  : this.props.account.avatar
              }
              alt={"no image"}
            />
          </div>
          <div
            style={{
              width: "100px",
              display: "inline-block",
              marginLeft: "20px",
            }}
          >
            <span>{this.props.account.username}</span>
            <span>
              <span class="glyphicon glyphicon-wrench"></span>
              <NavLink
                activeStyle={{ color: "red" }}
                to={{
                  pathname: "/profile/change",
                  state: {
                    account: this.props.account,
                  },
                }}
              >
                <span>Sửa hồ sơ</span>
              </NavLink>
            </span>
          </div>
          <div style={{ display: "inline-block" }}>
            <a
              id="buttonshownav"
              style={{ cursor: "pointer", fontSize: "20px" }}
              onClick={() => {
                this.setState({
                  shownav: !this.state.shownav,
                });
                setTimeout(() => {
                  this.setState({ hidenav: !this.state.hidenav });
                }, 200);
              }}
            >
              <span
                class="glyphicon glyphicon-user"
                style={{ fontSize: "30px" }}
              ></span>
              <span
                class="glyphicon glyphicon-chevron-down"
                style={{
                  display: this.state.shownav === true ? "none" : "",
                  fontSize: "30px",
                }}
              ></span>
              <span
                class="glyphicon glyphicon-chevron-up"
                style={{
                  display: this.state.shownav === false ? "none" : "",
                  fontSize: "30px",
                }}
              ></span>
            </a>

            <div
              className={
                this.state.shownav === true
                  ? "navtonge"
                  : this.state.hidenav === true
                  ? "visuallyhidden"
                  : "hiden"
              }
              style={{
                position: "absolute",
                padding: "10px",
                backgroundColor: "whitesmoke",
                zIndex: "3",
              }}
            >
              <div
                style={{ marginBlock: "10px", borderBottom: "1px solid black" }}
              >
                <NavLink
                  activeStyle={{ color: "red" }}
                  exact
                  to={{
                    pathname: "/profile/change",
                    state: {
                      account: this.props.account,
                    },
                  }}
                >
                  <span>Hồ sơ</span>
                </NavLink>
              </div>
              <div
                style={{ marginBlock: "10px", borderBottom: "1px solid black" }}
              >
                <NavLink
                  activeStyle={{ color: "red" }}
                  exact
                  to={{
                    pathname: "/profile/adress",
                    state: {
                      name: this.props.account.fullname,
                      adress: this.props.account.address,
                      phone: this.props.account.phone_number,
                    },
                  }}
                >
                  <span>Địa chỉ</span>
                </NavLink>
              </div>
              <div
                style={{ marginBlock: "10px", borderBottom: "1px solid black" }}
              >
                <NavLink
                  activeStyle={{ color: "red" }}
                  exact
                  to={{
                    pathname: "/profile/orderuser",
                    state: {
                      account: this.props.account,
                    },
                  }}
                >
                  <span>Đơn mua</span>
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      );
    }
    return (
      <>
        <Redirect
          to={{
            pathname: "/profile/change",
            state: {
              account: this.props.account,
            },
          }}
        />
        <div style={{ fontFamily: "Helvetica Neue", fontSize: "20px" }}>
          <div class="">
            <div class="navprofile">{nav}</div>
            <div class="bodyprofile">
              <Switch>
                <Route path="/profile/change" component={Changeprofile} exact />
                <Route path="/profile/adress" component={Adress} exact />
                <Route path="/profile/orderuser" component={Orderuser} exact />
                <Route
                  path="/profile/orderuser/detail"
                  component={Orderuserdetail}
                  exact
                />
              </Switch>
            </div>
          </div>
        </div>
      </>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    account: state.accountreducer.account,
  };
};
export default connect(mapStateToProps)(Profile);
