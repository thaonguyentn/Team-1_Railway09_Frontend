import React, { Component } from "react";

class Footer extends Component {
  render() {
    return (
      <div className="container">
        <div className="footerwaper">
          <div className="footerdetail">
            <ul>
              <li>
                <a href="">Lịch sử mua hàng</a>
              </li>
              <li>
                <a href="">Cộng tác bán hàng cùng TGCT</a>
              </li>
              <li>
                <a href="">Tìm hiểu về mua trả góp</a>
              </li>
              <li>
                <a href="">Chính sách bảo hành</a>
              </li>
              <li>
                <a href="">Xem thêm</a>
              </li>
            </ul>
          </div>
          <div className="footerdetail">
            <ul>
              <li>
                <a href="">Giới thiệu công ty </a>
              </li>
              <li>
                <a href="">Tuyển dụng</a>
              </li>
              <li>
                <a href="">Gửi góp ý, khiếu nại</a>
              </li>
              <li>
                <a href="">Tìm siêu thị (4 shop)</a>
              </li>
              <li>
                <a href="">Xem bản mobile</a>
              </li>
            </ul>
          </div>
          <div className="footerdetail">
            <ul>
              <li>Tổng đài hỗ trợ (Miễn phí gọi)</li>
              <li>
                Gọi mua: <a href="">1800.1060</a> (7:30 - 22:00)
              </li>
              <li>
                Kỹ thuật:<a href=""> 1800.1763 </a>(7:30 - 22:00)
              </li>
              <li>
                Khiếu nại: <a href="">1800.1062 </a>(8:00 - 21:30)
              </li>
              <li>
                Bảo hành: <a href=""> 1800.1064</a>(8:00 - 21:00)
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default Footer;
