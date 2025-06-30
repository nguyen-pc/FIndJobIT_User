import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { LOCATION_LIST } from "../config/utils";
import { callFetchAllSkill } from "../config/api";
import { notification, Select } from "antd";

const { Option } = Select;

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const optionsLocation = LOCATION_LIST; // Ví dụ: [{ value: "hanoi", label: "Hà Nội" }, ...]
  const [optionsSkills, setOptionsSkills] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [searchOpacity, setSearchOpacity] = useState(1);
  const [headerHeight, setHeaderHeight] = useState(250);

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

  // Fetch danh sách skill từ backend
  useEffect(() => {
    const fetchSkill = async () => {
      let query = `page=1&size=100&sort=createdAt,desc`;
      const res = await callFetchAllSkill(query);
      if (res && res.data) {
        const arr =
          res.data.result?.map((item) => ({
            label: item.name,
            value: item.id + "",
          })) || [];
        setOptionsSkills(arr);
      }
    };
    fetchSkill();
  }, []);

  // Lắng nghe scroll để thay đổi opacity header search và chiều cao header
  useEffect(() => {
    const handleScroll = () => {
      const threshold = 100;
      const fadeDistance = 150;
      const initialHeaderHeight = 250;
      const minHeaderHeight = 80;
      const scrollY = window.scrollY;
      let newOpacity = 1;
      if (scrollY > threshold) {
        newOpacity = Math.max(0, 1 - (scrollY - threshold) / fadeDistance);
      }
      setSearchOpacity(newOpacity);
      let newHeight = initialHeaderHeight;
      if (scrollY > threshold) {
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
    setSelectedLocation([]);
    setSelectedSkills([]);
  };

  // Hàm onFinish nhận query được build từ các lựa chọn
  const onFinish = (query) => {
    if (!query) {
      notification.error({
        message: "Có lỗi xảy ra",
        description: "Vui lòng chọn tiêu chí để search",
      });
      return;
    }
    navigate(`/job?${query}`);
  };

  // Xây dựng query và truyền cho onFinish khi click search button
  const handleSearch = () => {
    let query = "";
    if (selectedLocation.length) {
      query = `location=${selectedLocation.join(",")}`;
    }
    if (selectedSkills.length) {
      query = query
        ? query + `&skills=${selectedSkills.join(",")}`
        : `skills=${selectedSkills.join(",")}`;
    }
    onFinish(query);
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
        {/* Các phần Navigation khác */}
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
        
        <button className="user-button" onClick={() => navigate("/profile")}>
          <span className="user-icon">👤</span> Chí Thiện
        </button>
      </div>
      {/* Phần header search */}
      <div
        className="header-search"
        style={{ opacity: searchOpacity, transition: "opacity 0.3s ease" }}
      >
        <div className="search-bar">
          <input type="text" placeholder="Tìm kiếm theo công việc, công ty..." />
          <button className="search-button" onClick={handleSearch}>
            🔍
          </button>
        </div>
        <div className="filters" style={{ display: "flex", gap: "1rem", alignItems: "center"}}>
          {/* Select đa lựa chọn cho Địa điểm */}
          <Select
            mode="multiple"
            allowClear
            placeholder="Chọn Địa điểm"
            style={{ minWidth: 200 }}
            value={selectedLocation}
            onChange={(value) => setSelectedLocation(value)}
          >
            {optionsLocation.map((loc) => (
              <Option key={loc.value} value={loc.value}>
                {loc.label}
              </Option>
            ))}
          </Select>
          {/* Select đa lựa chọn cho Kỹ năng */}
          <Select
            mode="multiple"
            allowClear
            placeholder="Chọn Kỹ năng"
            style={{ minWidth: 200 }}
            value={selectedSkills}
            onChange={(value) => setSelectedSkills(value)}
          >
            {optionsSkills.map((skill) => (
              <Option key={skill.value} value={skill.value}>
                {skill.label}
              </Option>
            ))}
          </Select>
          <button className="filter-clear-button" onClick={handleClearFilters}>
            Xóa bộ lọc
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
