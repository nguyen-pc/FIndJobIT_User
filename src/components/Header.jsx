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
import {
  Box,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

const { Option = Select.Option } = Select;

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));
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

  const [showJobManagementDropdown, setShowJobManagementDropdown] =
    useState(false); // Trạng thái hiển thị menu con quản lý việc làm
  const [showUserDropdown, setShowUserDropdown] = useState(false); // Trạng thái hiển thị menu chính của người dùng

  // Thêm trạng thái cho menu con của Quản lý CV và Cá nhân & Bảo mật
  const [showCvManagementDropdown, setShowCvManagementDropdown] =
    useState(false);
  const [showSecurityDropdown, setShowSecurityDropdown] = useState(false);

  const isAuthenticated = useAppSelector(
    (state) => state.account.isAuthenticated
  );
  const user = useAppSelector((state) => state.account.user);
  // console.log("user", user);

  // Hàm xử lý khi chọn từ các dropdown filter trên thanh điều hướng
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

  const handleNavigate = () => {
    if (user.role.name === "COMPANY") {
      navigate("/employer/dashboard");
    } else if (user.role.name === "SUPER_ADMIN") {
      navigate("/admin/dashboard");
    }
  };

  const handleLogout = async () => {
    const res = await callLogout();
    if (res && res && +res.statusCode === 200) {
      dispatch(setLogoutAction({}));
      // message.success("Đăng xuất thành công");
      navigate("/");
    }
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
    navigate(`/search_job?${query}`);
  };
  const handleSearchChange = (e) => {
    setSearchParams({ ...searchParams, name: e.target.value });
  };

  const buildQuery = (params, sort, filter) => {
    // if (searchParams.name === "") {
    //   return "";
    // }
    const clone = { ...params };
    let parts = [];
    if (clone.name) parts.push(`name ~ '${clone.name}'`);
    if (clone.salary) parts.push(`salary ~ '${clone.salary}'`);
    if (clone.level && clone.level.length > 0) {
      parts.push(sfIn("level", clone.level));
    }

    clone.filter = parts.join(" and ");
    if (!clone.filter) delete clone.filter;

    // Chuyển đổi phân trang: current => page, pageSize => size
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
          break; // Nếu chỉ xử lý 1 trường sắp xếp, loại bỏ break nếu cần nhiều trường
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

  // Xây dựng query và truyền cho onFinish khi click search button
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
      <ListItem
        button
        onClick={() => {
          navigate("/job_list");
          setDrawerOpen(false);
        }}
      >
        <ListItemText primary="Việc làm HOT" />
      </ListItem>
      <ListItem
        button
        onClick={() => {
          navigate("/job_list");
          setDrawerOpen(false);
        }}
      >
        <ListItemText primary="Việc làm" />
      </ListItem>
      <ListItem
        button
        onClick={() => {
          navigate("/company_list");
          setDrawerOpen(false);
        }}
      >
        <ListItemText primary="Công ty" />
      </ListItem>
      <ListItem>
        <ListItemText primary="Công cụ" />
        {/* <select
          className="filter-select"
          onChange={handleSelectChange}
          defaultValue=""
        >
          <option value="" disabled>
            Sự kiện
          </option>
          <option value="events">Sự kiện</option>
        </select> */}
      </ListItem>
    </List>
  );

  return (
    <header
      className="header"
      style={{
        height: `${headerHeight}px`,
        transition: "height 0.3s ease",
        overflow: "visible", // Quan trọng để dropdown không bị cắt
      }}
    >
      <div className="header-top flex flex-row items-center justify-between">
        <Link to="/" className="logo">
          NextDev
        </Link>
        {/* <div className=" ml-10  w-60 rounded   text-center pt-1 h-10 border text-sm">
          <input
            type="text"
            placeholder="Tìm kiếm theo công việc, công ty..."
            className="w-60 p-1  focus:outline-none text-[13px]"
          />
        </div> */}

        {/* Các phần Navigation khác */}
        <nav className="nav-menu md:block! hidden!">
          <button
            onClick={() => navigate("/job_list")}
            className="filter-select"
          >
            {" "}
            Việc làm HOT
          </button>
          <button
            onClick={() => navigate("/job_list")}
            className="filter-select"
          >
            Việc làm
          </button>
          <button
            onClick={() => navigate("/company_list")}
            className="filter-select"
          >
            Công ty
          </button>
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

        {user && isAuthenticated ? (
          <>
            {(user.role.name === "SUPER_ADMIN" ||
              user.role.name === "COMPANY") && (
              <Button onClick={() => handleNavigate()} variant="outlined">
                Trang quản trị
              </Button>
            )}
            <div
              className="user-menu-container"
              onMouseEnter={() => setShowUserDropdown(true)} // Khi chuột vào container
              onMouseLeave={() => setShowUserDropdown(false)} // Khi chuột rời container
            >
              <button className="user-button">
                {" "}
                {/* Không có onClick ở đây nữa */}
                <span className="user-icon">👤</span> {user.name}
              </button>

              {showUserDropdown && ( // Hiển thị menu chính của người dùng nếu showUserDropdown là true
                <div className="user-dropdown">
                  {/* Header của dropdown người dùng */}
                  <div className="dropdown-header">
                    <img
                      className="dropdown-avatar"
                      src={profile}
                      alt="avatar"
                    />
                    <div className="user-info-text">
                      <span className="user-name">{user.name}</span>
                      <span className="user-email">{user.email}</span>
                      <span className="user-role">Ứng viên</span>
                    </div>
                  </div>

                  {/* Mục cha "Quản lý việc làm" với mũi tên */}
                  <div
                    className="dropdown-item job-management-item"
                    onClick={(e) => {
                      // Sử dụng onClick để mở/đóng menu con
                      e.stopPropagation(); // Ngăn chặn đóng menu chính khi nhấp vào mục này
                      setShowJobManagementDropdown(!showJobManagementDropdown);
                    }}
                  >
                    <div className="job-management-header">
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "10px",
                        }}
                      >
                        <img
                          width="18px"
                          height="18px"
                          src={job}
                          alt="job-management"
                        />
                        Quản lý việc làm
                      </div>
                      <span
                        className="dropdown-arrow"
                        style={{
                          transform: showJobManagementDropdown
                            ? "rotate(180deg)"
                            : "rotate(0deg)",
                        }}
                      >
                        &#9660;
                      </span>
                    </div>

                    {showJobManagementDropdown && (
                      <div className="sub-dropdown">
                        <div
                          className="dropdown-item"
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate("/job-follow");
                          }}
                        >
                          Việc làm yêu thích
                        </div>
                        <div
                          className="dropdown-item"
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate("/applied-jobs");
                          }}
                        >
                          Việc làm đã ứng tuyển
                        </div>
                        <div
                          className="dropdown-item"
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate("/company_follow");
                          }}
                        >
                          Công ty đã lưu
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Mục cha "Quản lý CV" với mũi tên */}
                  <div
                    className="dropdown-item cv-management-item"
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowCvManagementDropdown(!showCvManagementDropdown);
                    }}
                  >
                    <div className="cv-management-header">
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "10px",
                        }}
                      >
                        <img
                          width="18px"
                          height="18px"
                          src={CV}
                          alt="manage-cv"
                        />
                        Quản lý CV
                      </div>
                      <span
                        className="dropdown-arrow"
                        style={{
                          transform: showCvManagementDropdown
                            ? "rotate(180deg)"
                            : "rotate(0deg)",
                        }}
                      >
                        &#9660;
                      </span>
                    </div>

                    {showCvManagementDropdown && (
                      <div className="sub-dropdown">
                        <div
                          className="dropdown-item"
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate("/my-cv");
                          }}
                        >
                          CV của tôi
                        </div>
                        <div
                          className="dropdown-item"
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate("/recruiters-view-profile");
                          }}
                        >
                          Nhà tuyển dụng xem hồ sơ
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Mục cha "Cá nhân và bảo mật" với mũi tên */}
                  <div
                    className="dropdown-item security-item"
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowSecurityDropdown(!showSecurityDropdown);
                    }}
                  >
                    <div className="security-header">
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "10px",
                        }}
                      >
                        <img
                          width="18px"
                          height="18px"
                          src="https://img.icons8.com/ios-glyphs/30/resume.png"
                          alt="profile-security"
                        />
                        Cá nhân và bảo mật
                      </div>
                      <span
                        className="dropdown-arrow"
                        style={{
                          transform: showSecurityDropdown
                            ? "rotate(180deg)"
                            : "rotate(0deg)",
                        }}
                      >
                        &#9660;
                      </span>
                    </div>

                    {showSecurityDropdown && (
                      <div className="sub-dropdown">
                        <div
                          className="dropdown-item"
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate("/profile");
                          }}
                        >
                          Cài đặt thông tin cá nhân
                        </div>
                        <div
                          className="dropdown-item"
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate("/forgotpassword");
                          }}
                        >
                          Đổi mật khẩu
                        </div>
                      </div>
                    )}
                  </div>

                  <div
                    className="dropdown-item logout-item"
                    onClick={() => handleLogout()}
                  >
                    <img
                      width="18px"
                      height="18px"
                      src="https://img.icons8.com/ios-glyphs/30/exit.png"
                      alt="logout"
                    />
                    Đăng xuất
                  </div>
                </div>
              )}
            </div>
          </>
        ) : (
          <div>
            <button
              onClick={() => navigate("/signin")}
              className="p-2 rounded bg-[#1C9EAF] text-white :hover:bg-[#1C9EAF]/90 "
            >
              {" "}
              Đăng nhập
            </button>
          </div>
        )}
        {/* Mobile Navigation: IconButton mở Drawer */}
        {(isMobile || isTablet) && (
          <IconButton onClick={() => setDrawerOpen(true)}>
            <MenuIcon />
          </IconButton>
        )}

        {/* Container cho menu người dùng và dropdown của nó */}
      </div>
      {/* Phần header search */}
      <div
        className="header-search hidden! lg:block!"
        style={{ opacity: searchOpacity, transition: "opacity 0.3s ease" }}
      >
        <div className="search-bar">
          <input
            type="text"
            placeholder="Tìm kiếm theo công việc, công ty..."
            value={searchParams.name}
            onChange={handleSearchChange}
          />
          <button className="search-button" onClick={handleSearch}>
            🔍
          </button>
        </div>
        <div
          className="filters mt-2"
          style={{ display: "flex", gap: "1rem", alignItems: "center" }}
        >
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
      {/* Drawer cho Mobile Navigation */}
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        <Box sx={{ width: "50vw" }}>{navItems}</Box>
      </Drawer>
    </header>
  );
};

export default Header;
