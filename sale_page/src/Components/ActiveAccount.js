import axios from "axios";
import React, { Component } from "react";

class ActiveAccount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      a: 0,
    };
  }
  componentDidMount() {
    setTimeout(() => {
      axios
        .get(
          "http://localhost:8080/api/v3/register" +
            this.props.location.pathname +
            this.props.location.search
        )
        .then((response) => {
          console.log(response);
        });
      this.setState({
        a: 1,
      });
    }, 5000);
  }
  render() {
    console.log(this.props.location, this.state.a);

    return (
      <div>
        <h1>Hello111111</h1>
      </div>
    );
  }
}

export default ActiveAccount;
