import axios from "axios";
import React, { Component } from "react";
import { NavLink } from "react-router-dom";

class Order extends Component {
  constructor(props) {
    super(props);
    this.state = {
      province: "",
      district: "",
      villgage: "",
      home: "",
      phone: "",
    };
  }
  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };
  buy = (quantity, totalprice) => {
    let body = {
      description: "",
      quantity: quantity,
      totalPrice: totalprice,
      address:
        this.state.home +
        this.state.villgage +
        this.state.district +
        this.state.province,
      phone: this.state.phone,
    };
    let user_login_infor = JSON.parse(localStorage.getItem("user_login_infor"));
    axios
      .post("http://localhost:8080/api/v5/orders/" + user_login_infor.id, body)
      .then((response) => {
        console.log(response);
        alert(response.data);
      });
  };
  format2 = (n) => {
    if (n === undefined) {
      return null;
    }
    return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  render() {
    let user_login_infor = JSON.parse(localStorage.getItem("user_login_infor"));
    let list = this.props.location.state
      ? this.props.location.state.listcart
      : [];
    let totalprice = 0;
    let quantity = 0;
    for (let index = 0; index < list.length; index++) {
      if (list[index].status === "Order") {
        quantity = quantity + list[index].quantity;
        totalprice =
          totalprice +
          (Number(list[index].product.price) -
            (Number(list[index].product.price) *
              Number(list[index].product.discount)) /
              100) *
            Number(list[index].quantity);
      }
    }
    let rows = list.map((row, index) => {
      if (row.status === "Order") {
        return (
          <div
            style={{
              backgroundColor: "white",
              float: "left",
            }}
          >
            <div
              id="sp"
              style={{
                // margin: "30px",
                backgroundColor: "white",
                width: "150px",
                float: "left",
                borderLeft: "1px solid gray",
              }}
            >
              <NavLink
                to={{
                  pathname: "/dienthoai/" + row.id,
                  state: {
                    id: row.id,
                  },
                }}
              >
                <img
                  src={row.product.image}
                  alt=""
                  style={{ width: "140px", height: "auto" }}
                />
              </NavLink>
            </div>
            <div
              style={{
                // margin: "30px",
                backgroundColor: "white",
                width: "200px",
                float: "left",
              }}
            >
              <p>
                {row.product.name}({row.product.ram}/{row.product.memory})
              </p>

              <p>
                Đơn giá :
                {this.format2(
                  Number(row.product.price) -
                    (Number(row.product.price) * Number(row.product.discount)) /
                      100
                )}
                đ
              </p>
              <p>
                Số lượng :{" "}
                <span style={{ paddingInline: "5px" }}>{row.quantity}</span>
              </p>
              <p>
                Thành tiền :
                {this.format2(
                  (Number(row.price) -
                    (Number(row.price) * Number(row.product.discount)) / 100) *
                    Number(row.quantity)
                )}
                đ
              </p>
            </div>
            <hr style={{ clear: "both" }} />
          </div>
        );
      }
    });

    return (
      <div>
        <section class="order-form my-4 mx-4">
          <div class="container pt-4">
            <div class="row">
              <div class="col-12">
                <h2>Vui lòng nhập thông tin</h2>

                <hr class="mt-1" />
              </div>
              <div class="row mt-3 mx-4">
                <div class="col-12">
                  <h3>
                    Họ và Tên người nhận hàng :{" "}
                    {user_login_infor ? user_login_infor.fullname : "no person"}
                  </h3>
                </div>
              </div>
              <div class="col-12">
                <div class="row mt-3 mx-4">
                  <div class="col-12">
                    <label class="order-form-label">
                      Số điện thoại nhận hàng
                    </label>
                  </div>
                  <div class="col-12">
                    <input
                      class="order-form-input"
                      placeholder="0123456789"
                      name="phone"
                      value={this.state.phone}
                      onChange={this.handleChange}
                    />
                  </div>
                  <div class="col-12">
                    <label class="order-form-label">Địa chỉ nhận hàng</label>
                  </div>
                  <div class="col-12">
                    <input
                      class="order-form-input"
                      placeholder="Tỉnh / Thành phố"
                      name="province"
                      value={this.state.province}
                      onChange={this.handleChange}
                    />
                    <input
                      class="order-form-input"
                      placeholder="Huyện"
                      name="district"
                      value={this.state.district}
                      style={{ marginLeft: "20px" }}
                      onChange={this.handleChange}
                    />
                    <input
                      class="order-form-input"
                      placeholder="Xã"
                      name="villgage"
                      value={this.state.villgage}
                      style={{ marginLeft: "20px" }}
                      onChange={this.handleChange}
                    />
                    <input
                      class="order-form-input"
                      placeholder="Tên đường / Thôn / Xóm"
                      name="home"
                      value={this.state.home}
                      style={{ marginLeft: "20px" }}
                      onChange={this.handleChange}
                    />
                  </div>
                </div>
                <hr />
              </div>
            </div>
          </div>
        </section>
        <div style={{ marginLeft: "50px" }}>
          <h2>Sản phẩm ({quantity} sản phẩm)</h2>
          {rows}
        </div>

        <hr style={{ clear: "both" }} />
        <div
          style={{ marginLeft: "50px", fontSize: "20px", position: "relative" }}
        >
          <p>
            Phương thức thanh toán :
            <span style={{ position: "absolute", left: "350px" }}>
              Thanh toán khi nhận hàng
            </span>
          </p>
          <p>
            Tổng tiền :{" "}
            <span style={{ position: "absolute", left: "350px" }}>
              {this.format2(totalprice)} đ
            </span>
          </p>
          <p>
            Phí vận chuyển :{" "}
            <span style={{ position: "absolute", left: "350px" }}>
              30,000 đ
            </span>
          </p>
          <p>
            Tổng thanh toán :{" "}
            <span style={{ position: "absolute", left: "350px" }}>
              {this.format2(totalprice + 30000)} đ
            </span>
          </p>
          <p>
            {" "}
            <span style={{ position: "relative", left: "350px" }}>
              <button
                style={{
                  width: "230px",
                  paddingBlock: "5px",
                  backgroundColor: "aquamarine",
                }}
                onClick={() => this.buy(quantity, totalprice)}
              >
                Đặt hàng
              </button>
            </span>
          </p>
        </div>
      </div>
    );
  }
}

export default Order;
