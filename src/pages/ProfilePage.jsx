import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import avatar from '../assets/profile 1.png'; // Thay bằng đường dẫn ảnh avatar thực tế

const ProfilePage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const user = {
    name: 'Nguyễn Chí Thiện',
    role: 'BACK-END DEVELOPER • 2 năm kinh nghiệm',
    address: 'TP. Cần Thơ, Quận Ninh Kiều',
    email: 'nthien2805@gmail.com',
    dob: '28/05/2004',
    phone: '0963998260',
    linkedin: 'linkedin.com/in/nthien2805',
    github: 'github.com/nthien2805',
    website: 'www.nthienportfolio.com',
    summary: 'Cung cấp thông tin chi tiết về việc học tập, kinh nghiệm làm việc, và các dự án đã từng tham gia. Đam mê phát triển phần mềm backend và từng hợp tác tại FPT Software.',
    skills: ['SQL', 'Tester', 'Automation Tester', 'JavaScript', 'Node.js', 'Python', 'Git'],
    capabilities: ['Làm việc nhóm', 'Giao tiếp', 'Quản lý thời gian', 'Kỹ năng giải quyết vấn đề'],
    experience: [
      { title: 'Back-end Developer tại FPT Software', date: '02/2025 - Hiện tại', note: 'Phát triển API RESTful, tối ưu hóa backend với Node.js và SQL.' },
      { title: 'Intern Developer tại ABC Corp', date: '06/2024 - 12/2024', note: 'Hỗ trợ xây dựng ứng dụng web, học quy trình Agile.' },
    ],
    education: [
      { degree: 'Kỹ sư Công nghệ Thông tin', institution: 'Đại học Cần Thơ', date: '09/2022 - 06/2025', note: 'GPA: 3.5/4.0, hoàn thành khóa luận.' },
      { degree: 'Chứng chỉ Trung cấp CNTT', institution: 'Trung tâm Đào tạo Tin học TP.HCM', date: '06/2021 - 05/2022', note: 'Chuyên sâu lập trình cơ bản.' },
    ],
    projects: [
      { title: 'Hệ thống quản lý nhân sự', date: '03/2025 - 05/2025', note: 'Xây dựng API với Node.js, triển khai trên AWS.' },
      { title: 'Ứng dụng quản lý công việc', date: '01/2025 - 02/2025', note: 'Phát triển với React và Express, triển khai trên Heroku.' },
    ],
    certificates: [
      { name: 'Chứng chỉ AWS Certified Developer', date: '04/2025', issuer: 'Amazon Web Services', note: 'Triển khai ứng dụng trên AWS.' },
      { name: 'Chứng chỉ JavaScript', date: '08/2024', issuer: 'FreeCodeCamp', note: 'Hoàn thành khóa học nâng cao.' },
    ],
    languages: [
      { name: 'Tiếng Việt', level: 'Mẹ đẻ', note: 'Thành thạo giao tiếp và công việc.' },
      { name: 'Tiếng Anh', level: 'Trung cấp (B2)', note: 'IELTS 6.0, đọc tài liệu kỹ thuật.' },
      { name: 'Tiếng Nhật', level: 'Sơ cấp (N5)', note: 'Đang học giao tiếp cơ bản.' },
    ],
  };

  return (
    <div className="homepage-wrapper">
      <header className={location.pathname === '/profile' ? 'header-no-search' : ''}>
        <div className="header-top">
          <Link to="/" className="logo">NextDev</Link>
          {/* <nav className="nav-menu">
            <select className="filter-select">
              <option value="">Tất cả ngành nghề</option>
              <option value="it">CNTT</option>
              <option value="marketing">Marketing</option>
            </select>
            <select className="filter-select">
              <option value="">Tất cả địa điểm</option>
              <option value="hanoi">Hà Nội</option>
              <option value="hcm">TP.HCM</option>
            </select>
          </nav> */}
          <button className="user-button">
            <span className="user-icon">👤</span> Hồ sơ
          </button>
        </div>
        {location.pathname !== '/profile' && (
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
                  <h1>{user.name}</h1>
                  <p className="role">{user.role}</p>
                  <p><strong>Địa chỉ:</strong> {user.address}</p>
                  <p><strong>Email:</strong> {user.email}</p>
                  <p><strong>Ngày sinh:</strong> {user.dob}</p>
                  <p><strong>SĐT:</strong> {user.phone}</p>
                  <p><strong>LinkedIn:</strong> <a href={user.linkedin} target="_blank" rel="noopener noreferrer">{user.linkedin}</a></p>
                  <p><strong>GitHub:</strong> <a href={user.github} target="_blank" rel="noopener noreferrer">{user.github}</a></p>
                  <p><strong>Website:</strong> <a href={`http://${user.website}`} target="_blank" rel="noopener noreferrer">{user.website}</a></p>
                </div>
                <span className="edit-icon">✎</span>
              </div>
            </div>

            <div className="profile-section">
              <h2>Kinh Nghiệm & Nền Tảng</h2>
              <div className="profile-details">
                <div className="section">
                  <h3>Tóm tắt</h3>
                  <p className="summary-text">{user.summary}</p>
                  <span className="edit-icon">✎</span>
                </div>
                <div className="section">
                  <h3>Kỹ năng</h3>
                  <p className="section-note">Chọn kỹ năng phù hợp với hồ sơ</p>
                  <div className="skills">
                    {user.skills.map((skill, index) => (
                      <span key={index} className="skill-tag">{skill}</span>
                    ))}
                  </div>
                  <span className="edit-icon">✎</span>
                </div>
                <div className="section">
                  <h3>Kỹ năng mềm</h3>
                  <div className="capabilities">
                    {user.capabilities.map((cap, index) => (
                      <span key={index} className="capability-tag">{cap}</span>
                    ))}
                  </div>
                  <span className="edit-icon">✎</span>
                </div>
              </div>
            </div>

            <div className="profile-section">
              <h2>Kinh Nghiệm Làm Việc</h2>
              <div className="profile-details">
                {user.experience.map((exp, index) => (
                  <div className="section" key={index}>
                    <h3>{exp.title}</h3>
                    <p><strong>Thời gian:</strong> {exp.date}</p>
                    <p><strong>Ghi chú:</strong> {exp.note}</p>
                    <span className="edit-icon">✎</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="profile-section">
              <h2>Học Vấn</h2>
              <div className="profile-details">
                {user.education.map((edu, index) => (
                  <div className="section" key={index}>
                    <h3>{edu.degree} - {edu.institution}</h3>
                    <p><strong>Thời gian:</strong> {edu.date}</p>
                    <p><strong>Ghi chú:</strong> {edu.note}</p>
                    <span className="edit-icon">✎</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="profile-section">
              <h2>Dự Án</h2>
              <div className="profile-details">
                {user.projects.map((proj, index) => (
                  <div className="section" key={index}>
                    <h3>{proj.title}</h3>
                    <p><strong>Thời gian:</strong> {proj.date}</p>
                    <p><strong>Ghi chú:</strong> {proj.note}</p>
                    <span className="edit-icon">✎</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="profile-section">
              <h2>Chứng Chỉ</h2>
              <div className="profile-details">
                {user.certificates.map((cert, index) => (
                  <div className="section" key={index}>
                    <h3>{cert.name} - {cert.issuer}</h3>
                    <p><strong>Thời gian:</strong> {cert.date}</p>
                    <p><strong>Ghi chú:</strong> {cert.note}</p>
                    <span className="edit-icon">✎</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="profile-section">
              <h2>Thêm thông tin</h2>
              <div className="profile-details">
                <div className="section">
                  <h3>Thông tin cá nhân bổ sung</h3>
                  <p><strong>Website:</strong> <a href="http://www.nthienportfolio.com" target="_blank" rel="noopener noreferrer">www.nthienportfolio.com</a></p>
                  <p><strong>Sở thích:</strong> Đọc sách, lập trình, chơi game</p>
                  <span className="edit-icon">✎</span>
                </div>
                <div className="section">
                  <h3>Kỹ năng</h3>
                  <p className="section-note">Chọn kỹ năng phù hợp với hồ sơ</p>
                  <div className="skills">
                    {user.skills.map((skill, index) => (
                      <span key={index} className="skill-tag">{skill}</span>
                    ))}
                  </div>
                  <span className="edit-icon">✎</span>
                </div>
                <div className="section">
                  <h3>Kỹ năng mềm</h3>
                  <div className="capabilities">
                    {user.capabilities.map((cap, index) => (
                      <span key={index} className="capability-tag">{cap}</span>
                    ))}
                  </div>
                  <span className="edit-icon">✎</span>
                </div>
              </div>
            </div>

            <div className="profile-section">
              <h2>Ngôn Ngữ</h2>
              <div className="profile-details">
                {user.languages.map((lang, index) => (
                  <div className="section" key={index}>
                    <h3>{lang.name}</h3>
                    <p><strong>Cấp độ:</strong> {lang.level}</p>
                    <p><strong>Ghi chú:</strong> {lang.note}</p>
                    <span className="edit-icon">✎</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="profile-actions">
              <button className="edit-button" onClick={() => navigate('/edit-profile')}>
                Chỉnh sửa hồ sơ
              </button>
            </div>
          </div>
        </div>
      </main>

      <footer>
        <div className="footer-container">
          <div className="footer-section">
            <a href="/" className="footer-logo">NextDev</a>
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