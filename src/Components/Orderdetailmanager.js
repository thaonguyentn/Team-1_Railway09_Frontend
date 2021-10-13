import React, { Component } from "react";
import ReactModal from "react-modal";
import { connect } from "react-redux";
import {
  setallorder,
  setcart,
  setcartdetail,
  setlistproduct,
  setlogin,
  setprofile,
} from "../Actions";
import {
  getallorder,
  cancelorder,
  updateorder,
  getorderdetail,
  getorder,
  getorderbyid,
} from "../Requestdata/CallAPI";
class Orderdetailmanager extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listorrderdetail: [],
      isopenmodaldeleteorder: false,
      isavtiveclass: false,
      why: "",
      whyalert: "",
      order: {},
    };
  }
  componentDidMount() {
    if (this.props.location.state) {
      let order = this.props.location.state.order;
      getorderdetail(order.orderID).then((response) => {
        this.setState({
          listorrderdetail: response.data,
        });
      });
      getorderbyid(order.orderID).then((response) => {
        this.setState({ order: response.data });
      });
    }
  }
  updateorder = (id, status) => {
    if (
      window.confirm(
        status === "Not_Active"
          ? "Xác nhận duyệt đơn hàng"
          : status === "Active"
          ? "Xác nhận đã giao hàng"
          : status === "End"
          ? "Đã giao"
          : status === "Delete"
          ? "Đã huỷ"
          : ""
      )
    ) {
      updateorder(id).then(() => {
        getallorder().then((response) => {
          this.props.setallorder(response.data);
        });
        getorderbyid(id).then((response) => {
          this.setState({ order: response.data });
        });
      });
    }
  };
  cancelorder = (id) => {
    if (this.state.why === "") {
      this.setState({ whyalert: "* bạn chưa nhập lý do" });
      return;
    }
    let body = { description: "Huỷ : " + this.state.why };
    cancelorder(id, body).then(() => {
      getallorder().then((response) => {
        this.props.setallorder(response.data);
        this.setState({ isopenmodaldeleteorder: false });
        getorderbyid(id).then((response) => {
          this.setState({ order: response.data });
        });
      });
    });
  };
  format2 = (n) => {
    if (n !== undefined) {
      return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    } else {
      return n;
    }
  };
  render() {
    let rows;
    if (this.state.listorrderdetail.length === 0) {
      rows = <div>Không có dữ liệu</div>;
    } else {
      rows = this.state.listorrderdetail.map((row, index) => {
        return (
          <div
            style={{
              backgroundColor: "white",
              float: "left",
              width: "100%",
              marginBlock: "5px",
              borderRadius: "10px",
            }}
          >
            <div
              style={{
                backgroundColor: "white",
                width: "20px",
              }}
            ></div>
            <div
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
              <p>
                {row.product.name}({row.product.ram}/{row.product.memory})
              </p>
              <p style={{ fontSize: "small" }}>
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
              <p style={{ fontSize: "larger" }}>
                {this.format2(
                  Number(row.product.price) -
                    (Number(row.product.price) * Number(row.product.discount)) /
                      100
                )}
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
                marginLeft: "100px",
              }}
            >
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
      });
    }

    return (
      <div>
        <table className="table table-bordered table-hover">
          <thead>
            <tr>
              <th>Id</th>
              <th>Tên người nhận</th>
              <th>Địa chỉ người nhận</th>
              <th>SĐT người nhận</th>
              <th>Tổng giá</th>
              <th>Trạng thái</th>
              <th>Ngày đặt hàng</th>
              <th>Ghi chú</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{this.state.order.orderID}</td>
              <td>{this.state.order.fullname}</td>
              <td>{this.state.order.address}</td>
              <td>{this.state.order.phone}</td>
              <td>{this.format2(this.state.order.totalPrice)} đ</td>
              <td>
                {this.state.order.status === "Not_Active"
                  ? "Chờ duyệt"
                  : this.state.order.status === "Active"
                  ? "Đang giao"
                  : this.state.order.status === "End"
                  ? "Đã giao"
                  : this.state.order.status === "Delete"
                  ? "Đã huỷ"
                  : ""}{" "}
              </td>
              <td>{this.state.order.orderDate}</td>
              <td>{this.state.order.description}</td>
            </tr>
          </tbody>
        </table>
        <div style={{ textAlign: "center" }}>
          <h2>Thông tin chi tiết đơn hàng</h2>
        </div>
        {rows}
        <div style={{ textAlign: "center" }}>
          {" "}
          <button
            type="button"
            class="btn btn-info"
            onClick={() =>
              this.updateorder(
                this.state.order.orderID,
                this.state.order.status
              )
            }
            style={{
              display:
                this.state.order.status === "End"
                  ? "none"
                  : this.state.order.status === "Delete"
                  ? "none"
                  : "",
            }}
          >
            {this.state.order.status === "Not_Active"
              ? "Duyệt đơn hàng"
              : this.state.order.status === "Active"
              ? "Hoàn tất đơn hàng"
              : ""}
          </button>
          <button
            type="button"
            class="btn btn-danger"
            onClick={() => this.setState({ isopenmodaldeleteorder: true })}
            style={{
              display:
                this.state.order.status === "End"
                  ? "none"
                  : this.state.order.status === "Delete"
                  ? "none"
                  : "",
            }}
          >
            Huỷ đơn hàng
          </button>
        </div>

        <ReactModal
          isOpen={this.state.isopenmodaldeleteorder}
          onRequestClose={() =>
            this.setState({ isopenmodaldeleteorder: false })
          }
          style={{
            overlay: { background: "none" },
            content: {
              backgroundColor: "orange",
              width: "500px",
              height: "300px",
              margin: "auto",
              textAlign: "center",
            },
          }}
        >
          <h3>Hãy nhập lý do huỷ đơn hàng</h3>
          <textarea
            name="why"
            value={this.state.why}
            onChange={(event) =>
              this.setState({ why: event.target.value, whyalert: "" })
            }
            cols="40"
            rows="5"
          ></textarea>
          <p style={{ color: "red" }}>{this.state.whyalert}</p>
          <p>
            <button
              style={{ padding: "5px", backgroundColor: "red" }}
              onClick={() => this.cancelorder(this.state.order.orderID)}
            >
              Xác nhận huỷ
            </button>
          </p>
        </ReactModal>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    totalpageproduct: state.productreducer.totalPage,
    currenpageproduct: state.productreducer.currenPage,
    listpro: state.productreducer.listproduct,
    totalpageorder: state.orderreducer.totalPage,
    currenpageorder: state.orderreducer.currenPage,
    allorder: state.orderreducer.allorder,
    islogin: state.loginreducer.isLogin,
    totalpageaccount: state.accountreducer.totalPage,
    currenpageaccount: state.accountreducer.currenPage,
    listaccount: state.accountreducer.listaccount,
  };
};
const mapDispatchToProps = (dispath) => {
  return {
    setallorder: (allorder) => {
      dispath(setallorder(allorder));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Orderdetailmanager);
