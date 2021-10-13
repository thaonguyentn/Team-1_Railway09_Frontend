import React, { Component } from "react";

class Adress extends Component {
  render() {
    let adress;
    let name;
    let phone;
    let state = this.props.location.state;
    if (state !== null && state !== undefined) {
      adress = state.adress;
      name = state.name;
      phone = state.phone;
    }
    return (
      <div style={{ height: "300px" }}>
        <h3>Địa chỉ nhận hàng</h3>
        <div style={{ marginBlock: "20px" }}>
          <div
            style={{
              width: "160px",
              display: "inline-block",
              textAlign: "right",
              marginRight: "25px",
            }}
          >
            <span>Họ và tên</span>
          </div>
          {name}
        </div>
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
          {phone}
        </div>
        <div style={{ marginBottom: "20px" }}>
          <div
            style={{
              width: "160px",
              display: "inline-block",
              textAlign: "right",
              marginRight: "25px",
            }}
          >
            <span>Địa chỉ nhận hàng</span>
          </div>
          {adress}
        </div>
      </div>
    );
  }
}

export default Adress;
