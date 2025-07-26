import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Dropdown, notification } from "antd";
import { callLogout } from "../config/api"; // Bỏ callFetchAllSkill, LOCATION_LIST

import profile from "../assets/profile 1.png";
import job from "../assets/job.png";
import CV from "../assets/cv.png";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { setLogoutAction } from "../redux/slice/accountSlide";
import Button from "@mui/material/Button";
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
import queryString from "query-string";

// Hàm sfIn giả định (nếu bạn vẫn sử dụng nó ở đâu đó, hãy định nghĩa lại hoặc xóa)
const sfIn = (field, values) => {
  if (!values || values.length === 0) return "";
  return `${field} in (${values.map((v) => `'${v}'`).join(",")})`;
};

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

  const [searchParams, setSearchParams] = useState({
    name: "",
    salary: "",
    level: [],
    current: 1,
    pageSize: 15,
  });

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
    return temp;
  };

  const handleQuickSearchKeyDown = (e) => {
    if (e.key === "Enter") {
      const finalQuery = buildQuery(searchParams, {}, null);
      if (!finalQuery) {
        notification.error({
          message: "Có lỗi xảy ra",
          description: "Vui lòng nhập từ khóa để tìm kiếm",
        });
        return;
      }
      navigate(`/search_job?${finalQuery}`);
      setDrawerOpen(false); // Đóng drawer sau khi tìm kiếm
    }
  };

  const isAuthenticated = useAppSelector(
    (state) => state.account.isAuthenticated
  );
  const user = useAppSelector((state) => state.account.user);

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

  // Menu items for the main navigation and Drawer
  const navLinks = [
    { label: "Việc làm HOT", path: "/hotjobs" },
    { label: "Việc làm", path: "/job_list" },
    { label: "Công ty", path: "/company_list" },
  ];

  const toolItems = [
    {
      key: "interview-question",
      label: (
        // Áp dụng Tailwind classes trực tiếp cho Link trong Dropdown
        <Link
          to="/interview_question"
          onClick={() => setDrawerOpen(false)}
          className="text-[#1C9EAF] no-underline hover:text-[#177F8A]" // Thêm no-underline
        >
          Câu hỏi phỏng vấn
        </Link>
      ),
    },
    // Add other tool items here
  ];

  // User dropdown menu items
  const userMenuItems = [
    {
      label: (
        <div className="flex items-center gap-2">
          <img className="w-4 h-4" src={job} alt="job-management" />
          Quản lý việc làm
        </div>
      ),
      children: [
        {
          key: "job-follow",
          label: (
            <Link
              to="/job-follow"
              className="text-gray-700 hover:text-[#1C9EAF] no-underline"
            >
              Việc làm yêu thích
            </Link>
          ),
        },
        {
          key: "applied-jobs",
          label: (
            <Link
              to="/applied-jobs"
              className="text-gray-700 hover:text-[#1C9EAF] no-underline"
            >
              Việc làm đã ứng tuyển
            </Link>
          ),
        },
        {
          key: "company-follow",
          label: (
            <Link
              to="/company_follow"
              className="text-gray-700 hover:text-[#1C9EAF] no-underline"
            >
              Công ty đã lưu
            </Link>
          ),
        },
      ],
    },
    {
      label: (
        <div className="flex items-center gap-2">
          <img className="w-4 h-4" src={CV} alt="manage-cv" />
          Quản lý CV
        </div>
      ),
      children: [
        {
          key: "my-cv",
          label: (
            <Link
              to="/my-cv"
              className="text-gray-700 hover:text-[#1C9EAF] no-underline"
            >
              CV của tôi
            </Link>
          ),
        },
        {
          key: "recruiters-view-profile",
          label: (
            <Link
              to="/recruiters-view-profile"
              className="text-gray-700 hover:text-[#1C9EAF] no-underline"
            >
              Nhà tuyển dụng xem hồ sơ
            </Link>
          ),
        },
      ],
    },
    {
      label: (
        <div className="flex items-center gap-2">
          <img
            className="w-4 h-4"
            src="https://img.icons8.com/ios-glyphs/30/resume.png"
            alt="profile-security"
          />
          Cá nhân và bảo mật
        </div>
      ),
      children: [
        {
          key: "profile",
          label: (
            <Link
              to="/profile"
              className="text-gray-700 hover:text-[#1C9EAF] no-underline"
            >
              Cài đặt thông tin cá nhân
            </Link>
          ),
        },
        {
          key: "change-password",
          label: (
            <Link
              to="/forgotpassword"
              className="text-gray-700 hover:text-[#1C9EAF] no-underline"
            >
              Đổi mật khẩu
            </Link>
          ),
        },
      ],
    },
    {
      type: "divider", // Add a divider for separation
    },
    {
      label: (
        <div className="flex items-center gap-2 text-red-500">
          <img
            className="w-4 h-4"
            src="https://img.icons8.com/ios-glyphs/30/exit.png"
            alt="logout"
          />
          Đăng xuất
        </div>
      ),
      key: "logout",
      onClick: handleLogout,
    },
  ];

  return (
    <header className="header bg-white shadow-md sticky top-0 z-50 ">
      <div className="flex items-center justify-between px-4 py-3 max-w-7xl mx-auto">
        {/* Logo và Thanh tìm kiếm */}
        <div className="flex gap-4 absolute left-10">
          <Link
            to="/"
            className="logo text-2xl font-bold text-[#1C9EAF] flex-shrink-0"
          >
            NextDev
          </Link>

          {/* Thanh tìm kiếm nhỏ */}
          <div className="flex-grow mr-4">
            <input
              type="text"
              placeholder="Tìm công việc..."
              value={searchParams.name}
              onChange={handleSearchChange}
              onKeyDown={handleQuickSearchKeyDown}
              className="hidden sm:block px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#1C9EAF] w-full max-w-xs"
            />
          </div>
        </div>

        {/* Menu điều hướng chính (hiển thị trên màn hình lớn) */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((item) => (
            <div
              onClick={() => navigate(`${item.path}`)}
              // Thay đổi màu mặc định và loại bỏ gạch chân cho Link
              className="text-sm text-[#1C9EAF] no-underline hover:text-[#177F8A] font-medium transition-colors duration-200 cursor-pointer"
            >
              {item.label}
            </div>
          ))}
          <Dropdown menu={{ items: toolItems }} placement="bottom">
            <Button
              sx={{
                // Áp dụng sx cho Button để thay đổi màu và bỏ gạch chân
                color: "#1C9EAF",
                textDecoration: "none",
                "&:hover": {
                  color: "#177F8A",
                  backgroundColor: "transparent", // Đảm bảo hover không thay đổi nền nếu không muốn
                },
                // Nếu muốn giữ các class Tailwind đã có, bạn có thể gộp sx và className
                // hoặc định nghĩa style hoàn toàn trong sx
              }}
            >
              Công cụ
            </Button>
          </Dropdown>
        </nav>

        {/* Phần người dùng/đăng nhập/hamburger menu */}
        <div className="flex items-center gap-4">
          {user && isAuthenticated ? (
            <>
              {(user.role.name === "SUPER_ADMIN" ||
                user.role.name === "COMPANY") && (
                <Button
                  onClick={handleNavigate}
                  variant="outlined"
                  className="hidden sm:block text-[#1C9EAF] border-[#1C9EAF] hover:bg-[#1C9EAF] hover:text-white transition-colors duration-200"
                >
                  Trang quản trị
                </Button>
              )}
              {/* Dropdown người dùng Ant Design */}
              <Dropdown
                menu={{ items: userMenuItems }}
                trigger={["click"]} // Trigger on click for better mobile experience
                placement="bottomRight"
              >
                <Button className="user-button flex items-center gap-2 p-2 rounded-full border border-gray-300 hover:bg-gray-100">
                  <span className-="text-xl">👤</span>{" "}
                  <span className="hidden sm:block font-medium">
                    {user.name}
                  </span>
                </Button>
              </Dropdown>
            </>
          ) : (
            <Button
              onClick={() => navigate("/signin")}
              variant="contained"
              sx={{
                bgcolor: "#1C9EAF",
                "&:hover": {
                  bgcolor: "#177F8A",
                },
                textTransform: "none",
                px: 3, // Thêm padding x
                py: 1, // Thêm padding y
              }}
            >
              Đăng nhập
            </Button>
          )}

          {/* Hamburger menu icon cho màn hình nhỏ */}
          {isSmallScreen && (
            <IconButton onClick={() => setDrawerOpen(true)} color="inherit">
              <MenuIcon />
            </IconButton>
          )}
        </div>
      </div>

      {/* Drawer (Menu di động) */}
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        <Box sx={{ width: 250 }} role="presentation">
          <List>
            {/* Thanh tìm kiếm trong Drawer cho màn hình nhỏ */}
            <ListItem>
              <input
                type="text"
                placeholder="Tìm công việc..."
                value={searchParams.name}
                onChange={handleSearchChange}
                onKeyDown={handleQuickSearchKeyDown}
                className="px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#1C9EAF] w-full"
              />
            </ListItem>
            {navLinks.map((item) => (
              <ListItem
                button
                key={item.path}
                onClick={() => {
                  navigate(item.path);
                  setDrawerOpen(false);
                }}
              >
                <ListItemText
                  primary={item.label}
                  sx={{
                    "& .MuiListItemText-primary": {
                      color: "#1c9eaf",
                      textDecoration: "none",
                    },
                  }}
                />
              </ListItem>
            ))}
            <ListItem button onClick={() => setDrawerOpen(false)}>
              <Dropdown menu={{ items: toolItems }} placement="bottomLeft">
                <Button className="w-full justify-start normal-case">
                  <ListItemText
                    primary="Công cụ"
                    sx={{
                      "& .MuiListItemText-primary": {
                        color: "#1c9eaf",
                        textDecoration: "none",
                      },
                    }}
                  />
                </Button>
              </Dropdown>
            </ListItem>

            {/* Mục quản trị trong Drawer nếu người dùng là admin/company */}
            {user &&
              isAuthenticated &&
              (user.role.name === "SUPER_ADMIN" ||
                user.role.name === "COMPANY") && (
                <ListItem
                  button
                  onClick={() => {
                    handleNavigate();
                    setDrawerOpen(false);
                  }}
                >
                  <ListItemText
                    primary="Trang quản trị"
                    sx={{
                      "& .MuiListItemText-primary": {
                        color: "#1c9eaf",
                        textDecoration: "none",
                      },
                    }}
                  />
                </ListItem>
              )}
            <div className="relative">
              {/* Các mục user menu (Quản lý việc làm, CV, Bảo mật, Đăng xuất) trong Drawer */}
              {user && isAuthenticated && (
                <>
                  <div className="absolute right-0">
                    <ListItem button onClick={() => navigate("/job-follow")}>
                      <ListItemText
                        primary="Việc làm yêu thích"
                        sx={{
                          "& .MuiListItemText-primary": {
                            color: "#1c9eaf",
                            textDecoration: "none",
                          },
                        }}
                      />
                    </ListItem>
                    <ListItem button onClick={() => navigate("/applied-jobs")}>
                      <ListItemText
                        primary="Việc làm đã ứng tuyển"
                        sx={{
                          "& .MuiListItemText-primary": {
                            color: "#1c9eaf",
                            textDecoration: "none",
                          },
                        }}
                      />
                    </ListItem>
                    <ListItem
                      button
                      onClick={() => navigate("/company_follow")}
                    >
                      <ListItemText
                        primary="Công ty đã lưu"
                        sx={{
                          "& .MuiListItemText-primary": {
                            color: "#1c9eaf",
                            textDecoration: "none",
                          },
                        }}
                      />
                    </ListItem>
                    <ListItem button onClick={() => navigate("/my-cv")}>
                      <ListItemText
                        primary="CV của tôi"
                        sx={{
                          "& .MuiListItemText-primary": {
                            color: "#1c9eaf",
                            textDecoration: "none",
                          },
                        }}
                      />
                    </ListItem>
                    <ListItem
                      button
                      onClick={() => navigate("/recruiters-view-profile")}
                    >
                      <ListItemText
                        primary="Nhà tuyển dụng xem hồ sơ"
                        sx={{
                          "& .MuiListItemText-primary": {
                            color: "#1c9eaf",
                            textDecoration: "none",
                          },
                        }}
                      />
                    </ListItem>
                    <ListItem button onClick={() => navigate("/profile")}>
                      <ListItemText
                        primary="Cài đặt thông tin cá nhân"
                        sx={{
                          "& .MuiListItemText-primary": {
                            color: "#1c9eaf",
                            textDecoration: "none",
                          },
                        }}
                      />
                    </ListItem>
                    <ListItem
                      button
                      onClick={() => navigate("/forgotpassword")}
                    >
                      <ListItemText
                        primary="Đổi mật khẩu"
                        sx={{
                          "& .MuiListItemText-primary": {
                            color: "#1c9eaf",
                            textDecoration: "none",
                          },
                        }}
                      />
                    </ListItem>
                    <ListItem button onClick={handleLogout}>
                      <ListItemText
                        primary="Đăng xuất"
                        sx={{
                          "& .MuiListItemText-primary": {
                            color: "#ef4444",
                            textDecoration: "none",
                          },
                        }}
                      />
                    </ListItem>
                  </div>
                </>
              )}
            </div>
          </List>
        </Box>
      </Drawer>
    </header>
  );
};

export default Header;
