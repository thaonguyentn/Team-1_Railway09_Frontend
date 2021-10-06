import Axios from "axios";
import React, { useState } from "react";
import Modal from "react-modal";
Modal.setAppElement("#root");
function Register(props) {
  const [isopen, setisopen] = useState(false);
  const [email, setemail] = useState("");
  const [username, setusername] = useState("");
  const [fullname, setfirstname] = useState("");
  const [password, setpassword] = useState("");
  const [erroremail, seterroremail] = useState("");
  const [errorusername, seterrorusername] = useState("");
  const [errorfullname, seterrorfullname] = useState("");
  const [errorpassword, seterrorpassword] = useState("");
  const handleRegister = () => {
    let body = {
      username: username,
      fullname: fullname,
      email: email,
      password: password,
    };
    if (username === "") {
      seterrorusername("* Không được để trống");
    }
    console.log(body);
    Axios.post("http://localhost:8080/api/v3/register", body)
      .then((response) => {
        setisopen(false);
        alert(
          " Chúng tôi đã gửi một email xác nhận đến email " +
            email +
            " , vui lòng kiểm tra email của bạn để xác nhận tài khoản"
        );
      })
      .catch((errors) => {
        console.log(errors.response.data.status);
        errors.response.data.errors.forEach((element) => {
          alert(element);
        });
      });
  };
  return (
    <div>
      <button
        onClick={() => setisopen(true)}
        style={{
          backgroundColor: "rgb(141, 32, 13)",
          borderColor: "rgba(153, 74, 74, 0)",
        }}
      >
        Đăng ký
      </button>
      <Modal
        isOpen={isopen}
        onRequestClose={() => setisopen(false)}
        style={{
          overlay: {
            backgroundColor: "rgba(1,1,1,0)",
          },
          content: {
            backgroundColor: "white",
            width: "270px",
            margin: "auto",
            height: "90%",
            color: "blue",
          },
        }}
      >
        <h3>Đăng ký tài khoản</h3>
        <form className="form-horizontal">
          <div className="form-group">
            <label className="col-sm-3">Email</label>
            <div className="col-sm-10">
              <input
                type="email"
                className="form-control"
                id="Email_ID"
                placeholder="example@email.com"
                name="email"
                value={email}
                style={{
                  width: "225px",
                }}
                onChange={(event) => {
                  if (event.target.value !== "") {
                    seterroremail("");
                  }
                  setemail(event.target.value);
                }}
              />
              <p style={{ color: "red", position: "fixed" }}>{erroremail}</p>
            </div>
          </div>
          <div className="form-group">
            <label className="col-sm-10">Tên đăng nhập</label>
            <div className="col-sm-10">
              <input
                type="text"
                className="form-control"
                id="Username_ID"
                placeholder="Tên đăng nhập"
                name="username"
                value={username}
                style={{
                  width: "225px",
                }}
                onChange={(event) => {
                  if (event.target.value !== "") {
                    seterrorusername("");
                  }
                  setusername(event.target.value);
                }}
              />
              <p style={{ color: "red", position: "fixed" }}>{errorusername}</p>
            </div>
          </div>
          <div className="form-group">
            <label className="col-sm-10">Họ và Tên</label>
            <div className="col-sm-10">
              <input
                type="text"
                className="form-control"
                id="Fisstname_ID"
                placeholder="Nhập Họ và Tên"
                name="firstname"
                value={fullname}
                style={{
                  width: "225px",
                }}
                onChange={(event) => {
                  if (event.target.value !== "") {
                    seterrorfullname("");
                  }
                  setfirstname(event.target.value);
                }}
              />
              <p style={{ color: "red", position: "fixed" }}>{errorfullname}</p>
            </div>
          </div>
          {/* <div className="form-group">
            <label className="col-sm-10">Số điện thoại</label>
            <div className="col-sm-10">
              <input
                type="text"
                className="form-control"
                id="Phone_ID"
                placeholder="0123456789"
                name="sdt"
                value={phone}
                style={{
                  width: "225px",
                }}
                onChange={(event) => setphone(event.target.value)}
              />
            </div>
          </div> */}
          <div className="form-group">
            <label className="col-sm-10">Mật khẩu</label>
            <div className="col-sm-10">
              <input
                type="password"
                id="Password_ID"
                className="form-control"
                placeholder="Nhập mật khẩu của bạn"
                name="pwd"
                value={password}
                style={{
                  width: "225px",
                }}
                onChange={(event) => {
                  if (event.target.value !== "") {
                    seterrorpassword("");
                  }
                  setpassword(event.target.value);
                }}
              />
              <p style={{ color: "red", position: "fixed" }}>{errorpassword}</p>
            </div>
          </div>
          <div className="form-group">
            <div className="col-sm-12">
              <button
                type="button"
                className="btn btn-success"
                onClick={handleRegister}
              >
                Đăng ký
              </button>
            </div>
          </div>
        </form>
        <div style={{ marginBottom: "10px" }}>
          <a href={null}>Đăng nhập</a>
        </div>
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
          <a href=""> Đăng ký bằng facebook</a>
        </div>
      </Modal>
    </div>
  );
}

export default Register;
