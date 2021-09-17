import React, { Component } from "react";
import { Redirect } from "react-router";
import Axios from "axios";
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
  componentDidMount() {
    const id = this.props.location.state.id;
    Axios.get("http://localhost:8080/api/v2/products/" + id, {
      auth: {
        username: "admin",
        password: "123456",
      },
    }).then((response) => {
      console.log(response);
      this.setState({
        product: response.data,
      });
    });
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
          <p style={{ textAlign: "center", fontSize: "larger" }}>
            {this.format2(pr.price)} đ
          </p>
        </div>,
      ];
    }
    return <div>{row}</div>;
  }
}

export default DienthoaiDetail;
