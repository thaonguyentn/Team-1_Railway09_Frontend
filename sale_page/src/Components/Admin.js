import React, { Component } from "react";
import listaccount from "./Requestdata/getlistaccount";
import getlistproduct from "./Requestdata/getlistproduct";
import { connect } from "react-redux";
import { setlistproduct } from "../Actions/index";
import Axios from "axios";
import slides from "./Carousel";
import AddProduct from "./AddProduct";
class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listaccount: [],
      listproduct: [],
      prid: 0,
      isopenmodaladd: false,
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
    Axios.delete("http://localhost:8080/api/v2/products/" + id, {
      headers: {
        Authorization: "Bearer " + token,
      },
    }).then(() => {
      getlistproduct(1, "", "", "", "").then((response) => {
        console.log(response);
        this.props.getlistproduct(response.data);
      });
    });
  };
  showimageslide = (id) => {
    if (id === this.state.prid) {
      this.setState({
        prid: 0,
      });
    } else {
      this.setState({
        prid: id,
      });
    }
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
            <td>
              <input
                size={row.id.toString().length}
                style={{ border: "none", outline: "none", background: "none" }}
                type="text"
                defaultValue={row.id}
              />
            </td>
            <td>
              <input
                size={row.username.toString().length}
                style={{ border: "none", outline: "none", background: "none" }}
                type="text"
                defaultValue={row.username}
              />
            </td>
            <td>
              <input
                size={row.email.toString().length}
                style={{ border: "none", outline: "none", background: "none" }}
                type="text"
                defaultValue={row.email}
              />
            </td>
            <td>
              <input
                size={row.fullname.toString().length}
                style={{ border: "none", outline: "none", background: "none" }}
                type="text"
                defaultValue={row.fullname}
              />
            </td>
            <td>
              <input
                size={row.gender.toString().length}
                style={{ border: "none", outline: "none", background: "none" }}
                type="text"
                defaultValue={row.gender}
              />
            </td>
            <td>
              <input
                size={5}
                style={{ border: "none", outline: "none", background: "none" }}
                type="text"
                defaultValue={row.address}
              />
            </td>
            <td>
              <input
                size={5}
                style={{ border: "none", outline: "none", background: "none" }}
                type="text"
                defaultValue={row.avatar}
              />
            </td>
            <td>
              <input
                size={row.phone_number.toString().length}
                style={{ border: "none", outline: "none", background: "none" }}
                type="text"
                defaultValue={row.phone_number}
              />
            </td>
            <td>
              <input
                size={row.register_date.toString().length}
                style={{ border: "none", outline: "none", background: "none" }}
                type="text"
                defaultValue={row.register_date}
              />
            </td>
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
            <td>
              <button onClick={() => this.showimageslide(row.id)}>
                {row.listimage.length}
              </button>
              <div
                style={{
                  position: "absolute",
                }}
              >
                <div
                  className="showimage"
                  style={
                    this.state.prid === row.id
                      ? { display: "inline-block" }
                      : { display: "none" }
                  }
                >
                  <div>{slides(row.listimage, "400px")}</div>
                </div>
              </div>
            </td>
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
        <div style={{ fontSize: "30px", float: "right" }}>
          <button
            onClick={() => {
              this.setState({ isopenmodaladd: true });
            }}
          >
            <span class="glyphicon glyphicon-plus"></span>
          </button>
          <AddProduct
            isopen={this.state.isopenmodaladd}
            setisopenmodaladd={(data) =>
              this.setState({ isopenmodaladd: data })
            }
          />
          <button>
            <span class="glyphicon glyphicon-trash"></span>
          </button>
        </div>
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
              <th>imageslide</th>
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
