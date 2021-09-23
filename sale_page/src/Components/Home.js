import React, { Component } from "react";
import Axios from "axios";
import { NavLink, Switch, Route } from "react-router-dom";
import DienthoaiDetail from "./DienthoaiDetail";
import getlistproduct from "./Requestdata/getlistproduct";
import { setlistproduct } from "../Actions/index";
import { connect } from "react-redux";
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listpro: [],
    };
  }
  Next = () => {
    console.log(this.props.currenpage + 1);
    if (this.props.totalpage !== this.props.currenpage + 1) {
      getlistproduct(
        this.props.currenpage + 1 + 1,
        this.props.ramfilter,
        this.props.brandfilter,
        this.props.memoryfilter,
        this.props.searchfilter
      ).then((data) => {
        this.props.getlistproduct(data.data);
      });
    }
  };
  Previos = () => {
    if (this.props.currenpage !== 0) {
      getlistproduct(
        this.props.currenpage,
        this.props.ramfilter,
        this.props.brandfilter,
        this.props.memoryfilter,
        this.props.searchfilter
      ).then((data) => {
        this.props.getlistproduct(data.data);
      });
    }
  };
  format2 = (n) => {
    return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  componentDidMount() {
    getlistproduct(
      1,
      this.props.ramfilter,
      this.props.brandfilter,
      this.props.memoryfilter,
      this.props.searchfilter
    ).then((response) => {
      console.log(response);
      this.setState({
        listpro: response.data.content,
      });
      this.props.getlistproduct(response.data);
    });
  }
  render() {
    console.log(this.state.listpro);
    console.log(this.props.totalpage);
    console.log(this.props.currenpage);
    let rows;
    if (this.props.listpro) {
      rows = this.props.listpro.map((row, index) => {
        const rowid = row.id;
        return (
          <div
            id="sp"
            style={{
              // margin: "30px",
              backgroundColor: "white",
              width: "260px",
              float: "left",
            }}
          >
            <NavLink
              // to={"/dienthoai/" + row.id}
              // exact
              // {...row.id}
              // style={{ backgroundColor: "blue" }}
              to={{
                pathname: "/dienthoai/" + row.id,
                state: {
                  id: rowid,
                },
              }}
            >
              <img
                src={row.image}
                alt=""
                style={{ width: "260px", height: "auto" }}
              />
              <p style={{ textAlign: "center" }}>
                {row.name}({row.ram}/{row.memory})
              </p>
              <p style={{ textAlign: "center", fontSize: "small" }}>
                <span
                  style={{
                    textDecoration: "line-through",
                    paddingRight: "5px",
                  }}
                >
                  {this.format2(row.price)} đ{" "}
                </span>

                <span> -{row.discount}%</span>
              </p>
              <p style={{ textAlign: "center", fontSize: "larger" }}>
                {this.format2(
                  Number(row.price) -
                    (Number(row.price) * Number(row.discount)) / 100
                )}{" "}
                đ
              </p>
            </NavLink>
          </div>
        );
      });
    }
    let Previos;
    let Next;
    if (this.props.currenpage === 0) {
      Previos = "";
    } else {
      Previos = (
        <button className="page-link" onClick={this.Previos}>
          Previous
        </button>
      );
    }
    if (this.props.totalpage === this.props.currenpage + 1) {
      Next = "";
    } else {
      Next = (
        <button className="page-link" onClick={this.Next}>
          Next
        </button>
      );
    }
    let page = [];
    for (let index = 0; index < this.props.totalpage; index++) {
      let button = (
        <button
          className="page-link"
          id={this.props.currenpage === index ? "buttonpage" : "abc"}
          onClick={() => {
            console.log("1");
            getlistproduct(index + 1).then((data) => {
              this.props.getlistproduct(data.data);
            });
          }}
        >
          {index + 1}
        </button>
      );
      page.push(button);
    }
    let nav = (
      <nav aria-label="Page navigation example">
        <ul className="pagination">
          <li className="page-item" id="show">
            {Previos}
            {page}
            {Next}
          </li>
        </ul>
        <ul className="pagination" id="pagination"></ul>
      </nav>
    );
    return (
      <div>
        {rows}
        <hr style={{ clear: "both" }} />
        <div className="form" style={{ textAlign: "center" }}>
          {nav}
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    totalpage: state.productreducer.totalPage,
    currenpage: state.productreducer.currenPage,
    listpro: state.productreducer.listproduct,
    // search_key: state.listfilter.search_key,
    ram: state.productreducer.ram,
    brand: state.productreducer.brand,
    memory: state.productreducer.memory,
    ramfilter: state.productreducer.ramfilter,
    brandfilter: state.productreducer.brandfilter,
    memoryfilter: state.productreducer.memoryfilter,
    searchfilter: state.productreducer.searchfilter,
  };
};
const mapDispatchToProps = (dispath) => {
  return {
    getlistproduct: (list) => {
      dispath(setlistproduct(list));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Home);
