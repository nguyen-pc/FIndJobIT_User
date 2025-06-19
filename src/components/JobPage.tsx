
import { useState } from 'react';

interface CandidateProfileProps {
  jobTitle: string;
  salaryRange: string;
  location: string;
  skills: string[];
  applicationDate: string;
  status: string;
  companyInfo: string;
}

const CandidateProfile = ({ jobTitle, salaryRange, location, skills, applicationDate, status, companyInfo }: CandidateProfileProps) => {
  const [isApplied, setIsApplied] = useState(false);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [jobPage, setJobPage] = useState(1);

  const handleApply = () => {
    setIsApplied(true);
    console.log('Applied for the job with skills:', selectedSkills);
  };

  const handleReviewCV = () => {
    console.log('Reviewing CV');
    // Thêm logic xem CV ở đây
  };

  const toggleSkill = (skill: string) => {
    setSelectedSkills((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]
    );
  };

  // Lấy ngày giờ hiện tại
  const currentDateTime = new Date().toLocaleString('vi-VN', {
    timeZone: 'Asia/Ho_Chi_Minh',
    hour12: false,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });

  // Dữ liệu công việc nổi bật (lấy từ App.tsx)
  const featuredJobs = [
    { company: 'FPT IS', title: 'Kiểm thử phần mềm - Tester', location: 'Quận 4, TP.HCM', skills: ['SQL', 'Tester', 'Automation Tester'] },
    { company: 'FPT IS', title: 'Kiểm thử phần mềm - Tester', location: 'Quận 7, TP.HCM', skills: ['SQL', 'Tester', 'Automation Tester'] },
    { company: 'FPT IS', title: 'Kiểm thử phần mềm - Tester', location: 'Quận 1, TP.HCM', skills: ['SQL', 'Tester', 'Automation Tester'] },
    { company: 'FPT IS', title: 'Kiểm thử phần mềm - Tester', location: 'Quận 6, TP.HCM', skills: ['SQL', 'Tester', 'Automation Tester'] },
    { company: 'FPT IS', title: 'Kiểm thử phần mềm - Tester', location: 'Quận 5, TP.HCM', skills: ['SQL', 'Tester', 'Automation Tester'] },
    { company: 'FPT IS', title: 'Kiểm thử phần mềm - Tester', location: 'Quận 3, TP.HCM', skills: ['SQL', 'Tester', 'Automation Tester'] },
    { company: 'FPT IS', title: 'Kiểm thử phần mềm - Tester', location: 'Quận 2, TP.HCM', skills: ['SQL', 'Tester', 'Automation Tester'] },
    { company: 'FPT IS', title: 'Kiểm thử phần mềm - Tester', location: 'Quận 9, TP.HCM', skills: ['SQL', 'Tester', 'Automation Tester'] },
    { company: 'FPT IS', title: 'Kiểm thử phần mềm - Tester', location: 'Quận 5, TP.HCM', skills: ['SQL', 'Tester', 'Automation Tester'] },
    { company: 'FPT IS', title: 'Kiểm thử phần mềm - Tester', location: 'Quận 3, TP.HCM', skills: ['SQL', 'Tester', 'Automation Tester'] },
    { company: 'FPT IS', title: 'Kiểm thử phần mềm - Tester', location: 'Quận 2, TP.HCM', skills: ['SQL', 'Tester', 'Automation Tester'] },
    { company: 'FPT IS', title: 'Kiểm thử phần mềm - Tester', location: 'Quận 9, TP.HCM', skills: ['SQL', 'Tester', 'Automation Tester'] },
    { company: 'FPT IS', title: 'Kiểm thử phần mềm - Tester', location: 'Quận 5, TP.HCM', skills: ['SQL', 'Tester', 'Automation Tester'] },
    { company: 'FPT IS', title: 'Kiểm thử phần mềm - Tester', location: 'Quận 3, TP.HCM', skills: ['SQL', 'Tester', 'Automation Tester'] },
    { company: 'FPT IS', title: 'Kiểm thử phần mềm - Tester', location: 'Quận 2, TP.HCM', skills: ['SQL', 'Tester', 'Automation Tester'] },
    { company: 'FPT IS', title: 'Kiểm thử phần mềm - Tester', location: 'Quận 9, TP.HCM', skills: ['SQL', 'Tester', 'Automation Tester'] },
  ];

  // Pagination logic for featured jobs
  const cardsPerPage = 6;
  const totalJobPages = Math.ceil(featuredJobs.length / cardsPerPage);
  const startJobIndex = (jobPage - 1) * cardsPerPage;
  const endJobIndex = jobPage === 1 && featuredJobs.length <= cardsPerPage ? featuredJobs.length : startJobIndex + cardsPerPage;
  const currentJobs = featuredJobs.slice(startJobIndex, endJobIndex);

  const handleJobNext = () => {
    if (jobPage < totalJobPages) setJobPage(jobPage + 1);
  };

  const handleJobPrev = () => {
    if (jobPage > 1) setJobPage(jobPage - 1);
  };

  return (
    <div className="candidate-profile-container">
      <div className="top-info-container">
        <div className="profile-section">
          <div className="profile-card">
            <h2>{jobTitle}</h2>
            <p><strong>Nhập từ:</strong> {salaryRange}</p>
            <div className="job-details">
              <p><span className="icon">💰</span> <strong>Thu nhập:</strong> 15 - 30 triệu</p>
              <p><span className="icon">📍</span> <strong>Địa điểm:</strong> {location}</p>
              <p><span className="icon">💼</span> <strong>Kinh nghiệm:</strong> Không yêu cầu</p>
            </div>
            <div className="skill-buttons">
              {skills.map((skill, index) => (
                <button key={index} className="skill-button">{skill}</button>
              ))}
            </div>
            <p><span className="deadline-icon">📅</span> <strong>Hạn nộp hồ sơ:</strong> {applicationDate}</p>
            <div className="action-buttons">
              <button className="review-cv" onClick={handleReviewCV}>Review CV</button>
              <button className="apply-button" onClick={handleApply} disabled={isApplied}>
                {isApplied ? 'Đã ứng tuyển' : 'Ứng tuyển'}
              </button>
            </div>
          </div>
        </div>
        <div className="general-info-section">
          <div className="info-card">
            <h2>Thông tin công ty</h2>
            <p><strong>Công ty thành viên thuộc FPT</strong></p>
            <p><strong>Quy mô:</strong> 2000 nhân viên</p>
            <p><strong>Lĩnh vực:</strong> Viễn thông</p>
            <p><strong>Địa điểm:</strong> Tầng 2, tòa nhà FPT, Phố Duy Tân, Cầu Giấy, Hà Nội</p>
            <p><strong>Xem công ty</strong></p>
          </div>
        </div>
      </div>

      <div className="additional-info-container">
        <div className="detail-info-section">
          <div className="info-card">
            <h2>Chi Tiết Tuyển Dụng</h2>
            <ul className="recruitment-details">
              <li>
                <strong>Mô tả công việc</strong>
                <ul>
                  <li>Tìm kiếm và phát triển khách hàng mới trên địa bàn được phân công</li>
                  <li>Tư vấn giải pháp dịch vụ viễn thông phù hợp với nhu cầu khách hàng</li>
                  <li>Thực hiện các giao dịch, chăm sóc khách hàng hiện tại</li>
                  <li>Đánh giá hiệu quả công việc hàng ngày và báo cáo định kỳ</li>
                </ul>
              </li>
              <li>
                <strong>Yêu cầu ứng viên</strong>
                <ul>
                  <li>Tốt nghiệp THPT trở lên</li>
                  <li>Không yêu cầu kinh nghiệm</li>
                  <li>Có kỹ năng giao tiếp tốt, nhạy bén với công việc</li>
                  <li>
                    <strong>Yêu cầu kỹ năng:</strong>
                    <div className="skill-buttons-container">
                      {['SQL', 'Tester', 'Automation'].map((skill) => (
                        <button
                          key={skill}
                          className={`skill-button ${selectedSkills.includes(skill) ? 'selected' : ''}`}
                          onClick={() => toggleSkill(skill)}
                        >
                          {skill}
                        </button>
                      ))}
                    </div>
                  </li>
                </ul>
              </li>
              <li>
                <strong>Quyền lợi</strong>
                <ul>
                  <li>Lương cơ bản: 10 - 20 triệu + hoa hồng</li>
                  <li>Thưởng nóng khi đạt KPI (15 - 60 triệu VND)</li>
                  <li>Được đào tạo bài bản, hỗ trợ chi phí học tập</li>
                </ul>
              </li>
              <li>
                <strong>Quyền lợi khác</strong>
                <ul>
                  <li>Lương tháng 13, thưởng lễ Tết</li>
                  <li>Đóng BHXH, BHYT, BHTN theo quy định</li>
                  <li>Môi trường làm việc trẻ trung, năng động</li>
                </ul>
              </li>
              <li>
                <strong>Thông tin khác</strong>
                <ul>
                  <li>Thời gian làm việc: 08:00 - 17:30 (Thứ 2 - Thứ 6)</li>
                  <li>Địa điểm làm việc: Quận 1, TP.HCM</li>
                  <li>Thời gian cập nhật: {currentDateTime}</li>
                </ul>
              </li>
              <li>
                <strong>Tuyển dụng</strong>
                <ul>
                  <li>Thu nhập: 10% - 15% + 40 triệu VND</li>
                  <li>Lương cố định: 10.2 - 37.2 triệu VND</li>
                </ul>
              </li>
              <li>
                <strong>Quyền lợi</strong>
                <ul>
                  <li>Mức lương: 15 - 60 triệu (tùy theo năng lực)</li>
                  <li>Được tham gia các chương trình đào tạo nâng cao năng lực</li>
                  <li>Môi trường làm việc chuyên nghiệp, có định hướng rõ ràng</li>
                  <li>Được đóng bảo hiểm BHXH, BHYT, BHTN theo quy định nhà nước</li>
                  <li>Thưởng cuối năm, thưởng dự án, lương tháng 13</li>
                </ul>
              </li>
              <li>
                <strong>Địa điểm làm việc</strong>
                <ul>
                  <li>Quận Minh Khai (Quận 9), TP.HCM</li>
                  <li>Quận 2, TP.HCM</li>
                </ul>
              </li>
              <li>
                <strong>Thời gian làm việc</strong>
                <ul>
                  <li>Thứ 2 - Thứ 6 (08:00 - 17:30)</li>
                  <li>Thứ 7 (08:00 - 12:00)</li>
                </ul>
              </li>
              <li>
                <strong>Thời gian cập nhật</strong>
                <ul>
                  <li>Thời gian: {currentDateTime}</li>
                </ul>
              </li>
            </ul>
            <div className="action-buttons">
              <button className="review-cv" onClick={handleReviewCV}>Review CV</button>
              <button className="apply-button" onClick={handleApply} disabled={isApplied}>
                {isApplied ? 'Đã ứng tuyển' : 'Ứng tuyển'}
              </button>
            </div>
          </div>
        </div>
        <div className="general-info-section-extra">
          <div className="info-card">
            <h2>Thông Tin Chung</h2>
            <ul>
              <li><strong>Cấp bậc:</strong> Nhân viên</li>
              <li><strong>Học vấn:</strong> Trung học phổ thông trở lên</li>
              <li><strong>Số lượng:</strong> 15 người</li>
              <li><strong>Hình thức làm việc:</strong> Toàn thời gian</li>
            </ul>
            <p><strong>Ngày nộp hồ sơ:</strong> 28/05/2025</p>
          </div>
        </div>
      </div>

      {/* Section công việc nổi bật với phân trang */}
      <div className="featured-section">
        <h2>Công việc nổi bật</h2>
        <div className="card-grid">
          {currentJobs.map((job, index) => (
            <div key={index} className="job-card">
              <h3>{job.company} - {job.title}</h3>
              <p>{job.location}</p>
              <ul>
                {job.skills.map((skill, idx) => (
                  <li key={idx}>{skill}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        {featuredJobs.length > cardsPerPage && (
          <div className="pagination">
            <span
              onClick={handleJobPrev}
              style={{ cursor: jobPage > 1 ? 'pointer' : 'not-allowed' }}
            >
              ←
            </span>
            {' • '}
            <span>{jobPage}</span>
            {' • '}
            <span
              onClick={handleJobNext}
              style={{ cursor: jobPage < totalJobPages ? 'pointer' : 'not-allowed' }}
            >
              →
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default CandidateProfile;
