import React, { Component, memo } from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
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
} from "../Actions/index";
class Dienthoai extends Component {
  Next = () => {
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
  handleChange = (event) => {
    switch (event.target.name) {
      case "brand":
        this.props.setbrandfilter(event.target.value);
        getlistproduct(
          this.props.currenpage,
          this.props.ramfilter,
          event.target.value,
          this.props.memoryfilter,
          this.props.searchfilter
        ).then((data) => {
          this.props.getlistproduct(data.data);
        });
        break;
      case "memory":
        this.props.setmemoryfilter(event.target.value);
        getlistproduct(
          this.props.currenpage,
          this.props.ramfilter,
          this.props.brandfilter,
          event.target.value,
          this.props.searchfilter
        ).then((data) => {
          this.props.getlistproduct(data.data);
        });
        break;
      case "ram":
        this.props.setramfilter(event.target.value);
        getlistproduct(
          this.props.currenpage,
          event.target.value,
          this.props.brandfilter,
          this.props.memoryfilter,
          this.props.searchfilter
        ).then((data) => {
          this.props.getlistproduct(data.data);
        });
        break;
      default:
        break;
    }
  };
  componentDidMount() {
    getlistproduct(
      1,
      this.props.ramfilter,
      this.props.brandfilter,
      this.props.memoryfilter,
      this.props.searchfilter
    ).then((response) => {
      let listphone = [];
      response.data.content.forEach((element) => {
        if (element.category === "Phone") {
          listphone.push(element);
        }
      });
      this.props.getlistproduct(response.data);
    });
    getbrand().then((response) => {
      this.props.setbrand(response.data);
    });
    getmemory().then((response) => {
      this.props.setmemory(response.data);
    });
    getram().then((response) => {
      this.props.setram(response.data);
    });
  }
  componentWillUnmount() {
    this.props.setbrandfilter("");
    this.props.setmemoryfilter("");
    this.props.setramfilter("");
  }
  render() {
    let rows;
    if (this.props.listpro) {
      rows = this.props.listpro.map((row, index) => {
        const rowid = row.id;
        return (
          <div
            id="sp"
            style={{
              backgroundColor: "white",
              width: "260px",
              float: "left",
            }}
          >
            <NavLink
              style={{
                textDecoration: "none",
              }}
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
            getlistproduct(
              index + 1,
              this.props.ramfilter,
              this.props.brandfilter,
              this.props.memoryfilter,
              this.props.searchfilter
            ).then((data) => {
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
    let brand;
    if (this.props.brand) {
      brand = this.props.brand.map((row, index) => {
        return (
          <option key={index} value={row.brandName}>
            {row.brandName}
          </option>
        );
      });
    }
    let ram;
    if (this.props.ram) {
      ram = this.props.ram.map((row, index) => {
        return (
          <option key={index} value={row.ramName}>
            {row.ramName}
          </option>
        );
      });
    }
    let memory;
    if (this.props.memory) {
      memory = this.props.memory.map((row, index) => {
        return (
          <option key={index} value={row.memoryName}>
            {row.memoryName}
          </option>
        );
      });
    }
    return (
      <div>
        <div style={{ marginBottom: "20px" }}>
          <span style={{ fontSize: "larger" }}>Bộ lọc</span>
          <span
            style={{
              marginLeft: "50px",
              // borderRadius: "5px",
              marginRight: "5px",
            }}
          >
            Hãng :
          </span>
          <select name="brand" onChange={this.handleChange}>
            <option value="">Tất cả</option>
            {brand}
          </select>
          <span
            style={{
              marginLeft: "50px",
              marginRight: "5px",
            }}
          >
            Bộ nhớ trong :
          </span>
          <select name="memory" onChange={this.handleChange}>
            <option value="">Tất cả</option>
            {memory}
          </select>
          <span
            style={{
              marginLeft: "50px",
              marginRight: "5px",
            }}
          >
            Ram :
          </span>
          <select name="ram" onChange={this.handleChange}>
            <label>ram</label>
            <option value="">Tất cả</option>
            {ram}
          </select>
        </div>
        {rows}
        <hr style={{ clear: "both" }} />
        <div style={{ textAlign: "center" }}>{nav}</div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
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
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Dienthoai);
