import React, { Component } from "react";
import ReactModal from "react-modal";
import { Link } from "react-router-dom";
import { createorder } from "../Requestdata/CallAPI";
class Order extends Component {
  user_login_infor1 = JSON.parse(localStorage.getItem("user_login_infor"));
  constructor(props) {
    super(props);
    this.state = {
      province: "",
      district: "",
      villgage: "",
      home: "",
      phone: "",
      fullname: this.user_login_infor1
        ? this.user_login_infor1.fullname
        : "no person",
      isopenmodalalert: false,
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
      fullname: this.state.fullname,
      quantity: quantity,
      totalPrice: totalprice,
      address:
        this.state.home +
        "," +
        this.state.villgage +
        "," +
        this.state.district +
        "," +
        this.state.province,
      phone: this.state.phone,
    };
    if (
      this.state.fullname === "" ||
      this.state.phone === "" ||
      this.state.home === "" ||
      this.state.villgage === "" ||
      this.state.district === "" ||
      this.state.province === ""
    ) {
      this.setState({ isopenmodalalert: "true" });
      return;
    }
    createorder(body).then((response) => {
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
          <tr key={index}>
            <td>
              <Link
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
                  style={{ width: "70px", height: "auto" }}
                />
              </Link>
              <span>
                {row.product.name}({row.product.ram}/{row.product.memory})
              </span>
            </td>
            <td>
              {this.format2(
                Number(row.product.price) -
                  (Number(row.product.price) * Number(row.product.discount)) /
                    100
              )}
              đ
            </td>
            <td>{row.quantity}</td>
            <td>
              {this.format2(
                (Number(row.price) -
                  (Number(row.price) * Number(row.product.discount)) / 100) *
                  Number(row.quantity)
              )}
              đ
            </td>
          </tr>
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
              <br />
              <div class="col-12">
                <div class="row mt-3 mx-4">
                  <div
                    class="col-12"
                    style={{ position: "relative", fontSize: "15px" }}
                  >
                    <label class="order-form-label">
                      Họ và Tên người nhận hàng :
                    </label>
                    <span style={{ position: "absolute", left: "300px" }}>
                      <input
                        class="order-form-input"
                        name="fullname"
                        value={this.state.fullname}
                        onChange={this.handleChange}
                      />
                      <span
                        style={{
                          position: "relative",
                          bottom: "5px",
                          color: "red",
                        }}
                      >
                        {" "}
                        *
                      </span>
                    </span>
                  </div>
                  <br />
                  <div
                    class="col-12"
                    style={{ position: "relative", fontSize: "15px" }}
                  >
                    <label class="order-form-label">
                      Số điện thoại nhận hàng :
                    </label>
                    <span style={{ position: "absolute", left: "300px" }}>
                      <input
                        class="order-form-input"
                        placeholder="0123456789"
                        name="phone"
                        value={this.state.phone}
                        onChange={this.handleChange}
                      />
                      <span
                        style={{
                          position: "relative",
                          bottom: "5px",
                          color: "red",
                        }}
                      >
                        {" "}
                        *
                      </span>
                    </span>
                  </div>
                  <br />
                  <div
                    class="col-12"
                    style={{ position: "relative", fontSize: "15px" }}
                  >
                    <label class="order-form-label">Địa chỉ nhận hàng : </label>
                    <span style={{ position: "absolute", left: "300px" }}>
                      <input
                        class="order-form-input"
                        placeholder="Tỉnh / Thành phố"
                        name="province"
                        value={this.state.province}
                        onChange={this.handleChange}
                      />
                      <span
                        style={{
                          position: "relative",
                          bottom: "5px",
                          color: "red",
                        }}
                      >
                        {" "}
                        *
                      </span>
                      <input
                        class="order-form-input"
                        placeholder="Huyện"
                        name="district"
                        value={this.state.district}
                        style={{ marginLeft: "20px" }}
                        onChange={this.handleChange}
                      />
                      <span
                        style={{
                          position: "relative",
                          bottom: "5px",
                          color: "red",
                        }}
                      >
                        {" "}
                        *
                      </span>
                      <input
                        class="order-form-input"
                        placeholder="Xã"
                        name="villgage"
                        value={this.state.villgage}
                        style={{ marginLeft: "20px" }}
                        onChange={this.handleChange}
                      />
                      <span
                        style={{
                          position: "relative",
                          bottom: "5px",
                          color: "red",
                        }}
                      >
                        {" "}
                        *
                      </span>
                      <input
                        class="order-form-input"
                        placeholder="Tên đường / Thôn / Xóm"
                        name="home"
                        value={this.state.home}
                        style={{ marginLeft: "20px" }}
                        onChange={this.handleChange}
                      />
                      <span
                        style={{
                          position: "relative",
                          bottom: "5px",
                          color: "red",
                        }}
                      >
                        {" "}
                        *
                      </span>
                    </span>
                  </div>
                </div>
                <hr />
              </div>
            </div>
          </div>
        </section>
        <div style={{ marginLeft: "50px", fontSize: "17px" }}>
          <h2>Sản phẩm ({quantity} sản phẩm)</h2>

          <div class="table-responsive">
            <table class="table table-hover">
              <thead>
                <tr>
                  <th>Thông tin sản phẩm</th>
                  <th>Đơn giá</th>
                  <th>Số lượng</th>
                  <th>Thành tiền</th>
                </tr>
              </thead>
              <tbody>{rows}</tbody>
            </table>
          </div>
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
            <ReactModal
              isOpen={this.state.isopenmodalalert}
              onRequestClose={() => this.setState({ isopenmodalalert: false })}
              style={{
                overlay: { background: "none" },
                content: {
                  width: "400px",
                  height: "80px",
                  margin: "auto",
                  backgroundColor: "red",
                  color: "white",
                  fontSize: "17px",
                },
              }}
            >
              Bạn vui lòng kiểm tra lại thông tin nhận hàng !
            </ReactModal>
          </p>
        </div>
      </div>
    );
  }
}

export default Order;
