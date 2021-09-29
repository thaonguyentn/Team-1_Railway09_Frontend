import React, { Component } from "react";
import Modal from "react-modal";
class AddProduct extends Component {
  render() {
    return (
      <>
        <Modal
          isOpen={this.props.isopen}
          onRequestClose={() => this.props.setisopenmodaladd(false)}
          style={{
            overlay: {
              background: "none",
            },
          }}
        >
          <div style={{ textAlign: "center" }}>
            <h1>Thêm mới sản phẩm</h1>
          </div>

          <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
            <h3>Chọn ảnh đại diện</h3>
          </div>
          <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
            <p style={{ borderBottom: "1px solid" }}>
              <span>Tên sản phẩm :</span>
              <input style={{ border: "none", outline: "none" }} type="text" />
            </p>
            <p style={{ borderBottom: "1px solid" }}>
              <span>Giá bán trước khuyễn mãi :</span>
              <input style={{ border: "none", outline: "none" }} type="text" />
            </p>
            <p style={{ borderBottom: "1px solid" }}>
              <span>Tỉ lệ giảm giá :</span>
              <input style={{ border: "none", outline: "none" }} type="text" />
            </p>
            <p style={{ borderBottom: "1px solid" }}>
              <span>Giá bán sau khuyến mãi :</span>
              <input style={{ border: "none", outline: "none" }} type="text" />
            </p>
            <p style={{ borderBottom: "1px solid" }}>
              <span>Số lượng mặt hàng trong kho :</span>
              <input style={{ border: "none", outline: "none" }} type="text" />
            </p>
          </div>
          <div
            class="col-xs-4 col-sm-4 col-md-4 col-lg-4"
            style={{ textAlign: "center", fontSize: "30px" }}
          >
            <p>Chọn ảnh SlideShow</p>
          </div>
        </Modal>
      </>
    );
  }
}

export default AddProduct;
