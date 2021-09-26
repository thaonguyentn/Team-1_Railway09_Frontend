import React, { Component } from "react";
import { connect } from "react-redux";
import getcart from "../Reducers/Requestdata/getcart";
import { setcart, setcartdetail, setorder } from "../Actions/index";
import getcartdetail from "../Reducers/Requestdata/getcartdetail";
import { addquantity, minusquantity } from "./Requestdata/changequantity";
import getcartdetailbyid from "./Requestdata/getcartdetailbyid";
class Giohang extends Component {
  format2 = (n) => {
    if (n === undefined) {
      return null;
    }
    return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  handleChange = (event) => {
    console.log(JSON.parse(event.target.value));

    console.log(event.target.checked);
    if (event.target.checked === true) {
      this.props.setorder(JSON.parse(event.target.value), "increament");
    }
    if (event.target.checked === false) {
      this.props.setorder(JSON.parse(event.target.value), "decreament");
    }
  };
  addquantiti = (id) => {
    addquantity(id)
      .then(() => {
        getcart(this.props.accountid)
          .then((response) => {
            this.props.setcart(response.data);
          })
          .then(() => {
            getcartdetail(this.props.accountid).then((response) => {
              console.log("gggggg", response);
              this.props.setcartdetail(response.data);
            });
          });
      })
      .then(() => {
        getcartdetailbyid(id).then((response) => {
          console.log("hhahaha", response);
          this.props.setorder(response.data, "increament");
        });
      });
  };
  minusquantity = (id, quantity) => {
    if (quantity === 1) {
      if (
        window.confirm("Bạn có chắc muốn xoá sản phẩm khỏi giỏ hàng") === false
      ) {
        return;
      }
    }

    minusquantity(id).then(() => {
      getcart(this.props.accountid)
        .then((response) => {
          this.props.setcart(response.data);
        })
        .then(() => {
          getcartdetail(this.props.accountid).then((response) => {
            console.log(response);
            this.props.setcartdetail(response.data);
          });
        });
    });
  };
  componentDidMount() {
    const user_login_infor = JSON.parse(
      localStorage.getItem("user_login_infor")
    );
    if (user_login_infor !== null) {
      getcart(user_login_infor.id)
        .then((response) => {
          console.log(response);
          this.props.setcart(response.data);
        })
        .then(() => {
          getcartdetail(user_login_infor.id).then((response) => {
            console.log(response);
            this.props.setcartdetail(response.data);
          });
        });
    }
  }
  componentWillUnmount() {}
  render() {
    console.log(this.props.cart);
    console.log(this.props.order);
    console.log(this.props.cartdetail);
    let totalprice = 0;
    let quantity = 0;
    const list = this.props.order;
    for (let index = 0; index < list.length; index++) {
      quantity = quantity + list[index].quantity;
      totalprice =
        totalprice +
        (Number(list[index].product.price) -
          (Number(list[index].product.price) *
            Number(list[index].product.discount)) /
            100) *
          Number(list[index].quantity);
    }
    if (this.props.isLogin === false) {
      return (
        <div>
          <h1>Để xem giỏ hàng bạn vui lòng đăng nhập hệ thống</h1>
        </div>
      );
    }
    let cartdetail;
    if (this.props.cartdetail) {
      cartdetail = this.props.cartdetail.map((row, index) => {
        return (
          <div>
            <div
              style={{
                backgroundColor: "white",
                width: "100px",
                float: "left",
              }}
            ></div>
            <div
              style={{
                backgroundColor: "white",
                width: "20px",
                float: "left",
              }}
            >
              <input
                type="checkbox"
                // checked={true}
                value={JSON.stringify(row)}
                onChange={this.handleChange}
              />
            </div>
            <div
              id="sp"
              style={{
                // margin: "30px",
                backgroundColor: "white",
                width: "150px",
                float: "left",
              }}
            >
              <img
                src={row.product.image}
                alt=""
                style={{ width: "140px", height: "auto" }}
              />
            </div>
            <div
              style={{
                // margin: "30px",
                backgroundColor: "white",
                width: "200px",
                float: "left",
              }}
            >
              <p style={{ textAlign: "center" }}>
                {row.product.name}({row.product.ram}/{row.product.memory})
              </p>
              <p style={{ textAlign: "center", fontSize: "small" }}>
                <span
                  style={{
                    textDecoration: "line-through",
                    paddingRight: "5px",
                  }}
                >
                  {this.format2(row.product.price)} đ{" "}
                </span>

                <span> -{row.product.discount}%</span>
              </p>
              <p style={{ textAlign: "center", fontSize: "larger" }}>
                {this.format2(
                  Number(row.product.price) -
                    (Number(row.product.price) * Number(row.product.discount)) /
                      100
                )}{" "}
                đ
              </p>
              <p>Số hàng còn lại : {row.product.quantity}</p>
            </div>
            <div
              style={{
                // margin: "30px",
                backgroundColor: "white",
                width: "260px",
                float: "left",
              }}
            >
              <p>
                Số lượng :{" "}
                <button
                  className="page-link"
                  onClick={() => {
                    this.minusquantity(row.id, row.quantity);
                  }}
                >
                  -
                </button>
                <span style={{ paddingInline: "5px" }}>{row.quantity}</span>
                <button
                  // className="page-link"
                  onClick={() => {
                    this.addquantiti(row.id);
                  }}
                >
                  +
                </button>
              </p>
              <p>
                Giá :
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
      });
    }
    return (
      <div style={{ marginLeft: "100px" }}>
        <h1>Giỏ hàng của bạn</h1>
        {cartdetail}
        <div style={{ float: "left" }}>
          <h4>Số lượng mặt hàng {quantity}</h4>
          <h4>Tổng giá tiền {this.format2(totalprice)} đ</h4>
        </div>
        <div
          style={{ float: "left", paddingLeft: "100px", marginBlock: "10px" }}
        >
          <button type="button" class="btn btn-success">
            Đặt hàng
          </button>
        </div>
        <br style={{ clear: "both" }} />
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  console.log(state);
  return {
    accountid: state.accountreducer.account
      ? state.accountreducer.account.id
      : null,
    isLogin: state.loginreducer.isLogin,
    cart: state.cart.cart,
    cartdetail: state.cart.cartdetail,
    order: state.orderreducer.order,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    setcart: (cart) => {
      dispatch(setcart(cart));
    },
    setcartdetail: (cartdetail) => {
      dispatch(setcartdetail(cartdetail));
    },
    setorder: (a, b) => {
      dispatch(setorder(a, b));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Giohang);
