import React, { Component } from "react";
import ReactModal from "react-modal";

class Changeprofile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gender: "",
      isOpen: false,
      name: "",
      username: "",
      email: "",
      phone: "",
      password: "",
      address: "",
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
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  updateaccount = () => {
    const account = {
      fullname: this.state.name,
      email: this.state.email,
      phoneNumber: this.state.phone,
      address: this.state.address,
      password: this.state.password,
    };
  };
  componentDidMount() {
    let state = this.props.location.state;
    if (state.account !== null && state.account !== undefined) {
      this.setState({
        gender: state.account.gender,
        name: state.account.fullname,
        username: state.account.username,
        email: state.account.email,
        phone: state.account.phone_number,
        address: state.account.address,
      });
    }
  }
  render() {
    let row;
    let avatar;
    let state = this.props.location.state;
    if (state.account !== null && state.account !== undefined) {
      row = (
        <div className="profileinfor">
          <tr key="1">
            <td className="rightcollum">Tên Đăng Nhập</td>
            <td>{state.account.username}</td>
          </tr>
          <tr key="2">
            <td className="rightcollum">Tên</td>
            <td>
              <input
                size={17}
                type="text"
                name="name"
                value={this.state.name}
                onChange={this.handleChange}
              />
            </td>
          </tr>
          <tr key="3">
            <td className="rightcollum">Email</td>
            <td>
              <input
                size={17}
                type="text"
                name="email"
                value={this.state.email}
                onChange={this.handleChange}
              />
            </td>
          </tr>
          <tr key="4">
            <td className="rightcollum">Địa chỉ</td>
            <td>
              <input
                size={17}
                type="text"
                name="address"
                value={this.state.address}
                onChange={this.handleChange}
              />
            </td>
          </tr>
          <tr key="5">
            <td className="rightcollum">Giới tính</td>
            <td>
              <label
                onClick={() => this.setState({ gender: "Male" })}
                style={{
                  display: "inline-block",
                  marginRight: "25px",
                }}
              >
                <input
                  style={{ height: "15px", width: "15px" }}
                  type="radio"
                  name="gender"
                  value="Male"
                  checked={this.state.gender === "Male"}
                />
                Nam
              </label>
              <label
                onClick={() => this.setState({ gender: "Female" })}
                style={{
                  display: "inline-block",
                  marginRight: "25px",
                }}
              >
                <input
                  style={{ height: "15px", width: "15px" }}
                  type="radio"
                  name="gender"
                  value="Female"
                  checked={this.state.gender === "Female"}
                />
                Nữ
              </label>
              <label
                onClick={() => this.setState({ gender: "Unknow" })}
                style={{
                  display: "inline-block",
                  marginRight: "25px",
                }}
              >
                <input
                  style={{ height: "15px", width: "15px" }}
                  type="radio"
                  name="gender"
                  value="Unknow"
                  checked={this.state.gender === "Unknow"}
                />
                Khác
              </label>
            </td>
          </tr>
          <tr key="6">
            <td className="rightcollum">Số điện thoại</td>
            <td>
              <input
                type="text"
                size={17}
                name="phone"
                value={this.state.phone}
                onChange={this.handleChange}
              />
            </td>
          </tr>
          <tr key="7">
            <td></td>
            <td>
              <button>Lưu</button>
            </td>
          </tr>
        </div>
      );
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
        <div>
          <div>{row}</div>
        </div>
        <ReactModal
          isOpen={this.state.isOpen}
          onRequestClose={() => this.setState({ isOpen: false })}
        >
          <div>{avatar}</div>
        </ReactModal>
      </>
    );
  }
}

export default Changeprofile;
