import React, { Component } from "react";

class Banner extends Component {
  render() {
    return (
      <>
        <div id="myCarousel" className="carousel slide" data-ride="carousel">
          <div className="carousel-inner">
            <div className="item active">
              <img
                className="image"
                src={require("../Images/1200-44-1200x44-1.png").default}
                alt=""
              />
            </div>
            <div className="item">
              <img
                className="image"
                src={require("../Images/1200-44-1200x44-2.png").default}
                alt=""
              />
            </div>

            <div className="item">
              <img
                className="image"
                src={
                  require("../Images/bannermatbang1200x44-1200x44-1.png")
                    .default
                }
                alt=""
              />
            </div>
          </div>

          {/* <a className="left carousel-control" href="#myCarousel" data-slide="prev">
            <span className="glyphicon glyphicon-chevron-left"></span>
            <span className="sr-only">Previous</span>
          </a>
          <a
            className="right carousel-control"
            href="#myCarousel"
            data-slide="next"
          >
            <span className="glyphicon glyphicon-chevron-right"></span>
            <span className="sr-only">Next</span>
          </a> */}
        </div>
        <div className="container" id="lienketcontainer">
          <div className="row">
            <div id="lienhe" className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
              Liên hệ với chúng tôi: <span>Hà nội: 0964385217</span>|{" "}
              <span>TP.Hồ Chí Minh: 0705818277</span>
            </div>
            <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3"></div>
            <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3" id="ketnoi">
              <ul>
                <li>Kết nối:</li>
                <li>
                  <a
                    href="https://www.facebook.com/GHKSand/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <i className="fa fa-facebook"></i>
                  </a>
                </li>
                <li>
                  <a href="">
                    <i className="fa fa-google"></i>
                  </a>
                </li>
                <li>
                  <a href="">
                    <i className="fa fa-instagram"></i>
                  </a>
                </li>
                <li>
                  <a href="">
                    <i className="fa fa-twitter"></i>
                  </a>
                </li>
                <li>
                  <a href="">
                    <i className="fa fa-youtube"></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Banner;
