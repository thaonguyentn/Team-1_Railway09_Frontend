import { createproduct, getlistproduct } from "../Requestdata/CallAPI";
import React, { Component } from "react";
import Modal from "react-modal";
import { connect } from "react-redux";
import { setbrand, setlistproduct, setmemory, setram } from "../Actions";
import { getbrand, getmemory, getram } from "../Requestdata/CallAPI";
class AddProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      description: "",
      price: 0.0,
      ram: "",
      memory: "",
      brand: "",
      category: "",
      quantity: 1,
      camera: "",
      color: "",
      screenSize: "",
      operatingSystem: "",
      chip: "",
      battery: "",
      sim: "",
      image: "",
      discount: 0,
    };
  }
  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };
  saveProduct = () => {
    if (
      this.state.name === "" ||
      this.state.description === "" ||
      this.state.price === "" ||
      this.state.ram === "" ||
      this.state.memory === "" ||
      this.state.brand === "" ||
      this.state.category === "" ||
      this.state.quantity === "" ||
      this.state.camera === "" ||
      this.state.color === "" ||
      this.state.screenSize === "" ||
      this.state.operatingSystem === "" ||
      this.state.chip === "" ||
      this.state.battery === "" ||
      this.state.sim === "" ||
      this.state.image === "" ||
      this.state.discount === ""
    ) {
      alert("Kiểm tra lại thông tin nhập vào");
      return;
    }
    let body = {
      name: this.state.name,
      description: this.state.description,
      price: this.state.price,
      ram: this.state.ram,
      memory: this.state.memory,
      brand: this.state.brand,
      category: this.state.category,
      quantity: this.state.quantity,
      camera: this.state.camera,
      color: this.state.color,
      screenSize: this.state.screenSize,
      operatingSystem: this.state.operatingSystem,
      chip: this.state.chip,
      battery: this.state.battery,
      sim: this.state.sim,
      image: this.state.image,
      discount: this.state.discount,
    };
    createproduct(body).then((response) => {
      this.props.setisopenmodaladd(false);
      getlistproduct(this.props.totalpageproduct, "", "", "", "").then(
        (response) => {
          this.props.getlistproduct(response.data);
        }
      );
      alert("Tạo sản phẩm thành công");
    });
  };
  componentDidMount() {
    getbrand().then((response) => {
      this.props.setbrand(response.data);
    });
    getmemory().then((response) => {
      this.props.setmemory(response.data);
    });
    getram().then((response) => {
      this.props.setram(response.data);
    });
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
              name="image"
              value={this.state.image}
              onChange={this.handleChange}
            />
            <hr />
            <img
              style={{ width: "200px" }}
              src={this.state.image}
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
                name="name"
                value={this.state.name}
                onChange={this.handleChange}
              />
            </p>
            <p
              style={{
                borderBottom: "1px solid",
                marginBottom: "10px",
              }}
            >
              <span>Loại sản phẩm :</span>
              <br />
              <select
                style={{
                  border: "none",
                  outline: "none",
                  width: "100%",
                  backgroundColor: "aquamarine",
                }}
                name="category"
                value={this.state.category}
                onChange={this.handleChange}
              >
                <option value="" key="">
                  Tuỳ chọn
                </option>
                <option value="Phone">Điện thoại</option>
                <option value="Accessory">Phụ kiện</option>
              </select>
            </p>
            <p
              style={{
                borderBottom: "1px solid",

                marginBottom: "10px",
              }}
            >
              <span>Hãng :</span>
              <br />
              <select
                style={{
                  border: "none",
                  outline: "none",
                  width: "100%",
                  backgroundColor: "aquamarine",
                }}
                name="brand"
                value={this.state.brand}
                onChange={this.handleChange}
              >
                <option value="" key="">
                  Tuỳ chọn
                </option>
                {this.props.brand
                  ? this.props.brand.map((row, index) => {
                      return (
                        <option value={row.brandName} key={index}>
                          {row.brandName}
                        </option>
                      );
                    })
                  : ""}
              </select>
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
                name="description"
                value={this.state.description}
                onChange={this.handleChange}
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
                name="price"
                value={this.state.price}
                onChange={this.handleChange}
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
                name="discount"
                value={this.state.discount}
                onChange={this.handleChange}
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
                name="quantity"
                value={this.state.quantity}
                onChange={this.handleChange}
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
                name="ram"
                value={this.state.ram}
                onChange={this.handleChange}
              >
                <option value="" key="">
                  Tuỳ chọn
                </option>
                {this.props.ram
                  ? this.props.ram.map((row, index) => {
                      return (
                        <option value={row.ramName} key={index}>
                          {row.ramName}
                        </option>
                      );
                    })
                  : ""}
              </select>
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
                name="memory"
                value={this.state.memory}
                onChange={this.handleChange}
              >
                <option value="" key="">
                  Tuỳ chọn
                </option>
                {this.props.memory
                  ? this.props.memory.map((row, index) => {
                      return (
                        <option value={row.memoryName} key={index}>
                          {row.memoryName}
                        </option>
                      );
                    })
                  : ""}
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
                name="camera"
                value={this.state.camera}
                onChange={this.handleChange}
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
                name="color"
                value={this.state.color}
                onChange={this.handleChange}
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
                name="screenSize"
                value={this.state.screenSize}
                onChange={this.handleChange}
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
                name="operatingSystem"
                value={this.state.operatingSystem}
                onChange={this.handleChange}
              >
                <option value="" key="">
                  Tuỳ chọn
                </option>
                <option value="Android" key="">
                  Android
                </option>{" "}
                <option value="iOS" key="">
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
              <span>Chip xử lý :</span>
              <br />
              <input
                style={{
                  border: "none",
                  outline: "none",
                  width: "100%",
                  backgroundColor: "aquamarine",
                }}
                type="text"
                name="chip"
                value={this.state.chip}
                onChange={this.handleChange}
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
                name="battery"
                value={this.state.battery}
                onChange={this.handleChange}
              />
              {" mAh"}
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
                name="sim"
                value={this.state.sim}
                onChange={this.handleChange}
              >
                <option value="" key="">
                  Tuỳ chọn
                </option>
                <option value="2G,3G" key="">
                  2G,3G
                </option>{" "}
                <option value="2G,3G,4G" key="">
                  2G,3G,4G
                </option>
                <option value="3G,4G" key="">
                  3G,4G
                </option>
                <option value="3G,4G,5G" key="">
                  3G,4G,5G
                </option>
                <option value="4G,5G" key="">
                  4G,5G
                </option>
              </select>
            </p>
          </div>
          <div>
            <p style={{ width: "300px", margin: "auto" }}>
              <button
                style={{ width: "300px", backgroundColor: "goldenrod" }}
                onClick={this.saveProduct}
              >
                Lưu sản phẩm vào Shop
              </button>
            </p>
          </div>
        </Modal>
      </>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    ram: state.productreducer.ram,
    brand: state.productreducer.brand,
    memory: state.productreducer.memory,
    totalpageproduct: state.productreducer.totalPage,
    currenpageproduct: state.productreducer.currenPage,
    listpro: state.productreducer.listproduct,
  };
};
const mapDispatchToProps = (dispath) => {
  return {
    setram: (ram) => {
      dispath(setram(ram));
    },
    setbrand: (brand) => {
      dispath(setbrand(brand));
    },
    setmemory: (memory) => {
      dispath(setmemory(memory));
    },
    getlistproduct: (list) => {
      dispath(setlistproduct(list));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(AddProduct);
