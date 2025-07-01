import React, { useState } from "react";
import { Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";

import { useLocation, useNavigate } from "react-router-dom";
import { convertSlug } from "../config/utils";

const JobListCard = ({ title, jobs }) => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredJobs = jobs.filter(
    (job) =>
      job.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.skills.some((skill) =>
        skill.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
  );

  const handleViewDetailJob = (item) => {
    const slug = convertSlug(item.name);
    navigate(`/job/${slug}?id=${item.id}`);
  };

  return (
    <div className="joblist-card">
      <div className="joblist-header">{title}</div>
      <div className="joblist-search">
        <Input
          placeholder="Tìm công việc, vị trí ứng tuyển"
          prefix={<SearchOutlined />}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="joblist-body">
        {filteredJobs.map((job, index) => (
          <div key={index} className="job-item">
            <div className="job-info">
              <img
                src={`${import.meta.env.VITE_BACKEND_URL}/storage/company/${
                  job?.company?.logo
                }`}
                alt="logo"
                className="job-logo"
              />
              <div>
                <div className="job-title">{job.name}</div>
                <div className="job-tags">
                  {job.skills.map((skill, i) => (
                    <span key={i} className="job-tag">
                      {skill.name}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <button
              className="apply-btn"
              onClick={() => handleViewDetailJob(job)}
            >
              Ứng tuyển
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobListCard;
