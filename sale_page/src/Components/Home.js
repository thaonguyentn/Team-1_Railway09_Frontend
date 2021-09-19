import React, { Component } from "react";
import Axios from "axios";
import { NavLink, Switch, Route } from "react-router-dom";
import DienthoaiDetail from "./DienthoaiDetail";
class Home extends Component {
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
    Axios.get("http://localhost:8080/api/v2/products/").then(
      (response) => {
        console.log(response);
        this.setState({
          listpro: response.data.content,
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
        {rows}
        <hr style={{ clear: "both" }} />
      </div>
    );
  }
}

export default Home;
