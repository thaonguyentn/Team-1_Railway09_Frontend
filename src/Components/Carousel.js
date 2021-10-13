import React, { Component } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
const slides = (images, width) => {
  const arrowStyles = {
    position: "absolute",
    top: "45%",
    width: 60,
    height: 60,
    cursor: "pointer",
  };
  let rows;
  if (images) {
    rows = images.map((row, index) => {
      return (
        <div>
          <img src={row.path} alt="noimage" />
        </div>
      );
    });
  } else {
    rows = "";
  }
  return (
    <div style={{ width: width, float: "left", marginLeft: "2px" }}>
      <Carousel
        emulateTouch={true}
        showStatus={false}
        swipeable={true}
        infiniteLoop={true}
        showArrows={true}
        autoPlay={false}
        renderArrowPrev={(onClickHandler, hasPrev, label) =>
          hasPrev && (
            <button
              type="button"
              onClick={onClickHandler}
              title={label}
              style={{
                ...arrowStyles,
                zIndex: "2",
                left: 15,
                background: "none",
                outline: "none",
                border: "none",
              }}
            >
              <span
                class="glyphicon  glyphicon-menu-left "
                style={{ fontSize: "50px", color: "gray" }}
              ></span>
            </button>
          )
        }
        renderArrowNext={(onClickHandler, hasNext, label) =>
          hasNext && (
            <button
              type="button"
              onClick={onClickHandler}
              title={label}
              style={{
                ...arrowStyles,
                right: 40,
                background: "none",
                outline: "none",
                border: "none",
              }}
            >
              <span
                class="glyphicon  glyphicon-menu-right "
                style={{
                  fontSize: "50px",
                  color: "gray",
                }}
              ></span>
            </button>
          )
        }
      >
        {rows}
      </Carousel>
    </div>
  );
};
export default slides;
