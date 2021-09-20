import React, { Component } from "react";
import { connect } from "react-redux";
class Profile extends Component {
  render() {
    console.log(this.props.account);
    let row;
    if (this.props.account !== null) {
      row = [
        <div>
          <span style={{ fontSize: "larger", fontWeight: "bolder" }}>id</span> :{" "}
          {this.props.account.id}
          <span style={{ float: "right" }}>Sửa</span>
        </div>,
        <div>
          <span style={{ fontSize: "larger", fontWeight: "bolder" }}>
            username
          </span>{" "}
          : {this.props.account.username}
          <span style={{ float: "right" }}>Sửa</span>
        </div>,
        <div>
          <span style={{ fontSize: "larger", fontWeight: "bolder" }}>
            fullname
          </span>{" "}
          : {this.props.account.fullname}
          <span style={{ float: "right" }}>Sửa</span>
        </div>,
        <div>
          <span style={{ fontSize: "larger", fontWeight: "bolder" }}>
            email
          </span>{" "}
          : {this.props.account.email}
          <span style={{ float: "right" }}>Sửa</span>
        </div>,
        <div>
          <span style={{ fontSize: "larger", fontWeight: "bolder" }}>
            gender
          </span>{" "}
          : {this.props.account.gender}
          <span style={{ float: "right" }}>Sửa</span>
        </div>,
        <div>
          <span style={{ fontSize: "larger", fontWeight: "bolder" }}>
            phone_number
          </span>{" "}
          : {this.props.account.phone_number}
          <span style={{ float: "right" }}>Sửa</span>
        </div>,
        <div>
          <span style={{ fontSize: "larger", fontWeight: "bolder" }}>
            register_date
          </span>{" "}
          : {this.props.account.register_date}
          <span style={{ float: "right" }}>Sửa</span>
        </div>,
        <div>
          <span style={{ fontSize: "larger", fontWeight: "bolder" }}>
            avatar
          </span>{" "}
          : {this.props.account.avatar}
          <span style={{ float: "right" }}>Sửa</span>
        </div>,
        <div>
          <span style={{ fontSize: "larger", fontWeight: "bolder" }}>
            address
          </span>{" "}
          : {this.props.account.address}
          <span style={{ float: "right" }}>Sửa</span>
        </div>,
      ];
    }
    return (
      <div>
        <div class="row">
          <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4"></div>
          <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
            <h1>Profile</h1>
            {row}
          </div>

          <div class="col-xs-1 col-sm-1 col-md-1 col-lg-1"></div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    account: state.accountreducer.account,
  };
};
export default connect(mapStateToProps)(Profile);
