import React, { Component } from "react";
import { connect } from "react-redux";
import getcart from "../Reducers/getcart";
import { setcart } from "../Actions/index";
class Giohang extends Component {
  format2 = (n) => {
    if (n === undefined) {
      return null;
    }
    return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  componentDidMount() {
    const user_login_infor = JSON.parse(
      localStorage.getItem("user_login_infor")
    );
    if (user_login_infor !== null) {
      getcart(user_login_infor.id).then((response) => {
        console.log(response);
        this.props.setcart(response.data);
      });
    }
  }
  render() {
    console.log(this.props.cart);
    console.log(this.props.location);
    const user_login = JSON.parse(localStorage.getItem("user_login"));
    const user_login_infor = JSON.parse(
      localStorage.getItem("user_login_infor")
    );
    if (this.props.isLogin === false) {
      return (
        <div>
          <h1>Để xem giỏ hàng bạn vui lòng đăng nhập hệ thống</h1>
        </div>
      );
    }
    const cart = this.props.cart;
    let quantity;
    let totalPrice;
    if (cart !== undefined) {
      quantity = cart.quantity;
      totalPrice = cart.totalPrice;
    } else {
    }
    return (
      <div>
        <h1>Giỏ hàng của bạn</h1>
        <h4>Số lượng mặt hàng {quantity}</h4>
        <h4>Tổng giá tiền {this.format2(totalPrice)} đ</h4>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    isLogin: state.loginreducer.isLogin,
    cart: state.cart.cart,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    setcart: (cart) => {
      dispatch(setcart(cart));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Giohang);
