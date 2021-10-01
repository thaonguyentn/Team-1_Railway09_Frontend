import React, { Component } from "react";
import { NavLink, Switch, Route } from "react-router-dom";

class Laptop extends Component {
  render() {
    return (
      <div>
        <div
          id="sp1"
          style={{
            margin: "30px",
            backgroundColor: "white",
            width: "260px",
            border: "3px solid black",
            float: "left",
          }}
        >
          <NavLink
            to="/phukien/1"
            style={{ margin: "30px", backgroundColor: "blue" }}
          >
            <img
              src={require("../Images/minh.jpg").default}
              alt=""
              style={{ width: "200px", height: "auto" }}
            />
            <p style={{ margin: "30px" }}> Iphone 13 pro Max</p>
          </NavLink>
        </div>
        <div
          style={{
            margin: "30px",
            backgroundColor: "white",
            width: "260px",
            border: "3px solid black",
            float: "left",
          }}
        >
          <NavLink
            to="/phukien/1"
            style={{ margin: "30px", backgroundColor: "blue" }}
          >
            <img
              src={require("../Images/minh.jpg").default}
              alt=""
              style={{ width: "200px", height: "auto" }}
            />
            <p style={{ margin: "30px" }}> Iphone 13 pro Max</p>
          </NavLink>
        </div>
        <div
          style={{
            margin: "30px",
            backgroundColor: "white",
            width: "260px",
            border: "3px solid black",
            float: "left",
          }}
        >
          <NavLink
            to="/phukien/1"
            style={{ margin: "30px", backgroundColor: "blue" }}
          >
            <img
              src={require("../Images/minh.jpg").default}
              alt=""
              style={{ width: "200px", height: "auto" }}
            />
            <p style={{ margin: "30px" }}> Iphone 13 pro Max</p>
          </NavLink>
        </div>
        <div
          style={{
            margin: "30px",
            backgroundColor: "white",
            width: "260px",
            border: "3px solid black",
            float: "left",
          }}
        >
          <NavLink
            to="/phukien/1"
            style={{ margin: "30px", backgroundColor: "blue" }}
          >
            <img
              src={require("../Images/minh.jpg").default}
              alt=""
              style={{ width: "200px", height: "auto" }}
            />
            <p style={{ margin: "30px" }}> Iphone 13 pro Max</p>
          </NavLink>
        </div>
        <div
          style={{
            margin: "30px",
            backgroundColor: "white",
            width: "260px",
            border: "3px solid black",
            float: "left",
          }}
        >
          <NavLink
            to="/phukien/1"
            style={{ margin: "30px", backgroundColor: "blue" }}
          >
            <img
              src={require("../Images/minh.jpg").default}
              alt=""
              style={{ width: "200px", height: "auto" }}
            />
            <p style={{ margin: "30px" }}> Iphone 13 pro Max</p>
          </NavLink>
        </div>
        <div style={{ clear: "both" }}></div>

        <Switch>
          <Route path="/phukien/:id" exact />
        </Switch>
      </div>
    );
  }
}

export default Laptop;
