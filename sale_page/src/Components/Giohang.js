import React, { Component } from "react";
import Axios from "axios";
import { connect } from "react-redux";
class Giohang extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cart: null,
      user_login: JSON.parse(localStorage.getItem("user_login")),
      user_login_infor: JSON.parse(localStorage.getItem("user_login_infor")),
    };
  }
  format2 = (n) => {
    if (n === undefined) {
      return null;
    }
    return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  componentDidMount() {}
  static async getDerivedStateFromProps(nextprops, state) {
    await console.log("gggggg");
    const user_login = await JSON.parse(localStorage.getItem("user_login"));
    const user_login_infor = await JSON.parse(
      localStorage.getItem("user_login_infor")
    );
    if (user_login_infor !== null && user_login !== null) {
      await Axios.get(
        "http://localhost:8080/api/v5/cart/" + user_login_infor.id,
        {
          auth: user_login,
        }
      ).then((response) => {
        console.log(response.data);
        return {
          cart: response.data,
        };
      });
    }
  }

  render() {
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
    const cart = this.state.cart;
    let quantity;
    let totalPrice;
    if (cart !== null) {
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
  };
};
export default connect(mapStateToProps)(Giohang);
