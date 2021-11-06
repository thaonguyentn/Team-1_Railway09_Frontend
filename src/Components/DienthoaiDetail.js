import React, { Component } from "react";
import { setcart, setloading, setproductimages } from "../Actions";
import { connect } from "react-redux";
import slides from "./Carousel";
import { getcart, getproductbyid, addcartdetail } from "../Requestdata/CallAPI";
class DienthoaiDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product: null,
    };
  }
  format2 = (n) => {
    return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  addCartdetail = () => {
    const user_login_infor = JSON.parse(
      localStorage.getItem("user_login_infor")
    );
    if (user_login_infor && this.state.product !== null) {
      this.props.setloading(true);
      let productid = this.state.product.id;
      let accountid = user_login_infor.id;
      addcartdetail(productid, accountid)
        .then(() => {
          getcart(accountid).then((response) =>
            this.props.setcart(response.data)
          );
        })
        .catch((error) => {
          alert(error);
        })
        .finally(() => this.props.setloading(false));
    } else {
      alert("bạn chưa đăng nhập");
    }
  };
  componentDidMount() {
    this.props.setloading(true);
    const id = this.props.location.state.id;
    getproductbyid(id)
      .then((response) => {
        this.setState({
          product: response.data,
        });
        this.props.setproductimages(response.data.listResponse);
      })
      .finally(() => this.props.setloading(false));
  }
  render() {
    let slideshow;
    if (this.props.images) {
      slideshow = slides(this.props.images, "800px");
    } else {
      slideshow = "";
    }
    let pr = this.state.product;
    let row;
    let prname;
    if (pr !== null) {
      prname = (
        <div style={{ marginLeft: "20px" }}>
          <h1>
            Điện thoại {pr.name} {pr.memory}
          </h1>
        </div>
      );
      row = [
        <div id="phonedetail">
          <span style={{ fontSize: "3rem" }}>
            Thông tin chi tiết sản phẩm :
          </span>
          <p
            style={{
              fontSize: "1.5rem",
              backgroundColor: "bisque",
              paddingBlock: "5px",
              margin: 0,
              position: "relative",
            }}
          >
            Dung lượng Ram{" "}
            <span style={{ position: "absolute", left: "170px" }}>
              : {pr.ram}
            </span>
          </p>
          <p
            style={{
              fontSize: "1.5rem",
              paddingBlock: "5px",
              margin: 0,
              position: "relative",
            }}
          >
            Bộ nhớ trong
            <span style={{ position: "absolute", left: "170px" }}>
              : {pr.memory}
            </span>
          </p>
          <p
            style={{
              fontSize: "1.5rem",
              backgroundColor: "bisque",
              paddingBlock: "5px",
              margin: 0,
              position: "relative",
            }}
          >
            Hãng sản xuất{" "}
            <span
              style={{
                position: "absolute",
                left: "170px",
              }}
            >
              : {pr.brand}
            </span>
          </p>
          <p
            style={{
              fontSize: "1.5rem",
              paddingBlock: "5px",
              margin: 0,
              position: "relative",
            }}
          >
            Camera
            <span style={{ position: "absolute", left: "170px" }}>
              : {pr.camera}
            </span>
          </p>
          <p
            style={{
              fontSize: "1.5rem",
              backgroundColor: "bisque",
              paddingBlock: "5px",
              margin: 0,
              position: "relative",
            }}
          >
            Màu
            <span style={{ position: "absolute", left: "170px" }}>
              : {pr.color}
            </span>
          </p>
          <p
            style={{
              fontSize: "1.5rem",
              paddingBlock: "5px",
              margin: 0,
              position: "relative",
            }}
          >
            Kích cỡ màn hình{" "}
            <span style={{ position: "absolute", left: "170px" }}>
              : {pr.screenSize}
            </span>
          </p>
          <p
            style={{
              fontSize: "1.5rem",
              backgroundColor: "bisque",
              paddingBlock: "5px",
              margin: 0,
              position: "relative",
            }}
          >
            Hệ điều hành{" "}
            <span style={{ position: "absolute", left: "170px" }}>
              : {pr.operatingSystem}
            </span>
          </p>
          <p
            style={{
              fontSize: "1.5rem",
              paddingBlock: "5px",
              margin: 0,
              position: "relative",
            }}
          >
            Dung lượng pin
            <span style={{ position: "absolute", left: "170px" }}>
              : {pr.battery}
            </span>
          </p>
          <p
            style={{
              fontSize: "1.5rem",
              backgroundColor: "bisque",
              paddingBlock: "5px",
              margin: 0,
              position: "relative",
            }}
          >
            Chip xử lý{" "}
            <span style={{ position: "absolute", left: "170px" }}>
              : {pr.chip}
            </span>
          </p>
          <p
            style={{
              fontSize: "1.5rem",
              paddingBlock: "5px",
              margin: 0,
              position: "relative",
            }}
          >
            Loại sim hỗ trợ{" "}
            <span style={{ position: "absolute", left: "170px" }}>
              : {pr.sim}
            </span>
          </p>

          <p
            style={{
              fontSize: "1.7rem",
              position: "relative",
              marginTop: "3px",
            }}
          >
            Giá khuyến mãi :{" "}
            <span
              style={{
                color: "red",
                position: "absolute",
                bottom: "1.5rem",
                fontSize: "1rem",
              }}
            >
              <span
                style={{
                  textDecoration: "line-through",
                  paddingRight: "5px",
                }}
              >
                {this.format2(pr.price)} đ{" "}
              </span>
              <span> -{pr.discount}%</span>
            </span>
            {this.format2(
              Number(pr.price) - (Number(pr.price) * Number(pr.discount)) / 100
            )}{" "}
            đ
          </p>
          <h4>Hàng có sẵn : {pr.quantity} sản phẩm</h4>
          <button
            type="button"
            class="btn btn-warning"
            style={{
              marginRight: "4%",
              width: "48%",
              fontSize: "medium",
              height: "40px",
            }}
          >
            Mua ngay
          </button>
          <button
            onClick={this.addCartdetail}
            type="button"
            class="btn btn-success"
            style={{ width: "48%", fontSize: "medium", height: "40px" }}
            disabled={this.props.loading}
          >
            Thêm vào giỏ hàng
          </button>
        </div>,
      ];
    }
    return (
      <div>
        {prname}
        <div id="phoneslide">{slideshow}</div>
        {row}
        <hr style={{ clear: "both" }} />
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    images: state.productreducer.images,
    loading: state.productreducer.loading,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    setproductimages: (images) => {
      dispatch(setproductimages(images));
    },
    setcart: (cart) => {
      dispatch(setcart(cart));
    },
    setloading: (loading) => {
      dispatch(setloading(loading));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(DienthoaiDetail);
