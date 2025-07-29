import React, { useState } from "react";
import { Input, Card, Empty } from "antd"; // Import Card and Empty from Ant Design
import { SearchOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { convertSlug } from "../config/utils"; // Ensure this utility is correctly implemented

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
    <Card
      // Responsive width: full width on small screens, max-width on larger screens
      className="w-full md:max-w-[700px] lg:max-w-[900px] mx-auto shadow-lg" // Added mx-auto for centering
      title={
        <span className="text-xl md:text-2xl font-bold text-[#1C9EAF]">
          {title}
        </span>
      }
      bordered={false}
    >
      <div className="mb-6">
        <Input
          placeholder="Tìm công việc, vị trí ứng tuyển"
          prefix={<SearchOutlined className="text-gray-400" />}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1C9EAF] focus:border-transparent transition-all duration-200"
        />
      </div>

      <div className="flex flex-col gap-4">
        {filteredJobs.length > 0 ? (
          filteredJobs.map((job, index) => (
            <div
              key={index}
              className="flex flex-col sm:flex-row items-center sm:justify-between p-4 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 bg-white"
            >
              <div className="flex items-center gap-4 w-full sm:w-auto mb-3 sm:mb-0">
                <img
                  src={`${import.meta.env.VITE_BACKEND_URL}/storage/company/${
                    job?.company?.logo
                  }`}
                  alt={`${job?.company?.name} logo`}
                  className="w-16 h-16 object-contain rounded border border-gray-200 flex-shrink-0"
                />
                <div className="flex flex-col text-center sm:text-left">
                  <div className="text-base md:text-lg font-semibold text-gray-800 mb-1">
                    {job.name}
                  </div>
                  <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                    {job.skills.map((skill, i) => (
                      <span
                        key={i}
                        className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full border border-gray-200"
                      >
                        {skill.name}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <button
                className="w-full sm:w-auto px-6 py-2 bg-[#1C9EAF] text-white font-medium rounded hover:bg-[#167D8D] focus:outline-none focus:ring-2 focus:ring-[#1C9EAF] focus:ring-opacity-50 transition-colors duration-300"
                onClick={() => handleViewDetailJob(job)}
              >
                Ứng tuyển
              </button>
            </div>
          ))
        ) : (
          <Empty
            description="Không tìm thấy công việc nào phù hợp."
            image={Empty.PRESENTED_IMAGE_SIMPLE}
          />
        )}
      </div>
    </Card>
  );
};

export default JobListCard;
