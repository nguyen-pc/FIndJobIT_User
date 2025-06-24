// import React from 'react';
// import { FaMapMarkerAlt, FaBriefcase } from 'react-icons/fa'; // Cần cài đặt react-icons
// // import fptLogo from '../assets/fpt-logo.png'; // Đảm bảo đường dẫn này đúng
// import '../index.css'; // Import global CSS để sử dụng các class đã định nghĩa

// const JobsListPage = () => {
//   return (
//     <div className="jobs-list-page-container">
//       <div className="main-content-wrapper">

//         {/* BẮT ĐẦU CỘT BÊN TRÁI: CHI TIẾT TUYỂN DỤNG */}
//         <div className="left-panel">
//           <div className="job-details-section-container">
//             {/* Phần thông tin chung về vị trí tuyển dụng */}
//             <h1 className="job-title">Nhân viên Kinh doanh dự án - Sales FPT Telecom - Thu Nhập Từ 15 - 80 Triệu</h1>
//             <div className="job-info-row">
//               <div className="info-item">
//                 <FaBriefcase className="icon" />
//                 <span>Thu nhập</span>
//                 <p>15 - 30 Triệu</p>
//               </div>
//               <div className="info-item">
//                 <FaMapMarkerAlt className="icon" />
//                 <span>Địa điểm</span>
//                 <p>Tp. HCM</p>
//               </div>
//               <div className="info-item">
//                 <FaBriefcase className="icon" />
//                 <span>Kinh nghiệm</span>
//                 <p>Không yêu cầu</p>
//               </div>
//             </div>
//             <div className="tags">
//               <span className="tag tag-blue">SQL</span>
//               <span className="tag tag-blue">Tester</span>
//               <span className="tag tag-blue">Automation Tester</span>
//             </div>
//             <div className="actions">
//               <button className="apply-button">Nộp hồ sơ 28/05/2025</button>
//               <button className="review-cv-button">Review CV</button>
//               <button className="save-button">Ứng tuyển</button>
//               <button className="heart-button">&hearts;</button>
//             </div>

//             {/* Phần Chi Tiết Tuyển Dụng */}
//             <div className="details-content">
//               <h2>Chi Tiết Tuyển Dụng</h2>

//               <div className="sub-section">
//                 <h3>Mô tả công việc</h3>
//                 <ul>
//                   <li>Tìm kiếm và phát triển khách hàng mới trong lĩnh vực viễn thông.</li>
//                   <li>Tư vấn và giới thiệu các gói dịch vụ viễn thông phù hợp với nhu cầu của khách hàng.</li>
//                   <li>Thực hiện các cuộc gọi, gặp gỡ khách hàng để thuyết trình và chốt đơn hàng.</li>
//                   <li>Theo dõi và báo cáo doanh số bán hàng, các chỉ tiêu kinh doanh.</li>
//                   <li>Tham gia các hoạt động đào tạo, nâng cao nghiệp vụ kinh doanh.</li>
//                 </ul>
//               </div>

//               <div className="sub-section">
//                 <h3>Yêu cầu ứng viên</h3>
//                 <ul>
//                   <li>Không yêu cầu kinh nghiệm, được đào tạo bài bản.</li>
//                   <li>Tốt nghiệp Trung cấp trở lên.</li>
//                   <li>Kỹ năng giao tiếp, thuyết phục tốt.</li>
//                   <li>Có khả năng làm việc độc lập và làm việc nhóm.</li>
//                   <li>Khả năng sắp xếp và tổ chức công việc.</li>
//                   <li>Trung thực, nhiệt tình, năng động.</li>
//                   <li>Thành thạo tin học văn phòng (Word, Excel, PowerPoint).</li>
//                   <li>Có kỹ năng đàm phán, giải quyết vấn đề.</li>
//                 </ul>
//               </div>

//               <div className="sub-section">
//                 <h3>Yêu cầu kỹ năng</h3>
//                 <div className="tags">
//                   <span className="tag tag-blue">SQL</span>
//                   <span className="tag tag-blue">Tester</span>
//                   <span className="tag tag-blue">Automation Tester</span>
//                 </div>
//               </div>

