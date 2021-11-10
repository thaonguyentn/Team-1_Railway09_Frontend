import React, { Component } from "react";
import { connect } from "react-redux";
import { NavLink, Switch, Route } from "react-router-dom";
import {
  getbrand,
  getmemory,
  getram,
  getlistproduct,
} from "../Requestdata/CallAPI";
import {
  setlistproduct,
  setbrand,
  setmemory,
  setram,
  setramfilter,
  setbrandfilter,
  setmemoryfilter,
  setloading,
} from "../Actions/index";
class Laptop extends Component {
  format2 = (n) => {
    return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  componentDidMount() {
    this.props.setloading(true);
    getlistproduct(
      "PK",
      1,
      this.props.ramfilter,
      this.props.brandfilter,
      this.props.memoryfilter,
      this.props.searchfilter
    )
      .then((response) => {
        this.props.getlistproduct(response.data);
      })
      .finally(() => this.props.setloading(false));
  }
  render() {
    let rows;
    if (this.props.listpro && this.props.loading === false) {
      rows = this.props.listpro.map((row, index) => {
        const rowid = row.id;
        return (
          <div id="sp">
            <NavLink
              style={{
                textDecoration: "none",
              }}
              to={{
                pathname: "/phukien/" + row.id,
                state: {
                  id: rowid,
                },
              }}
            >
              <img src={row.image} alt="" />
              <p style={{ textAlign: "center" }}>
                {row.name}({row.ram}/{row.memory})
              </p>
              <p style={{ textAlign: "center", fontSize: "1rem" }}>
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
              <p style={{ textAlign: "center", fontSize: "1.5rem" }}>
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
    return (
      <div>
        {rows}
        <hr style={{ clear: "both" }} />
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  console.log(state);
  return {
    totalpage: state.productreducer.totalPage,
    currenpage: state.productreducer.currenPage,
    listpro: state.productreducer.listproduct,
    ram: state.productreducer.ram,
    brand: state.productreducer.brand,
    memory: state.productreducer.memory,
    ramfilter: state.productreducer.ramfilter,
    brandfilter: state.productreducer.brandfilter,
    memoryfilter: state.productreducer.memoryfilter,
    searchfilter: state.productreducer.searchfilter,
    loading: state.productreducer.loading,
  };
};
const mapDispatchToProps = (dispath) => {
  return {
    getlistproduct: (list) => {
      dispath(setlistproduct(list));
    },
    setram: (ram) => {
      dispath(setram(ram));
    },
    setbrand: (brand) => {
      dispath(setbrand(brand));
    },
    setmemory: (memory) => {
      dispath(setmemory(memory));
    },
    setramfilter: (ram) => {
      dispath(setramfilter(ram));
    },
    setbrandfilter: (brand) => {
      dispath(setbrandfilter(brand));
    },
    setmemoryfilter: (memory) => {
      dispath(setmemoryfilter(memory));
    },
    setloading: (loading) => {
      dispath(setloading(loading));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Laptop);
