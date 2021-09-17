import React, { Component } from "react";
import Axios from "axios";
import { NavLink, Switch, Route } from "react-router-dom";
import DienthoaiDetail from "./DienthoaiDetail";
class Dienthoai extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listpro: [],
    };
  }
  format2 = (n) => {
    return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  componentDidMount() {
    let token = localStorage.getItem("token");
    console.log(token);
    Axios.get("http://localhost:8080/api/v2/products/", {
      auth: {
        username: "admin",
        password: "123456",
      },
    }).then(
      (response) => {
        console.log(response);
        let listphone = [];
        response.data.content.forEach((element) => {
          if (element.category === "Phone") {
            listphone.push(element);
          }
        });
        this.setState({
          listpro: listphone,
        });
      },
      (error) => {
        console.log(error);
      }
    );
  }
  render() {
    console.log(this.state.listpro);
    let rows;
    if (this.state.listpro.length !== 0) {
      rows = this.state.listpro.map((row, index) => {
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
                src={require("../Images/dienthoai/" + row.image).default}
                alt=""
                style={{ width: "260px", height: "auto" }}
              />
              <p style={{ textAlign: "center" }}>
                {row.name}({row.ram}/{row.memory})
              </p>
              <p style={{ textAlign: "center", fontSize: "larger" }}>
                {this.format2(row.price)} đ
              </p>
            </NavLink>
          </div>
        );
      });
    }
    return (
      <div>
        <div style={{ marginBottom: "20px" }}>
          <span style={{ fontSize: "larger" }}>Bộ lọc</span>
          <select
            style={{
              // borderColor: "rgba(1,1,1,0)",
              // outlineColor: "rgba(1,1,1,0)",
              marginLeft: "50px",
              borderRadius: "5px",
            }}
          >
            <option value="" key="">
              Hãng
            </option>
            <option value="" key="">
              Apple
            </option>
            <option value="" key="">
              Xiaomi
            </option>
            <option value="" key="">
              Samsung
            </option>
            <option value="" key="">
              Lenovo
            </option>
            <option value="" key="">
              Vivo
            </option>
            <option value="" key="">
              Oppo
            </option>
          </select>
          <select
            style={{
              // borderColor: "rgba(1,1,1,0)",
              // outlineColor: "rgba(1,1,1,0)",
              marginLeft: "50px",
              borderRadius: "5px",
            }}
          >
            <option value="" key="">
              Bộ nhớ trong
            </option>
            <option value="" key="">
              16GB
            </option>
            <option value="" key="">
              32GB
            </option>
            <option value="" key="">
              64GB
            </option>
            <option value="" key="">
              128GB
            </option>
            <option value="" key="">
              512GB
            </option>
          </select>
          <select
            style={{
              // borderColor: "rgba(1,1,1,0)",
              // outlineColor: "rgba(1,1,1,0)",
              marginLeft: "50px",
              borderRadius: "5px",
            }}
          >
            <option value="" key="">
              Ram
            </option>
            <option value="" key="">
              2GB
            </option>
            <option value="" key="">
              4GB
            </option>
            <option value="" key="">
              6GB
            </option>
            <option value="" key="">
              8GB
            </option>
            <option value="" key="">
              10GB
            </option>
          </select>
          <select
            style={{
              // borderColor: "rgba(1,1,1,0)",
              // outlineColor: "rgba(1,1,1,0)",
              marginLeft: "50px",
              borderRadius: "5px",
            }}
          >
            <option value="" key="">
              Giá
            </option>
            <option value="" key="">
              Từ 1-2 triệu
            </option>
            <option value="" key="">
              Từ 2-4 triệu
            </option>
            <option value="" key="">
              Từ 4-8 triệu
            </option>
            <option value="" key="">
              Từ 8-12 triệu
            </option>
            <option value="" key="">
              Từ 12 triệu
            </option>
          </select>
        </div>
        {rows}
        <hr style={{ clear: "both" }} />
      </div>
    );
  }
}

export default Dienthoai;
