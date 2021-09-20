import React, { Component } from "react";
import { Redirect } from "react-router";
import Axios from "axios";
import axios from "axios";
class DienthoaiDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product: null,
    };
  }
  format2 = (n) => {
    return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  addCartdetail = () => {
    const id = this.props.location.state.id;
    const user_login_infor = JSON.parse(
      localStorage.getItem("user_login_infor")
    );
    const user_login = JSON.parse(localStorage.getItem("user_login"));
    if (user_login_infor && this.state.product !== null && user_login_infor) {
      let producid = this.state.product.id;
      let accountId = user_login_infor.id;
      Axios.post(
        "http://localhost:8080/api/v4/cartdetail?productId=" +
          producid +
          "&accountId=" +
          accountId
      ).then((response) => {
        console.log(response);
      });
    }
  };
  componentDidMount() {
    const id = this.props.location.state.id;
    Axios.get("http://localhost:8080/api/v2/products/" + id).then(
      (response) => {
        console.log(response);
        this.setState({
          product: response.data,
        });
      }
    );
  }
  render() {
    let pr = this.state.product;
    let row;
    if (pr !== null) {
      row = [
        <h1>{pr.name}</h1>,
        <div
          id="sp"
          style={{
            // margin: "30px",
            backgroundColor: "white",
            width: "260px",
            float: "left",
          }}
        >
          <img
            src={require("../Images/dienthoai/" + pr.image).default}
            alt=""
            style={{ width: "260px", height: "auto" }}
          />
          <p style={{ textAlign: "center" }}>
            {pr.name}({pr.ram}/{pr.memory})
          </p>
          <p style={{ textAlign: "center", fontSize: "small" }}>
            <span
              style={{
                textDecoration: "line-through",
                paddingRight: "5px",
              }}
            >
              {this.format2(pr.price)} đ{" "}
            </span>

            <span> -{pr.discount}%</span>
          </p>
          <p style={{ textAlign: "center", fontSize: "larger" }}>
            {this.format2(
              Number(pr.price) - (Number(pr.price) * Number(pr.discount)) / 100
            )}{" "}
            đ
          </p>
        </div>,
        <div>
          <button onClick={this.addCartdetail}>Thêm vào giỏ hàng</button>
        </div>,
      ];
    }
    return (
      <div>
        {row}
        <hr style={{ clear: "both" }} />
      </div>
    );
  }
}

export default DienthoaiDetail;
