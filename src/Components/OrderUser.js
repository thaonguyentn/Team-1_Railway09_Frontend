import React, { Component } from "react";
import { getorder } from "../Reducers/Requestdata/getorder";
class Orderuser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listorder: [],
    };
  }
  componentDidMount() {
    const user_login_infor = JSON.parse(
      localStorage.getItem("user_login_infor")
    );
    if (user_login_infor !== null) {
      getorder(user_login_infor.id).then((response) => {
        console.log(response);
        this.setState({ listorder: response.data.content });
      });
    }
  }
  render() {
    let state = this.props.location.state;
    if (state !== null && state !== undefined) {
    }
    let order;
    if (this.state.listorder !== []) {
      order = this.state.listorder.map((row, index) => {
        return (
          <div key={index} style={{ backgroundColor: "aqua" }}>
            <div style={{ marginBlock: "20px" }}>
              <div
                style={{
                  width: "160px",
                  display: "inline-block",
                  textAlign: "right",
                  marginRight: "25px",
                }}
              >
                <span>Tổng giá tiền</span>
              </div>
              {row.totalPrice}
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
                <span>Trạng thái</span>
              </div>
              {row.status}
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
                <span>Ngày đặt hàng</span>
              </div>
              {row.orderDate}
            </div>
          </div>
        );
      });
    }
    return (
      <div>
        <div
          class="row"
          style={{ backgroundColor: "rgb(131, 185, 201)", paddingBlock: "7px" }}
        >
          <div
            style={{ textAlign: "center" }}
            class="col-xs-2 col-sm-2 col-md-2 col-lg-2"
          >
            <span>Tất cả</span>
          </div>
          <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2">
            <span>Chờ duyệt</span>
          </div>
          <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2">
            <span>Đang giao</span>
          </div>
          <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2">
            <span>Đã giao</span>
          </div>
          <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2">
            <span>Đã huỷ</span>
          </div>
        </div>

        {order}
      </div>
    );
  }
}

export default Orderuser;
