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
      <div style={{ marginLeft: "5px", fontSize: "1.5rem" }}>
        <h2>Vui lòng nhập thông tin</h2>
        <hr class="mt-1" />
        <div style={{ display: "table" }}>
          <tr key="">
            <td>
              <label>Họ và Tên người nhận hàng :</label>{" "}
            </td>
            <td>
              <span style={{}}>
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
            </td>
          </tr>
          <tr key="">
            <td>
              <label>Số điện thoại nhận hàng :</label>{" "}
            </td>

            <td>
              <span style={{}}>
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
            </td>
          </tr>
          <tr key="">
            <td>
              <label>Địa chỉ nhận hàng :</label>{" "}
            </td>
            <td>
              <span style={{}}>
                <span>
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
                </span>
                <span>
                  {" "}
                  <input
                    class="order-form-input"
                    placeholder="Huyện"
                    name="district"
                    value={this.state.district}
                    style={{}}
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
                <span>
                  {" "}
                  <input
                    class="order-form-input"
                    placeholder="Xã"
                    name="villgage"
                    value={this.state.villgage}
                    style={{}}
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
                <span>
                  {" "}
                  <input
                    class="order-form-input"
                    placeholder="Tên đường / Thôn / Xóm"
                    name="home"
                    value={this.state.home}
                    style={{}}
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
              </span>
            </td>
            <td></td>
          </tr>
        </div>
        <hr />
        <div>
          <h2>Sản phẩm ({quantity} sản phẩm)</h2>

          <div class="table-responsive">
            <table class="table table-hover">
              <thead>
                <tr style={{ fontSize: "2rem" }}>
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
        <div style={{ display: "table-row" }}>
          <ReactModal
            isOpen={this.state.isopenmodalalert}
            onRequestClose={() => this.setState({ isopenmodalalert: false })}
            style={{
              overlay: { background: "none" },
              content: {
                width: "80vw",
                height: "80px",
                backgroundColor: "red",
                color: "white",
                fontSize: "17px",
              },
            }}
          >
            Bạn vui lòng kiểm tra lại thông tin nhận hàng !
          </ReactModal>
          <tr key="">
            <td>
              <label>Phương thức thanh toán :</label>
            </td>
            <td>Thanh toán khi nhận hàng</td>
          </tr>
          <tr key="">
            <td>
              <label>Tổng tiền :</label>
            </td>
            <td>{this.format2(totalprice)} đ</td>
          </tr>
          <tr key="">
            <td>
              <label>Phí vận chuyển :</label>
            </td>
            <td>30,000 đ</td>
          </tr>
          <tr key="">
            <td></td>
            <td>
              <button
                style={{
                  width: "230px",
                  paddingBlock: "5px",
                  backgroundColor: "aquamarine",
                  border: "none",
                  boxShadow: "-2px 1px 9px 0px  red",
                }}
                onClick={() => this.buy(quantity, totalprice)}
              >
                Đặt hàng
              </button>
            </td>
          </tr>
        </div>
      </div>
    );
  }
}

export default Order;
