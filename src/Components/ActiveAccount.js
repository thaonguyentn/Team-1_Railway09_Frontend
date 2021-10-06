import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { activeaccount } from "../Requestdata/CallAPI";
class ActiveAccount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      a: 5,
    };
  }
  componentDidMount() {
    console.log(this.props.location);
    setTimeout(() => {
      activeaccount(
        this.props.location.pathname + this.props.location.search
      ).then((response) => {
        console.log(response);
      });
      this.setState({
        a: 5,
      });
    }, 2000);
  }
  componentDidUpdate() {
    setTimeout(() => {
      if (this.state.a >= 0) {
        this.setState({
          a: this.state.a - 1,
        });
      }
    }, 1000);
  }
  render() {
    // console.log(this.props.location, this.state.a);
    if (this.state.a === 0) {
      return (
        <div>
          <h3>Tài khoản của bạn đã được kích hoạt</h3>
          <h3>Vui lòng đăng nhập</h3>
        </div>
      );
    }
    if (this.state.a === -1) {
      return (
        <Redirect
          to={{
            pathname: "/",
            state: { active: "activeed" },
          }}
        />
      );
    }
    return (
      <div>
        <h1>Đang kích hoạt tài khoản : {this.state.a}</h1>
      </div>
    );
  }
}

export default ActiveAccount;
