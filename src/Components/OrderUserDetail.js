import React, { Component } from "react";
import { connect } from "react-redux";
import { setloading } from "../Actions";
import { getorderdetail } from "../Requestdata/CallAPI";
class Orderuserdetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listorrderdetail: [],
    };
  }
  componentDidMount() {
    this.props.setloading(true);
    if (this.props.location.state) {
      let order = this.props.location.state.order;
      getorderdetail(order.orderID)
        .then((response) => {
          this.setState({
            listorrderdetail: response.data,
          });
        })
        .finally(() => this.props.setloading(false));
    }
  }
  format2 = (n) => {
    return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  render() {
    let rows;
    if (this.state.listorrderdetail.length === 0 || this.props.loading) {
      rows = "";
    } else {
      rows = this.state.listorrderdetail.map((row, index) => {
        return (
          <div
            style={{
              borderTop: "1px solid black",

              float: "left",
              width: "100%",
              marginBlock: "5px",
              // borderRadius: "10px",
            }}
          >
            <div
              style={{
                backgroundColor: "#e8e8e8",
                width: "20px",
              }}
            ></div>
            <div
              style={{
                // margin: "30px",
                backgroundColor: "#e8e8e8",
                width: "150px",
                float: "left",
              }}
            >
              <img
                src={row.product.image}
                alt=""
                style={{ width: "140px", height: "auto" }}
              />
            </div>
            <div
              style={{
                // margin: "30px",
                backgroundColor: "#e8e8e8",
                width: "200px",
                float: "left",
              }}
            >
              <p>
                {row.product.name}({row.product.ram}/{row.product.memory})
              </p>
              <p style={{ fontSize: "small" }}>
                <span
                  style={{
                    textDecoration: "line-through",
                    paddingRight: "5px",
                  }}
                >
                  {this.format2(row.product.price)} ??{" "}
                </span>

                <span> -{row.product.discount}%</span>
              </p>
              <p style={{ fontSize: "larger" }}>
                {this.format2(
                  Number(row.product.price) -
                    (Number(row.product.price) * Number(row.product.discount)) /
                      100
                )}
                ??
              </p>
              <p>S??? h??ng c??n l???i : {row.product.quantity}</p>
            </div>
            <div
              style={{
                // margin: "30px",
                backgroundColor: "#e8e8e8",
                width: "260px",
                float: "left",
                marginLeft: "100px",
              }}
            >
              <p>
                S??? l?????ng :{" "}
                <span style={{ paddingInline: "5px" }}>{row.quantity}</span>
              </p>
              <p>
                Th??nh ti???n :
                {this.format2(
                  (Number(row.price) -
                    (Number(row.price) * Number(row.product.discount)) / 100) *
                    Number(row.quantity)
                )}
                ??
              </p>
            </div>
            <hr style={{ clear: "both" }} />
          </div>
        );
      });
    }
    return (
      <div>
        <div style={{ textAlign: "center" }}>
          <h2>Th??ng tin chi ti???t ????n h??ng</h2>
        </div>
        {rows}
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    loading: state.productreducer.loading,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    setloading: (loading) => {
      dispatch(setloading(loading));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Orderuserdetail);
