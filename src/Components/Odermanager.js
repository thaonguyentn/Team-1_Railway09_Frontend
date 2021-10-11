import React, { Component } from "react";
import { NavLink, Switch, Route, Redirect } from "react-router-dom";
import {
  getlistproduct,
  getlistaccount,
  getallorder,
  deleteproduct,
  cancelorder,
  updateorder,
} from "../Requestdata/CallAPI";
import { connect } from "react-redux";
import {
  setlistproduct,
  setallorder,
  setlogin,
  setcart,
  setcartdetail,
  setprofile,
  setlistaccount,
} from "../Actions/index";
import slides from "./Carousel";
import AddProduct from "./AddProduct";
import Addimageslide from "./AddImageSlide";
import ReactModal from "react-modal";

class Odermanager extends Component {
  constructor(props) {
    super(props);
    this.state = {
      prid: 0,
      isopenmodaladd: false,
      isopenmodaladdslide: false,
      isopenid: null,
      isopenmodaldeleteorder: false,
      isavtiveclass: false,
      why: "",
      whyalert: "",
    };
  }
  format2 = (n) => {
    return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  Nextorder = () => {
    if (this.props.totalpageorder !== this.props.currenpageorder + 1) {
      getallorder(this.props.currenpageorder + 1 + 1).then((data) => {
        this.props.setallorder(data.data);
      });
    }
  };
  Previosorder = () => {
    if (this.props.totalpageorder !== 0) {
      getallorder(this.props.currenpageorder).then((data) => {
        this.props.setallorder(data.data);
      });
    }
  };
  componentDidMount() {
    getlistaccount(1).then(
      (response) => {
        this.props.setlistaccount(response.data);
      },
      (error) => {
        console.log(error);
      }
    );
    getlistproduct(1, "", "", "", "").then((response) => {
      console.log(response);
      this.props.getlistproduct(response.data);
    });
    getallorder().then((response) => {
      this.props.setallorder(response.data);
    });
    this.setState({ isavtiveclass: true });
  }
  render() {
    let rows3;
    if (this.props.allorder) {
      rows3 = this.props.allorder.map((row, index) => {
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
                {row.orderDate}
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
    console.log(this.props.totalpageorder);
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
            getallorder(index + 1).then((data) => {
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
              <th>Trạng thái</th>
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
  console.log(state);
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
    getlistproduct: (list) => {
      dispath(setlistproduct(list));
    },
    setallorder: (allorder) => {
      dispath(setallorder(allorder));
    },
    setlogin: (islogin) => {
      dispath(setlogin(islogin));
    },
    setcart: (cart) => {
      dispath(setcart(cart));
    },
    setcartdetail: (cartdetail) => {
      dispath(setcartdetail(cartdetail));
    },
    setprofile: (account) => {
      dispath(setprofile(account));
    },
    setlistaccount: (data) => {
      dispath(setlistaccount(data));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Odermanager);
