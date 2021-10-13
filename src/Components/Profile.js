import React, { Component } from "react";
import { connect } from "react-redux";
import { NavLink, Switch, Route, Redirect } from "react-router-dom";
import Adress from "./Adress";
import Changeprofile from "./ChangeProfile";
import Orderuser from "./OrderUser";
import Orderuserdetail from "./OrderUserDetail";
class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: null,
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
  render() {
    let nav;
    if (this.props.account !== null) {
      nav = [
        <div style={{ marginLeft: "40px", borderBottom: "1px solid pink" }}>
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
        </div>,
        <div style={{ marginLeft: "40px" }}>
          <div style={{ marginBlock: "10px" }}>
            <span class="glyphicon glyphicon-user"></span>
            <span>Tài khoản của tôi</span>
          </div>

          <div style={{ marginBlock: "10px" }}>
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
          <div style={{ marginBlock: "10px" }}>
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

          <div style={{ marginBlock: "10px" }}>
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
        </div>,
      ];
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
          <div class="row">
            <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">{nav}</div>
            <div
              class="col-xs-8 col-sm-8 col-md-8 col-lg-8"
              style={{
                backgroundColor: "#e8e8e8",
                minHeight: "500px",
              }}
            >
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
