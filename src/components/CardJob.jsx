import React, { useEffect, useState } from "react";
import fptLogo from "../assets/fpt.png";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { callFetchJob } from "../config/api";
import { EnvironmentOutlined, ThunderboltOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { convertSlug, getLocationName } from "../config/utils";
dayjs.extend(relativeTime);

// Danh sách việc làm (demo) – đều thuộc FPT nên gắn logo + tên công ty
const allJobs = [
  {
    id: 1,
    company: "FPT IS",
    title: "Kiểm thử phần mềm - Tester",
    description: "Quận 4, TP.HCM | SQL | Tester, Automation Tester",
    img: fptLogo,
  },
  {
    id: 2,
    company: "FPT IS",
    title: "Nhà phát triển Frontend",
    description: "Quận 1, TP.HCM | React, JavaScript",
    img: fptLogo,
  },
  {
    id: 3,
    company: "FPT IS",
    title: "Kỹ sư AI",
    description: "Hà Nội | Python, TensorFlow",
    img: fptLogo,
  },
  {
    id: 4,
    company: "FPT IS",
    title: "Phân tích dữ liệu",
    description: "Đà Nẵng | Python, R, SQL",
    img: fptLogo,
  },
  {
    id: 5,
    company: "FPT IS",
    title: "Chuyên viên BA",
    description: "Hà Nội | Business Analysis, Agile",
    img: fptLogo,
  },
  {
    id: 6,
    company: "FPT IS",
    title: "Backend Developer",
    description: "Quận 7, TP.HCM | Node.js, Express, MongoDB",
    img: fptLogo,
  },
  {
    id: 7,
    company: "FPT IS",
    title: "DevOps Engineer",
    description: "Bình Thạnh, TP.HCM | AWS, Docker, Kubernetes",
    img: fptLogo,
  },
  {
    id: 8,
    company: "FPT IS",
    title: "UI/UX Designer",
    description: "Quận 3, TP.HCM | Figma, Sketch, Adobe XD",
    img: fptLogo,
  },
  {
    id: 9,
    company: "FPT IS",
    title: "Game Developer",
    description: "Thủ Đức, TP.HCM | Unity, C#",
    img: fptLogo,
  },
];

const CardJob = (props) => {
  /* ------ Pagination: JOBS ------ */
  const [currentJobPage, setCurrentJobPage] = useState(1);
  const jobsPerPage = 6;
  const totalJobPages = Math.ceil(allJobs.length / jobsPerPage);

  const currentJobs = allJobs.slice(
    (currentJobPage - 1) * jobsPerPage,
    currentJobPage * jobsPerPage
  );

  const handleJobPageChange = (page) => {
    const validPage = Math.min(Math.max(page, 1), totalJobPages);
    setCurrentJobPage(validPage);
  };

  /* ------ Helpers ------ */
  const renderPageNumbers = (total, current, onChange) => {
    return Array.from({ length: total }, (_, i) => i + 1).map((num) => (
      <span
        key={num}
        className={current === num ? "active" : ""}
        onClick={() => onChange(num)}
      >
        {num}
      </span>
    ));
  };

  //Display List Job

  const { showPagination = false } = props;

  const [displayJob, setDisplayJob] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(6);
  const [total, setTotal] = useState(0);
  const [filter, setFilter] = useState("");
  const [sortQuery, setSortQuery] = useState("sort=updatedAt,desc");
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();

  useEffect(() => {
    fetchJob();
  }, [current, pageSize, filter, sortQuery, location]);

  const fetchJob = async () => {
    setIsLoading(true);
    let query = `page=${current}&size=${pageSize}`;
    if (filter) {
      query += `&${filter}`;
    }
    if (sortQuery) {
      query += `&${sortQuery}`;
    }

    //check query string
    const queryLocation = searchParams.get("location");
    const querySkills = searchParams.get("skills");
    if (queryLocation || querySkills) {
      let q = "";
      if (queryLocation) {
        q = sfIn("location", queryLocation.split(",")).toString();
      }

      if (querySkills) {
        q = queryLocation
          ? q + " and " + `${sfIn("skills", querySkills.split(","))}`
          : `${sfIn("skills", querySkills.split(","))}`;
      }

      query += `&filter=${encodeURIComponent(q)}`;
    }

    const res = await callFetchJob(query);
    console.log("res", res);
    if (res && res.data) {
      setDisplayJob(res.data.result);
      setTotal(res.data.meta.total);
    }
    setIsLoading(false);
  };

  const handleOnchangePage = (pagination) => {
    if (pagination && pagination.current !== current) {
      setCurrent(pagination.current);
    }
    if (pagination && pagination.pageSize !== pageSize) {
      setPageSize(pagination.pageSize);
      setCurrent(1);
    }
  };

  const handleViewDetailJob = (item) => {
    const slug = convertSlug(item.name);
    navigate(`/job/${slug}?id=${item.id}`);
  };

  return (
    <section className="featured-jobs" id="jobs">
      <h2>Việc làm nổi bật</h2>

      <div className="jobs-list">
        {isLoading ? (
          <p>Loading...</p>
        ) : displayJob && displayJob.length > 0 ? (
          displayJob.map((job) => (
            <div
              className="job-card"
              key={job.id}
              onClick={() => handleViewDetailJob(job)}
            >
              {/* Header gồm logo + tên công ty + nút yêu thích */}
              <div className="job-card-header">
                <img
                  className="job-company-logo"
                  src={`${import.meta.env.VITE_BACKEND_URL}/storage/company/${
                    job?.company?.logo
                  }`}
                  alt={job.company}
                />
                <span className="job-company-name">
                  {" "}
                  {typeof job.company === "object"
                    ? job.company.name
                    : job.company}
                </span>
                <span className="favorite-icon">♡</span>
              </div>
              <h3>{job.name}</h3>
              <div>
                <ThunderboltOutlined style={{ color: "orange" }} />
                &nbsp;
                {(job.salary + "")?.replace(/\B(?=(\d{3})+(?!\d))/g, ",")} đ
              </div>
              <div>
                <EnvironmentOutlined style={{ color: "#58aaab" }} />
                &nbsp;{getLocationName(job.location)}
              </div>
              <div>
                {job.updatedAt
                  ? dayjs(job.updatedAt).locale("en").fromNow()
                  : dayjs(job.createdAt).locale("en").fromNow()}
              </div>
              <button>Ứng tuyển ngay</button>
            </div>
          ))
        ) : (
          <p>Không có việc làm nào.</p>
        )}
      </div>

      {/* Pagination nếu cần */}
      {total > pageSize && (
        <div className="pagination">
          <span onClick={() => handleOnchangePage({ current: current - 1 })}>
            ⬅️
          </span>
          {/* Hiển thị số trang, có thể sử dụng hàm renderPageNumbers */}
          <span onClick={() => handleOnchangePage({ current: current + 1 })}>
            ➡️
          </span>
        </div>
      )}
    </section>
  );
};

export default CardJob;
