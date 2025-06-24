import React, { useState } from "react";
import ImageCompany from "../assets/fpt_banner.png";
import Background2 from "../assets/background2.png";
import LogoCompany from "../assets/logofpt.png";
import Heart from "../assets/heart.png";
import HeartFilled from "../assets/heart-filled.png"; // Giả sử bạn có icon trái tim đã tô màu

function CompanyBanner() {
  const [nameCompany, setNameCompany] = useState(
    "Công ty cổ phần viễn thông FPT"
  );
  const [companyStaff, setCompanyStaff] = useState(0);
  const [follower, setFollower] = useState(0); // Có thể dùng state này để tăng số lượng người theo dõi
  const [isFollowing, setIsFollowing] = useState(false); // Trạng thái mới: theo dõi hay chưa

  // Hàm xử lý khi click vào button
  const handleFollowClick = () => {
    setIsFollowing(!isFollowing); // Đảo ngược trạng thái isFollowing
    // Tăng/giảm số lượng người theo dõi nếu cần
    setFollower((prevFollower) =>
      isFollowing ? prevFollower - 1 : prevFollower + 1
    );
  };

  return (
    <>
      <div className="company_banner_container">
        <img src={ImageCompany} alt="" className="imageCompany" />
        <img src={Background2} alt="" className="imageBackground" />
        <div className="logo_company">
          <img src={LogoCompany} alt="" className="img_logo_company" />
        </div>
        <div className="company_details_banner">
          <div className="company_name_banner">{nameCompany}</div>
          <div className="company_detail1_banner">{companyStaff} nhân viên</div>
          <div className="company_detail2_banner">
            {follower} người theo dõi{" "}
            {/* Hiển thị số người theo dõi từ state */}
          </div>
        </div>
        {/* Thêm onClick handler và className động */}
        <div
          className={`Button_follow ${isFollowing ? "Button_followed" : ""}`}
          onClick={handleFollowClick}
        >
          {/* Thay đổi icon dựa trên trạng thái isFollowing */}
          <img src={isFollowing ? HeartFilled : Heart} alt="" />
          <div>{isFollowing ? "Đang theo dõi" : "Theo dõi"}</div>
        </div>
      </div>
    </>
  );
}

export default CompanyBanner;
