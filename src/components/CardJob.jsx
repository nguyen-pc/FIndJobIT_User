import React, { useEffect, useState } from "react";
import fptLogo from "../assets/fpt.png";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { callFetchJob } from "../config/api";
import { EnvironmentOutlined, ThunderboltOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { convertSlug, getLocationName } from "../config/utils";

dayjs.extend(relativeTime);

const CardJob = ({ displayJob, isLoading }) => {
  const navigate = useNavigate();
  const handleViewDetailJob = (item) => {
    const slug = convertSlug(item.name);
    navigate(`/job/${slug}?id=${item.id}`);
  };

  return (
    <section className="featured-jobs" id="jobs">
      {/* <h2>Việc làm nổi bật</h2> */}

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
                {/* <img
                  className="w-[100%]"
                  src={isFavorite ? HeartFilled : Heart}
                  alt=""
                /> */}
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
      {/* {total > pageSize && (
        <div className="pagination">
          <span onClick={() => handleOnchangePage({ current: current - 1 })}>
            ⬅️
          </span>
          
          <span onClick={() => handleOnchangePage({ current: current + 1 })}>
            ➡️
          </span>
        </div>
      )} */}
    </section>
  );
};

export default CardJob;
