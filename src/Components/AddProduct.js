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
    return (
      <>
        <Modal
          isOpen={this.props.isopen}
          onRequestClose={() => this.props.setisopenmodaladd(false)}
          style={{
            overlay: {
              background: "none",
            },
            content: {
              backgroundColor: "aquamarine",
            },
          }}
        >
          <div style={{ textAlign: "center" }}>
            <h1>Thêm mới sản phẩm</h1>
          </div>
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
            <p
              style={{
                borderBottom: "1px solid",

                marginBottom: "10px",
              }}
            >
              <span>Tên sản phẩm :</span>
              <br />
              <input
                style={{
                  border: "none",
                  outline: "none",
                  width: "100%",
                  backgroundColor: "aquamarine",
                }}
                type="text"
              />
            </p>
            <p
              style={{
                borderBottom: "1px solid",

                marginBottom: "10px",
              }}
            >
              <span>Hãng :</span>
              <br />
              <input
                style={{
                  border: "none",
                  outline: "none",
                  width: "100%",
                  backgroundColor: "aquamarine",
                }}
                type="text"
              />
            </p>
            <p
              style={{
                borderBottom: "1px solid",

                marginBottom: "10px",
              }}
            >
              <span>Mô tả :</span>
              <br />
              <input
                style={{
                  border: "none",
                  outline: "none",
                  width: "100%",
                  backgroundColor: "aquamarine",
                }}
                type="text"
              />
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
                style={{
                  border: "none",
                  outline: "none",
                  width: "100%",
                  backgroundColor: "aquamarine",
                }}
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
                style={{
                  border: "none",
                  outline: "none",
                  width: "100%",
                  backgroundColor: "aquamarine",
                }}
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
                style={{
                  border: "none",
                  outline: "none",
                  width: "100%",
                  backgroundColor: "aquamarine",
                }}
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
                style={{
                  border: "none",
                  outline: "none",
                  width: "100%",
                  backgroundColor: "aquamarine",
                }}
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
              <select
                style={{
                  border: "none",
                  outline: "none",
                  width: "100%",
                  backgroundColor: "aquamarine",
                }}
              >
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
          </div>

          <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
            <p
              style={{
                borderBottom: "1px solid",

                marginBottom: "10px",
              }}
            >
              <span>Bộ nhớ trong :</span>
              <br />
              <select
                style={{
                  border: "none",
                  outline: "none",
                  width: "100%",
                  backgroundColor: "aquamarine",
                }}
              >
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
              <input
                style={{
                  border: "none",
                  outline: "none",
                  width: "100%",
                  backgroundColor: "aquamarine",
                }}
                type="text"
              />
            </p>
            <p
              style={{
                borderBottom: "1px solid",

                marginBottom: "10px",
              }}
            >
              <span>Màu :</span>
              <br />
              <input
                style={{
                  border: "none",
                  outline: "none",
                  width: "100%",
                  backgroundColor: "aquamarine",
                }}
                type="text"
              />
            </p>
            <p
              style={{
                borderBottom: "1px solid",

                marginBottom: "10px",
              }}
            >
              <span>Kích thước màn hình :</span>
              <br />
              <input
                style={{
                  border: "none",
                  outline: "none",
                  width: "100%",
                  backgroundColor: "aquamarine",
                }}
                type="text"
              />
            </p>
            <p
              style={{
                borderBottom: "1px solid",

                marginBottom: "10px",
              }}
            >
              <span>Hệ điều hành :</span>
              <br />
              <select
                style={{
                  border: "none",
                  outline: "none",
                  width: "100%",
                  backgroundColor: "aquamarine",
                }}
              >
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
              <input
                style={{
                  border: "none",
                  outline: "none",
                  width: "100%",
                  backgroundColor: "aquamarine",
                }}
                type="text"
              />
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
                style={{
                  border: "none",
                  outline: "none",
                  width: "100%",
                  backgroundColor: "aquamarine",
                }}
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
              <select
                style={{
                  border: "none",
                  outline: "none",
                  width: "100%",
                  backgroundColor: "aquamarine",
                }}
              >
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
        </Modal>
      </>
    );
  }
}

export default AddProduct;
