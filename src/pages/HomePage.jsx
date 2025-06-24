
// HomePage.jsx
import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import fptLogo from '../assets/fpt.png'; // <-- logo FPT đã lưu trong assets

/**
 * -----------------------------
 *  DATA SECTION
 * -----------------------------
 */
// Danh sách công ty (demo)
const allCompanies = [
  { id: 1, name: 'FPT IS', description: 'Best Companies To Work For in Asia 2023', img: fptLogo },
  { id: 2, name: 'VNG', description: 'Top Tech Companies 2023', img: fptLogo },
  { id: 3, name: 'VinAI', description: 'Innovative AI Leader 2023', img: fptLogo },
  { id: 4, name: 'Viettel', description: 'Telecommunication Giant', img: fptLogo },
  { id: 5, name: 'CMC Global', description: 'Leading IT Services', img: fptLogo },
  { id: 6, name: 'NashTech', description: 'Global Tech Consultancy', img: fptLogo },
  { id: 7, name: 'Garena', description: 'Entertainment & Gaming', img: fptLogo },
  { id: 8, name: 'Tiki', description: 'E‑commerce Platform', img: fptLogo },
  { id: 9, name: 'FPT Software', description: 'Software Development Leader', img: fptLogo },
];

// Danh sách việc làm (demo) – đều thuộc FPT nên gắn logo + tên công ty
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

/**
 * -----------------------------
 *  COMPONENT
 * -----------------------------
 */
const HomePage = () => {
  /* ------ Pagination: COMPANIES ------ */
  const [currentCompanyPage, setCurrentCompanyPage] = useState(1);
  const companiesPerPage = 6;
  const totalCompanyPages = Math.ceil(allCompanies.length / companiesPerPage);

  const currentCompanies = allCompanies.slice(
    (currentCompanyPage - 1) * companiesPerPage,
    currentCompanyPage * companiesPerPage,
  );

  const handleCompanyPageChange = (page) => {
    const validPage = Math.min(Math.max(page, 1), totalCompanyPages);
    setCurrentCompanyPage(validPage);
  };

  /* ------ Pagination: JOBS ------ */
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

  /* ------ Helpers ------ */
  const renderPageNumbers = (total, current, onChange) => {
    return Array.from({ length: total }, (_, i) => i + 1).map((num) => (
      <span key={num} className={current === num ? 'active' : ''} onClick={() => onChange(num)}>
        {num}
      </span>
    ));
  };

  /**
   * -----------------------------
   *  RENDER
   * -----------------------------
   */
  return (
    <div className="homepage-wrapper">
      <Header />

      <main className="main-content">
        {/* -------- Featured Companies -------- */}
        <section className="job-categories" id="companies">
          <h2>Công ty nổi bật</h2>
          <div className="categories-grid">
            {currentCompanies.map((c) => (
              <div className="category-item" key={c.id}>
                <img src={c.img} alt={c.name} />
                <h3>{c.name}</h3>
                <p>{c.description}</p>
              </div>
            ))}
          </div>
          {totalCompanyPages > 1 && (
            <div className="pagination">
              <span onClick={() => handleCompanyPageChange(currentCompanyPage - 1)}>⬅️</span>
              {renderPageNumbers(totalCompanyPages, currentCompanyPage, handleCompanyPageChange)}
              <span onClick={() => handleCompanyPageChange(currentCompanyPage + 1)}>➡️</span>
            </div>
          )}
        </section>

        {/* -------- Featured Jobs -------- */}
        <section className="featured-jobs" id="jobs">
          <h2>Việc làm nổi bật</h2>

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
      </main>

      <Footer />
    </div>
  );
};


export default HomePage;
