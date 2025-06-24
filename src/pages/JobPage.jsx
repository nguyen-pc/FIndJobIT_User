// JobPage.jsx
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import fptLogo from '../assets/fpt.png';
import salary from '../assets/salary.png';
import location from '../assets/location.png';
import skill from '../assets/skill.png';
import tim from '../assets/tim.png';

// Danh sách việc làm mẫu (tạm thời lấy từ HomePage.jsx)
const allJobs = [
  { id: 1, company: 'FPT IS', title: 'Kiểm thử phần mềm - Tester', description: 'Quận 4, TP.HCM | SQL | Tester, Automation Tester', img: fptLogo },
  { id: 2, company: 'FPT IS', title: 'Nhà phát triển Frontend', description: 'Quận 1, TP.HCM | React, JavaScript', img: fptLogo },
  { id: 3, company: 'FPT IS', title: 'Kỹ sư AI', description: 'Hà Nội | Python, TensorFlow', img: fptLogo },
  { id: 4, company: 'FPT IS', title: 'Phân tích dữ liệu', description: 'Đà Nẵng | Python, R, SQL', img: fptLogo },
  { id: 5, company: 'FPT IS', title: 'Chuyên viên BA', description: 'Hà Nội | Business Analysis, Agile', img: fptLogo },
  { id: 6, company: 'FPT IS', title: 'Backend Developer', description: 'Quận 7, TP.HCM | Node.js, Express, MongoDB', img: fptLogo },
  { id: 7, company: 'FPT IS', title: 'DevOps Engineer', description: 'Bình Thạnh, TP.HCM | AWS, Docker, Kubernetes', img: fptLogo },
  { id: 8, company: 'FPT IS', title: 'UI/UX Designer', description: 'Quận 3, TP.HCM | Figma, Sketch, Adobe XD', img: fptLogo },
  { id: 9, company: 'FPT IS', title: 'Game Developer', description: 'Thủ Đức, TP.HCM | Unity, C#', img: fptLogo },
];

