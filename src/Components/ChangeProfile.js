import React, { Component } from "react";

class Changeprofile extends Component {
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
    let row;
    let avatar;
    let state = this.props.location.state;
    if (state.account !== null && state.account !== undefined) {
      row = [
        <div style={{ marginBlock: "20px" }}>
          <div
            style={{
              width: "160px",
              display: "inline-block",
              textAlign: "right",
              marginRight: "25px",
            }}
          >
            <span>Tên Đăng Nhập</span>
          </div>
          {state.account.username}
        </div>,
        <div style={{ marginBottom: "20px" }}>
          <div
            style={{
              width: "160px",
              display: "inline-block",
              textAlign: "right",
              marginRight: "25px",
            }}
          >
            <span>Tên</span>
          </div>
          <div
            style={{
              width: "160px",
              display: "inline-block",
              textAlign: "right",
              marginRight: "25px",
            }}
          >
            <input type="text" defaultValue={state.account.fullname} />
          </div>
        </div>,
        <div style={{ marginBottom: "20px" }}>
          <div
            style={{
              width: "160px",
              display: "inline-block",
              textAlign: "right",
              marginRight: "25px",
            }}
          >
            <span>Email</span>
          </div>
          {state.account.email} <a style={{ cursor: "pointer" }}>Thay đổi</a>
        </div>,
        <div style={{ marginBottom: "20px" }}>
          <div
            style={{
              width: "160px",
              display: "inline-block",
              textAlign: "right",
              marginRight: "25px",
            }}
          >
            <span>Địa chỉ</span>
          </div>
          {state.account.address} <a style={{ cursor: "pointer" }}>Thay đổi</a>
        </div>,
        <div style={{ marginBottom: "20px" }}>
          <div
            style={{
              width: "160px",
              display: "inline-block",
              textAlign: "right",
              marginRight: "25px",
            }}
          >
            <span>Giới tính</span>
          </div>

          <div
            style={{
              display: "inline-block",
              marginRight: "25px",
            }}
          >
            <input type="radio" />
            Nam
          </div>
          <div
            style={{
              display: "inline-block",
              marginRight: "25px",
            }}
          >
            <input type="radio" />
            Nữ
          </div>
          <div
            style={{
              display: "inline-block",
              marginRight: "25px",
            }}
          >
            <input type="radio" />
            Khác
          </div>

          {/* {state.account.gender} */}
        </div>,
        <div style={{ marginBottom: "20px" }}>
          <div
            style={{
              width: "160px",
              display: "inline-block",
              textAlign: "right",
              marginRight: "25px",
            }}
          >
            <span>Số điện thoại</span>
          </div>

          {state.account.phone_number}
        </div>,
        <div style={{ marginBottom: "20px" }}>
          <div
            style={{
              width: "100px",
              margin: "auto",
            }}
          >
            <button type="button" class="btn btn-primary">
              Lưu
            </button>
          </div>
        </div>,
      ];
      avatar = (
        <>
          <div style={{ width: "130px", margin: "auto" }}>
            <img
              style={{ width: "130px", borderRadius: "50%" }}
              src={
                state.account.avatar === null
                  ? "https://iupac.org/wp-content/uploads/2018/05/default-avatar.png"
                  : state.account.avatar
              }
              alt={"no image"}
            />
          </div>
          <div style={{ width: "80px", margin: "auto" }}>
            <label class="btn btn-default btn-file">
              Chọn ảnh{" "}
              <input
                style={{ display: "none" }}
                accept=".jpg,.png"
                className="input_img"
                type="file"
                onChange={this.uploadImage}
              />
            </label>
          </div>
          <div
            style={{
              width: "200px",
              height: "200px",
              borderRadius: "50%",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              margin: "auto",
            }}
            ref={(ref) => (this.background = ref)}
          ></div>
        </>
      );
    }
    return (
      <>
        <div style={{ borderBottom: "1px solid black" }}>
          <h3>Hồ Sơ Của Tôi</h3>
          <p>Quản lý thông tin hồ sơ để bảo mật tài khoản</p>
        </div>
        <div class="col-xs-8 col-sm-8 col-md-8 col-lg-8">
          <form>{row}</form>
        </div>
        <div
          class="col-xs-4 col-sm-4 col-md-4 col-lg-4"
          style={{ borderLeft: "1px solid gray" }}
        >
          {avatar}
        </div>
      </>
    );
  }
}

export default Changeprofile;
