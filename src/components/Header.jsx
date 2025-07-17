import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Bỏ useLocation vì không cần thiết cho search
import { callLogout } from "../config/api"; // Bỏ callFetchAllSkill, LOCATION_LIST
import { notification } from "antd"; // Bỏ Select
import profile from "../assets/profile 1.png";
import job from "../assets/job.png";
import CV from "../assets/cv.png";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { setLogoutAction } from "../redux/slice/accountSlide";
import Button from "@mui/material/Button";
// Bỏ queryString, sfIn
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

const Header = () => {
  const navigate = useNavigate();
  // Bỏ useLocation
  const dispatch = useAppDispatch();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));

  const [quickSearchTerm, setQuickSearchTerm] = useState("");

  const handleQuickSearchKeyDown = (e) => {
    if (e.key === "Enter") {
      navigate(`/job_list?name=${encodeURIComponent(quickSearchTerm)}`);
    }
  };

  // Bỏ optionsLocation, optionsSkills, selectedLocation, selectedSkills, searchOpacity, headerHeight, searchParams

  const [showJobManagementDropdown, setShowJobManagementDropdown] =
    useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [showCvManagementDropdown, setShowCvManagementDropdown] =
    useState(false);
  const [showSecurityDropdown, setShowSecurityDropdown] = useState(false);

  const isAuthenticated = useAppSelector(
    (state) => state.account.isAuthenticated
  );
  const user = useAppSelector((state) => state.account.user);

  const handleSelectChange = (e) => {
    const value = e.target.value;
    if (value === "jobs" || value === "featured-jobs") {
      navigate("/job-list");
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
      notification.success({
        message: "Đăng xuất thành công",
      });
      navigate("/");
    }
  };

  // Bỏ useEffect để fetch skill và useEffect lắng nghe scroll (vì không còn search bar)

  // Bỏ handleClearFilters, onFinish, handleSearchChange, buildQuery, handleSearch

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
      </ListItem>
      <ListItem>
        <div className="">
          <input
            className="w-60 p-1 focus:outline-none text-[13px] border rounded"
            type="text"
            placeholder="Tìm kiếm theo công việc, công ty..."
            value={searchParams.name}
            onChange={handleSearchChange}
          />
          <button className="ml-2" onClick={handleSearch}>
            🔍
          </button>
        </div>
      </ListItem>
    </List>
  );

  return (
    <header
      className="header"
      // Loại bỏ style height và transition liên quan đến search bar
      style={{ overflow: "visible" }}
    >
      <div className="header-top flex flex-wrap items-center justify-between  ">
        <div className="flex items-center gap-2">
          <Link to="/" className="logo text-2xl font-bold text-[#1C9EAF]">
            NextDev
          </Link>

          {/* Thanh tìm kiếm nhỏ cạnh logo */}
          <input
            type="text"
            placeholder="Tìm công việc..."
            value={quickSearchTerm}
            onChange={(e) => setQuickSearchTerm(e.target.value)}
            onKeyDown={handleQuickSearchKeyDown}
            className="hidden sm:block px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#1C9EAF] w-70"
          />
        </div>

        <nav className="nav-menu md:block! hidden!">
          <button
            onClick={() => navigate("/job_list")}
            className="filter-select"
          >
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
              Công cụ
            </option>
            <option value="events">Câu hỏi phỏng vấn</option>
            <option value="events">Blog IT</option>
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
              onMouseEnter={() => setShowUserDropdown(true)}
              onMouseLeave={() => setShowUserDropdown(false)}
            >
              <button className="user-button">
                <span className="user-icon">👤</span> {user.name}
              </button>

              {showUserDropdown && (
                <div className="user-dropdown">
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

                  <div
                    className="dropdown-item job-management-item"
                    onClick={(e) => {
                      e.stopPropagation();
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
              Đăng nhập
            </button>
          </div>
        )}
        {(isMobile || isTablet) && (
          <IconButton onClick={() => setDrawerOpen(true)}>
            <MenuIcon />
          </IconButton>
        )}
      </div>
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
