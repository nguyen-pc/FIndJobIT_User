import React from "react";
import { convertSlug, getLocationName } from "../config/utils";
import { EnvironmentOutlined, ThunderboltOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import { Spin } from "antd";

const JobCardRecommend = ({ jobs }) => {
  const [isLoading, setIsLoading] = React.useState(false);

  const navigate = useNavigate();
  const handleViewDetailJob = (item) => {
    const slug = convertSlug(item.job.title);
    navigate(`/job/${slug}?id=${item.job.id}`);
  };
  return (
    <section className="featured-jobs" id="jobs">
      {/* <h2>Việc làm có thể phù hợp với bạn</h2> */}

      <div className="jobs-list">
        {isLoading ? (
          <Spin spinning={isLoading} tip="Loading..."></Spin>
        ) : jobs && jobs.length > 0 ? (
          jobs.map((job) => (
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
                    job?.job?.logoUrl
                  }`}
                  alt={job.company}
                />
                <span className="job-company-name">
                  {" "}
                  {typeof job.company === "object"
                    ? job.company.name
                    : job.company}
                </span>
              </div>
              <h3>{job.job.title}</h3>
              <div>
                <ThunderboltOutlined style={{ color: "orange" }} />
                &nbsp;
                {(job.job.salary + "")?.replace(/\B(?=(\d{3})+(?!\d))/g, ",")} đ
              </div>
              <div>
                <EnvironmentOutlined style={{ color: "#58aaab" }} />
                &nbsp;{getLocationName(job.job.location)}
              </div>
              <div>
                {job.updatedAt
                  ? dayjs(job.job.updatedAt).locale("en").fromNow()
                  : dayjs(job.job.createdAt).locale("en").fromNow()}
              </div>
              <button>Ứng tuyển ngay</button>
            </div>
          ))
        ) : (
          <p>Không có việc làm nào.</p>
        )}
      </div>

      {/* Pagination nếu cần */}
    </section>
  );
};

export default JobCardRecommend;

//    {total > pageSize && (
//         <div className="pagination">
//           <span onClick={() => handleOnchangePage({ current: current - 1 })}>
//             ⬅️
//           </span>
//           {/* Hiển thị số trang, có thể sử dụng hàm renderPageNumbers */}
//           <span onClick={() => handleOnchangePage({ current: current + 1 })}>
//             ➡️
//           </span>
//         </div>
//       )}
