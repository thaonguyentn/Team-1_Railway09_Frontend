import React, { Component } from "react";
import { NavLink, Switch, Route, Redirect } from "react-router-dom";
import { getlistaccount } from "../Requestdata/CallAPI";
import { connect } from "react-redux";
import { setlistaccount } from "../Actions/index";
class Accountmanager extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isavtiveclass: true,
    };
  }
  Nextaccount = () => {
    if (this.props.totalpageaccount !== this.props.currenpageaccount + 1) {
      getlistaccount(this.props.currenpageproduct + 1 + 1).then((data) => {
        this.props.setlistaccount(data.data);
      });
    }
  };
  Previosaccount = () => {
    if (this.props.currenpageaccount !== 0) {
      getlistaccount(this.props.currenpageaccount).then((data) => {
        this.props.setlistaccount(data.data);
      });
    }
  };
  componentDidMount() {
    getlistaccount(1).then((response) => {
      this.props.setlistaccount(response.data);
    });
  }
  render() {
    let rows;
    if (this.props.listaccount) {
      rows = this.props.listaccount.map((row, index) => {
        return (
          <tr key="index">
            <td>{row.id}</td>
            <td>{row.username}</td>
            <td>{row.email}</td>
            <td>{row.fullname}</td>
            <td>{row.gender}</td>
            <td>{row.address}</td>
            <td>{row.avatar}</td>
            <td>{row.phone_number}</td>
            <td>{row.register_date}</td>
          </tr>
        );
      });
    }
    let Previosaccount;
    let Nextaccount;
    if (
      this.props.currenpageaccount === 0 ||
      this.props.currenpageaccount === undefined
    ) {
      Previosaccount = "";
    } else {
      Previosaccount = (
        <button className="page-link" onClick={this.Previosaccount}>
          Previous
        </button>
      );
    }
    if (
      this.props.totalpageaccount === this.props.currenpageaccount + 1 ||
      this.props.currenpageaccount === undefined
    ) {
      Nextaccount = "";
    } else {
      Nextaccount = (
        <button className="page-link" onClick={this.Nextaccount}>
          Next
        </button>
      );
    }
    let pageaccount = [];
    for (let index = 0; index < this.props.totalpageaccount; index++) {
      let button = (
        <button
          className="page-link"
          id={this.props.currenpageaccount === index ? "buttonpage" : "abc"}
          onClick={() => {
            getlistaccount(index + 1).then((data) => {
              this.props.setlistaccount(data.data);
            });
          }}
        >
          {index + 1}
        </button>
      );
      pageaccount.push(button);
    }
    let navaccount = (
      <nav aria-label="Page navigation example">
        <ul className="pagination">
          <li className="page-item" id="show">
            {Previosaccount}
            {pageaccount}
            {Nextaccount}
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
              <th>Username</th>
              <th>Email</th>
              <th>Họ Tên</th>
              <th>Giới tính</th>
              <th>Địa chỉ</th>
              <th>Avatar</th>
              <th>SĐT</th>
              <th>Ngày đăng Ký</th>
              <th>Xoá</th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </table>
        <div style={{ textAlign: "center" }}>{navaccount}</div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    totalpageaccount: state.accountreducer.totalPage,
    currenpageaccount: state.accountreducer.currenPage,
    listaccount: state.accountreducer.listaccount,
  };
};
const mapDispatchToProps = (dispath) => {
  return {
    setlistaccount: (data) => {
      dispath(setlistaccount(data));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Accountmanager);
