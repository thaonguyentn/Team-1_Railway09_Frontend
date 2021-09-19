import React, { Component } from "react";
import listaccount from "./getlistaccount";
import listproduct from "./getlistproduct";
class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listaccount: [],
      listproduct: [],
    };
  }
  componentDidMount() {
    listaccount.then((response) => {
      console.log(response);
      this.setState({
        listaccount: response.data.content,
      });
    });
    listproduct.then((response) => {
      console.log(response);
      this.setState({
        listproduct: response.data.content,
      });
    });
  }
  render() {
    let rows;
    if (this.state.listaccount !== []) {
      rows = this.state.listaccount.map((row, index) => {
        return (
          <tr key="index">
            <td>{row.id}</td>
            <td>{row.username}</td>
            <td>{row.email}</td>
            <td>{row.fullname}</td>
            <td>{row.gender}</td>
            <td>{row.address}</td>
            <td>{row.avatar}</td>
            <td>{row.phone_number}</td>
            <td>{row.register_date}</td>
          </tr>
        );
      });
    }
    let rows2;
    if (this.state.listproduct !== []) {
      rows2 = this.state.listproduct.map((row, index) => {
        return (
          <tr key={index}>
            <td>{row.id}</td>
            <td>{row.name}</td>
            <td>{row.price}</td>
            <td>{row.brand}</td>
            <td>{row.category}</td>
            <td>{row.description}</td>
            <td>{row.ram}</td>
            <td>{row.memory}</td>
            <td>{row.image}</td>
            <td>{row.quantity}</td>
            <td>{row.enter_date}</td>
          </tr>
        );
      });
    }
    return (
      <div>
        <h1>Warning! This is Admin Page không phận sự miễn vào</h1>
        <h1>Quản lý Account</h1>

        <table class="table table-bordered table-hover">
          <thead>
            <tr>
              <th>id</th>
              <th>username</th>
              <th>email</th>
              <th>fullname</th>
              <th>gender</th>
              <th>address</th>
              <th>avatar</th>
              <th>phone_number</th>
              <th>register_date</th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </table>
        <h1>Quản lý sản phẩm</h1>

        <table class="table table-bordered table-hover">
          <thead>
            <tr>
              <th>id</th>
              <th>name</th>
              <th>price</th>
              <th>brand</th>
              <th>category</th>
              <th>description</th>
              <th>ram</th>
              <th>memory</th>
              <th>image</th>
              <th>quantity</th>
              <th>enter_date</th>
            </tr>
          </thead>
          <tbody>{rows2}</tbody>
        </table>
      </div>
    );
  }
}

export default Admin;
