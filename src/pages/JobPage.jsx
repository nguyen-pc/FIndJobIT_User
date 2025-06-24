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

            {/* Mục con: Thông tin cơ bản 2 cột */}
            {/* <ul className="job-info-list">
              <li>
                <div className="info-item">
                  <strong>Vị trí:</strong> <span>Nhân viên kinh doanh</span>
                </div>
                <div className="info-item">
                  <strong>Số lượng:</strong> <span>05</span>
                </div>
              </li>
              <li>
                <div className="info-item">
                  <strong>Thời gian thử việc:</strong> <span>02 tháng</span>
                </div>
                <div className="info-item">
                  <strong>Hình thức làm việc:</strong> <span>Toàn thời gian cố định</span>
                </div>
              </li>
              <li>
                <div className="info-item">
                  <strong>Chức vụ:</strong> <span>Nhân viên</span>
                </div>
                <div className="info-item">
                  <strong>Giới tính:</strong> <span>Không yêu cầu</span>
                </div>
              </li>
              <li>
                <div className="info-item">
                  <strong>Độ tuổi:</strong> <span>18 - 35</span>
                </div>
                <div className="info-item">
                  <strong>Học vấn:</strong> <span>Trung cấp trở lên</span>
                </div>
              </li>
              <li>
                <div className="info-item">
                  <strong>Ngoại ngữ:</strong> <span>Không yêu cầu</span>
                </div>
                <div className="info-item">
                  <strong>Tin học:</strong> <span>Cơ bản</span>
                </div>
              </li>
              <li>
                <div className="info-item">
                  <strong>Kinh nghiệm:</strong> <span>Không yêu cầu</span>
                </div>
                <div className="info-item">
                  <strong>Yêu cầu khác:</strong> <span>Không</span>
                </div>
              </li>
            </ul> */}

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

          </div> {/* End of KHUNG LỚN: Chi tiết tuyển dụng */}

          {/* KHUNG: Quyền lợi (được thêm lại dựa trên hình ảnh) */}
          <div className="job-section-card">
            <h3>Quyền lợi</h3>
            <ul>
              <li>Lương cơ bản: 15 - 60 Triệu + hoa hồng</li>
              <li>Thưởng nóng khi đạt KPI (15 - 60 triệu VND)</li>
              <li>Được đào tạo bài bản, hỗ trợ chi phí học tập</li>
              <li>Tham gia các hoạt động team building, du lịch hàng năm.</li>
              <li>Môi trường làm việc chuyên nghiệp, cơ hội thăng tiến cao.</li>
              <li>Được hưởng đầy đủ các chế độ phúc lợi theo quy định của pháp luật (BHXH, BHYT, BHTN...).</li>
            </ul>
          </div>

          {/* KHUNG: Thông tin khác (được thêm lại dựa trên hình ảnh) */}
          <div className="job-section-card">
            <h3>Thông tin khác</h3>
            <ul>
              <li>Thời gian làm việc: 08:00 - 17:30 (Thứ 2 - Thứ 6)</li>
              <li>Ngày nghỉ: Thứ 7, Chủ nhật và các ngày lễ theo quy định.</li>
              <li>Thời gian cập nhật: 08:52 PM +07, 23/06/2025</li>
              <li>Địa điểm làm việc: Các văn phòng FPT Telecom tại TP.HCM.</li>
              <li>Yêu cầu hồ sơ: CV, đơn xin việc, bản sao các bằng cấp liên quan.</li>
            </ul>
          </div>

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
              <li>
                <div className="info-item">
                  <strong>Phòng ban:</strong> <span>Kinh doanh</span>
                </div>
                <div className="info-item">
                  <strong>Nơi làm việc:</strong> <span>TP.Hồ Chí Minh</span>
                </div>
              </li>
              <li>
                <div className="info-item">
                  <strong>Ngày cập nhật:</strong> <span>23/06/2025</span>
                </div>
                <div className="info-item">
                  <strong>Ngành nghề:</strong> <span>Bán hàng / Kinh doanh</span>
                </div>
              </li>
              <li>
                <div className="info-item">
                  <strong>Cấp bậc:</strong> <span>Nhân viên</span>
                </div>
                <div className="info-item">
                  <strong>Lương:</strong> <span>15 - 60 triệu</span>
                </div>
              </li>
              <li>
                <div className="info-item">
                  <strong>Lĩnh vực:</strong> <span>Công nghệ thông tin</span>
                </div>
                <div className="info-item">
                  <strong>Hết hạn nộp:</strong> <span>28/05/2025</span>
                </div>
              </li>
            </ul>
          </div>

        </div> {/* End of right-panel */}
      </div> {/* End of job-detail-content-container */}
      <Footer />
    </div>
  );
};

export default JobPage;