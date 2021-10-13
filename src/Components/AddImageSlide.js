import React, { Component } from "react";
import Modal from "react-modal";
import { addimageslide } from "../Requestdata/CallAPI";
class Addimageslide extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imageslide: "",
      slide: [],
    };
  }
  addimageslide = () => {
    let images = this.state.slide;
    let productID = this.props.producID;
    addimageslide(productID, images).then(() =>
      alert("Thêm " + images.length + " ảnh thành công")
    );
  };
  render() {
    let slide;
    if (this.state.slide !== []) {
      slide = this.state.slide.map((element, index) => {
        return (
          <span style={{ display: "inline-block" }}>
            <img
              src={element}
              alt="Ảnh không tồn tại"
              style={{ width: "200px", margin: "3px" }}
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
              style={{ position: "relative", bottom: "50px", right: "5px" }}
            >
              <span
                class="glyphicon glyphicon-remove-sign"
                style={{ fontSize: "20px" }}
              ></span>
            </a>
          </span>
        );
      });
    }
    return (
      <>
        <Modal
          isOpen={this.props.isopenmodaladdslide}
          onRequestClose={() => this.props.setisopenmodaladdslide(false)}
          style={{
            overlay: {
              background: "none",
            },
            content: {
              backgroundColor: "aqua",
            },
          }}
        >
          <div style={{ textAlign: "center" }}>
            <h1>Chọn ảnh SlideShow</h1>
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
                let imageslide = {
                  pathIMG: this.state.imageslide,
                };
                list.push(imageslide);
                this.setState({
                  slide: list,
                  imageslide: "",
                });
              }}
            >
              Thêm
            </button>
            <br />
            <div
              style={{
                width: "400px",
                position: "absolute",
                left: "35%",
              }}
            >
              <img
                style={{ width: "400px" }}
                src={this.state.imageslide}
                alt=""
              />
            </div>
            <hr />
            {slide}
            <div style={{ textAlign: "center" }}>
              <button
                type="button"
                class="btn btn-success"
                onClick={this.addimageslide}
              >
                Thêm vào Sản phẩm
              </button>
            </div>
          </div>
        </Modal>
      </>
    );
  }
}

export default Addimageslide;
