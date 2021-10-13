import React, { Component, useState } from "react";
import Modal from "react-modal";
import { getlogin, getprofile } from "../Requestdata/CallAPI";
import { connect } from "react-redux";
import {
  setcart,
  setcartdetail,
  setlogin,
  setopenlogin,
  setprofile,
} from "../Actions";
import { getcart, getcartdetail } from "../Requestdata/CallAPI";
Modal.setAppElement("#root");
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      erroruser: "",
      errorpassword: "",
      errorlogin: "",
      user: "",
      password: "",
    };
  }

  Login = () => {
    let body = {
      username: this.state.user,
      password: this.state.password,
    };
    if (this.state.user === "") {
      this.setState({
        erroruser: "* không được để trống",
      });
    }
    if (this.state.password === "") {
      this.setState({
        errorpassword: "* không được để trống",
      });
    }
    if (this.state.user === "" || this.state.password === "") {
      return;
    }
    getlogin(body)
      .then(
        (response) => {
          this.props.setisopen(false);
          if (response.data.status === "Not_Active") {
            alert(
              "Tài khoản của bạn chưa kích hoạt ,vui lòng kiểm tra email của bạn để kích hoạt tài khoản"
            );
            return;
          }
          localStorage.setItem("token", response.data.accessToken);
          localStorage.setItem("user_login", JSON.stringify(body));
          localStorage.setItem("role", JSON.stringify(response.data.role));
          getcart(response.data.id)
            .then((response) => {
              this.props.setcart(response.data);
            })
            .then(() => {
              getcartdetail(response.data.id).then((response) => {
                this.props.setcartdetail(response.data);
              });
            });
          getprofile(response.data.id, body).then((datalist) => {
            localStorage.setItem(
              "user_login_infor",
              JSON.stringify(datalist.data)
            );
            this.props.setlogin(true);
            this.props.setprofile(datalist.data);
          });
        },
        (error) => {
          this.setState({ errorlogin: "Sai tài khoản hoặc mật khẩu !" });
        }
      )
      .then(() => {});
  };
  render() {
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
              <div className="col-sm-12">
                <input
                  required={true}
                  type="text"
                  className="form-control"
                  id="lemail"
                  placeholder="Nhập tên đăng nhập"
                  name="setuser"
                  value={this.state.user}
                  onChange={(event) => {
                    if (event.target.value !== "") {
                      this.setState({ erroruser: "" });
                    }
                    this.setState({ user: event.target.value });
                  }}
                />
                <p style={{ color: "red", position: "fixed" }}>
                  {this.state.erroruser}
                </p>
              </div>
            </div>

            <div className="form-group">
              <label className="col-sm-10" for="pwd">
                Mật khẩu:
              </label>
              <div className="col-sm-12">
                <input
                  type="password"
                  className="form-control"
                  id="lpwd"
                  placeholder="Nhập mật khẩu của bạn"
                  name="setpassword"
                  value={this.state.password}
                  onChange={(event) => {
                    if (event.target.value !== "") {
                      this.setState({ errorpassword: "" });
                    }
                    this.setState({ password: event.target.value });
                  }}
                />
                <p style={{ color: "red", position: "fixed" }}>
                  {this.state.errorpassword}
                </p>
              </div>
            </div>
            <div className="form-group">
              <div style={{ color: "red" }} className="col-sm-10">
                {this.state.errorlogin}
              </div>
            </div>
            <div className="form-group">
              <div className="col-sm-12">
                <button
                  style={{ width: "100%" }}
                  type="button"
                  className="btn btn-success"
                  onClick={this.Login}
                >
                  Đăng nhập
                </button>
              </div>
            </div>
          </form>
          {/* <div>
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
          </div> */}
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
