import React, { useState } from "react";
import Modal from "react-modal";
Modal.setAppElement("#root");
function Register(props) {
  const [isopen, setisopen] = useState(false);
  return (
    <div>
      <button
        onClick={() => setisopen(true)}
        style={{
          backgroundColor: "blue",
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
                style={{
                  width: "225px",
                }}
              />
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
                style={{
                  width: "225px",
                }}
              />
            </div>
          </div>
          <div className="form-group">
            <label className="col-sm-10">Họ và Tên</label>
            <div className="col-sm-10">
              <input
                type="text"
                className="form-control"
                id="Fullname_ID"
                placeholder="Nhập họ và tên"
                name="username"
                style={{
                  width: "225px",
                }}
              />
            </div>
          </div>
          <div className="form-group">
            <label className="col-sm-10">Mật khẩu</label>
            <div className="col-sm-10">
              <input
                type="password"
                id="Password_ID"
                className="form-control"
                placeholder="Nhập mật khẩu của bạn"
                name="pwd"
                style={{
                  width: "225px",
                }}
              />
            </div>
          </div>
          <div className="form-group">
            <div className="col-sm-12">
              <button type="button" className="btn btn-success">
                Đăng ký
              </button>
            </div>
          </div>
        </form>
        <div style={{ marginBottom: "10px" }}>
          <a href="">Đăng nhập</a>
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
