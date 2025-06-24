import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  // State cho opacity phần header search
  const [searchOpacity, setSearchOpacity] = useState(1);
  // State cho chiều cao header (giả sử ban đầu là 200px)
  const [headerHeight, setHeaderHeight] = useState(200);

  const handleSelectChange = (e) => {
    const value = e.target.value;
    if (value === "jobs" || value === "featured-jobs") {
      navigate("/job-list"); // Điều hướng đến trang danh sách công việc mới
    } else if (value) {
      const section = document.getElementById(value);
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    }
    e.target.value = "";
  };

  // Lắng nghe sự kiện scroll và cập nhật opacity cũng như chiều cao header
  useEffect(() => {
    const handleScroll = () => {
      const threshold = 100; // khoảng cách cuộn bắt đầu giảm opacity và thu gọn header
      const fadeDistance = 150; // khoảng cách cuộn từ threshold đến khi opacity = 0
      const initialHeaderHeight = 250; // chiều cao ban đầu của header
      const minHeaderHeight = 80; // chiều cao tối thiểu khi đã thu gọn
      const scrollY = window.scrollY;

      // Tính opacity cho header search
      let newOpacity = 1;
      if (scrollY > threshold) {
        newOpacity = Math.max(0, 1 - (scrollY - threshold) / fadeDistance);
      }
      setSearchOpacity(newOpacity);

      // Tính chiều cao header dựa trên scroll
      let newHeight = initialHeaderHeight;
      if (scrollY > threshold) {
        // Giảm chiều cao dần, không nhỏ hơn minHeaderHeight
        newHeight = Math.max(
          minHeaderHeight,
          initialHeaderHeight - (scrollY - threshold) * 0.5
        );
      }
      setHeaderHeight(newHeight);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClearFilters = () => {
    console.log("Đã click 'Xóa bộ lọc'");
    const searchInput = document.querySelector(
      '.search-bar input[type="text"]'
    );
    if (searchInput) {
      searchInput.value = "";
    }
    const filterSelects = document.querySelectorAll(".filters .filter-select");
    filterSelects.forEach((select) => {
      select.value = "";
    });
  };

  return (
    <header
      className="header"
      style={{
        height: `${headerHeight}px`,
        transition: "height 0.3s ease",
        overflow: "hidden",
      }}
    >
      <div className="header-top">
        <Link to="/" className="logo">
          NextDev
        </Link>
        <nav className="nav-menu">
          <select
            className="filter-select"
            onChange={handleSelectChange}
            defaultValue=""
          >
            <option value="" disabled>
              Việc làm HOT
            </option>
            <option value="hot-jobs">Top việc làm HOT</option>
          </select>
          <select
            className="filter-select"
            onChange={handleSelectChange}
            defaultValue=""
          >
            <option value="" disabled>
              Việc làm
            </option>
            <option value="jobs">Tất cả việc làm</option>
            <option value="featured-jobs">Việc làm theo ngành</option>
          </select>
          <select
            className="filter-select"
            onChange={handleSelectChange}
            defaultValue=""
          >
            <option value="" disabled>
              Công ty
            </option>
            <option value="companies">Công ty nổi bật</option>
            <option value="top-companies">Top Công ty</option>
          </select>
          <select
            className="filter-select"
            onChange={handleSelectChange}
            defaultValue=""
          >
            <option value="" disabled>
              Sự kiện
            </option>
            <option value="events">Sự kiện</option>
          </select>
        </nav>
        <button className="user-button" onClick={() => navigate("/signin")}>
          <span className="user-icon">👤</span> Chí Thiện
        </button>
      </div>
      {/* Phần header search */}
      <div
        className="header-search"
        style={{ opacity: searchOpacity, transition: "opacity 0.3s ease" }}
      >
        <div className="search-bar">
          <input type="text" placeholder="Tìm kiếm theo kỹ năng, công ty..." />
          <button className="search-button">🔍</button>
        </div>
        <div className="filters">
          <select className="filter-select" defaultValue="">
            <option value="" disabled>
              Địa điểm
            </option>
            <option value="hanoi">Hà Nội</option>
            <option value="hcm">TP.HCM</option>
            <option value="danang">Đà Nẵng</option>
          </select>
          <select className="filter-select" defaultValue="">
            <option value="" disabled>
              Loại công việc
            </option>
            <option value="it">IT</option>
            <option value="marketing">Marketing</option>
            <option value="finance">Finance</option>
          </select>
          <select className="filter-select" defaultValue="">
            <option value="" disabled>
              Loại hợp đồng
            </option>
            <option value="lt10">Hợp đồng 6 tháng</option>
            <option value="10-20">Hợp đồng 1 năm</option>
            <option value="gt20">Hợp đồng 4 năm</option>
          </select>
          <button className="filter-clear-button" onClick={handleClearFilters}>
            Xóa bộ lọc
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