const JobPage = () => {
  const { jobId } = useParams();
  const [isApplied, setIsApplied] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const handleApply = () => {
    setIsApplied(true);
    console.log('Applied for job ID:', jobId);
  };

  const handleFavorite = () => {
    setIsFavorite(!isFavorite);
    console.log('Toggled favorite for job ID:', jobId);
  };

  const handleReviewCV = () => {
    console.log('Reviewing CV for job ID:', jobId);
  };

  // Pagination cho việc làm nổi bật
  const [currentJobPage, setCurrentJobPage] = useState(1);
  const jobsPerPage = 6;
  const totalJobPages = Math.ceil(allJobs.length / jobsPerPage);

  const currentJobs = allJobs.slice(
    (currentJobPage - 1) * jobsPerPage,
    currentJobPage * jobsPerPage,
  );

  const handleJobPageChange = (page) => {
    const validPage = Math.min(Math.max(page, 1), totalJobPages);
    setCurrentJobPage(validPage);
  };

  const renderPageNumbers = (total, current, onChange) => {
    return Array.from({ length: total }, (_, i) => i + 1).map((num) => (
      <span key={num} className={current === num ? 'active' : ''} onClick={() => onChange(num)}>
        {num}
      </span>
    ));
  };

  if (jobId && jobId !== '1') {
    return (
      <div className="error-container">
        <h2>Công việc không tồn tại</h2>
        <p>Xin lỗi, công việc với ID {jobId} không được tìm thấy.</p>
        <Link to="/job/1">Quay lại chi tiết việc làm</Link>
      </div>
    );
  }

  return (
    <div className="job-detail-page-wrapper">
      <Header />
      <div className="job-detail-content-container">
        <div className="left-panel">
          {/* Khung thông tin công việc chính */}
          <div className="job-detail-card">
            <div className="job-header">
              <h2>Nhân viên kinh doanh dự án-Sales FPT Telecom - Thu Nhập Từ 15 - 60 Triệu </h2>
              <div className="job-meta-grid">
                <span className="job-meta-item">
                  <img src={salary} alt="Thu nhập" className="salary-icon"/>
                  <strong>Thu nhập:</strong> <br/> 15 - 60 Triệu
                </span>
                <span className="job-meta-item">
                  <img src={location} alt="Địa điểm" className="salary-icon"/>
                  <strong>Địa điểm:</strong> <br/> TP.HCM
                </span>
                <span className="job-meta-item">
                  <img src={skill} alt="Kinh nghiệm" className="salary-icon"/>
                  <strong>Kinh nghiệm:</strong><br/> Không có
                </span>
              </div>

              <div className="job-info-and-actions">
                <div className="job-skills-and-deadline-info">
                  <div className="job-skills-container">
                    <span className="skill-tag">SQL</span>
                    <span className="skill-tag">Tester</span>
                    <span className="skill-tag">Automation Tester</span>
                  </div>
                  <span className="deadline-item">
                    📅 <strong>Hạn nộp hồ sơ:</strong> 28/05/2025
                  </span>
                </div>

                <div className="job-actions-vertical">
                  <button className="action-button review-cv" onClick={handleReviewCV}>Review CV</button>
                  <div className="apply-favorite-group">
                    <button
                      className="action-button apply-button"
                      onClick={handleApply}
                      disabled={isApplied}
                    >
                      {isApplied ? 'Đã ứng tuyển' : 'Ứng tuyển'}
                    </button>
                    <button
                      className={`favorite-button ${isFavorite ? 'active' : ''}`}
                      onClick={handleFavorite}
                    >
                      <img src={tim} className="favorite-icon-img" alt="Yêu thích"/>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* KHUNG LỚN: Chi tiết tuyển dụng (bao gồm tất cả các phần con) */}
          <div className="job-section-card detail-recruitment-card">
            <h3>Chi tiết tuyển dụng</h3>

            {/* Mục con: Mô tả công việc */}
            <h4>Mô tả công việc</h4>
            <ul>
              <li>Tìm kiếm, tiếp cận khách hàng tiềm năng để giới thiệu, tư vấn và bán các dịch vụ Viễn thông và Internet của FPT Telecom.</li>
              <li>Chủ động gọi điện, gửi email, gặp gỡ trực tiếp để tìm hiểu nhu cầu và chốt hợp đồng với khách hàng.</li>
              <li>Thực hiện các chiến dịch kinh doanh, chăm sóc khách hàng theo kế hoạch của công ty.</li>
              <li>Đảm bảo chỉ tiêu doanh số cá nhân được giao.</li>
              <li>Báo cáo kết quả công việc định kỳ cho quản lý.</li>
            </ul>

            {/* Mục con: Yêu cầu ứng viên */}
            <h4>Yêu cầu ứng viên</h4>
            <ul>
              <li>Nam/Nữ, tuổi từ 18 - 35.</li>
              <li>Tốt nghiệp Trung cấp trở lên các chuyên ngành kinh tế, quản trị kinh doanh hoặc các ngành liên quan.</li>
              <li>Không yêu cầu kinh nghiệm, sẽ được đào tạo bài bản từ đầu.</li>
              <li>Có khả năng giao tiếp tốt, nhanh nhẹn, năng động và có tinh thần trách nhiệm cao.</li>
              <li>Ưu tiên ứng viên có kinh nghiệm trong lĩnh vực kinh doanh, telesales.</li>
            </ul>

            {/* Mục con: Yêu cầu kỹ năng */}
            <h4>Yêu cầu kỹ năng</h4>
            <div className="job-skills-and-deadline-info">
              <div className="job-skills-container">
                <span className="skill-tag">SQL</span>
                <span className="skill-tag">Tester</span>
                <span className="skill-tag">Automation Tester</span>
              </div>
            </div>

            {/* Mục con: Thu nhập */}
            <h4>Thu nhập</h4>
            <ul>
              <li>Thu nháp khi đạt 100% KPI: 15 - 60 triệu VND</li>
              <li>Thu nháp tính theo tỷ lệ đạt KPI</li>
              <li>Lương cứng: 10.2 - 37.2 triệu VND</li>
              <li>Lương cứng phụ thuộc vào doanh số</li>
            </ul>

            {/* Mục con: Quyền lợi */}
            <h4>Quyền lợi</h4>
            <ul>
              <li>Mức lương 15 - 60tr (lương cứng từ 10.200.000 - 37.200.000đ + hoa hồng)</li>
              <li>Được tham gia các chương trình đào tạo bài bản về kỹ năng bán hàng, săn phầm dịch vụ viên thông.</li>
              <li>Môi trường làm việc năng động, chuyên nghiệp, có hỗ trợ thân thiện trong range.</li>
              <li>Được đóng bảo hiểm xã hội, bảo hiểm y tế, bảo hiểm thất nghiệp theo quy định của pháp luật.</li>
              <li>Thưởng cuối năm lễ, tết theo quy định của công ty.</li>
              <li>Có hỗ tham gia các hoạt động team building, du lịch thường xuyên.</li>
              <li>Bảo hiểm xã hội, Bảo hiểm sức khỏe, Bảo hiểm sức khỏe người thân, Khám sức khỏe định kỳ, Du lịch hàng năm, Thưởng tháng 13</li>
            </ul>

            {/* Mục con: Địa điểm làm việc */}
            <h4>Địa điểm làm việc</h4>
            <ul>
              <li>Các văn phòng FPT Telecom tại TP.HCM</li>
              <li>Hồ Chí Minh: Quận 1</li>
            </ul>

            {/* Mục con: Thời gian làm việc */}
            <h4>Thời gian làm việc</h4>
            <ul>
              <li>Thời gian làm việc: 08:00 - 17:30 (Thứ 2 - Thứ 6)</li>
              <li>Ngày nghỉ: Thứ 7, Chủ nhật và các ngày lễ theo quy định</li>
            </ul>

            {/* Mục con: Cách thức ứng tuyển */}
            <h4>Cách thức ứng tuyển</h4>
            <ul>
              <li>Gửi CV qua email: tuyendung@fpttelecom.com.vn</li>
              <li>Nộp trực tiếp tại văn phòng FPT Telecom TP.HCM</li>
              <li>Ứng tuyển trực tuyến qua website: www.fpttelecom.com.vn/career</li>
              <li>Nhanh tay ứng tuyển ngay hôm nay để không bỏ lỡ cơ hội!</li>
            </ul>
          </div> {/* End of KHUNG LỚN: Chi tiết tuyển dụng */}
        </div> {/* End of left-panel */}

        <div className="right-panel">
          {/* Khung thông tin công ty */}
          <div className="company-info-card">
            <div className="company-header">
              <img src={fptLogo} alt="FPT Telecom" className="company-logo" />
              <h3>FPT Telecom</h3>
            </div>
            <div className="company-details">
              <p><strong>Quy mô:</strong> 2000 nhân viên</p>
              <p><strong>Địa điểm:</strong> Tầng 2, tòa nhà FPT, Phố Duy Tân, Cầu Giấy, Hà Nội</p>
            </div>
            <button className="view-company-button">Xem công ty</button>
          </div>

          {/* KHUNG: Thông tin chung (Right Panel) */}
          <div className="company-info-card general-info-card">
            <h3>Thông tin chung</h3>
            <ul className="job-info-list">
              <li><strong>Phòng ban:</strong> Kinh doanh</li>
              <li><strong>Nơi làm việc:</strong> TP. Hồ Chí Minh</li>
              <li><strong>Ngày cập nhật:</strong> 23/06/2025</li>
              <li><strong>Ngành nghề:</strong> Bán hàng / Kinh doanh</li>
              <li><strong>Cấp bậc:</strong> Nhân viên</li>
              <li><strong>Lương:</strong> 15 - 60 triệu</li>
              <li><strong>Lĩnh vực:</strong> Công nghệ thông tin</li>
              <li><strong>Hạn nộp hồ sơ:</strong> 28/05/2025</li>
            </ul>
          </div>
        </div> {/* End of right-panel */}
      </div> {/* End of job-detail-content-container */}

      {/* KHUNG: Việc làm nổi bật (thêm vào phía dưới cùng) */}
      <div className="main-content">
        <section className="featured-jobs" id="jobs">
          <h2>Việc làm đề xuất</h2>
          <div className="jobs-list">
            {currentJobs.map((job) => (
              <div className="job-card" key={job.id}>
                {/* Header gồm logo + tên công ty + nút yêu thích */}
                <div className="job-card-header">
                  <img className="job-company-logo" src={job.img} alt={job.company} />
                  <span className="job-company-name">{job.company}</span>
                  <span className="favorite-icon">♡</span>
                </div>
                <h3>{job.title}</h3>
                <p>{job.description}</p>
                <button>Ứng tuyển ngay</button>
              </div>
            ))}
          </div>
          {totalJobPages > 1 && (
            <div className="pagination">
              <span onClick={() => handleJobPageChange(currentJobPage - 1)}>⬅️</span>
              {renderPageNumbers(totalJobPages, currentJobPage, handleJobPageChange)}
              <span onClick={() => handleJobPageChange(currentJobPage + 1)}>➡️</span>
            </div>
          )}
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default JobPage;