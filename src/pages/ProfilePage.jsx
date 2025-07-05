import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import avatar from "../assets/profile 1.png";
import { callFetchUserById } from "../config/api";
import { useAppSelector } from "../redux/hooks";

const ProfilePage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isAuthenticated = useAppSelector((state) => state.account.isAuthenticated);
  const user = useAppSelector((state) => state.account.user);

  // Sử dụng state displayUser để lưu thông tin người dùng sau khi call API cập nhật
  const [displayUser, setDisplayUser] = useState(user);
  const [isLoading, setIsLoading] = useState(false);

  const fetchUserData = async () => {
    try {
      setIsLoading(true);
      const res = await callFetchUserById(user.id);
      if (res && res.data) {
        setDisplayUser(res.data);
        console.log("Dữ liệu người dùng đã tải:", res.data);
      }
    } catch (error) {
      console.error("Lỗi khi tải dữ liệu người dùng:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (user && isAuthenticated) {
      fetchUserData();
    }
  }, [user, isAuthenticated]);

  return (
    <div className="homepage-wrapper">
      <header className={location.pathname === "/profile" ? "header-no-search" : ""}>
        <div className="header-top">
          <Link to="/" className="logo">
            NextDev
          </Link>
          <button className="user-button">
            <span className="user-icon">👤</span> Hồ sơ
          </button>
        </div>
        {location.pathname !== "/profile" && (
          <div className="header-search">
            <div className="search-bar">
              <input type="text" placeholder="Tìm kiếm công việc..." />
              <button className="search-button">Tìm</button>
            </div>
            <div className="filters">
              <select className="filter-select">
                <option value="">Lọc theo kinh nghiệm</option>
                <option value="0-1">0-1 năm</option>
                <option value="1-3">1-3 năm</option>
              </select>
              <button className="filter-clear-button">Xóa bộ lọc</button>
            </div>
          </div>
        )}
      </header>

      <main className="main-content">
        <div className="profile-page">
          <div className="profile-card">
            <div className="profile-section">
              <h2>Thông Tin Chung</h2>
              <div className="profile-header">
                <img src={avatar} alt="Avatar" className="profile-avatar" />
                <div className="profile-info">
                  <h1>{displayUser?.name}</h1>
                  {/* <p className="role">{displayUser?.role}</p> */}
                  <p>
                    <strong>Địa chỉ:</strong> {displayUser?.address}
                  </p>
                  <p>
                    <strong>Email:</strong> {displayUser?.email}
                  </p>
                  {/* <p>
                    <strong>Ngày sinh:</strong> {displayUser?.dob}
                  </p> */}
                  <p>
                    <strong>SĐT:</strong> {displayUser?.phone}
                  </p>
                  {/* <p>
                    <strong>LinkedIn:</strong>{" "}
                    <a href={displayUser?.linkedin} 
                       target="_blank" 
                       rel="noopener noreferrer">
                      {displayUser?.linkedin}
                    </a>
                  </p> */}
                  {/* <p>
                    <strong>GitHub:</strong>{" "}
                    <a href={displayUser?.github} 
                       target="_blank" 
                       rel="noopener noreferrer">
                      {displayUser?.github}
                    </a>
                  </p>
                  <p>
                    <strong>Website:</strong>{" "}
                    <a 
                      href={`http://${displayUser?.website}`} 
                      target="_blank" 
                      rel="noopener noreferrer">
                      {displayUser?.website}
                    </a>
                  </p> */}
                </div>
                <span className="edit-icon" onClick={() => navigate("/edit-profile")}>✎</span>
              </div>
            </div>

            <div className="profile-section">
              <h2>Kinh Nghiệm & Nền Tảng</h2>
              <div className="profile-details">
                <div className="section">
                  <h3>Kỹ năng</h3>
                  <p className="section-note">Chọn kỹ năng phù hợp với hồ sơ</p>
                  <div className="skills">
                    {displayUser?.skills && displayUser.skills.length > 0 ? (
                      displayUser.skills.map((skill, index) => (
                        <span key={index} className="skill-tag">
                          {skill.name}
                        </span>
                      ))
                    ) : (
                      <p>Chưa có kỹ năng</p>
                    )}
                  </div>
                  <span className="edit-icon" onClick={() => navigate("/edit-profile")}>✎</span>
                </div>
              </div>
            </div>

            <div className="profile-actions">
              <button className="edit-button" onClick={() => navigate("/edit-profile")}>
                Chỉnh sửa hồ sơ
              </button>
            </div>
          </div>
        </div>
      </main>

      <footer>
        <div className="footer-container">
          <div className="footer-section">
            <a href="/" className="footer-logo">
              NextDev
            </a>
            <p>Kết nối tài năng công nghệ với cơ hội nghề nghiệp.</p>
          </div>
          <div className="footer-section">
            <h4>Liên hệ</h4>
            <p>Email: support@nextdev.com</p>
            <p>Điện thoại: 0909 123 456</p>
          </div>
          <div className="footer-section">
            <h4>Theo dõi chúng tôi</h4>
            <div className="social-links">
              <a href="https://facebook.com">Facebook</a>
              <a href="https://linkedin.com">LinkedIn</a>
              <a href="https://twitter.com">Twitter</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ProfilePage;