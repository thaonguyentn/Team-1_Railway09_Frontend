import React, { Component } from "react";
import listaccount from "./Requestdata/getlistaccount";
import getlistproduct from "./Requestdata/getlistproduct";
import { connect } from "react-redux";
import { setlistproduct, setallorder } from "../Actions/index";
import { getallorder } from "../Reducers/Requestdata/getorder";
import Axios from "axios";
import slides from "./Carousel";
import AddProduct from "./AddProduct";
import Addimageslide from "./AddImageSlide";
import ReactModal from "react-modal";
class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listaccount: [],
      listproduct: [],
      prid: 0,
      isopenmodaladd: false,
      isopenmodaladdslide: false,
      isopenid: null,
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
    getallorder().then((response) => {
      this.props.setallorder(response.data);
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
            <td>{row.discount}%</td>
            <td>{row.brand}</td>
            <td>{row.category}</td>
            <td>{row.description}</td>
            <td>{row.ram}</td>
            <td>{row.memory}</td>
            <td>{row.camera}</td>
            <td>{row.color}</td>
            <td>{row.screenSize}</td>
            <td>{row.operatingSystem}</td>
            <td>{row.chip}</td>
            <td>{row.battery} mAh</td>
            <td>{row.sim}</td>
            <td>
              <button onClick={() => this.setState({ isopenid: row.id })}>
                Xem
              </button>
              <ReactModal
                style={{
                  overlay: {},
                  content: {
                    width: "600px",
                    margin: "auto",
                  },
                }}
                isOpen={this.state.isopenid === row.id}
                onRequestClose={() => this.setState({ isopenid: null })}
              >
                <img style={{ width: "535px" }} src={row.image} alt="" />
              </ReactModal>
            </td>
            <td>
              <button onClick={() => this.showimageslide(row.id)}>
                {row.listimage ? row.listimage.length : 0}
              </button>
              <ReactModal
                style={{
                  overlay: {},
                  content: { width: "650px", margin: "auto", height: "auto" },
                }}
                isOpen={this.state.prid === row.id}
                onRequestClose={() => this.setState({ prid: 0 })}
              >
                {slides(row.listimage, "600px")}
              </ReactModal>
              <button
                onClick={() => this.setState({ isopenmodaladdslide: true })}
              >
                <span class="glyphicon glyphicon-plus"></span>
              </button>
              <Addimageslide
                isopenmodaladdslide={this.state.isopenmodaladdslide}
                setisopenmodaladdslide={(data) => {
                  this.setState({ isopenmodaladdslide: data });
                }}
              />
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
    let rows3;
    if (this.props.allorder) {
      rows3 = this.props.allorder.map((row, index) => {
        return (
          <tr key={index}>
            <td>{row.totalPrice}</td>
            <td>{row.status}</td>
            <td>{row.orderDate}</td>
          </tr>
        );
      });
    }
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
              <th>Id</th>
              <th>Tên sp</th>
              <th>Giá</th>
              <th>KM</th>
              <th>Hãng</th>
              <th>Loại</th>
              <th>Mô tả</th>
              <th>Ram</th>
              <th>Bộ nhớ trong</th>
              <th>Camera</th>
              <th>Màu</th>
              <th>KT màn hình</th>
              <th>HĐH</th>
              <th>Chip</th>
              <th>Pin</th>
              <th>Loại sim hỗ trợ</th>
              <th>Avatar</th>
              <th>SlideShow</th>
              <th>Hàng trong kho</th>

              <th>Ngày nhập hàng</th>
            </tr>
          </thead>
          <tbody>{rows2}</tbody>
        </table>
        <div style={{ textAlign: "center" }}>{nav}</div>
        <h1>Quản lý đơn hàng</h1>

        <table class="table table-bordered table-hover">
          <thead>
            <tr>
              <th>Tổng giá</th>
              <th>Trạng thái</th>
              <th>Ngày đặt hàng</th>
            </tr>
          </thead>
          <tbody>{rows3}</tbody>
        </table>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    totalpage: state.productreducer.totalPage,
    currenpage: state.productreducer.currenPage,
    listpro: state.productreducer.listproduct,
    totalpageorder: state.orderreducer.totalPage,
    currenpageorder: state.orderreducer.currenPage,
    allorder: state.orderreducer.allorder,
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
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Admin);
