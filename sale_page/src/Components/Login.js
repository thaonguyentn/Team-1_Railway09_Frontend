import React, { Component, useState } from "react";
import Modal from "react-modal";
import Axios from "axios";
import { connect } from "react-redux";
import {
  setcart,
  setcartdetail,
  setlogin,
  setopenlogin,
  setprofile,
} from "../Actions";
import { Redirect } from "react-router-dom";
import getcart from "../Reducers/Requestdata/getcart";
import getcartdetail from "../Reducers/Requestdata/getcartdetail";
Modal.setAppElement("#root");
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isopen: false,
      user: "",
      password: "",
      role: "",
    };
  }

  Login = () => {
    let body = {
      username: this.state.user,
      password: this.state.password,
    };
    Axios.post("http://localhost:8080/api/v1/login", body)
      .then(
        (response) => {
          console.log(response);
          localStorage.setItem("token", response.data.accessToken);
          localStorage.setItem("user_login", JSON.stringify(body));
          localStorage.setItem("role", JSON.stringify(response.data.role));
          getcart(response.data.id)
            .then((response) => {
              console.log(response);
              this.props.setcart(response.data);
            })
            .then(() => {
              getcartdetail(response.data.id).then((response) => {
                console.log(response);
                this.props.setcartdetail(response.data);
              });
            });
          Axios.get(
            "http://localhost:8080/api/v1/accounts/" + response.data.id,
            {
              auth: body,
            }
          ).then(
            (datalist) => {
              localStorage.setItem(
                "user_login_infor",
                JSON.stringify(datalist.data)
              );
              this.props.setlogin(true);
              this.props.setprofile(datalist.data);
            },
            (error) => {
              console.log(error);
            }
          );
        },
        (error) => {
          console.log(error);
        }
      )
      .then(() => {
        this.props.setisopen(false);
      });
  };
  render() {
    console.log(this.props.location);
    return (
      <div>
        <button
          onClick={() => this.props.setisopen(true)}
          style={{
            backgroundColor: "rgb(141, 32, 13)",
            borderColor: "rgba(153, 74, 74, 0)",
          }}
        >
          Đăng nhập
        </button>
        <Modal
          isOpen={this.props.isopen}
          onRequestClose={() => this.props.setisopen(false)}
          style={{
            overlay: { backgroundColor: "rgba(1,1,1,0)" },
            content: {
              backgroundColor: "white",
              width: "270px",
              margin: "auto",
              height: "70%",
              color: "blue",
            },
          }}
        >
          <h2>Đăng nhập</h2>
          <form className="form-horizontal">
            <div className="form-group">
              <label className="col-sm-10" for="email">
                Tên đăng nhập:
              </label>
              <div className="col-sm-10">
                <input
                  type="text"
                  className="form-control"
                  id="lemail"
                  placeholder="Nhập tên đăng nhập"
                  name="setuser"
                  value={this.state.user}
                  onChange={(event) => {
                    this.setState({ user: event.target.value });
                  }}
                />
              </div>
            </div>
            <div className="form-group">
              <label className="col-sm-10" for="pwd">
                Mật khẩu:
              </label>
              <div className="col-sm-10">
                <input
                  type="password"
                  className="form-control"
                  id="lpwd"
                  placeholder="Nhập mật khẩu của bạn"
                  name="setpassword"
                  value={this.state.password}
                  onChange={(event) => {
                    this.setState({ password: event.target.value });
                  }}
                />
              </div>
            </div>
            <div className="form-group">
              <div className="col-sm-offset-2 col-sm-10"></div>
            </div>
            <div className="form-group">
              <div className="col-sm-10">
                <button
                  type="button"
                  className="btn btn-success"
                  onClick={this.Login}
                >
                  Đăng nhập
                </button>
              </div>
            </div>
          </form>
          <div>
            <span
              style={{
                backgroundColor: "blue",
                color: "white",
                borderRadius: "50%",
                paddingInline: "5px",
              }}
            >
              <i class="fa fa-facebook"></i>
            </span>
            <a href=""> Đăng nhập bằng facebook</a>
          </div>
        </Modal>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    isopen: state.loginreducer.isopen,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    setisopen: (data) => {
      dispatch(setopenlogin(data));
    },
    setlogin: (islogin) => {
      dispatch(setlogin(islogin));
    },
    setprofile: (account) => {
      dispatch(setprofile(account));
    },
    setcart: (cart) => {
      dispatch(setcart(cart));
    },
    setcartdetail: (cartdetail) => {
      dispatch(setcartdetail(cartdetail));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Login);
