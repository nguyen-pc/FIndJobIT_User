import { useState } from 'react';
import './App.css';
import Header from './components/Header';
import CompanyCard from './components/CompanyCard';
import JobCard from './components/JobCard';
import Footer from './components/Footer';
import CandidateProfile from './components/JobPage';

function App() {
  const [count, setCount] = useState(0);
  const [companyPage, setCompanyPage] = useState(1);
  const [jobPage, setJobPage] = useState(1);
  const [view, setView] = useState('listings'); // 'listings' or 'candidateProfile'
  const cardsPerPage = 3; // 3 cards per row, one row per page for pagination

  const companies = [
    { name: 'FPT IS', title: 'Best Companies To Work For in Asia 2023', date: 'H - 2023' },
    { name: 'FPT IS', title: 'Best Companies To Work For in Asia 2023', date: 'H - 2023' },
    { name: 'FPT IS', title: 'Best Companies To Work For in Asia 2023', date: 'H - 2023' },
    { name: 'FPT IS', title: 'Best Companies To Work For in Asia 2023', date: 'H - 2023' },
    { name: 'FPT IS', title: 'Best Companies To Work For in Asia 2023', date: 'H - 2023' },
    { name: 'FPT IS', title: 'Best Companies To Work For in Asia 2023', date: 'H - 2023' },
    { name: 'FPT IS', title: 'Best Companies To Work For in Asia 2023', date: 'H - 2023' },
    { name: 'FPT IS', title: 'Best Companies To Work For in Asia 2023', date: 'H - 2023' },
    { name: 'FPT IS', title: 'Best Companies To Work For in Asia 2023', date: 'H - 2023' },
    { name: 'FPT IS', title: 'Best Companies To Work For in Asia 2023', date: 'H - 2023' },
    { name: 'FPT IS', title: 'Best Companies To Work For in Asia 2023', date: 'H - 2023' },
    { name: 'FPT IS', title: 'Best Companies To Work For in Asia 2023', date: 'H - 2023' },
  ];

  const jobs = [
    { title: 'Kiểm thử phần mềm - Tester', location: 'Quận 4, TP.HCM', skills: ['SQL', 'Tester', 'Automation Tester'] },
    { title: 'Kiểm thử phần mềm - Tester', location: 'Quận 7, TP.HCM', skills: ['SQL', 'Tester', 'Automation Tester'] },
    { title: 'Kiểm thử phần mềm - Tester', location: 'Quận 1, TP.HCM', skills: ['SQL', 'Tester', 'Automation Tester'] },
    { title: 'Kiểm thử phần mềm - Tester', location: 'Quận 6, TP.HCM', skills: ['SQL', 'Tester', 'Automation Tester'] },
    { title: 'Kiểm thử phần mềm - Tester', location: 'Quận 5, TP.HCM', skills: ['SQL', 'Tester', 'Automation Tester'] },
    { title: 'Kiểm thử phần mềm - Tester', location: 'Quận 3, TP.HCM', skills: ['SQL', 'Tester', 'Automation Tester'] },
    { title: 'Kiểm thử phần mềm - Tester', location: 'Quận 4, TP.HCM', skills: ['SQL', 'Tester', 'Automation Tester'] },
    { title: 'Kiểm thử phần mềm - Tester', location: 'Quận 7, TP.HCM', skills: ['SQL', 'Tester', 'Automation Tester'] },
    { title: 'Kiểm thử phần mềm - Tester', location: 'Quận 1, TP.HCM', skills: ['SQL', 'Tester', 'Automation Tester'] },
    { title: 'Kiểm thử phần mềm - Tester', location: 'Quận 6, TP.HCM', skills: ['SQL', 'Tester', 'Automation Tester'] },
    { title: 'Kiểm thử phần mềm - Tester', location: 'Quận 5, TP.HCM', skills: ['SQL', 'Tester', 'Automation Tester'] },
    { title: 'Kiểm thử phần mềm - Tester', location: 'Quận 3, TP.HCM', skills: ['SQL', 'Tester', 'Automation Tester'] },
  ];

  // Pagination logic for companies
  const totalCompanyPages = Math.ceil(companies.length / 6); // Full page if <= 6, else paginate
  const startCompanyIndex = (companyPage - 1) * 6; // Start at 0 for first 6
  const endCompanyIndex = companyPage === 1 && companies.length <= 6 ? companies.length : startCompanyIndex + 6;
  const currentCompanies = companies.slice(startCompanyIndex, endCompanyIndex);

  // Pagination logic for jobs
  const totalJobPages = Math.ceil(jobs.length / 6); // Full page if <= 6, else paginate
  const startJobIndex = (jobPage - 1) * 6; // Start at 0 for first 6
  const endJobIndex = jobPage === 1 && jobs.length <= 6 ? jobs.length : startJobIndex + 6;
  const currentJobs = jobs.slice(startJobIndex, endJobIndex);

  const handleCompanyNext = () => {
    if (companyPage < totalCompanyPages) setCompanyPage(companyPage + 1);
  };

  const handleCompanyPrev = () => {
    if (companyPage > 1) setCompanyPage(companyPage - 1);
  };

  const handleJobNext = () => {
    if (jobPage < totalJobPages) setJobPage(jobPage + 1);
  };

  const handleJobPrev = () => {
    if (jobPage > 1) setJobPage(jobPage - 1);
  };

  const handleNavChange = (view) => {
    setView(view);
  };

  return (
    <div className="app-container">
      <Header onNavChange={handleNavChange} />
      <main>
        {view === 'candidateProfile' ? (
          <CandidateProfile
            jobTitle="Nhân viên kinh doanh tại Sales FPT Telecom - Thu Nhập Từ 15 - 60 Triệu"
            location="Địa điểm: Quận HCM"
            skills={['SQL', 'Tester', 'Automation Tester']}
            applicationDate="Hạn nộp hồ sơ: 28/05/2025"
            status="Đang chờ xử lý"
            generalInfo="Thông tin chung về ứng viên..."
          />
        ) : (
          <>
            <section className="featured-section">
              <h2>Công ty nổi bật</h2>
              <div className="card-grid">
                {currentCompanies.map((company, index) => (
                  <CompanyCard key={index} {...company} />
                ))}
              </div>
              {companies.length > 6 && (
                <div className="pagination">
                  <span onClick={handleCompanyPrev} style={{ cursor: companyPage > 1 ? 'pointer' : 'not-allowed' }}>←</span>
                  {' • '}
                  <span>{companyPage}</span>
                  {' • '}
                  <span onClick={handleCompanyNext} style={{ cursor: companyPage < totalCompanyPages ? 'pointer' : 'not-allowed' }}>→</span>
                </div>
              )}
            </section>
            <section className="featured-section">
              <h2>Việc làm nổi bật</h2>
              <div className="card-grid">
                {currentJobs.map((job, index) => (
                  <JobCard key={index} {...job} />
                ))}
              </div>
              {jobs.length > 6 && (
                <div className="pagination">
                  <span onClick={handleJobPrev} style={{ cursor: jobPage > 1 ? 'pointer' : 'not-allowed' }}>←</span>
                  {' • '}
                  <span>{jobPage}</span>
                  {' • '}
                  <span onClick={handleJobNext} style={{ cursor: jobPage < totalJobPages ? 'pointer' : 'not-allowed' }}>→</span>
                </div>
              )}
            </section>
          </>
        )}
      </main>
      <Footer />
    </div>
  );
}

export default App;