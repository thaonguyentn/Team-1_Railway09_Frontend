import React, { Component } from "react";
import ReactModal from "react-modal";
import { connect } from "react-redux";
import { NavLink, Switch, Route, Redirect } from "react-router-dom";
import { setloading } from "../Actions";
import { getorder } from "../Requestdata/CallAPI";
class Orderuser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listorder: [],
      ordershow: 1,
    };
  }
  format2 = (n) => {
    return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  componentDidMount() {
    this.props.setloading(true);
    const user_login_infor = JSON.parse(
      localStorage.getItem("user_login_infor")
    );
    if (user_login_infor !== null) {
      getorder(user_login_infor.id)
        .then((response) => {
          this.setState({ listorder: response.data.content });
        })
        .finally(() => {
          this.props.setloading(false);
        });
    }
  }
  render() {
    // let state = this.props.location.state;
    // if (state !== null && state !== undefined) {
    // }
    let status =
      this.state.ordershow === 1
        ? "all"
        : this.state.ordershow === 2
        ? "Not_Active"
        : this.state.ordershow === 3
        ? "Active"
        : this.state.ordershow === 4
        ? "End"
        : this.state.ordershow === 5
        ? "Delete"
        : "";
    let order = "";
    if (!this.props.loading && this.state.listorder !== []) {
      order = this.state.listorder.map((row, index) => {
        if (status === "all" || status === row.status) {
          return (
            <div
              key={index}
              style={{
                backgroundColor: "#e8e8e8",
                borderBottom: "1px solid red",
                width: "350px",
                margin: "auto",
              }}
            >
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
                {this.format2(row.totalPrice)} đ
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
                {row.status === "Not_Active"
                  ? "Chờ duyệt"
                  : row.status === "Active"
                  ? "Đang giao"
                  : row.status === "End"
                  ? "Đã giao"
                  : row.status === "Delete"
                  ? "Đã huỷ"
                  : ""}
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
                <NavLink
                  to={{
                    pathname: "/profile/orderuser/detail",
                    state: { order: row },
                  }}
                >
                  {new Date(row.orderDate).toDateString()}
                </NavLink>
              </div>
            </div>
          );
        }
      });
    } else {
      order = "";
    }
    return (
      <>
        <div>
          <div
            style={{
              backgroundColor: "rgb(131, 185, 201)",
              paddingBlock: "7px",
              position: "relative",
              zIndex: "2",
            }}
          >
            <span
              onClick={() => {
                if (this.state.ordershow > 1) {
                  this.setState({ ordershow: this.state.ordershow - 1 });
                } else {
                  this.setState({
                    ordershow: 5,
                  });
                }
              }}
              style={{ position: "absolute", left: "30px", fontSize: "38px" }}
              class="glyphicon glyphicon-chevron-left"
            ></span>
            <span
              onClick={() => {
                if (this.state.ordershow < 5) {
                  this.setState({ ordershow: this.state.ordershow + 1 });
                } else {
                  this.setState({
                    ordershow: 1,
                  });
                }
              }}
              style={{ position: "absolute", right: "30px", fontSize: "38px" }}
              class="glyphicon glyphicon-chevron-right"
            ></span>
            <div style={{ textAlign: "center" }}>
              <span>
                {this.state.ordershow === 1
                  ? "Tất cả"
                  : this.state.ordershow === 2
                  ? "Chờ duyệt"
                  : this.state.ordershow === 3
                  ? "Đang giao"
                  : this.state.ordershow === 4
                  ? "Đã giao"
                  : this.state.ordershow === 5
                  ? "Đã huỷ"
                  : ""}
              </span>
            </div>
          </div>
          {order}
        </div>
      </>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    loading: state.productreducer.loading,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    setloading: (loading) => {
      dispatch(setloading(loading));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Orderuser);
