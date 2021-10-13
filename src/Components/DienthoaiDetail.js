import React, { Component } from "react";
import { setcart, setproductimages } from "../Actions";
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
    if (user_login_infor && this.state.product !== null && user_login_infor) {
      let productid = this.state.product.id;
      let accountid = user_login_infor.id;
      addcartdetail(productid, accountid).then((response) => {
        getcart(accountid).then((response) =>
          this.props.setcart(response.data)
        );
      });
    }
  };
  componentDidMount() {
    const id = this.props.location.state.id;
    getproductbyid(id).then((response) => {
      this.setState({
        product: response.data,
      });
      this.props.setproductimages(response.data.listResponse);
    });
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
        <div
          style={{
            marginLeft: "30px",
            backgroundColor: "white",
            width: "500px",
            float: "left",
          }}
        >
          <h3>Thông tin chi tiết sản phẩm :</h3>
          <p
            style={{
              fontSize: "20px",
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
              fontSize: "20px",
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
              fontSize: "20px",
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
              fontSize: "20px",
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
              fontSize: "20px",
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
              fontSize: "20px",
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
              fontSize: "20px",
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
              fontSize: "20px",
              paddingBlock: "5px",
              margin: 0,
              position: "relative",
            }}
          >
            Dung lượng pin
            <span style={{ position: "absolute", left: "170px" }}>
              : {pr.battery}
              {" mAh"}
            </span>
          </p>
          <p
            style={{
              fontSize: "20px",
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
              fontSize: "20px",
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

          <p style={{ fontSize: "25px", position: "relative" }}>
            Giá khuyến mãi :{" "}
            <span
              style={{
                color: "red",
                position: "absolute",
                bottom: "25px",
                fontSize: "12px",
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
            style={{ marginRight: "20px" }}
          >
            Mua ngay
          </button>
          <button
            onClick={this.addCartdetail}
            type="button"
            class="btn btn-success"
          >
            Thêm vào giỏ hàng
          </button>
        </div>,
      ];
    }
    return (
      <div>
        {prname}
        {slideshow}
        {row}
        <hr style={{ clear: "both" }} />
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    images: state.productreducer.images,
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
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(DienthoaiDetail);
