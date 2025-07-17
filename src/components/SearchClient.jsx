import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { LOCATION_LIST } from "../config/utils";
import { callFetchAllSkill, callLogout } from "../config/api";
import { notification, Select } from "antd";
import profile from "../assets/profile 1.png";
import job from "../assets/job.png";
import CV from "../assets/cv.png";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { setLogoutAction } from "../redux/slice/accountSlide";
import Button from "@mui/material/Button";
import queryString from "query-string";
import { sfIn } from "spring-filter-query-builder";
import { AppBar, Toolbar, Box, IconButton, Drawer, List, ListItem, ListItemText, useTheme, useMediaQuery } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

const { Option } = Select;

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const optionsLocation = LOCATION_LIST;
  const [optionsSkills, setOptionsSkills] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [searchOpacity, setSearchOpacity] = useState(1);
  const [headerHeight, setHeaderHeight] = useState(250);
  const [searchParams, setSearchParams] = useState({
    name: "",
    salary: "",
    level: [],
    current: 1,
    pageSize: 15,
  });
  const [drawerOpen, setDrawerOpen] = useState(false);

  const [showJobManagementDropdown, setShowJobManagementDropdown] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [showCvManagementDropdown, setShowCvManagementDropdown] = useState(false);
  const [showSecurityDropdown, setShowSecurityDropdown] = useState(false);

  const isAuthenticated = useAppSelector((state) => state.account.isAuthenticated);
  const user = useAppSelector((state) => state.account.user);

  // Hàm xử lý khi chọn từ dropdown filter trên thanh điều hướng
  const handleSelectChange = (e) => {
    const value = e.target.value;
    if (value === "events") {
      // Xử lý cho Sự kiện nếu cần
    } else if (value) {
      const section = document.getElementById(value);
      if (section) section.scrollIntoView({ behavior: "smooth" });
    }
    e.target.value = "";
  };

  const handleNavigate = () => {
    if (user.role.name === "COMPANY") navigate("/employer/dashboard");
    else if (user.role.name === "SUPER_ADMIN") navigate("/admin/dashboard");
  };

  const handleLogout = async () => {
    const res = await callLogout();
    if (res && +res.statusCode === 200) {
      dispatch(setLogoutAction({}));
      navigate("/");
    }
  };

  useEffect(() => {
    const fetchSkill = async () => {
      const query = `page=1&size=100&sort=createdAt,desc`;
      const res = await callFetchAllSkill(query);
      if (res && res.data) {
        const arr = res.data.result?.map((item) => ({
          label: item.name,
          value: item.id + "",
        })) || [];
        setOptionsSkills(arr);
      }
    };
    fetchSkill();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const threshold = 100;
      const fadeDistance = 150;
      const initialHeaderHeight = 250;
      const minHeaderHeight = 80;
      const scrollY = window.scrollY;
      const newOpacity = scrollY > threshold ? Math.max(0, 1 - (scrollY - threshold) / fadeDistance) : 1;
      setSearchOpacity(newOpacity);
      const newHeight = scrollY > threshold ? Math.max(minHeaderHeight, initialHeaderHeight - (scrollY - threshold) * 0.5) : initialHeaderHeight;
      setHeaderHeight(newHeight);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClearFilters = () => {
    setSelectedLocation([]);
    setSelectedSkills([]);
  };

  const onFinish = (query) => {
    if (!query || searchParams.name === "") {
      notification.error({
        message: "Có lỗi xảy ra",
        description: "Vui lòng chọn tiêu chí để search",
      });
      return;
    }
    navigate(`/search_job?${query}`);
  };

  const handleSearchChange = (e) => {
    setSearchParams({ ...searchParams, name: e.target.value });
  };

  const buildQuery = (params, sort, filter) => {
    const clone = { ...params };
    let parts = [];
    if (clone.name) parts.push(`name ~ '${clone.name}'`);
    if (clone.salary) parts.push(`salary ~ '${clone.salary}'`);
    if (clone.level && clone.level.length > 0) {
      parts.push(sfIn("level", clone.level));
    }
    clone.filter = parts.join(" and ");
    if (!clone.filter) delete clone.filter;
    clone.page = clone.current;
    clone.size = clone.pageSize;
    delete clone.current;
    delete clone.pageSize;
    delete clone.name;
    delete clone.salary;
    delete clone.level;
    let temp = queryString.stringify(clone);
    let sortBy = "";
    const fields = ["name", "salary", "createdAt", "updatedAt"];
    if (sort) {
      for (const field of fields) {
        if (sort[field]) {
          sortBy = `sort=${field},${sort[field] === "ascend" ? "asc" : "desc"}`;
          break;
        }
      }
    }
    if (!sortBy) {
      temp = `${temp}&sort=updatedAt,desc`;
    } else {
      temp = `${temp}&${sortBy}`;
    }
    console.log("Base query:", temp);
    return temp;
  };

  const handleSearch = () => {
    const baseQuery = buildQuery(searchParams, {}, null);
    let extraQuery = "";
    if (selectedLocation.length) {
      extraQuery += `&location=${selectedLocation.join(",")}`;
    }
    if (selectedSkills.length) {
      extraQuery += `&skills=${selectedSkills.join(",")}`;
    }
    const finalQuery = baseQuery + extraQuery;
    onFinish(finalQuery);
  };

  // Các mục navigation dùng chung
  const navItems = (
    <List>
      <ListItem button onClick={() => { navigate("/job_list"); setDrawerOpen(false); }}>
        <ListItemText primary="Việc làm HOT" />
      </ListItem>
      <ListItem button onClick={() => { navigate("/job_list"); setDrawerOpen(false); }}>
        <ListItemText primary="Việc làm" />
      </ListItem>
      <ListItem button onClick={() => { navigate("/company_list"); setDrawerOpen(false); }}>
        <ListItemText primary="Công ty" />
      </ListItem>
      <ListItem>
        <select className="filter-select" onChange={handleSelectChange} defaultValue="">
          <option value="" disabled>
            Sự kiện
          </option>
          <option value="events">Sự kiện</option>
        </select>
      </ListItem>
    </List>
  );

  return (
    <header
      className="header"
      style={{
        height: `${headerHeight}px`,
        transition: "height 0.3s ease",
        overflow: "visible",
      }}
    >
      <div className="header-top flex items-center justify-between px-4">
        <Link to="/" className="logo">
          NextDev
        </Link>
        {/* Desktop Navigation */}
        <nav className="nav-menu hidden md:flex gap-4">
          <button onClick={() => navigate("/job_list")} className="filter-select">
            Việc làm HOT
          </button>
          <button onClick={() => navigate("/job_list")} className="filter-select">
            Việc làm
          </button>
          <button onClick={() => navigate("/company_list")} className="filter-select">
            Công ty
          </button>
          <select className="filter-select" onChange={handleSelectChange} defaultValue="">
            <option value="" disabled>
              Sự kiện
            </option>
            <option value="events">Sự kiện</option>
          </select>
        </nav>
        {/* Mobile Navigation: IconButton mở Drawer */}
        {isMobile && (
          <IconButton onClick={() => setDrawerOpen(true)}>
            <MenuIcon />
          </IconButton>
        )}
        {isAuthenticated && user ? (
          <>
            {(user.role.name === "SUPER_ADMIN" || user.role.name === "COMPANY") && (
              <Button onClick={handleNavigate} variant="outlined">
                Trang quản trị
              </Button>
            )}
            <div
              className="user-menu-container"
              onMouseEnter={() => setShowUserDropdown(true)}
              onMouseLeave={() => setShowUserDropdown(false)}
            >
              <button className="user-button">
                <span className="user-icon">👤</span> {user.name}
              </button>
              {showUserDropdown && (
                <div className="user-dropdown">
                  <div className="dropdown-header flex items-center gap-3">
                    <img className="dropdown-avatar w-8 h-8 rounded-full" src={profile} alt="avatar" />
                    <div className="user-info-text">
                      <span className="user-name">{user.name}</span>
                      <span className="user-email">{user.email}</span>
                      <span className="user-role">Ứng viên</span>
                    </div>
                  </div>
                  <div
                    className="dropdown-item job-management-item"
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowJobManagementDropdown(!showJobManagementDropdown);
                    }}
                  >
                    <div className="job-management-header flex items-center gap-2">
                      <img width="18" height="18" src={job} alt="job-management" />
                      Quản lý việc làm
                    </div>
                    <span style={{ transform: showJobManagementDropdown ? "rotate(180deg)" : "rotate(0deg)" }}>
                      &#9660;
                    </span>
                    {showJobManagementDropdown && (
                      <div className="sub-dropdown">
                        <div className="dropdown-item" onClick={(e) => { e.stopPropagation(); navigate("/job-follow"); }}>
                          Việc làm yêu thích
                        </div>
                        <div className="dropdown-item" onClick={(e) => { e.stopPropagation(); navigate("/applied-jobs"); }}>
                          Việc làm đã ứng tuyển
                        </div>
                        <div className="dropdown-item" onClick={(e) => { e.stopPropagation(); navigate("/company_follow"); }}>
                          Công ty đã lưu
                        </div>
                      </div>
                    )}
                  </div>
                  <div
                    className="dropdown-item cv-management-item"
                    onClick={(e) => { e.stopPropagation(); setShowCvManagementDropdown(!showCvManagementDropdown); }}
                  >
                    <div className="cv-management-header flex items-center gap-2">
                      <img width="18" height="18" src={CV} alt="manage-cv" />
                      Quản lý CV
                    </div>
                    <span style={{ transform: showCvManagementDropdown ? "rotate(180deg)" : "rotate(0deg)" }}>
                      &#9660;
                    </span>
                    {showCvManagementDropdown && (
                      <div className="sub-dropdown">
                        <div className="dropdown-item" onClick={(e) => { e.stopPropagation(); navigate("/my-cv"); }}>
                          CV của tôi
                        </div>
                        <div className="dropdown-item" onClick={(e) => { e.stopPropagation(); navigate("/recruiters-view-profile"); }}>
                          Nhà tuyển dụng xem hồ sơ
                        </div>
                      </div>
                    )}
                  </div>
                  <div
                    className="dropdown-item security-item"
                    onClick={(e) => { e.stopPropagation(); setShowSecurityDropdown(!showSecurityDropdown); }}
                  >
                    <div className="security-header flex items-center gap-2">
                      <img width="18" height="18" src="https://img.icons8.com/ios-glyphs/30/resume.png" alt="profile-security" />
                      Cá nhân và bảo mật
                    </div>
                    <span style={{ transform: showSecurityDropdown ? "rotate(180deg)" : "rotate(0deg)" }}>
                      &#9660;
                    </span>
                    {showSecurityDropdown && (
                      <div className="sub-dropdown">
                        <div className="dropdown-item" onClick={(e) => { e.stopPropagation(); navigate("/profile"); }}>
                          Cài đặt thông tin cá nhân
                        </div>
                        <div className="dropdown-item" onClick={(e) => { e.stopPropagation(); navigate("/forgotpassword"); }}>
                          Đổi mật khẩu
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="dropdown-item logout-item" onClick={handleLogout}>
                    <img width="18" height="18" src="https://img.icons8.com/ios-glyphs/30/exit.png" alt="logout" />
                    Đăng xuất
                  </div>
                </div>
              )}
            </div>
          </>
        ) : (
          <Button onClick={() => navigate("/signin")} className="p-2 rounded bg-[#1C9EAF] text-white">
            Đăng nhập
          </Button>
        )}
      </div>
      {/* Menu search & filters */}
      <div className="header-search hidden md:block" style={{ opacity: searchOpacity, transition: "opacity 0.3s ease" }}>
        <div className="search-bar flex items-center gap-2">
          <input
            type="text"
            placeholder="Tìm kiếm theo công việc, công ty..."
            value={searchParams.name}
            onChange={handleSearchChange}
            className="p-2 border rounded"
          />
          <button className="search-button p-2 bg-blue-500 text-white rounded" onClick={handleSearch}>
            🔍
          </button>
        </div>
        <div className="filters flex gap-4 items-center mt-2">
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
          <button className="filter-clear-button p-2 border rounded" onClick={handleClearFilters}>
            Xóa bộ lọc
          </button>
        </div>
      </div>
      {/* Drawer cho Mobile Navigation */}
      <Drawer anchor="left" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        {navItems}
      </Drawer>
    </header>
  );
};

export default Header;