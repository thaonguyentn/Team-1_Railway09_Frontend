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
      </>
    );
  }
}

export default Banner;
