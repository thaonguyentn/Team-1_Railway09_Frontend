import React, { Component } from "react";
import { NavLink, Switch, Route, Redirect } from "react-router-dom";
import { getallorder } from "../Requestdata/CallAPI";
import { connect } from "react-redux";
import { setallorder } from "../Actions/index";

class Odermanager extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isopenmodaldeleteorder: false,
      isavtiveclass: false,
      why: "",
      whyalert: "",
      status: "",
    };
  }
  format2 = (n) => {
    return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  Nextorder = () => {
    if (this.props.totalpageorder !== this.props.currenpageorder + 1) {
      getallorder(this.props.currenpageorder + 1 + 1, this.state.status).then(
        (data) => {
          this.props.setallorder(data.data);
        }
      );
    }
  };
  Previosorder = () => {
    if (this.props.totalpageorder !== 0) {
      getallorder(this.props.currenpageorder, this.state.status).then(
        (data) => {
          this.props.setallorder(data.data);
        }
      );
    }
  };
  componentDidMount() {
    getallorder().then((response) => {
      this.props.setallorder(response.data);
    });
    this.setState({ isavtiveclass: true });
  }
  render() {
    let rows3;
    if (this.props.allorder) {
      rows3 = this.props.allorder.map((row, index) => {
        let date = new Date(row.orderDate);
        return (
          <tr key={index}>
            <td>{row.orderID}</td>
            <td>{row.fullname}</td>
            <td>{row.address}</td>
            <td>{row.phone}</td>
            <td>{this.format2(row.totalPrice)} đ</td>
            <td>
              {row.status === "Not_Active"
                ? "Chờ duyệt"
                : row.status === "Active"
                ? "Đang giao"
                : row.status === "End"
                ? "Đã giao"
                : row.status === "Delete"
                ? "Đã huỷ"
                : ""}{" "}
            </td>
            <td>
              <NavLink
                to={{
                  pathname: "/admin/orders/detail/" + row.orderID,
                  state: { order: row },
                }}
              >
                {date.toDateString()}
              </NavLink>
            </td>
            <td>{row.description}</td>
          </tr>
        );
      });
    }
    let Previosorder;
    let Nextorder;
    if (
      this.props.currenpageorder === 0 ||
      this.props.currenpageorder === undefined
    ) {
      Previosorder = "";
    } else {
      Previosorder = (
        <button className="page-link" onClick={this.Previosorder}>
          Previous
        </button>
      );
    }
    if (
      this.props.totalpageorder === this.props.currenpageorder + 1 ||
      this.props.currenpageorder === undefined ||
      this.props.totalpageorder === 0
    ) {
      Nextorder = "";
    } else {
      Nextorder = (
        <button className="page-link" onClick={this.Nextorder}>
          Next
        </button>
      );
    }
    let pageorder = [];
    for (let index = 0; index < this.props.totalpageorder; index++) {
      let button = (
        <button
          className="page-link"
          id={this.props.currenpageorder === index ? "buttonpage" : "abc"}
          onClick={() => {
            getallorder(index + 1, this.state.status).then((data) => {
              this.props.setallorder(data.data);
            });
          }}
        >
          {index + 1}
        </button>
      );
      pageorder.push(button);
    }
    let navorder = (
      <nav aria-label="Page navigation example">
        <ul className="pagination">
          <li className="page-item" id="show">
            {Previosorder}
            {pageorder}
            {Nextorder}
          </li>
        </ul>
        <ul className="pagination" id="pagination"></ul>
      </nav>
    );
    return (
      <div
        className={
          this.state.isavtiveclass === true ? "navactive" : "navnoactive"
        }
      >
        <table className="table table-bordered table-hover">
          <thead>
            <tr>
              <th>Id</th>
              <th>Tên người nhận</th>
              <th>Địa chỉ người nhận</th>
              <th>SĐT người nhận</th>
              <th>Tổng giá</th>
              <th>
                Trạng thái{" "}
                <select
                  value={this.state.status}
                  onChange={(e) => {
                    this.setState({ status: e.target.value });
                    console.log(e.target.value);
                    getallorder(1, e.target.value).then((response) => {
                      this.props.setallorder(response.data);
                    });
                  }}
                >
                  <option value="" key="">
                    Tất cả
                  </option>
                  <option value="Not_Active" key="">
                    Chờ duyệt
                  </option>
                  <option value="Active" key="">
                    Đang giao
                  </option>
                  <option value="End" key="">
                    Đã giao
                  </option>
                  <option value="Delete" key="">
                    Đã huỷ
                  </option>
                </select>
              </th>
              <th>Ngày đặt hàng</th>
              <th>Ghi chú</th>
            </tr>
          </thead>
          <tbody>{rows3}</tbody>
        </table>
        <div style={{ textAlign: "center" }}>{navorder}</div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    totalpageorder: state.orderreducer.totalPage,
    currenpageorder: state.orderreducer.currenPage,
    allorder: state.orderreducer.allorder,
  };
};
const mapDispatchToProps = (dispath) => {
  return {
    setallorder: (allorder) => {
      dispath(setallorder(allorder));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Odermanager);
