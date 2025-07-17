import React from "react";
import { EnvironmentOutlined, ThunderboltOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import { getLocationName, convertSlug } from "../../config/utils";
import { useNavigate } from "react-router-dom";
import { cancelFollowJob } from "../../config/api";
import { FaTrash } from "react-icons/fa";
import { Spin } from "antd";

const CardJobFollow = ({ displayJob, userId, isLoading, onUnfollow }) => {
  const navigate = useNavigate();

  const handleViewDetailJob = (item) => {
    const slug = convertSlug(item.name);
    navigate(`/job/${slug}?id=${item.id}`);
  };

  const handleCancelFollowJob = async (jobId, userId) => {
    const payload = {
      jobId: jobId,
      userId: userId,
    };
    console.log("payload", payload);
    try {
      const response = await cancelFollowJob(payload);
      // Sau khi hủy theo dõi thành công, gọi callback để xóa job đó khỏi danh sách
      if (response) {
        onUnfollow(jobId);
      }
    } catch (error) {
      console.error("Error cancelling follow job:", error);
    }
  };

  return (
    <section className="flex flex-col" id="jobs">
      <div className="">
        {isLoading ? (
          <Spin spinning={isLoading} tip="Loading..."></Spin>
        ) : displayJob && displayJob.length > 0 ? (
          displayJob.map((job) => (
            <div
              className="w-full items-center border p-4 my-2 cursor-pointer"
              key={job.id}
            >
              <div
                onClick={() => handleViewDetailJob(job)}
                className="job-card-header flex items-center gap-4"
              >
                <img
                  className=" w-24 h-24 object-contain"
                  src={`${import.meta.env.VITE_BACKEND_URL}/storage/company/${
                    job?.company?.logo
                  }`}
                  alt={job.company?.name}
                />
                <div className="flex flex-col flex-grow">
                  <h3 className="text-lg font-semibold">{job.name}</h3>
                  <div className="flex items-center text-m text-gray-600">
                    <ThunderboltOutlined style={{ color: "orange" }} />
                    <span className="ml-1">
                      {(job.salary + "").replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
                      đ
                    </span>
                  </div>
                  <div className="flex items-center text-m text-gray-600 mt-1 mb-1">
                    <EnvironmentOutlined style={{ color: "#58aaab" }} />
                    <span className="ml-1">
                      {getLocationName(job.location)}
                    </span>
                  </div>
                  <div className="text-xs text-gray-500">
                    {job.updatedAt
                      ? dayjs(job.updatedAt).locale("en").fromNow()
                      : dayjs(job.createdAt).locale("en").fromNow()}
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between mt-4">
                <button
                  onClick={() => handleViewDetailJob(job)}
                  className="ml-4 px-4 py-2 bg-blue-500 text-white rounded"
                >
                  Ứng tuyển ngay
                </button>
                <div
                  onClick={() => handleCancelFollowJob(job.id, userId)}
                  className="flex items-center gap-2  cursor-pointer text-[#424e5c] bg-[#e9eaec] rounded p-2"
                >
                  <FaTrash />
                  Bỏ lưu
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>Không có công ty đã lưu nào.</p>
        )}
      </div>
    </section>
  );
};

export default CardJobFollow;
