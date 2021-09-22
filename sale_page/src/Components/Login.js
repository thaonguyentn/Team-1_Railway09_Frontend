import React, { useState } from "react";
import Modal from "react-modal";
import Axios from "axios";
import { connect } from "react-redux";
import { setcart, setcartdetail, setlogin, setprofile } from "../Actions";
import { Redirect } from "react-router-dom";
import getcart from "../Reducers/getcart";
import getcartdetail from "../Reducers/getcartdetail";
Modal.setAppElement("#root");
function Login(props) {
  const [isopen, setisopen] = useState(false);
  const [user, setuser] = useState("");
  const [password, setpassword] = useState("");
  const [role, setrole] = useState("");
  const Login = () => {
    let body = {
      username: user,
      password: password,
    };
    Axios.post("http://localhost:8080/api/v1/login", body).then(
      (response) => {
        console.log(response);
        localStorage.setItem("token", response.data.accessToken);
        localStorage.setItem("user_login", JSON.stringify(body));
        localStorage.setItem("role", JSON.stringify(response.data.role));
        getcart(response.data.id)
          .then((response) => {
            console.log(response);
            props.setcart(response.data);
          })
          .then(() => {
            getcartdetail(response.data.id).then((response) => {
              console.log(response);
              props.setcartdetail(response.data);
            });
          });
        Axios.get("http://localhost:8080/api/v1/accounts/" + response.data.id, {
          auth: body,
        }).then(
          (datalist) => {
            localStorage.setItem(
              "user_login_infor",
              JSON.stringify(datalist.data)
            );
            props.setlogin(true);
            props.setprofile(datalist.data);
          },
          (error) => {
            console.log(error);
          }
        );
      },
      (error) => {
        console.log(error);
      }
    );
  };
  return (
    <div>
      <button
        onClick={() => setisopen(true)}
        style={{
          backgroundColor: "blue",
          borderColor: "rgba(153, 74, 74, 0)",
        }}
      >
        Đăng nhập
      </button>
      <Modal
        isOpen={isopen}
        onRequestClose={() => setisopen(false)}
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
                value={user}
                onChange={(event) => {
                  setuser(event.target.value);
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
                value={password}
                onChange={(event) => {
                  setpassword(event.target.value);
                }}
              />
            </div>
          </div>
          <div className="form-group">
            <div className="col-sm-offset-2 col-sm-10"></div>
          </div>
          <div className="form-group">
            <div className="col-sm-10">
              <button type="button" className="btn btn-success" onClick={Login}>
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
const mapStateToProps = (state) => {
  return state;
};
const mapDispatchToProps = (dispatch) => {
  return {
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
