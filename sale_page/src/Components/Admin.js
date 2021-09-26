import React, { Component } from "react";
import listaccount from "./Requestdata/getlistaccount";
import getlistproduct from "./Requestdata/getlistproduct";
import { connect } from "react-redux";
import { setlistproduct } from "../Actions/index";
import axios from "axios";
class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listaccount: [],
      listproduct: [],
    };
  }
  Next = () => {
    console.log(this.props.currenpage + 1);
    if (this.props.totalpage !== this.props.currenpage + 1) {
      getlistproduct(this.props.currenpage + 1 + 1, "", "", "", "").then(
        (data) => {
          this.props.getlistproduct(data.data);
        }
      );
    }
  };
  Previos = () => {
    if (this.props.currenpage !== 0) {
      getlistproduct(this.props.currenpage, "", "", "", "").then((data) => {
        this.props.getlistproduct(data.data);
      });
    }
  };
  DeleteProduct = (id) => {
    let token = localStorage.getItem("token");
    axios.delete("http://localhost:8080/api/v2/products/" + id, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
  };
  componentDidMount() {
    listaccount.then(
      (response) => {
        console.log(response);
        this.setState({
          listaccount: response.data.content,
        });
      },
      (error) => {
        console.log(error);
      }
    );
    getlistproduct(1, "", "", "", "").then((response) => {
      console.log(response);
      this.props.getlistproduct(response.data);
    });
  }
  render() {
    let rows;
    if (this.state.listaccount !== []) {
      rows = this.state.listaccount.map((row, index) => {
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
    let rows2;
    if (this.props.listpro) {
      rows2 = this.props.listpro.map((row, index) => {
        return (
          <tr key={index}>
            <td>{row.id}</td>
            <td>{row.name}</td>
            <td>{row.price}</td>
            <td>{row.discount}</td>
            <td>{row.brand}</td>
            <td>{row.category}</td>
            <td>{row.description}</td>
            <td>{row.ram}</td>
            <td>{row.memory}</td>
            <td>{row.image}</td>
            <td>{row.quantity}</td>
            <td>{row.enter_date}</td>
            <td>
              <button
                type="button"
                class="btn btn-danger"
                onClick={() => {
                  this.DeleteProduct(row.id);
                }}
              >
                delete
              </button>
            </td>
          </tr>
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
            getlistproduct(index + 1, "", "", "", "").then((data) => {
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
        <h1 style={{ color: "red" }}>
          Warning! Đây là trang của Admin không phận sự miễn vào
        </h1>
        <h1>Quản lý Account</h1>

        <table class="table table-bordered table-hover">
          <thead>
            <tr>
              <th>id</th>
              <th>username</th>
              <th>email</th>
              <th>fullname</th>
              <th>gender</th>
              <th>address</th>
              <th>avatar</th>
              <th>phone_number</th>
              <th>register_date</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </table>
        <h1>Quản lý sản phẩm</h1>

        <table class="table table-bordered table-hover">
          <thead>
            <tr>
              <th>id</th>
              <th>name</th>
              <th>price</th>
              <th>discount</th>
              <th>brand</th>
              <th>category</th>
              <th>description</th>
              <th>ram</th>
              <th>memory</th>
              <th>image</th>
              <th>quantity</th>
              <th>enter_date</th>
            </tr>
          </thead>
          <tbody>{rows2}</tbody>
        </table>
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
    // search_key: state.listfilter.search_key,
  };
};
const mapDispatchToProps = (dispath) => {
  return {
    getlistproduct: (list) => {
      dispath(setlistproduct(list));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Admin);