//               <div className="sub-section">
//                 <h3>Thu nhập</h3>
//                 <ul>
//                   <li>Thu nhập khi đạt KPI: 15 - 60 triệu VND</li>
//                   <li>Thu nhập linh hoạt, theo tỷ lệ đóng góp</li>
//                   <li>Lương cứng: 10.7 - 12.3 triệu VND</li>
//                   <li>Lương cộng phụ thuộc vào doanh số</li>
//                 </ul>
//               </div>

//               <div className="sub-section">
//                 <h3>Quyền lợi</h3>
//                 <ul>
//                   <li>Mức lương 15 - 80tr (lương cứng từ 10.200.000 - 37.200.000đ + hoa hồng)</li>
//                   <li>Được tham gia các chương trình đào tạo bài bản về kỹ năng bán hàng, sản phẩm, quy trình viễn thông</li>
//                   <li>Môi trường làm việc năng động, chuyên nghiệp, cơ hội thăng tiến rõ ràng.</li>
//                   <li>Được đóng bảo hiểm xã hội, bảo hiểm y tế, bảo hiểm thất nghiệp theo quy định của pháp luật.</li>
//                   <li>Thưởng đầy đủ các ngày lễ tết theo quy định của công ty.</li>
//                   <li>Cơ hội khám sức khỏe định kỳ. Du lịch hàng năm, thưởng tháng 13.</li>
//                 </ul>
//               </div>

//               <div className="sub-section">
//                 <h3>Địa điểm làm việc</h3>
//                 <ul>
//                   <li>Hồ Chí Minh: 8/2 Hoàng Hoa Thám, Phường 06, Bình Thạnh</li>
//                   <li>Hồ Chí Minh: Quận 1</li>
//                   <li>Hồ Chí Minh: Tân Bình</li>
//                 </ul>
//               </div>

//               <div className="sub-section">
//                 <h3>Thời gian làm việc</h3>
//                 <ul>
//                   <li>Thứ 2 - Thứ 6 (08:00 đến 17:30)</li>
//                   <li>Thứ 7 (từ 08:00 đến 12:00)</li>
//                 </ul>
//               </div>

//               <div className="sub-section">
//                 <h3>Cách thức ứng tuyển</h3>
//                 <p>Ứng viên nộp hồ sơ trực tuyến bằng cách bấm Ứng tuyển ngay dưới đây.</p>
//                 <div className="actions">
//                   <button className="apply-button">Nộp hồ sơ 28/05/2025</button>
//                   <button className="review-cv-button">Review CV</button>
//                   <button className="save-button">Ứng tuyển</button>
//                   <button className="heart-button">&hearts;</button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//         {/* KẾT THÚC CỘT BÊN TRÁI */}

//         {/* BẮT ĐẦU CỘT BÊN PHẢI: THÔNG TIN CÔNG TY */}
//         <div className="right-panel">
//           <div className="company-info-section-container">
//             <div className="company-header">
//               <img src={fptLogo} alt="FPT Logo" className="company-logo" />
//               <div className="company-name">
//                 <h3>Công ty cổ phần viễn thông FPT</h3>
//               </div>
//             </div>
//             <div className="info-row">
//               <span className="label">Quy mô:</span>
//               <span className="value">2000 nhân viên</span>
//             </div>
//             <div className="info-row">
//               <span className="label">Lĩnh vực:</span>
//               <span className="value">Viễn thông</span>
//             </div>
//             <div className="info-row">
//               <span className="label">Địa điểm:</span>
//               <span className="value">Tầng 2, tòa nhà FPT, Phù Đổng Thiên Vương, Cần Thơ</span>
//             </div>
//             <button className="view-company-button">Xem công ty</button>

//             <div className="general-info-block">
//               <h3>Thông Tin Chung</h3>
//               <div className="info-row">
//                 <span className="label">Cấp bậc:</span>
//                 <span className="value">Nhân viên</span>
//               </div>
//               <div className="info-row">
//                 <span className="label">Học vấn:</span>
//                 <span className="value">Trung học phổ thông trở lên</span>
//               </div>
//               <div className="info-row">
//                 <span className="label">Số lượng tuyển:</span>
//                 <span className="value">15 người</span>
//               </div>
//               <div className="info-row">
//                 <span className="label">Hình thức:</span>
//                 <span className="value">Toàn thời gian</span>
//               </div>
//             </div>
//           </div>
//         </div>
//         {/* KẾT THÚC CỘT BÊN PHẢI */}

//       </div>
//     </div>
//   );
// };

// export default JobsListPage;