import React, { useState } from "react";
import { Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";

const JobListCard = ({ title, jobs }) => {
  const [searchTerm, setSearchTerm] = useState("");

  // Lọc công việc dựa trên title hoặc tags
  const filteredJobs = jobs.filter(
    (job) =>
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.tags.some((tag) =>
        tag.toLowerCase().includes(searchTerm.toLowerCase())
      )
  );

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
              <img src={job.logo} alt="logo" className="job-logo" />
              <div>
                <div className="job-title">{job.title}</div>
                <div className="job-tags">
                  {job.tags.map((tag, i) => (
                    <span key={i} className="job-tag">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <button className="apply-btn">Ứng tuyển</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobListCard;
