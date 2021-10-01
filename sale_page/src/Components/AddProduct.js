import React, { Component } from "react";
import Modal from "react-modal";
class AddProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      avatar: "",
      imageslide: "",
      slide: [],
    };
  }
  render() {
    let slide;
    if (this.state.slide !== []) {
      slide = this.state.slide.map((element, index) => {
        return (
          <span style={{ display: "inline-block" }}>
            <img
              src={element}
              alt="no image"
              style={{ width: "100px", margin: "3px" }}
            />
            <a
              onClick={() => {
                let list = this.state.slide;
                let index = list.findIndex((row) => row === element);
                if (index !== -1) {
                  list.splice(index, 1);
                  this.setState({
                    slide: list,
                  });
                }
              }}
              style={{ position: "relative", bottom: "25px", right: "5px" }}
            >
              <span class="glyphicon glyphicon-remove-sign"></span>
            </a>
          </span>
        );
      });
    }
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
          <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
            <h3>Chọn ảnh đại diện</h3>
            <input
              type="text"
              onChange={(event) =>
                this.setState({ avatar: event.target.value })
              }
            />
            <hr />
            <img
              style={{ width: "200px" }}
              src={this.state.avatar}
              alt="no image"
            />
          </div>
          <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
            <h1>Thêm mới sản phẩm</h1>
            <p
              style={{
                borderBottom: "1px solid",

                marginBottom: "10px",
              }}
            >
              <span>Tên sản phẩm :</span>
              <br />
              <input style={{ border: "none", outline: "none" }} type="text" />
            </p>

            <p
              style={{
                borderBottom: "1px solid",

                marginBottom: "10px",
              }}
            >
              <span>Giá bán trước khuyễn mãi :</span>
              <br />
              <input
                style={{ border: "none", outline: "none" }}
                type="number"
              />
            </p>
            <p
              style={{
                borderBottom: "1px solid",

                marginBottom: "10px",
              }}
            >
              <span>Tỉ lệ giảm giá :</span>
              <br />
              <input
                style={{ border: "none", outline: "none" }}
                type="number"
              />
            </p>
            <p
              style={{
                borderBottom: "1px solid",

                marginBottom: "10px",
              }}
            >
              <span>Giá bán sau khuyến mãi :</span>
              <br />
              <input
                style={{ border: "none", outline: "none" }}
                type="number"
              />
            </p>
            <p
              style={{
                borderBottom: "1px solid",
                marginBottom: "10px",
              }}
            >
              <span>Số lượng mặt hàng trong kho :</span>
              <br />
              <input
                style={{ border: "none", outline: "none" }}
                type="number"
              />
            </p>
            <p
              style={{
                borderBottom: "1px solid",

                marginBottom: "10px",
              }}
            >
              <span>Ram :</span>
              <br />
              <select style={{ border: "none", outline: "none" }}>
                <option value="" key="">
                  --Select--
                </option>
                <option value="" key="">
                  2GB
                </option>{" "}
                <option value="" key="">
                  4GB
                </option>
              </select>
              {/* <input style={{ border: "none", outline: "none" }} type="text" /> */}
            </p>
            <p
              style={{
                borderBottom: "1px solid",

                marginBottom: "10px",
              }}
            >
              <span>Bộ nhớ trong :</span>
              <br />
              <select style={{ border: "none", outline: "none" }}>
                <option value="" key="">
                  --Select--
                </option>
                <option value="" key="">
                  4GB
                </option>{" "}
                <option value="" key="">
                  8GB
                </option>
              </select>
            </p>
            <p
              style={{
                borderBottom: "1px solid",

                marginBottom: "10px",
              }}
            >
              <span>Camera trước,sau :</span>
              <br />
              <input style={{ border: "none", outline: "none" }} type="text" />
            </p>
            <p
              style={{
                borderBottom: "1px solid",

                marginBottom: "10px",
              }}
            >
              <span>Màu :</span>
              <br />
              <input style={{ border: "none", outline: "none" }} type="text" />
            </p>
            <p
              style={{
                borderBottom: "1px solid",

                marginBottom: "10px",
              }}
            >
              <span>Kích thước màn hình :</span>
              <br />
              <input style={{ border: "none", outline: "none" }} type="text" />
            </p>
            <p
              style={{
                borderBottom: "1px solid",

                marginBottom: "10px",
              }}
            >
              <span>Hệ điều hành :</span>
              <br />
              <select style={{ border: "none", outline: "none" }}>
                <option value="" key="">
                  --Select--
                </option>
                <option value="" key="">
                  Android
                </option>{" "}
                <option value="" key="">
                  iOS
                </option>
              </select>
            </p>
            <p
              style={{
                borderBottom: "1px solid",
                marginBottom: "10px",
              }}
            >
              <span>Chip :</span>
              <br />
              <input style={{ border: "none", outline: "none" }} type="text" />
            </p>
            <p
              style={{
                borderBottom: "1px solid",
                marginBottom: "10px",
              }}
            >
              <span>Dung lượng pin :</span>
              <br />
              <input
                style={{ border: "none", outline: "none" }}
                type="number"
              />{" "}
              <span>mAh</span>
            </p>
            <p
              style={{
                borderBottom: "1px solid",
                marginBottom: "10px",
              }}
            >
              <span>Loại SIM được hỗ trợ :</span>
              <br />
              <select style={{ border: "none", outline: "none" }}>
                <option value="" key="">
                  --Select--
                </option>
                <option value="" key="">
                  2G
                </option>{" "}
                <option value="" key="">
                  3G
                </option>
                <option value="" key="">
                  4G
                </option>
                <option value="" key="">
                  5G
                </option>
              </select>
            </p>
          </div>
          <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
            <h3>Chọn ảnh SlideShow</h3>
            <input
              value={this.state.imageslide}
              type="text"
              onChange={(event) => {
                this.setState({
                  imageslide: event.target.value,
                });
              }}
            />
            <button
              onClick={() => {
                let list = this.state.slide;
                list.push(this.state.imageslide);
                this.setState({
                  slide: list,
                  imageslide: "",
                });
              }}
            >
              add
            </button>
            <br />
            <img
              style={{ width: "400px" }}
              src={this.state.imageslide}
              alt="no image"
            />
            <hr />
            {slide}
          </div>
        </Modal>
      </>
    );
  }
}

export default AddProduct;
