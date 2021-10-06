import React, { Component } from "react";
import getlistaccount from "./Requestdata/getlistaccount";
import getlistproduct from "./Requestdata/getlistproduct";
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
import { getallorder } from "../Reducers/Requestdata/getorder";
import Axios from "axios";
import slides from "./Carousel";
import AddProduct from "./AddProduct";
import Addimageslide from "./AddImageSlide";
import ReactModal from "react-modal";
import { Redirect } from "react-router";
class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      prid: 0,
      isopenmodaladd: false,
      isopenmodaladdslide: false,
      isopenid: null,
      isavtiveclass: 1,
    };
  }
  logout = () => {
    console.log("kkkkkk");
    localStorage.removeItem("role");
    localStorage.removeItem("token");
    localStorage.removeItem("user_login");
    localStorage.removeItem("user_login_infor");
    this.props.setcart(null);
    this.props.setcartdetail(null);
    this.props.setprofile(null);
    this.props.setlogin(false);
  };
  Nextproduct = () => {
    console.log(this.props.currenpageproduct + 1);
    if (this.props.totalpageproduct !== this.props.currenpageproduct + 1) {
      getlistproduct(this.props.currenpageproduct + 1 + 1, "", "", "", "").then(
        (data) => {
          this.props.getlistproduct(data.data);
        }
      );
    }
  };
  Previosproduct = () => {
    if (this.props.currenpageproduct !== 0) {
      getlistproduct(this.props.currenpageproduct, "", "", "", "").then(
        (data) => {
          this.props.getlistproduct(data.data);
        }
      );
    }
  };
  Nextaccount = () => {
    console.log(this.props.currenpageaccount + 1);
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
  }
  componentWillUnmount() {
    console.log(this.props);
    this.props.history.replace("/");
  }
  render() {
    let rows;
    if (this.props.listaccount) {
      rows = this.props.listaccount.map((row, index) => {
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
    let Previosaccount;
    let Nextaccount;
    if (this.props.currenpageaccount === 0) {
      Previosaccount = "";
    } else {
      Previosaccount = (
        <button className="page-link" onClick={this.Previosaccount}>
          Previous
        </button>
      );
    }
    if (this.props.totalpageaccount === this.props.currenpageaccount + 1) {
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
                {row.listResponse ? row.listResponse.length : 0}
              </button>
              <ReactModal
                style={{
                  overlay: {},
                  content: { width: "650px", margin: "auto", height: "auto" },
                }}
                isOpen={this.state.prid === row.id}
                onRequestClose={() => this.setState({ prid: 0 })}
              >
                {slides(row.listResponse, "600px")}
              </ReactModal>
              <button
                onClick={() => this.setState({ isopenmodaladdslide: true })}
              >
                <span className="glyphicon glyphicon-plus"></span>
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
                className="btn btn-danger"
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
    let Previosproduct;
    let Nextproduct;
    if (this.props.currenpageproduct === 0) {
      Previosproduct = "";
    } else {
      Previosproduct = (
        <button className="page-link" onClick={this.Previosproduct}>
          Previous
        </button>
      );
    }
    if (this.props.totalpageproduct === this.props.currenpageproduct + 1) {
      Nextproduct = "";
    } else {
      Nextproduct = (
        <button className="page-link" onClick={this.Nextproduct}>
          Next
        </button>
      );
    }
    let page = [];
    for (let index = 0; index < this.props.totalpageproduct; index++) {
      let button = (
        <button
          className="page-link"
          id={this.props.currenpageproduct === index ? "buttonpage" : "abc"}
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
            {Previosproduct}
            {page}
            {Nextproduct}
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
    let Previosorder;
    let Nextorder;
    if (this.props.currenpageorder === 0) {
      Previosorder = "";
    } else {
      Previosorder = (
        <button className="page-link" onClick={this.Previosorder}>
          Previous
        </button>
      );
    }
    if (this.props.totalpageorder === this.props.currenpageorder + 1) {
      Nextproduct = "";
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
      <div>
        <div style={{}}>
          <button
            style={{ width: "100%" }}
            type="button"
            className="btn btn-primary"
            onClick={this.logout}
          >
            Đăng xuất
          </button>
        </div>
        <marquee direction="left">
          <h1 style={{ color: "red" }}>
            Warning! Đây là trang của Admin không phận sự miễn vào !
          </h1>
        </marquee>
        <ul className="navadmin">
          <li
            className={
              this.state.isavtiveclass === 1 ? "liactive" : "linoactive"
            }
          >
            <a onClick={() => this.setState({ isavtiveclass: 1 })}>
              <h1>Quản lý Account</h1>
            </a>
          </li>
          <li
            className={
              this.state.isavtiveclass === 2 ? "liactive" : "linoactive"
            }
          >
            <a onClick={() => this.setState({ isavtiveclass: 2 })}>
              <h1>Quản lý sản phẩm</h1>
            </a>
          </li>
          <li
            className={
              this.state.isavtiveclass === 3 ? "liactive" : "linoactive"
            }
          >
            <a onClick={() => this.setState({ isavtiveclass: 3 })}>
              <h1>Quản lý đơn hàng</h1>
            </a>
          </li>
        </ul>

        <div
          className={
            this.state.isavtiveclass === 1 ? "navactive" : "navnoactive"
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
        <div
          className={
            this.state.isavtiveclass === 2 ? "navactive" : "navnoactive"
          }
        >
          <div style={{ fontSize: "30px" }}>
            <button
              onClick={() => {
                this.setState({ isopenmodaladd: true });
              }}
              style={{ backgroundColor: "aqua" }}
            >
              <span className="glyphicon glyphicon-plus"></span>{" "}
              <span>Thêm Sản Phẩm Mới</span>
            </button>
            <AddProduct
              isopen={this.state.isopenmodaladd}
              setisopenmodaladd={(data) =>
                this.setState({ isopenmodaladd: data })
              }
            />
          </div>
          <table className="table table-bordered table-hover">
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
          </table>{" "}
          <div style={{ textAlign: "center" }}>{nav}</div>
        </div>
        <div
          className={
            this.state.isavtiveclass === 3 ? "navactive" : "navnoactive"
          }
        >
          <table className="table table-bordered table-hover">
            <thead>
              <tr>
                <th>Tổng giá</th>
                <th>Trạng thái</th>
                <th>Ngày đặt hàng</th>
              </tr>
            </thead>
            <tbody>{rows3}</tbody>
          </table>
          <div style={{ textAlign: "center" }}>{navorder}</div>
        </div>
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
export default connect(mapStateToProps, mapDispatchToProps)(Admin);
